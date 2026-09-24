export interface ParameterDescriptor {
    readonly name: string;
    readonly in: 'path' | 'query';
    readonly required: boolean;
    readonly style: string;
    readonly explode: boolean;
    readonly description?: string;
    readonly schema?: unknown;
}

export interface RequestBodyDescriptor {
    readonly required: boolean;
    readonly description?: string;
    readonly schema?: unknown;
}

export interface OperationDescriptor {
    readonly name: string;
    readonly operationId: string;
    readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    readonly path: string;
    readonly kind: 'read' | 'write';
    readonly summary?: string;
    readonly description?: string;
    readonly parameters: readonly ParameterDescriptor[];
    readonly requestBody?: RequestBodyDescriptor;
}
