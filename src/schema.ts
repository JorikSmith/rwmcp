import { z, type ZodTypeAny } from 'zod';

export type ComponentSchemas = Readonly<Record<string, unknown>>;

const COMPONENT_REF_PREFIX = '#/components/schemas/';
function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function numberValue(value: unknown): number | undefined {
    return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function schemaReference(value: unknown): string | undefined {
    return isRecord(value) &&
        typeof value.$ref === 'string' &&
        value.$ref.startsWith(COMPONENT_REF_PREFIX)
        ? value.$ref.slice(COMPONENT_REF_PREFIX.length)
        : undefined;
}

export function openApiSchema(
    source: unknown,
    components: ComponentSchemas,
    resolving = new Set<string>(),
): ZodTypeAny {
    const reference = schemaReference(source);
    if (reference) {
        if (resolving.has(reference)) return z.unknown();
        const target = components[reference];
        if (!target) return z.never();
        const nested = new Set(resolving);
        nested.add(reference);
        return openApiSchema(target, components, nested);
    }
    if (!isRecord(source)) return z.unknown();

    const variants = source.oneOf ?? source.anyOf;
    let schema: ZodTypeAny;
    if (Array.isArray(variants) && variants.length > 0) {
        const options = variants.map((variant) => openApiSchema(variant, components, resolving));
        schema =
            options.length === 1
                ? options[0]
                : z.union(options as [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]);
    } else if (Array.isArray(source.allOf) && source.allOf.length > 0) {
        schema = openApiSchema(source.allOf[0], components, resolving);
        for (const variant of source.allOf.slice(1)) {
            schema = z.intersection(schema, openApiSchema(variant, components, resolving));
        }
    } else {
        const declaredType = Array.isArray(source.type)
            ? source.type.find(
                  (type): type is string => typeof type === 'string' && type !== 'null',
              )
            : source.type;
        if (declaredType === 'integer' || declaredType === 'number') {
            let numeric = z.number();
            if (declaredType === 'integer') numeric = numeric.int();
            const minimum = numberValue(source.minimum);
            const maximum = numberValue(source.maximum);
            if (minimum !== undefined) {
                numeric =
                    source.exclusiveMinimum === true ? numeric.gt(minimum) : numeric.min(minimum);
            }
            if (maximum !== undefined) {
                numeric =
                    source.exclusiveMaximum === true ? numeric.lt(maximum) : numeric.max(maximum);
            }
            if (typeof source.exclusiveMinimum === 'number')
                numeric = numeric.gt(source.exclusiveMinimum);
            if (typeof source.exclusiveMaximum === 'number')
                numeric = numeric.lt(source.exclusiveMaximum);
            schema = numeric;
        } else if (declaredType === 'boolean') {
            schema = z.boolean();
        } else if (declaredType === 'array') {
            let array = z.array(openApiSchema(source.items, components, resolving));
            const minItems = numberValue(source.minItems);
            const maxItems = numberValue(source.maxItems);
            if (minItems !== undefined) array = array.min(minItems);
            if (maxItems !== undefined) array = array.max(maxItems);
            schema = array;
        } else if (declaredType === 'object') {
            const properties = isRecord(source.properties) ? source.properties : {};
            const required = new Set(
                Array.isArray(source.required)
                    ? source.required.filter((field): field is string => typeof field === 'string')
                    : [],
            );
            const fields: Record<string, ZodTypeAny> = {};
            for (const [name, property] of Object.entries(properties)) {
                const propertySchema = openApiSchema(property, components, resolving);
                fields[name] = required.has(name) ? propertySchema : propertySchema.optional();
            }
            const additionalProperties = source.additionalProperties;
            if (additionalProperties === false) schema = z.object(fields).strict();
            else if (isRecord(additionalProperties))
                schema = z
                    .object(fields)
                    .catchall(openApiSchema(additionalProperties, components, resolving));
            else schema = z.object(fields).passthrough();
        } else {
            let string = z.string();
            if (source.format === 'uuid') string = string.uuid();
            else if (source.format === 'email') string = string.email();
            else if (source.format === 'date') string = string.date();
            else if (source.format === 'date-time') string = string.datetime({ offset: true });
            else if (source.format === 'uri') string = string.url();
            const minLength = numberValue(source.minLength);
            const maxLength = numberValue(source.maxLength);
            if (minLength !== undefined) string = string.min(minLength);
            if (maxLength !== undefined) string = string.max(maxLength);
            if (typeof source.pattern === 'string') {
                try {
                    string = string.regex(new RegExp(source.pattern));
                } catch {
                }
            }
            schema = string;
        }
    }

    if (Array.isArray(source.enum) && source.enum.length > 0) {
        const values = source.enum;
        schema = schema.refine((value) => values.some((candidate) => Object.is(candidate, value)), {
            message: `Expected one of: ${values.map(String).join(', ')}`,
        });
    }
    if ('const' in source) {
        schema = schema.refine((value) => Object.is(value, source.const), {
            message: `Expected constant value: ${String(source.const)}`,
        });
    }
    if (source.nullable === true || (Array.isArray(source.type) && source.type.includes('null')))
        schema = schema.nullable();
    return typeof source.description === 'string' ? schema.describe(source.description) : schema;
}
