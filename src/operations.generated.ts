import type { OperationDescriptor } from './operations.js';

export const API_VERSION = "3.4.4";

export const COMPONENT_SCHEMAS: Readonly<Record<string, unknown>> = {
  "AddManyUsersToInternalSquadBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 1000,
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "required": [
      "userIds"
    ]
  },
  "BulkAllExtendExpirationDateBodyDto": {
    "type": "object",
    "properties": {
      "extendDays": {
        "type": "integer",
        "minimum": 1,
        "maximum": 9007199254740991
      }
    },
    "required": [
      "extendDays"
    ]
  },
  "BulkAllUpdateUsersBodyDto": {
    "type": "object",
    "properties": {
      "status": {
        "type": "string",
        "enum": [
          "ACTIVE",
          "DISABLED",
          "LIMITED",
          "EXPIRED"
        ]
      },
      "trafficLimitBytes": {
        "type": "number",
        "minimum": 0,
        "description": "Traffic limit in bytes. 0 - unlimited"
      },
      "trafficLimitStrategy": {
        "type": "string",
        "enum": [
          "NO_RESET",
          "DAY",
          "WEEK",
          "MONTH",
          "MONTH_ROLLING"
        ],
        "description": "Available reset periods"
      },
      "expireAt": {
        "description": "Expiration date: 2025-01-17T15:38:45.065Z",
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "telegramId": {
        "type": "number",
        "nullable": true
      },
      "email": {
        "type": "string",
        "format": "email",
        "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$",
        "nullable": true
      },
      "tag": {
        "type": "string",
        "maxLength": 16,
        "pattern": "^[A-Z0-9_]+$",
        "nullable": true
      },
      "hwidDeviceLimit": {
        "type": "integer",
        "minimum": 0,
        "maximum": 9007199254740991,
        "nullable": true
      }
    }
  },
  "BulkDeleteHostsBodyDto": {
    "type": "object",
    "properties": {
      "uuids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "uuids"
    ]
  },
  "BulkDeleteUsersBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 500,
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "required": [
      "userIds"
    ]
  },
  "BulkDeleteUsersByStatusBodyDto": {
    "type": "object",
    "properties": {
      "status": {
        "type": "string",
        "enum": [
          "ACTIVE",
          "DISABLED",
          "LIMITED",
          "EXPIRED"
        ]
      }
    },
    "required": [
      "status"
    ]
  },
  "BulkDisableHostsBodyDto": {
    "type": "object",
    "properties": {
      "uuids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "uuids"
    ]
  },
  "BulkEnableHostsBodyDto": {
    "type": "object",
    "properties": {
      "uuids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "uuids"
    ]
  },
  "BulkExtendExpirationDateBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 500,
        "type": "array",
        "items": {
          "type": "number"
        }
      },
      "extendDays": {
        "type": "integer",
        "minimum": 1,
        "maximum": 9999
      }
    },
    "required": [
      "userIds",
      "extendDays"
    ]
  },
  "BulkNodesActionsBodyDto": {
    "type": "object",
    "properties": {
      "uuids": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "action": {
        "type": "string",
        "enum": [
          "ENABLE",
          "DISABLE",
          "RESTART",
          "RESET_TRAFFIC"
        ]
      }
    },
    "required": [
      "uuids",
      "action"
    ]
  },
  "BulkNodesUpdateBodyDto": {
    "type": "object",
    "properties": {
      "uuids": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "fields": {
        "type": "object",
        "properties": {
          "countryCode": {
            "type": "string",
            "maxLength": 2
          },
          "consumptionMultiplier": {
            "type": "number",
            "minimum": 0,
            "maximum": 100
          },
          "nodeConsumptionMultiplier": {
            "type": "number",
            "minimum": 0,
            "maximum": 100
          },
          "providerUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
            "nullable": true
          },
          "tags": {
            "maxItems": 10,
            "type": "array",
            "items": {
              "type": "string",
              "maxLength": 36,
              "pattern": "^[A-Z0-9_:]+$"
            }
          },
          "activePluginUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
            "nullable": true
          },
          "integrationUuids": {
            "maxItems": 20,
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "note": {
            "type": "string",
            "maxLength": 255,
            "nullable": true
          }
        }
      }
    },
    "required": [
      "uuids",
      "fields"
    ]
  },
  "BulkResetTrafficUsersBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 500,
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "required": [
      "userIds"
    ]
  },
  "BulkRevokeUsersSubscriptionBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 500,
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "required": [
      "userIds"
    ]
  },
  "BulkUpdateUsersBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 500,
        "type": "array",
        "items": {
          "type": "number"
        }
      },
      "fields": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "DISABLED",
              "LIMITED",
              "EXPIRED"
            ]
          },
          "trafficLimitBytes": {
            "type": "number",
            "minimum": 0,
            "description": "Traffic limit in bytes. 0 - unlimited"
          },
          "trafficLimitStrategy": {
            "type": "string",
            "enum": [
              "NO_RESET",
              "DAY",
              "WEEK",
              "MONTH",
              "MONTH_ROLLING"
            ],
            "description": "Available reset periods"
          },
          "expireAt": {
            "description": "Expiration date: 2025-01-17T15:38:45.065Z",
            "type": "string",
            "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "telegramId": {
            "type": "number",
            "nullable": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$",
            "nullable": true
          },
          "tag": {
            "type": "string",
            "maxLength": 16,
            "pattern": "^[A-Z0-9_]+$",
            "nullable": true
          },
          "hwidDeviceLimit": {
            "type": "integer",
            "minimum": 0,
            "maximum": 9007199254740991,
            "nullable": true
          },
          "externalSquadUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
            "description": "Optional. External squad UUID.",
            "nullable": true
          }
        }
      }
    },
    "required": [
      "userIds",
      "fields"
    ]
  },
  "BulkUpdateUsersSquadsBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 500,
        "type": "array",
        "items": {
          "type": "number"
        }
      },
      "activeInternalSquads": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "userIds",
      "activeInternalSquads"
    ]
  },
  "CloneHostBodyDto": {
    "type": "object",
    "properties": {
      "cloneFromUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      }
    },
    "required": [
      "cloneFromUuid"
    ]
  },
  "CloneNodePluginBodyDto": {
    "type": "object",
    "properties": {
      "cloneFromUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      }
    },
    "required": [
      "cloneFromUuid"
    ]
  },
  "CloneSubpageConfigBodyDto": {
    "type": "object",
    "properties": {
      "cloneFromUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      }
    },
    "required": [
      "cloneFromUuid"
    ]
  },
  "CreateConfigProfileBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "config": {
        "type": "object",
        "properties": {},
        "additionalProperties": {}
      }
    },
    "required": [
      "name",
      "config"
    ]
  },
  "CreateExternalSquadBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      }
    },
    "required": [
      "name"
    ]
  },
  "CreateHostBodyDto": {
    "type": "object",
    "properties": {
      "inbound": {
        "type": "object",
        "properties": {
          "configProfileUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          },
          "configProfileInboundUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          }
        },
        "required": [
          "configProfileUuid",
          "configProfileInboundUuid"
        ]
      },
      "remark": {
        "type": "string",
        "minLength": 1,
        "maxLength": 100
      },
      "address": {
        "type": "string"
      },
      "port": {
        "type": "integer",
        "minimum": -9007199254740991,
        "maximum": 9007199254740991
      },
      "path": {
        "type": "string",
        "nullable": true
      },
      "sni": {
        "type": "string",
        "nullable": true
      },
      "host": {
        "type": "string",
        "nullable": true
      },
      "alpn": {
        "type": "string",
        "enum": [
          "h3",
          "h2",
          "http/1.1",
          "h2,http/1.1",
          "h3,h2,http/1.1",
          "h3,h2",
          null
        ],
        "nullable": true
      },
      "fingerprint": {
        "type": "string",
        "nullable": true
      },
      "isDisabled": {
        "default": false,
        "type": "boolean"
      },
      "securityLayer": {
        "default": "DEFAULT",
        "type": "string",
        "enum": [
          "DEFAULT",
          "TLS",
          "NONE"
        ]
      },
      "xhttpExtraParams": {
        "nullable": true
      },
      "muxParams": {
        "nullable": true
      },
      "sockoptParams": {
        "nullable": true
      },
      "finalMask": {
        "nullable": true
      },
      "serverDescription": {
        "type": "string",
        "maxLength": 30,
        "nullable": true
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      },
      "isHidden": {
        "default": false,
        "type": "boolean"
      },
      "overrideSniFromAddress": {
        "default": false,
        "type": "boolean"
      },
      "keepSniBlank": {
        "default": false,
        "type": "boolean"
      },
      "pinnedPeerCertSha256": {
        "type": "string",
        "nullable": true
      },
      "verifyPeerCertByName": {
        "type": "string",
        "nullable": true
      },
      "vlessRouteId": {
        "type": "integer",
        "minimum": 0,
        "maximum": 65535,
        "nullable": true
      },
      "shuffleHost": {
        "default": false,
        "type": "boolean"
      },
      "mihomoX25519": {
        "default": false,
        "type": "boolean"
      },
      "mihomoIpVersion": {
        "type": "string",
        "enum": [
          "dual",
          "ipv4",
          "ipv6",
          "ipv4-prefer",
          "ipv6-prefer",
          null
        ],
        "nullable": true
      },
      "nodes": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "xrayJsonTemplateUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "excludeFromSubscriptionTypes": {
        "description": "Optional. Subscription types from which the host will be excluded from.",
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "XRAY_JSON",
            "XRAY_BASE64",
            "MIHOMO",
            "STASH",
            "CLASH",
            "SINGBOX"
          ]
        }
      },
      "mapper": {
        "type": "object",
        "properties": {
          "xrayJson": {
            "title": "Xray JSON",
            "markdownDescription": "Operations applied to the **outbound** generated for this host in the Xray JSON subscription. Paths are counted from the root of the outbound.\n\n```json\n[\n  {\n    \"op\": \"copy\",\n    \"from\": \"streamSettings.tlsSettings.cipherSuites\",\n    \"to\": \"streamSettings.tlsSettings.cipherSuites\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"mux\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.tlsSettings.cipherSuites\",\n  \"to\": \"streamSettings.tlsSettings.cipherSuites\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema0"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema1"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"streamSettings.tlsSettings.enableSessionResumption\",\n  \"value\": true\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"mux\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "mihomo": {
            "title": "Mihomo",
            "markdownDescription": "Operations applied to the **proxy node** generated for this host in the Mihomo subscription.\n\nPaths are counted from the root of the node, where Mihomo keys are written in kebab-case.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"ip-version\",\n    \"value\": \"ipv4\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"servername\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema2"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema3"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"reality-opts.support-x25519mlkem768\",\n  \"value\": true\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"smux\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "base64": {
            "title": "Base64",
            "markdownDescription": "Operations applied to the share link generated for this host in the Base64 subscription.\n\n`to` is a plain query parameter name, not a path – dots carry no meaning here.\n\nWith a `$link.` prefix the operation rewrites the link itself instead of its query string. Writable parts: `$link.address`, `$link.port`, `$link.password`, `$link.remark`, and `$link.method` for Shadowsocks. `$link.password` is the credential of the protocol.\n\n> A value that cannot make a valid link – an empty address, a port outside 1-65535 – is ignored, and the generated one is kept.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"fp\",\n    \"value\": \"chrome\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"fm\"\n  },\n  {\n    \"op\": \"set\",\n    \"to\": \"$link.port\",\n    \"value\": 2053\n  },\n  {\n    \"op\": \"copy\",\n    \"from\": \"$host.securityOptions.serverName\",\n    \"to\": \"$link.address\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"sni\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema4"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema5"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"fp\",\n  \"value\": \"chrome\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"fm\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "singbox": {
            "title": "sing-box",
            "markdownDescription": "Operations applied to the **outbound** generated for this host in the sing-box subscription. Paths are counted from the root of the outbound.\n\nsing-box keys are written in snake_case, and the outbound of a Hysteria2 host has a shape of its own.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"tls.utls.fingerprint\",\n    \"value\": \"chrome\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"multiplex\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"tls.server_name\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema6"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/CreateHostBodyDto__schema7"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"tls.utls.fingerprint\",\n  \"value\": \"chrome\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"multiplex\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          }
        },
        "title": "Host Mapper",
        "markdownDescription": "Rewrites the config generated for this host, per client type.\n\nOperations run **after** the generator has finished, so they can change or remove anything it produced.\n\nThe source for `copy` is the raw inbound of the config profile this host belongs to, or the host itself when the path starts with `$host.`.\n\n> `to` is never checked against the target client. A misspelled key is written exactly like a real one."
      },
      "internalSquads": {
        "type": "object",
        "properties": {
          "mode": {
            "type": "string",
            "enum": [
              "EXCLUDE",
              "ALLOW_ONLY"
            ]
          },
          "squads": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          }
        },
        "required": [
          "mode",
          "squads"
        ]
      }
    },
    "required": [
      "inbound",
      "remark",
      "address",
      "port"
    ]
  },
  "CreateHostBodyDto__schema0": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema0"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema0"
        }
      }
    ],
    "nullable": true
  },
  "CreateHostBodyDto__schema1": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema1"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema1"
        }
      }
    ],
    "nullable": true
  },
  "CreateHostBodyDto__schema2": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema2"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema2"
        }
      }
    ],
    "nullable": true
  },
  "CreateHostBodyDto__schema3": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema3"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema3"
        }
      }
    ],
    "nullable": true
  },
  "CreateHostBodyDto__schema4": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema4"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema4"
        }
      }
    ],
    "nullable": true
  },
  "CreateHostBodyDto__schema5": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema5"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema5"
        }
      }
    ],
    "nullable": true
  },
  "CreateHostBodyDto__schema6": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema6"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema6"
        }
      }
    ],
    "nullable": true
  },
  "CreateHostBodyDto__schema7": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema7"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/CreateHostBodyDto__schema7"
        }
      }
    ],
    "nullable": true
  },
  "CreateInfraBillingNodeBodyDto": {
    "type": "object",
    "properties": {
      "providerUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "nodeUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "name": {
        "type": "string",
        "minLength": 1,
        "maxLength": 255,
        "nullable": true
      },
      "nextBillingAt": {
        "description": "Next billing date. Format: 2025-01-17T15:38:45.065Z",
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      }
    },
    "required": [
      "providerUuid",
      "nodeUuid",
      "name",
      "nextBillingAt"
    ]
  },
  "CreateInfraBillingRecordBodyDto": {
    "type": "object",
    "properties": {
      "providerUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "amount": {
        "type": "number",
        "minimum": 0
      },
      "billedAt": {
        "description": "Billing date. Format: 2025-01-17T15:38:45.065Z",
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      }
    },
    "required": [
      "providerUuid",
      "amount",
      "billedAt"
    ]
  },
  "CreateInfraProviderBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30
      },
      "faviconLink": {
        "type": "string",
        "format": "uri"
      },
      "loginUrl": {
        "type": "string",
        "format": "uri"
      }
    },
    "required": [
      "name"
    ]
  },
  "CreateInternalSquadBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "inbounds": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "name",
      "inbounds"
    ]
  },
  "CreateNodeBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 3,
        "maxLength": 30
      },
      "address": {
        "type": "string",
        "minLength": 2
      },
      "port": {
        "type": "integer",
        "minimum": 1,
        "maximum": 65535
      },
      "proxyUrl": {
        "type": "string",
        "pattern": "^socks5:\\/\\/(?:[^:@/\\s]+(?::[^@/\\s]*)?@)?[^:@/\\s]+:\\d{1,5}$",
        "nullable": true
      },
      "isTrafficTrackingActive": {
        "default": false,
        "type": "boolean"
      },
      "trafficLimitBytes": {
        "type": "number",
        "minimum": 0
      },
      "notifyPercent": {
        "type": "integer",
        "minimum": 0,
        "maximum": 100
      },
      "trafficResetDay": {
        "type": "integer",
        "minimum": 1,
        "maximum": 31
      },
      "countryCode": {
        "default": "XX",
        "type": "string",
        "maxLength": 2
      },
      "consumptionMultiplier": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      },
      "nodeConsumptionMultiplier": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      },
      "configProfile": {
        "type": "object",
        "properties": {
          "activeConfigProfileUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          },
          "activeInbounds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          }
        },
        "required": [
          "activeConfigProfileUuid",
          "activeInbounds"
        ]
      },
      "providerUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      },
      "activePluginUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "integrationUuids": {
        "maxItems": 20,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "note": {
        "type": "string",
        "maxLength": 255
      },
      "ips": {
        "maxItems": 64,
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "ip": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "ipv4",
                  "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$"
                },
                {
                  "type": "string",
                  "format": "ipv6",
                  "pattern": "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$"
                }
              ]
            },
            "status": {
              "type": "string",
              "enum": [
                "INBOUND",
                "OUTBOUND",
                "MANAGEMENT",
                "TRANSIT",
                "MONITORING",
                "RESERVE",
                "BLOCKED",
                "FLAGGED",
                "DEPRECATED",
                "UNKNOWN"
              ]
            }
          },
          "required": [
            "ip",
            "status"
          ]
        }
      }
    },
    "required": [
      "name",
      "address",
      "configProfile"
    ]
  },
  "CreateNodeIntegrationBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30
      },
      "description": {
        "type": "string",
        "maxLength": 255,
        "nullable": true
      },
      "config": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "required": [
      "name",
      "config"
    ]
  },
  "CreateNodePluginBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      }
    },
    "required": [
      "name"
    ]
  },
  "CreateSharedListBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_-]+(\\/[A-Za-z0-9_-]+)*$"
      },
      "config": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "required": [
      "name",
      "config"
    ]
  },
  "CreateSnippetBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_ -]+(\\/[A-Za-z0-9_ -]+)*$"
      },
      "snippet": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {},
          "additionalProperties": {}
        }
      }
    },
    "required": [
      "name",
      "snippet"
    ]
  },
  "CreateSubpageConfigBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      }
    },
    "required": [
      "name"
    ]
  },
  "CreateSubscriptionTemplateBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "templateType": {
        "type": "string",
        "enum": [
          "XRAY_JSON",
          "XRAY_BASE64",
          "MIHOMO",
          "STASH",
          "CLASH",
          "SINGBOX"
        ]
      }
    },
    "required": [
      "name",
      "templateType"
    ]
  },
  "CreateUserBodyDto": {
    "type": "object",
    "properties": {
      "username": {
        "type": "string",
        "minLength": 3,
        "maxLength": 36,
        "pattern": "^[a-zA-Z0-9_-]+$",
        "description": "Unique username for the user. Required. Must be 3-36 characters long and contain only letters, numbers, underscores and dashes."
      },
      "status": {
        "description": "Optional. User account status. Defaults to ACTIVE.",
        "default": "ACTIVE",
        "type": "string",
        "enum": [
          "ACTIVE",
          "DISABLED",
          "LIMITED",
          "EXPIRED"
        ]
      },
      "shortUuid": {
        "description": "Optional. Short UUID identifier for the user.",
        "type": "string"
      },
      "trojanPassword": {
        "description": "Optional. Password for Trojan protocol. Must be 8-32 characters.",
        "type": "string",
        "minLength": 8,
        "maxLength": 32
      },
      "vlessUuid": {
        "description": "Optional. UUID for VLESS protocol. Must be a valid UUID format.",
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$"
      },
      "ssPassword": {
        "description": "Optional. Password for Shadowsocks protocol. Must be 8-32 characters.",
        "type": "string",
        "minLength": 8,
        "maxLength": 32
      },
      "trafficLimitBytes": {
        "description": "Optional. Traffic limit in bytes. Set to 0 for unlimited traffic.",
        "type": "number",
        "minimum": 0
      },
      "trafficLimitStrategy": {
        "default": "NO_RESET",
        "description": "Available reset periods",
        "type": "string",
        "enum": [
          "NO_RESET",
          "DAY",
          "WEEK",
          "MONTH",
          "MONTH_ROLLING"
        ]
      },
      "expireAt": {
        "description": "Account expiration date. Required. Format: 2025-01-17T15:38:45.065Z",
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      },
      "createdAt": {
        "description": "Optional. Account creation date. Format: 2025-01-17T15:38:45.065Z",
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      },
      "lastTrafficResetAt": {
        "description": "Optional. Date of last traffic reset. Format: 2025-01-17T15:38:45.065Z",
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      },
      "description": {
        "description": "Optional. Additional notes or description for the user account.",
        "type": "string"
      },
      "tag": {
        "type": "string",
        "maxLength": 16,
        "pattern": "^[A-Z0-9_]+$",
        "description": "Optional. User tag for categorization. Max 16 characters, uppercase letters, numbers and underscores only.",
        "nullable": true
      },
      "telegramId": {
        "type": "number",
        "description": "Optional. Telegram user ID for notifications. Must be an integer.",
        "nullable": true
      },
      "email": {
        "type": "string",
        "format": "email",
        "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$",
        "description": "Optional. User email address. Must be a valid email format.",
        "nullable": true
      },
      "hwidDeviceLimit": {
        "type": "integer",
        "minimum": 0,
        "maximum": 9007199254740991,
        "description": "Optional. Maximum number of hardware devices allowed. Must be a positive integer."
      },
      "activeInternalSquads": {
        "description": "Optional. Array of UUIDs representing enabled internal squads.",
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "externalSquadUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "description": "Optional. External squad UUID.",
        "nullable": true
      }
    },
    "required": [
      "username",
      "expireAt"
    ]
  },
  "CreateUserHwidDeviceBodyDto": {
    "type": "object",
    "properties": {
      "hwid": {
        "type": "string",
        "pattern": "^[a-zA-Z0-9=-]{10,64}$"
      },
      "userId": {
        "type": "number"
      },
      "platform": {
        "type": "string"
      },
      "osVersion": {
        "type": "string"
      },
      "deviceModel": {
        "type": "string"
      },
      "userAgent": {
        "type": "string"
      },
      "requestIp": {
        "type": "string"
      }
    },
    "required": [
      "hwid",
      "userId"
    ]
  },
  "DebugSrrMatcherBodyDto": {
    "type": "object",
    "properties": {
      "responseRules": {
        "type": "object",
        "properties": {
          "version": {
            "type": "string",
            "enum": [
              "1"
            ],
            "title": "Response Rules Config Version",
            "markdownDescription": "Version of the **response rules** config. Currently supported version is **1**."
          },
          "settings": {
            "title": "Response Rule Settings",
            "markdownDescription": "Settings for the **response rules** config. Optional.",
            "type": "object",
            "properties": {
              "disableSubscriptionAccessByPath": {
                "title": "Disable Subscription Access by Path",
                "markdownDescription": "Usually, a user's subscription may also be available via additional paths such as **/json**, **/stash**, or **/mihomo**. If this flag is set to **true**, access via these additional paths will be disabled.",
                "type": "boolean"
              }
            }
          },
          "rules": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 50,
                  "title": "Name",
                  "markdownDescription": "Name of the response rule."
                },
                "description": {
                  "title": "Description",
                  "markdownDescription": "Description of the response rule. Optional.",
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 250
                },
                "enabled": {
                  "type": "boolean",
                  "title": "Enabled",
                  "markdownDescription": "Control whether the response rule is enabled or disabled. \n\n - `true` the rule will be applied. \n\n - `false` the rule will be always ignored."
                },
                "operator": {
                  "type": "string",
                  "enum": [
                    "AND",
                    "OR"
                  ],
                  "markdownDescription": "Operator to use for combining conditions in the rule."
                },
                "conditions": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "headerName": {
                        "type": "string",
                        "pattern": "^[!#$%&'*+\\-.0-9A-Z^_`a-z|~]+$",
                        "title": "Header Name",
                        "markdownDescription": "**Name** of the HTTP header to check. Must comply with RFC 7230."
                      },
                      "operator": {
                        "type": "string",
                        "enum": [
                          "EQUALS",
                          "NOT_EQUALS",
                          "CONTAINS",
                          "NOT_CONTAINS",
                          "STARTS_WITH",
                          "NOT_STARTS_WITH",
                          "ENDS_WITH",
                          "NOT_ENDS_WITH",
                          "REGEX",
                          "NOT_REGEX"
                        ],
                        "errorMessage": "Invalid operator. Please select a valid operator.",
                        "markdownDescription": "Operator to use for comparing the `headerName` with `value`.",
                        "markdownEnumDescriptions": [
                          "Performs an exact, comparison between the header value and specified string. `string === value`",
                          "Ensures the header value does not exactly match the specified string. `string !== value`",
                          "Checks if the header value contains the specified string as a substring. `string.includes()`",
                          "Verifies the header value does not contain the specified string as a substring. `!string.includes()`",
                          "Validates that the header value begins with the specified string. `string.startsWith()`",
                          "Validates that the header value does not begin with the specified string. `!string.startsWith()`",
                          "Confirms the header value ends with the specified string. `string.endsWith()`",
                          "Confirms the header value does not end with the specified string. `!string.endsWith()`",
                          "Evaluates if the header value matches the specified regular expression pattern. `regex.test()`",
                          "Evaluates if the header value does not match the specified regular expression pattern. `!regex.test()`"
                        ]
                      },
                      "value": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 255,
                        "markdownDescription": "**Value** to check against the **headerName**."
                      },
                      "caseSensitive": {
                        "type": "boolean",
                        "markdownDescription": "Whether the value is **case sensitive**. \n\n - `true`: the value will be compared as is. \n\n - `false`: the value will be lowercased **before** comparison."
                      }
                    },
                    "required": [
                      "headerName",
                      "operator",
                      "value",
                      "caseSensitive"
                    ],
                    "markdownDescription": "Condition to check against the **headerName**.",
                    "defaultSnippets": [
                      {
                        "label": "Examples: Check if header contains \"text/html\"",
                        "markdownDescription": "Condition to check if **headerName** contains \"text/html\"",
                        "body": {
                          "headerName": "accept",
                          "operator": "CONTAINS",
                          "value": "text/html",
                          "caseSensitive": true
                        }
                      }
                    ]
                  },
                  "title": "Conditions",
                  "markdownDescription": "Array of conditions to check against the request headers. Conditions are applied with **operator**. If conditions are empty, the rule will be matched."
                },
                "responseType": {
                  "type": "string",
                  "enum": [
                    "XRAY_JSON",
                    "XRAY_BASE64",
                    "MIHOMO",
                    "STASH",
                    "CLASH",
                    "SINGBOX",
                    "BROWSER",
                    "BLOCK",
                    "STATUS_CODE_404",
                    "STATUS_CODE_451",
                    "SOCKET_DROP"
                  ],
                  "errorMessage": "Invalid response type. Please select a valid response type.",
                  "markdownDescription": "Type of the response. Determines the type of **response** to be returned when the rule is matched.",
                  "markdownEnumDescriptions": [
                    "Return **subscription** in XRAY-JSON format. (Using `Xray Json` template)",
                    "Return **subscription** in BASE64 encoded string. Compatible with most client application with Xray core.",
                    "Return **subscription** in Mihomo format. (Using `Mihomo` template)",
                    "Return **subscription** in Stash format. (Using `Stash` template)",
                    "Return **subscription** in Clash format. (Using `Clash` template) Useful for client application that use Legacy Clash core.",
                    "Return **subscription** in Singbox format. (Using `Singbox` template) Format which is used by Singbox client application.",
                    "Return **subscription** as browser format. The same as on `/info` route.",
                    "**Drop** request and return `403` status code.",
                    "**Drop** request and return `404` status code.",
                    "**Drop** request and return `451` status code.",
                    "**Drop** the socket connection."
                  ]
                },
                "responseModifications": {
                  "title": "Response Modifications",
                  "examples": [
                    {
                      "headers": [
                        {
                          "key": "X-Custom-Header",
                          "value": "CustomValue"
                        }
                      ]
                    }
                  ],
                  "markdownDescription": "Response modifications to be applied when the rule is matched. Optional.",
                  "type": "object",
                  "properties": {
                    "headers": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "key": {
                            "type": "string",
                            "pattern": "^[!#$%&'*+\\-.0-9A-Z^_`a-z|~]+$",
                            "title": "Header Key",
                            "markdownDescription": "Key of the response header. Must comply with RFC 7230."
                          },
                          "value": {
                            "type": "string",
                            "minLength": 1,
                            "title": "Header Value",
                            "markdownDescription": "Value of the response header."
                          }
                        },
                        "required": [
                          "key",
                          "value"
                        ],
                        "title": "Headers",
                        "markdownDescription": "**Key** and **value** of the response header will be added to the response."
                      },
                      "defaultSnippets": [
                        {
                          "label": "Examples: Add custom header",
                          "markdownDescription": "Add a custom header to the response",
                          "body": [
                            {
                              "key": "X-Custom-Header",
                              "value": "CustomValue"
                            }
                          ]
                        }
                      ],
                      "markdownDescription": "Array of headers to be added when the rule is matched."
                    },
                    "applyHeadersToEnd": {
                      "title": "Apply Headers to End",
                      "markdownDescription": "By default, headers are added when forming the response. In some cases, headers set in SRR may be overridden by headers from other parts of the system. If you set this flag to **true**, headers from SRR will be added at the very end, just before the response is sent. In this case, SRR headers may override headers from other sections.",
                      "type": "boolean"
                    },
                    "subscriptionTemplate": {
                      "title": "Subscription Template",
                      "markdownDescription": "Override the subscription template with the given name. If not provided, the default subscription template will be used. If the template name is not found, the default subscription template for this type will be used. **This modification have higher priority than settings from External Squads.**",
                      "type": "string",
                      "minLength": 1
                    },
                    "ignoreHostXrayJsonTemplate": {
                      "title": "Ignore Host Xray Json Template",
                      "markdownDescription": "Each Host may have its own Xray Json Template. If you set this flag to **true**, the Xray Json Template defined by the SRR will be used. **The Host's Xray Json Template will be ignored.**",
                      "type": "boolean"
                    },
                    "ignoreServeJsonAtBaseSubscription": {
                      "title": "Ignore Serve Json at Base Subscription",
                      "markdownDescription": "If you set this flag to **true**, the **Serve JSON at Base Subscription** setting will be ignored (set to **false**).",
                      "type": "boolean"
                    },
                    "additionalExtendedClientsRegex": {
                      "markdownDescription": "Additional regex patterns to match extended clients. Matched clients will receive `serverDescription` in the subscription response.\n\n**Default Mihomo extended clients:**\n- `^FlClash ?X/`\n- `^Flowvy/`\n- `^prizrak-box/`\n- `^koala-clash/`\n\n**Default Xray extended clients:**\n- `^Happ/`\n- `^INCY/`\n\n**Example:** `[\"^MyClient/\", \"^CustomApp\\\\/v2\"]`",
                      "type": "array",
                      "items": {
                        "type": "string",
                        "minLength": 1
                      }
                    },
                    "disableHwidCheck": {
                      "title": "Disable HWID Check",
                      "markdownDescription": "If you set this flag to **true**, the HWID check will be disabled. **This modification have higher priority than settings from Subscription Settings.**",
                      "type": "boolean"
                    },
                    "encryption": {
                      "title": "Encryption",
                      "markdownDescription": "Encrypt response body with given parameters. Generate keypairs with Rescue CLI: `docker exec -it remnawave cli`, select \"Generate keypairs\".",
                      "type": "object",
                      "properties": {
                        "method": {
                          "type": "string",
                          "enum": [
                            "age1",
                            "age1pq1"
                          ]
                        },
                        "key": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "method",
                        "key"
                      ]
                    },
                    "excludeHostsByTags": {
                      "title": "Exclude Hosts by Tags",
                      "markdownDescription": "Excludes hosts from the subscription output if at least one tag in the host matches the given tags.",
                      "minItems": 1,
                      "type": "array",
                      "items": {
                        "type": "string",
                        "maxLength": 36,
                        "pattern": "^[A-Z0-9_:]+$"
                      }
                    },
                    "respondWithRemarks": {
                      "title": "Respond With Remarks",
                      "markdownDescription": "Replaces the response body with the provided remarks. If this array contains more than one element, actual hosts will not be sent.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "required": [
                "name",
                "enabled",
                "operator",
                "conditions",
                "responseType"
              ],
              "title": "Response Rule",
              "markdownDescription": "Response rule configuration.\n\n**Fields:**\n- **name**: Name of the response rule.\n- **description**: Description of the response rule. Optional.\n- **enabled**: Control whether the response rule is enabled or disabled. \n\n - `true` the rule will be applied. \n\n - `false` the rule will be always ignored.\n- **operator**: Operator to use for combining conditions in the rule.\n- **conditions**: Array of conditions to check against the request headers. Conditions are applied with **operator**. If conditions are empty, the rule will be matched.\n- **responseType**: Type of the response. Determines the type of **response** to be returned when the rule is matched.\n- **responseModifications**: Response modifications to be applied when the rule is matched. Optional.\n\n**Example:**\n```json\n{\n  \"name\": \"Block Legacy Clients\",\n  \"description\": \"Block requests from legacy clients\",\n  \"enabled\": true,\n  \"operator\": \"OR\",\n  \"conditions\": [\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"Hiddify\",\n      \"caseSensitive\": true\n    },\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"FoxRay\",\n      \"caseSensitive\": true\n    }\n  ],\n  \"responseType\": \"BLOCK\"\n}\n```",
              "defaultSnippets": [
                {
                  "label": "Examples: Blank rule",
                  "markdownDescription": "Simple blank rule with no conditions or modifications.\n```json\n{\n  \"name\": \"Blank rule\",\n  \"description\": \"Blank rule\",\n  \"operator\": \"AND\",\n  \"enabled\": true,\n  \"conditions\": [],\n  \"responseType\": \"BLOCK\",\n  \"responseModifications\": {\n    \"headers\": []\n  }\n}\n```",
                  "body": {
                    "name": "Blank rule",
                    "description": "Blank rule",
                    "operator": "AND",
                    "enabled": true,
                    "conditions": [],
                    "responseType": "BLOCK",
                    "responseModifications": {
                      "headers": []
                    }
                  }
                },
                {
                  "label": "Examples: Block Legacy Clients",
                  "markdownDescription": "Block requests from legacy clients\n```json\n{\n  \"name\": \"Block Legacy Clients\",\n  \"description\": \"Block requests from legacy clients\",\n  \"enabled\": true,\n  \"operator\": \"OR\",\n  \"conditions\": [\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"Hiddify\",\n      \"caseSensitive\": true\n    },\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"FoxRay\",\n      \"caseSensitive\": true\n    }\n  ],\n  \"responseType\": \"BLOCK\"\n}\n```",
                  "body": {
                    "name": "Block Legacy Clients",
                    "description": "Block requests from legacy clients",
                    "enabled": true,
                    "operator": "OR",
                    "conditions": [
                      {
                        "headerName": "user-agent",
                        "operator": "CONTAINS",
                        "value": "Hiddify",
                        "caseSensitive": true
                      },
                      {
                        "headerName": "user-agent",
                        "operator": "CONTAINS",
                        "value": "FoxRay",
                        "caseSensitive": true
                      }
                    ],
                    "responseType": "BLOCK"
                  }
                }
              ]
            },
            "title": "Response Rules",
            "markdownDescription": "Array of **response rules**. Rules are evaluated in order and the first rule that matches is applied. If no rule matches, request will be blocked by default.\n\n**Example:**\n```json\n[\n  {\n    \"name\": \"Blank rule\",\n    \"description\": \"Blank rule\",\n    \"operator\": \"AND\",\n    \"enabled\": true,\n    \"conditions\": [],\n    \"responseType\": \"BLOCK\",\n    \"responseModifications\": {\n      \"headers\": []\n    }\n  }\n]\n```",
            "defaultSnippets": []
          }
        },
        "required": [
          "version",
          "rules"
        ]
      }
    },
    "required": [
      "responseRules"
    ]
  },
  "DeleteAllUserHwidDevicesBodyDto": {
    "type": "object",
    "properties": {
      "userId": {
        "type": "number"
      }
    },
    "required": [
      "userId"
    ]
  },
  "DeleteManyUsersFromInternalSquadBodyDto": {
    "type": "object",
    "properties": {
      "userIds": {
        "minItems": 1,
        "maxItems": 1000,
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "required": [
      "userIds"
    ]
  },
  "DeleteSharedListBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_-]+(\\/[A-Za-z0-9_-]+)*$"
      }
    },
    "required": [
      "name"
    ]
  },
  "DeleteSnippetBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_ -]+(\\/[A-Za-z0-9_ -]+)*$"
      }
    },
    "required": [
      "name"
    ]
  },
  "DeleteUserHwidDeviceBodyDto": {
    "type": "object",
    "properties": {
      "userId": {
        "type": "number"
      },
      "hwid": {
        "type": "string"
      }
    },
    "required": [
      "userId",
      "hwid"
    ]
  },
  "DropConnectionsBodyDto": {
    "type": "object",
    "properties": {
      "dropBy": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "by": {
                "type": "string",
                "enum": [
                  "userIds"
                ]
              },
              "userIds": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "type": "number"
                }
              }
            },
            "required": [
              "by",
              "userIds"
            ],
            "description": "Drop by user IDs"
          },
          {
            "type": "object",
            "properties": {
              "by": {
                "type": "string",
                "enum": [
                  "ipAddresses"
                ]
              },
              "ipAddresses": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "format": "ipv4",
                      "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$"
                    },
                    {
                      "type": "string",
                      "format": "ipv6",
                      "pattern": "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$"
                    }
                  ]
                }
              }
            },
            "required": [
              "by",
              "ipAddresses"
            ],
            "description": "Drop by IP addresses"
          }
        ]
      },
      "targetNodes": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "target": {
                "type": "string",
                "enum": [
                  "allNodes"
                ]
              }
            },
            "required": [
              "target"
            ],
            "description": "Target all connected nodes"
          },
          {
            "type": "object",
            "properties": {
              "target": {
                "type": "string",
                "enum": [
                  "specificNodes"
                ]
              },
              "nodeUuids": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                }
              }
            },
            "required": [
              "target",
              "nodeUuids"
            ],
            "description": "Target specific nodes"
          }
        ]
      }
    },
    "required": [
      "dropBy",
      "targetNodes"
    ]
  },
  "ExtendUserBodyDto": {
    "type": "object",
    "properties": {
      "days": {
        "type": "number",
        "minimum": 1,
        "description": "The number of days to extend the expiration date."
      }
    },
    "required": [
      "days"
    ]
  },
  "GeocheckByNodeBodyDto": {
    "type": "object",
    "properties": {
      "ip": {
        "description": "Check from this IP address",
        "type": "string"
      },
      "interface": {
        "description": "Check from this network interface",
        "type": "string"
      }
    }
  },
  "GetNodeUsageBodyDto": {
    "type": "object",
    "properties": {
      "nodesUuids": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        },
        "description": "Node UUIDs to include"
      }
    },
    "required": [
      "nodesUuids"
    ]
  },
  "GetStatsNodesUsersUsageBodyDto": {
    "type": "object",
    "properties": {
      "nodesUuids": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "nodesUuids"
    ]
  },
  "GetSubpageConfigByShortUuidBodyDto": {
    "type": "object",
    "properties": {
      "requestHeaders": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      }
    },
    "required": [
      "requestHeaders"
    ]
  },
  "PluginExecutorBodyDto": {
    "type": "object",
    "properties": {
      "command": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "command": {
                "type": "string",
                "enum": [
                  "blockIps"
                ]
              },
              "ips": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "ip": {
                      "anyOf": [
                        {
                          "type": "string",
                          "format": "ipv4",
                          "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$"
                        },
                        {
                          "type": "string",
                          "format": "ipv6",
                          "pattern": "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$"
                        }
                      ]
                    },
                    "timeout": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "ip",
                    "timeout"
                  ]
                }
              }
            },
            "required": [
              "command",
              "ips"
            ],
            "description": "Block IPs"
          },
          {
            "type": "object",
            "properties": {
              "command": {
                "type": "string",
                "enum": [
                  "unblockIps"
                ]
              },
              "ips": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "format": "ipv4",
                      "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$"
                    },
                    {
                      "type": "string",
                      "format": "ipv6",
                      "pattern": "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$"
                    }
                  ]
                }
              }
            },
            "required": [
              "command",
              "ips"
            ],
            "description": "Unblock IPs"
          },
          {
            "type": "object",
            "properties": {
              "command": {
                "type": "string",
                "enum": [
                  "recreateTables"
                ]
              }
            },
            "required": [
              "command"
            ],
            "description": "Recreate tables"
          }
        ]
      },
      "targetNodes": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "target": {
                "type": "string",
                "enum": [
                  "allNodes"
                ]
              }
            },
            "required": [
              "target"
            ],
            "description": "Target all connected nodes"
          },
          {
            "type": "object",
            "properties": {
              "target": {
                "type": "string",
                "enum": [
                  "specificNodes"
                ]
              },
              "nodeUuids": {
                "minItems": 1,
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                }
              }
            },
            "required": [
              "target",
              "nodeUuids"
            ],
            "description": "Target specific nodes"
          }
        ]
      }
    },
    "required": [
      "command",
      "targetNodes"
    ]
  },
  "ProfileModificationBodyDto": {
    "type": "object",
    "properties": {
      "uuids": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "configProfile": {
        "type": "object",
        "properties": {
          "activeConfigProfileUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          },
          "activeInbounds": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          }
        },
        "required": [
          "activeConfigProfileUuid",
          "activeInbounds"
        ]
      }
    },
    "required": [
      "uuids",
      "configProfile"
    ]
  },
  "ReorderConfigProfilesBodyDto": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "items"
    ]
  },
  "ReorderExternalSquadsBodyDto": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "items"
    ]
  },
  "ReorderHostsBodyDto": {
    "type": "object",
    "properties": {
      "hosts": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "hosts"
    ]
  },
  "ReorderInternalSquadsBodyDto": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "items"
    ]
  },
  "ReorderNodePluginsBodyDto": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "items"
    ]
  },
  "ReorderNodesBodyDto": {
    "type": "object",
    "properties": {
      "nodes": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "nodes"
    ]
  },
  "ReorderSubpageConfigsBodyDto": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "items"
    ]
  },
  "ReorderSubscriptionTemplatesBodyDto": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "viewPosition": {
              "type": "integer",
              "minimum": -9007199254740991,
              "maximum": 9007199254740991
            },
            "uuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          },
          "required": [
            "viewPosition",
            "uuid"
          ]
        }
      }
    },
    "required": [
      "items"
    ]
  },
  "ResolveUserBodyDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "number"
      },
      "shortUuid": {
        "type": "string"
      },
      "username": {
        "type": "string"
      }
    }
  },
  "RestartAllNodesBodyDto": {
    "type": "object",
    "properties": {
      "forceRestart": {
        "type": "boolean"
      }
    },
    "required": [
      "forceRestart"
    ]
  },
  "RestartNodeBodyDto": {
    "type": "object",
    "properties": {
      "forceRestart": {
        "type": "boolean"
      }
    },
    "required": [
      "forceRestart"
    ]
  },
  "RevokeUserSubscriptionBodyDto": {
    "type": "object",
    "properties": {
      "revokeOnlyPasswords": {
        "default": false,
        "description": "Optional. If true, only passwords will be revoked, without changing the short UUID (Subscription URL).",
        "type": "boolean"
      },
      "shortUuid": {
        "type": "string",
        "minLength": 16,
        "maxLength": 64,
        "description": "Optional. If not provided, a new short UUID will be generated by Remnawave. Please note that it is strongly recommended to allow Remnawave to generate the short UUID."
      }
    }
  },
  "SetConfigProfilesTagsBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      }
    },
    "required": [
      "uuid",
      "tags"
    ]
  },
  "SetExternalSquadsTagsBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      }
    },
    "required": [
      "uuid",
      "tags"
    ]
  },
  "SetInternalSquadsTagsBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      }
    },
    "required": [
      "uuid",
      "tags"
    ]
  },
  "SetNodePluginsTagsBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      }
    },
    "required": [
      "uuid",
      "tags"
    ]
  },
  "SetSubpageConfigsTagsBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      }
    },
    "required": [
      "uuid",
      "tags"
    ]
  },
  "SetSubscriptionTemplatesTagsBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      }
    },
    "required": [
      "uuid",
      "tags"
    ]
  },
  "SyncNodePluginBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      }
    },
    "required": [
      "uuid"
    ]
  },
  "SyncSharedListBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_-]+(\\/[A-Za-z0-9_-]+)*$"
      }
    },
    "required": [
      "name"
    ]
  },
  "SyncSnippetBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_ -]+(\\/[A-Za-z0-9_ -]+)*$"
      }
    },
    "required": [
      "name"
    ]
  },
  "UpdateConfigProfileBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "config": {
        "type": "object",
        "properties": {},
        "additionalProperties": {}
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateExternalSquadBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "description": "UUID of the external squad"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "templates": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "templateUuid": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
              "description": "UUID of the subscription template"
            },
            "templateType": {
              "type": "string",
              "enum": [
                "XRAY_JSON",
                "XRAY_BASE64",
                "MIHOMO",
                "STASH",
                "CLASH",
                "SINGBOX"
              ],
              "description": "Type of the subscription template"
            }
          },
          "required": [
            "templateUuid",
            "templateType"
          ]
        }
      },
      "subscriptionSettings": {
        "type": "object",
        "properties": {
          "serveJsonAtBaseSubscription": {
            "type": "boolean"
          },
          "isShowCustomRemarks": {
            "type": "boolean"
          },
          "randomizeHosts": {
            "type": "boolean"
          }
        }
      },
      "hostOverrides": {
        "type": "object",
        "properties": {
          "serverDescription": {
            "type": "string",
            "maxLength": 30,
            "nullable": true
          },
          "vlessRouteId": {
            "type": "integer",
            "minimum": 0,
            "maximum": 65535,
            "nullable": true
          }
        }
      },
      "responseHeadersAdd": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      },
      "responseHeadersRemove": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "hwidSettings": {
        "type": "object",
        "properties": {
          "enabled": {
            "type": "boolean"
          },
          "fallbackDeviceLimit": {
            "type": "number"
          },
          "maxDevicesAnnounce": {
            "type": "string",
            "maxLength": 200,
            "nullable": true
          }
        },
        "required": [
          "enabled",
          "fallbackDeviceLimit",
          "maxDevicesAnnounce"
        ],
        "nullable": true
      },
      "customRemarks": {
        "type": "object",
        "properties": {
          "expiredUsers": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "limitedUsers": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "disabledUsers": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "emptyHosts": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "HWIDMaxDevicesExceeded": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "HWIDNotSupported": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "expiredUsers",
          "limitedUsers",
          "disabledUsers",
          "emptyHosts",
          "HWIDMaxDevicesExceeded",
          "HWIDNotSupported"
        ],
        "nullable": true
      },
      "subpageConfigUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateHostBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "inbound": {
        "type": "object",
        "properties": {
          "configProfileUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          },
          "configProfileInboundUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          }
        },
        "required": [
          "configProfileUuid",
          "configProfileInboundUuid"
        ]
      },
      "remark": {
        "type": "string",
        "minLength": 1,
        "maxLength": 100
      },
      "address": {
        "type": "string"
      },
      "port": {
        "type": "integer",
        "minimum": -9007199254740991,
        "maximum": 9007199254740991
      },
      "path": {
        "type": "string",
        "nullable": true
      },
      "sni": {
        "type": "string",
        "nullable": true
      },
      "host": {
        "type": "string",
        "nullable": true
      },
      "alpn": {
        "type": "string",
        "enum": [
          "h3",
          "h2",
          "http/1.1",
          "h2,http/1.1",
          "h3,h2,http/1.1",
          "h3,h2",
          null
        ],
        "nullable": true
      },
      "fingerprint": {
        "type": "string",
        "nullable": true
      },
      "isDisabled": {
        "type": "boolean"
      },
      "securityLayer": {
        "type": "string",
        "enum": [
          "DEFAULT",
          "TLS",
          "NONE"
        ]
      },
      "xhttpExtraParams": {
        "nullable": true
      },
      "muxParams": {
        "nullable": true
      },
      "sockoptParams": {
        "nullable": true
      },
      "finalMask": {
        "nullable": true
      },
      "serverDescription": {
        "type": "string",
        "maxLength": 30,
        "nullable": true
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      },
      "isHidden": {
        "type": "boolean"
      },
      "overrideSniFromAddress": {
        "type": "boolean"
      },
      "keepSniBlank": {
        "type": "boolean"
      },
      "vlessRouteId": {
        "type": "integer",
        "minimum": 0,
        "maximum": 65535,
        "nullable": true
      },
      "pinnedPeerCertSha256": {
        "type": "string",
        "nullable": true
      },
      "verifyPeerCertByName": {
        "type": "string",
        "nullable": true
      },
      "shuffleHost": {
        "type": "boolean"
      },
      "mihomoX25519": {
        "type": "boolean"
      },
      "mihomoIpVersion": {
        "type": "string",
        "enum": [
          "dual",
          "ipv4",
          "ipv6",
          "ipv4-prefer",
          "ipv6-prefer",
          null
        ],
        "nullable": true
      },
      "nodes": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "xrayJsonTemplateUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "excludeFromSubscriptionTypes": {
        "description": "Optional. Subscription types from which the host will be excluded from.",
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "XRAY_JSON",
            "XRAY_BASE64",
            "MIHOMO",
            "STASH",
            "CLASH",
            "SINGBOX"
          ]
        }
      },
      "mapper": {
        "type": "object",
        "properties": {
          "xrayJson": {
            "title": "Xray JSON",
            "markdownDescription": "Operations applied to the **outbound** generated for this host in the Xray JSON subscription. Paths are counted from the root of the outbound.\n\n```json\n[\n  {\n    \"op\": \"copy\",\n    \"from\": \"streamSettings.tlsSettings.cipherSuites\",\n    \"to\": \"streamSettings.tlsSettings.cipherSuites\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"mux\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.tlsSettings.cipherSuites\",\n  \"to\": \"streamSettings.tlsSettings.cipherSuites\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema0"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema1"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"streamSettings.tlsSettings.enableSessionResumption\",\n  \"value\": true\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"mux\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "mihomo": {
            "title": "Mihomo",
            "markdownDescription": "Operations applied to the **proxy node** generated for this host in the Mihomo subscription.\n\nPaths are counted from the root of the node, where Mihomo keys are written in kebab-case.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"ip-version\",\n    \"value\": \"ipv4\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"servername\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema2"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema3"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"reality-opts.support-x25519mlkem768\",\n  \"value\": true\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"smux\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "base64": {
            "title": "Base64",
            "markdownDescription": "Operations applied to the share link generated for this host in the Base64 subscription.\n\n`to` is a plain query parameter name, not a path – dots carry no meaning here.\n\nWith a `$link.` prefix the operation rewrites the link itself instead of its query string. Writable parts: `$link.address`, `$link.port`, `$link.password`, `$link.remark`, and `$link.method` for Shadowsocks. `$link.password` is the credential of the protocol.\n\n> A value that cannot make a valid link – an empty address, a port outside 1-65535 – is ignored, and the generated one is kept.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"fp\",\n    \"value\": \"chrome\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"fm\"\n  },\n  {\n    \"op\": \"set\",\n    \"to\": \"$link.port\",\n    \"value\": 2053\n  },\n  {\n    \"op\": \"copy\",\n    \"from\": \"$host.securityOptions.serverName\",\n    \"to\": \"$link.address\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"sni\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema4"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema5"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"fp\",\n  \"value\": \"chrome\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"fm\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "singbox": {
            "title": "sing-box",
            "markdownDescription": "Operations applied to the **outbound** generated for this host in the sing-box subscription. Paths are counted from the root of the outbound.\n\nsing-box keys are written in snake_case, and the outbound of a Hysteria2 host has a shape of its own.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"tls.utls.fingerprint\",\n    \"value\": \"chrome\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"multiplex\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"tls.server_name\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema6"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateHostBodyDto__schema7"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"tls.utls.fingerprint\",\n  \"value\": \"chrome\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"multiplex\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          }
        },
        "title": "Host Mapper",
        "markdownDescription": "Rewrites the config generated for this host, per client type.\n\nOperations run **after** the generator has finished, so they can change or remove anything it produced.\n\nThe source for `copy` is the raw inbound of the config profile this host belongs to, or the host itself when the path starts with `$host.`.\n\n> `to` is never checked against the target client. A misspelled key is written exactly like a real one."
      },
      "internalSquads": {
        "type": "object",
        "properties": {
          "mode": {
            "type": "string",
            "enum": [
              "EXCLUDE",
              "ALLOW_ONLY"
            ]
          },
          "squads": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          }
        },
        "required": [
          "mode",
          "squads"
        ]
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateHostBodyDto__schema0": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema0"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema0"
        }
      }
    ],
    "nullable": true
  },
  "UpdateHostBodyDto__schema1": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema1"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema1"
        }
      }
    ],
    "nullable": true
  },
  "UpdateHostBodyDto__schema2": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema2"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema2"
        }
      }
    ],
    "nullable": true
  },
  "UpdateHostBodyDto__schema3": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema3"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema3"
        }
      }
    ],
    "nullable": true
  },
  "UpdateHostBodyDto__schema4": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema4"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema4"
        }
      }
    ],
    "nullable": true
  },
  "UpdateHostBodyDto__schema5": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema5"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema5"
        }
      }
    ],
    "nullable": true
  },
  "UpdateHostBodyDto__schema6": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema6"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema6"
        }
      }
    ],
    "nullable": true
  },
  "UpdateHostBodyDto__schema7": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema7"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateHostBodyDto__schema7"
        }
      }
    ],
    "nullable": true
  },
  "UpdateInfraBillingNodeBodyDto": {
    "type": "object",
    "properties": {
      "uuids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "nextBillingAt": {
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      }
    },
    "required": [
      "uuids",
      "nextBillingAt"
    ]
  },
  "UpdateInfraProviderBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30
      },
      "faviconLink": {
        "type": "string",
        "format": "uri",
        "nullable": true
      },
      "loginUrl": {
        "type": "string",
        "format": "uri",
        "nullable": true
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateInternalSquadBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "inbounds": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateManyHostsBodyDto": {
    "type": "object",
    "properties": {
      "inbound": {
        "type": "object",
        "properties": {
          "configProfileUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          },
          "configProfileInboundUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          }
        },
        "required": [
          "configProfileUuid",
          "configProfileInboundUuid"
        ]
      },
      "remark": {
        "type": "string",
        "minLength": 1,
        "maxLength": 100
      },
      "address": {
        "type": "string"
      },
      "port": {
        "type": "integer",
        "minimum": -9007199254740991,
        "maximum": 9007199254740991
      },
      "path": {
        "type": "string",
        "nullable": true
      },
      "sni": {
        "type": "string",
        "nullable": true
      },
      "host": {
        "type": "string",
        "nullable": true
      },
      "alpn": {
        "type": "string",
        "enum": [
          "h3",
          "h2",
          "http/1.1",
          "h2,http/1.1",
          "h3,h2,http/1.1",
          "h3,h2",
          null
        ],
        "nullable": true
      },
      "fingerprint": {
        "type": "string",
        "nullable": true
      },
      "isDisabled": {
        "type": "boolean"
      },
      "securityLayer": {
        "type": "string",
        "enum": [
          "DEFAULT",
          "TLS",
          "NONE"
        ]
      },
      "xhttpExtraParams": {
        "nullable": true
      },
      "muxParams": {
        "nullable": true
      },
      "sockoptParams": {
        "nullable": true
      },
      "finalMask": {
        "nullable": true
      },
      "serverDescription": {
        "type": "string",
        "maxLength": 30,
        "nullable": true
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      },
      "isHidden": {
        "type": "boolean"
      },
      "overrideSniFromAddress": {
        "type": "boolean"
      },
      "keepSniBlank": {
        "type": "boolean"
      },
      "vlessRouteId": {
        "type": "integer",
        "minimum": 0,
        "maximum": 65535,
        "nullable": true
      },
      "pinnedPeerCertSha256": {
        "type": "string",
        "nullable": true
      },
      "verifyPeerCertByName": {
        "type": "string",
        "nullable": true
      },
      "shuffleHost": {
        "type": "boolean"
      },
      "mihomoX25519": {
        "type": "boolean"
      },
      "mihomoIpVersion": {
        "type": "string",
        "enum": [
          "dual",
          "ipv4",
          "ipv6",
          "ipv4-prefer",
          "ipv6-prefer",
          null
        ],
        "nullable": true
      },
      "nodes": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "xrayJsonTemplateUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "excludeFromSubscriptionTypes": {
        "description": "Optional. Subscription types from which the host will be excluded from.",
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "XRAY_JSON",
            "XRAY_BASE64",
            "MIHOMO",
            "STASH",
            "CLASH",
            "SINGBOX"
          ]
        }
      },
      "mapper": {
        "type": "object",
        "properties": {
          "xrayJson": {
            "title": "Xray JSON",
            "markdownDescription": "Operations applied to the **outbound** generated for this host in the Xray JSON subscription. Paths are counted from the root of the outbound.\n\n```json\n[\n  {\n    \"op\": \"copy\",\n    \"from\": \"streamSettings.tlsSettings.cipherSuites\",\n    \"to\": \"streamSettings.tlsSettings.cipherSuites\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"mux\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.tlsSettings.cipherSuites\",\n  \"to\": \"streamSettings.tlsSettings.cipherSuites\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema0"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema1"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"streamSettings.tlsSettings.enableSessionResumption\",\n  \"value\": true\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "streamSettings.tlsSettings.enableSessionResumption",
                        "streamSettings.tlsSettings.cipherSuites"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"mux\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "mihomo": {
            "title": "Mihomo",
            "markdownDescription": "Operations applied to the **proxy node** generated for this host in the Mihomo subscription.\n\nPaths are counted from the root of the node, where Mihomo keys are written in kebab-case.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"ip-version\",\n    \"value\": \"ipv4\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"servername\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema2"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema3"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"reality-opts.support-x25519mlkem768\",\n  \"value\": true\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **proxy node**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "ip-version",
                        "client-fingerprint",
                        "tfo",
                        "reality-opts.support-x25519mlkem768"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"smux\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "base64": {
            "title": "Base64",
            "markdownDescription": "Operations applied to the share link generated for this host in the Base64 subscription.\n\n`to` is a plain query parameter name, not a path – dots carry no meaning here.\n\nWith a `$link.` prefix the operation rewrites the link itself instead of its query string. Writable parts: `$link.address`, `$link.port`, `$link.password`, `$link.remark`, and `$link.method` for Shadowsocks. `$link.password` is the credential of the protocol.\n\n> A value that cannot make a valid link – an empty address, a port outside 1-65535 – is ignored, and the generated one is kept.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"fp\",\n    \"value\": \"chrome\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"fm\"\n  },\n  {\n    \"op\": \"set\",\n    \"to\": \"$link.port\",\n    \"value\": 2053\n  },\n  {\n    \"op\": \"copy\",\n    \"from\": \"$host.securityOptions.serverName\",\n    \"to\": \"$link.address\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"sni\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema4"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema5"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"fp\",\n  \"value\": \"chrome\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the query string of the generated **share link**, or the link itself with a `$link.` prefix, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "$link.address",
                        "$link.port",
                        "$link.password",
                        "$link.remark",
                        "$link.method",
                        "alpn",
                        "authority",
                        "cs",
                        "encryption",
                        "extra",
                        "flow",
                        "fm",
                        "fp",
                        "headerType",
                        "heartbeatPeriod",
                        "host",
                        "mode",
                        "mtu",
                        "obfs",
                        "obfs-password",
                        "path",
                        "pbk",
                        "pcs",
                        "pinSHA256",
                        "pqv",
                        "security",
                        "serviceName",
                        "sid",
                        "sni",
                        "spx",
                        "tti",
                        "type",
                        "vcn"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"fm\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          },
          "singbox": {
            "title": "sing-box",
            "markdownDescription": "Operations applied to the **outbound** generated for this host in the sing-box subscription. Paths are counted from the root of the outbound.\n\nsing-box keys are written in snake_case, and the outbound of a Hysteria2 host has a shape of its own.\n\n```json\n[\n  {\n    \"op\": \"set\",\n    \"to\": \"tls.utls.fingerprint\",\n    \"value\": \"chrome\"\n  },\n  {\n    \"op\": \"unset\",\n    \"to\": \"multiplex\"\n  }\n]\n```",
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Copy",
                      "markdownDescription": "Take a value from the raw inbound.",
                      "enum": [
                        "copy"
                      ]
                    },
                    "from": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Source path",
                      "markdownDescription": "Dot-separated path inside the **raw inbound** of the config profile this host belongs to. Array items are addressed by index.\n\nWith a `$host.` prefix the value is read from the **host** itself, after overrides have been resolved – `$host.securityOptions.serverName` holds the SNI that actually went into the config.\n\nOnly a part of the host is readable. Each entry below also opens everything nested under it:\n\n`address`, `port`, `finalRemark`, `protocol`, `transport`, `security`, `protocolOptions`, `transportOptions`, `securityOptions`, `mux`, `streamOverrides.finalMask`, `streamOverrides.sockopt`, `clientOverrides.serverDescription`, `metadata.remark`, `metadata.tags`, `metadata.inboundTag`\n\n> If the path resolves to nothing – or points outside the list above – the operation is skipped and the target key is **not** created.",
                      "examples": [
                        "streamSettings.tlsSettings.cipherSuites",
                        "streamSettings.tlsSettings.alpn",
                        "streamSettings.realitySettings.serverNames.0",
                        "$host.address",
                        "$host.securityOptions.serverName",
                        "$host.transportOptions.path",
                        "$host.mux.smux"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "from",
                    "to"
                  ],
                  "title": "Copy from the inbound",
                  "markdownDescription": "Reads a value from the raw inbound and writes it into the generated config.\n\n```json\n{\n  \"op\": \"copy\",\n  \"from\": \"streamSettings.realitySettings.serverNames.0\",\n  \"to\": \"tls.server_name\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "copy",
                      "description": "Copy a value from the raw inbound",
                      "body": {
                        "op": "copy",
                        "from": "$1",
                        "to": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Set",
                      "markdownDescription": "Write a fixed value.",
                      "enum": [
                        "set"
                      ]
                    },
                    "value": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        },
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema6"
                          }
                        },
                        {
                          "type": "object",
                          "additionalProperties": {
                            "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema7"
                          }
                        }
                      ],
                      "title": "Value",
                      "markdownDescription": "The value to write. Strings, numbers, booleans, arrays and objects are allowed."
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "value",
                    "to"
                  ],
                  "title": "Set a fixed value",
                  "markdownDescription": "Writes a literal value into the generated config, creating the key if it is missing.\n\n```json\n{\n  \"op\": \"set\",\n  \"to\": \"tls.utls.fingerprint\",\n  \"value\": \"chrome\"\n}\n```",
                  "defaultSnippets": [
                    {
                      "label": "set",
                      "description": "Write a fixed value",
                      "body": {
                        "op": "set",
                        "to": "$1",
                        "value": "$2"
                      }
                    }
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "op": {
                      "type": "string",
                      "title": "Unset",
                      "markdownDescription": "Remove a field.",
                      "enum": [
                        "unset"
                      ]
                    },
                    "to": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 512,
                      "title": "Target path",
                      "markdownDescription": "Dot-separated path inside the generated **outbound**, counted from its root.\n\nMissing objects along the path are created. Array items are addressed by index, and keys with dashes are written as is (`ip-version`).\n\n> A path running through a value that is not an object – for example `path.foo`, where `path` holds a string – is refused, so an existing value is never destroyed.",
                      "examples": [
                        "domain_resolver",
                        "multiplex.protocol",
                        "packet_encoding",
                        "tcp_fast_open",
                        "tls.insecure",
                        "tls.utls.fingerprint"
                      ]
                    }
                  },
                  "required": [
                    "op",
                    "to"
                  ],
                  "title": "Remove a field",
                  "markdownDescription": "Removes a field the generator produced by itself.\n\n```json\n{\n  \"op\": \"unset\",\n  \"to\": \"multiplex\"\n}\n```\n\n> Only the field itself is removed. A parent object left empty stays in the config as `{}`.",
                  "defaultSnippets": [
                    {
                      "label": "unset",
                      "description": "Remove a field",
                      "body": {
                        "op": "unset",
                        "to": "$1"
                      }
                    }
                  ]
                }
              ],
              "title": "Operation",
              "markdownDescription": "Operations run one after another, in the order they are listed.\n\nA later operation sees what the previous ones wrote, so an `unset` can remove a key an earlier `set` added."
            }
          }
        },
        "title": "Host Mapper",
        "markdownDescription": "Rewrites the config generated for this host, per client type.\n\nOperations run **after** the generator has finished, so they can change or remove anything it produced.\n\nThe source for `copy` is the raw inbound of the config profile this host belongs to, or the host itself when the path starts with `$host.`.\n\n> `to` is never checked against the target client. A misspelled key is written exactly like a real one."
      },
      "internalSquads": {
        "type": "object",
        "properties": {
          "mode": {
            "type": "string",
            "enum": [
              "EXCLUDE",
              "ALLOW_ONLY"
            ]
          },
          "squads": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          }
        },
        "required": [
          "mode",
          "squads"
        ]
      },
      "uuids": {
        "minItems": 1,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      }
    },
    "required": [
      "uuids"
    ]
  },
  "UpdateManyHostsBodyDto__schema0": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema0"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema0"
        }
      }
    ],
    "nullable": true
  },
  "UpdateManyHostsBodyDto__schema1": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema1"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema1"
        }
      }
    ],
    "nullable": true
  },
  "UpdateManyHostsBodyDto__schema2": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema2"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema2"
        }
      }
    ],
    "nullable": true
  },
  "UpdateManyHostsBodyDto__schema3": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema3"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema3"
        }
      }
    ],
    "nullable": true
  },
  "UpdateManyHostsBodyDto__schema4": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema4"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema4"
        }
      }
    ],
    "nullable": true
  },
  "UpdateManyHostsBodyDto__schema5": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema5"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema5"
        }
      }
    ],
    "nullable": true
  },
  "UpdateManyHostsBodyDto__schema6": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema6"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema6"
        }
      }
    ],
    "nullable": true
  },
  "UpdateManyHostsBodyDto__schema7": {
    "anyOf": [
      {
        "type": "string"
      },
      {
        "type": "number"
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema7"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/UpdateManyHostsBodyDto__schema7"
        }
      }
    ],
    "nullable": true
  },
  "UpdateNodeBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 3,
        "maxLength": 30
      },
      "address": {
        "type": "string",
        "minLength": 2
      },
      "port": {
        "type": "number",
        "minimum": 1,
        "maximum": 65535
      },
      "proxyUrl": {
        "type": "string",
        "pattern": "^socks5:\\/\\/(?:[^:@/\\s]+(?::[^@/\\s]*)?@)?[^:@/\\s]+:\\d{1,5}$",
        "nullable": true
      },
      "isTrafficTrackingActive": {
        "type": "boolean"
      },
      "trafficLimitBytes": {
        "type": "number",
        "minimum": 0
      },
      "notifyPercent": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      },
      "trafficResetDay": {
        "type": "number",
        "minimum": 1,
        "maximum": 31
      },
      "countryCode": {
        "type": "string",
        "maxLength": 2
      },
      "consumptionMultiplier": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      },
      "nodeConsumptionMultiplier": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      },
      "configProfile": {
        "type": "object",
        "properties": {
          "activeConfigProfileUuid": {
            "type": "string",
            "format": "uuid",
            "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
          },
          "activeInbounds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            }
          }
        },
        "required": [
          "activeConfigProfileUuid",
          "activeInbounds"
        ]
      },
      "providerUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "tags": {
        "maxItems": 10,
        "type": "array",
        "items": {
          "type": "string",
          "maxLength": 36,
          "pattern": "^[A-Z0-9_:]+$"
        }
      },
      "activePluginUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "nullable": true
      },
      "integrationUuids": {
        "maxItems": 20,
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "note": {
        "type": "string",
        "maxLength": 255,
        "nullable": true
      },
      "ips": {
        "maxItems": 64,
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "ip": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "ipv4",
                  "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$"
                },
                {
                  "type": "string",
                  "format": "ipv6",
                  "pattern": "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$"
                }
              ]
            },
            "status": {
              "type": "string",
              "enum": [
                "INBOUND",
                "OUTBOUND",
                "MANAGEMENT",
                "TRANSIT",
                "MONITORING",
                "RESERVE",
                "BLOCKED",
                "FLAGGED",
                "DEPRECATED",
                "UNKNOWN"
              ]
            }
          },
          "required": [
            "ip",
            "status"
          ]
        }
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateNodeIntegrationBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30
      },
      "description": {
        "type": "string",
        "maxLength": 255,
        "nullable": true
      },
      "config": {
        "type": "object",
        "additionalProperties": {}
      },
      "restartNodes": {
        "type": "boolean"
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateNodePluginBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "pluginConfig": {}
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateRemnawaveSettingsBodyDto": {
    "type": "object",
    "properties": {
      "passkeySettings": {
        "type": "object",
        "properties": {
          "enabled": {
            "type": "boolean"
          },
          "rpId": {
            "type": "string",
            "nullable": true
          },
          "origin": {
            "type": "string",
            "nullable": true
          }
        },
        "required": [
          "enabled",
          "rpId",
          "origin"
        ]
      },
      "oauth2Settings": {
        "type": "object",
        "properties": {
          "github": {
            "type": "object",
            "properties": {
              "enabled": {
                "type": "boolean"
              },
              "clientId": {
                "type": "string",
                "nullable": true
              },
              "clientSecret": {
                "type": "string",
                "nullable": true
              },
              "allowedEmails": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "enabled",
              "clientId",
              "clientSecret",
              "allowedEmails"
            ]
          },
          "pocketid": {
            "type": "object",
            "properties": {
              "enabled": {
                "type": "boolean"
              },
              "clientId": {
                "type": "string",
                "nullable": true
              },
              "clientSecret": {
                "type": "string",
                "nullable": true
              },
              "frontendDomain": {
                "type": "string",
                "nullable": true
              },
              "plainDomain": {
                "type": "string",
                "nullable": true
              },
              "allowedEmails": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "enabled",
              "clientId",
              "clientSecret",
              "frontendDomain",
              "plainDomain",
              "allowedEmails"
            ]
          },
          "yandex": {
            "type": "object",
            "properties": {
              "enabled": {
                "type": "boolean"
              },
              "clientId": {
                "type": "string",
                "nullable": true
              },
              "clientSecret": {
                "type": "string",
                "nullable": true
              },
              "allowedEmails": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "enabled",
              "clientId",
              "clientSecret",
              "allowedEmails"
            ]
          },
          "keycloak": {
            "default": {
              "enabled": false,
              "realm": null,
              "frontendDomain": null,
              "keycloakDomain": null,
              "clientId": null,
              "clientSecret": null,
              "allowedEmails": []
            },
            "type": "object",
            "properties": {
              "enabled": {
                "type": "boolean"
              },
              "realm": {
                "type": "string",
                "nullable": true
              },
              "clientId": {
                "type": "string",
                "nullable": true
              },
              "clientSecret": {
                "type": "string",
                "nullable": true
              },
              "frontendDomain": {
                "type": "string",
                "nullable": true
              },
              "keycloakDomain": {
                "type": "string",
                "nullable": true
              },
              "allowedEmails": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "enabled",
              "realm",
              "clientId",
              "clientSecret",
              "frontendDomain",
              "keycloakDomain",
              "allowedEmails"
            ]
          },
          "generic": {
            "default": {
              "enabled": false,
              "frontendDomain": null,
              "tokenUrl": null,
              "clientId": null,
              "clientSecret": null,
              "withPkce": false,
              "authorizationUrl": null,
              "allowedEmails": []
            },
            "type": "object",
            "properties": {
              "enabled": {
                "type": "boolean"
              },
              "clientId": {
                "type": "string",
                "nullable": true
              },
              "clientSecret": {
                "type": "string",
                "nullable": true
              },
              "withPkce": {
                "type": "boolean"
              },
              "authorizationUrl": {
                "type": "string",
                "nullable": true
              },
              "tokenUrl": {
                "type": "string",
                "nullable": true
              },
              "frontendDomain": {
                "type": "string",
                "nullable": true
              },
              "allowedEmails": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "enabled",
              "clientId",
              "clientSecret",
              "withPkce",
              "authorizationUrl",
              "tokenUrl",
              "frontendDomain",
              "allowedEmails"
            ]
          },
          "telegram": {
            "default": {
              "enabled": false,
              "clientId": null,
              "clientSecret": null,
              "allowedIds": [],
              "frontendDomain": null
            },
            "type": "object",
            "properties": {
              "enabled": {
                "type": "boolean"
              },
              "clientId": {
                "type": "string",
                "nullable": true
              },
              "clientSecret": {
                "type": "string",
                "nullable": true
              },
              "allowedIds": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "frontendDomain": {
                "type": "string",
                "nullable": true
              }
            },
            "required": [
              "enabled",
              "clientId",
              "clientSecret",
              "allowedIds",
              "frontendDomain"
            ]
          }
        },
        "required": [
          "github",
          "pocketid",
          "yandex"
        ]
      },
      "passwordSettings": {
        "type": "object",
        "properties": {
          "enabled": {
            "type": "boolean"
          }
        },
        "required": [
          "enabled"
        ]
      },
      "brandingSettings": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "nullable": true
          },
          "logoUrl": {
            "type": "string",
            "format": "uri",
            "nullable": true
          }
        },
        "required": [
          "title",
          "logoUrl"
        ]
      }
    }
  },
  "UpdateSharedListBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_-]+(\\/[A-Za-z0-9_-]+)*$"
      },
      "config": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "required": [
      "name",
      "config"
    ]
  },
  "UpdateSnippetBodyDto": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_ -]+(\\/[A-Za-z0-9_ -]+)*$"
      },
      "snippet": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {},
          "additionalProperties": {}
        }
      }
    },
    "required": [
      "name",
      "snippet"
    ]
  },
  "UpdateSubpageConfigBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 30,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "config": {}
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateSubscriptionSettingsBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "serveJsonAtBaseSubscription": {
        "type": "boolean"
      },
      "isShowCustomRemarks": {
        "type": "boolean"
      },
      "customRemarks": {
        "type": "object",
        "properties": {
          "expiredUsers": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "limitedUsers": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "disabledUsers": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "emptyHosts": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "HWIDMaxDevicesExceeded": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "HWIDNotSupported": {
            "minItems": 1,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "expiredUsers",
          "limitedUsers",
          "disabledUsers",
          "emptyHosts",
          "HWIDMaxDevicesExceeded",
          "HWIDNotSupported"
        ]
      },
      "customResponseHeaders": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      },
      "randomizeHosts": {
        "type": "boolean"
      },
      "responseRules": {
        "type": "object",
        "properties": {
          "version": {
            "type": "string",
            "enum": [
              "1"
            ],
            "title": "Response Rules Config Version",
            "markdownDescription": "Version of the **response rules** config. Currently supported version is **1**."
          },
          "settings": {
            "title": "Response Rule Settings",
            "markdownDescription": "Settings for the **response rules** config. Optional.",
            "type": "object",
            "properties": {
              "disableSubscriptionAccessByPath": {
                "title": "Disable Subscription Access by Path",
                "markdownDescription": "Usually, a user's subscription may also be available via additional paths such as **/json**, **/stash**, or **/mihomo**. If this flag is set to **true**, access via these additional paths will be disabled.",
                "type": "boolean"
              }
            }
          },
          "rules": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 50,
                  "title": "Name",
                  "markdownDescription": "Name of the response rule."
                },
                "description": {
                  "title": "Description",
                  "markdownDescription": "Description of the response rule. Optional.",
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 250
                },
                "enabled": {
                  "type": "boolean",
                  "title": "Enabled",
                  "markdownDescription": "Control whether the response rule is enabled or disabled. \n\n - `true` the rule will be applied. \n\n - `false` the rule will be always ignored."
                },
                "operator": {
                  "type": "string",
                  "enum": [
                    "AND",
                    "OR"
                  ],
                  "markdownDescription": "Operator to use for combining conditions in the rule."
                },
                "conditions": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "headerName": {
                        "type": "string",
                        "pattern": "^[!#$%&'*+\\-.0-9A-Z^_`a-z|~]+$",
                        "title": "Header Name",
                        "markdownDescription": "**Name** of the HTTP header to check. Must comply with RFC 7230."
                      },
                      "operator": {
                        "type": "string",
                        "enum": [
                          "EQUALS",
                          "NOT_EQUALS",
                          "CONTAINS",
                          "NOT_CONTAINS",
                          "STARTS_WITH",
                          "NOT_STARTS_WITH",
                          "ENDS_WITH",
                          "NOT_ENDS_WITH",
                          "REGEX",
                          "NOT_REGEX"
                        ],
                        "errorMessage": "Invalid operator. Please select a valid operator.",
                        "markdownDescription": "Operator to use for comparing the `headerName` with `value`.",
                        "markdownEnumDescriptions": [
                          "Performs an exact, comparison between the header value and specified string. `string === value`",
                          "Ensures the header value does not exactly match the specified string. `string !== value`",
                          "Checks if the header value contains the specified string as a substring. `string.includes()`",
                          "Verifies the header value does not contain the specified string as a substring. `!string.includes()`",
                          "Validates that the header value begins with the specified string. `string.startsWith()`",
                          "Validates that the header value does not begin with the specified string. `!string.startsWith()`",
                          "Confirms the header value ends with the specified string. `string.endsWith()`",
                          "Confirms the header value does not end with the specified string. `!string.endsWith()`",
                          "Evaluates if the header value matches the specified regular expression pattern. `regex.test()`",
                          "Evaluates if the header value does not match the specified regular expression pattern. `!regex.test()`"
                        ]
                      },
                      "value": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 255,
                        "markdownDescription": "**Value** to check against the **headerName**."
                      },
                      "caseSensitive": {
                        "type": "boolean",
                        "markdownDescription": "Whether the value is **case sensitive**. \n\n - `true`: the value will be compared as is. \n\n - `false`: the value will be lowercased **before** comparison."
                      }
                    },
                    "required": [
                      "headerName",
                      "operator",
                      "value",
                      "caseSensitive"
                    ],
                    "markdownDescription": "Condition to check against the **headerName**.",
                    "defaultSnippets": [
                      {
                        "label": "Examples: Check if header contains \"text/html\"",
                        "markdownDescription": "Condition to check if **headerName** contains \"text/html\"",
                        "body": {
                          "headerName": "accept",
                          "operator": "CONTAINS",
                          "value": "text/html",
                          "caseSensitive": true
                        }
                      }
                    ]
                  },
                  "title": "Conditions",
                  "markdownDescription": "Array of conditions to check against the request headers. Conditions are applied with **operator**. If conditions are empty, the rule will be matched."
                },
                "responseType": {
                  "type": "string",
                  "enum": [
                    "XRAY_JSON",
                    "XRAY_BASE64",
                    "MIHOMO",
                    "STASH",
                    "CLASH",
                    "SINGBOX",
                    "BROWSER",
                    "BLOCK",
                    "STATUS_CODE_404",
                    "STATUS_CODE_451",
                    "SOCKET_DROP"
                  ],
                  "errorMessage": "Invalid response type. Please select a valid response type.",
                  "markdownDescription": "Type of the response. Determines the type of **response** to be returned when the rule is matched.",
                  "markdownEnumDescriptions": [
                    "Return **subscription** in XRAY-JSON format. (Using `Xray Json` template)",
                    "Return **subscription** in BASE64 encoded string. Compatible with most client application with Xray core.",
                    "Return **subscription** in Mihomo format. (Using `Mihomo` template)",
                    "Return **subscription** in Stash format. (Using `Stash` template)",
                    "Return **subscription** in Clash format. (Using `Clash` template) Useful for client application that use Legacy Clash core.",
                    "Return **subscription** in Singbox format. (Using `Singbox` template) Format which is used by Singbox client application.",
                    "Return **subscription** as browser format. The same as on `/info` route.",
                    "**Drop** request and return `403` status code.",
                    "**Drop** request and return `404` status code.",
                    "**Drop** request and return `451` status code.",
                    "**Drop** the socket connection."
                  ]
                },
                "responseModifications": {
                  "title": "Response Modifications",
                  "examples": [
                    {
                      "headers": [
                        {
                          "key": "X-Custom-Header",
                          "value": "CustomValue"
                        }
                      ]
                    }
                  ],
                  "markdownDescription": "Response modifications to be applied when the rule is matched. Optional.",
                  "type": "object",
                  "properties": {
                    "headers": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "key": {
                            "type": "string",
                            "pattern": "^[!#$%&'*+\\-.0-9A-Z^_`a-z|~]+$",
                            "title": "Header Key",
                            "markdownDescription": "Key of the response header. Must comply with RFC 7230."
                          },
                          "value": {
                            "type": "string",
                            "minLength": 1,
                            "title": "Header Value",
                            "markdownDescription": "Value of the response header."
                          }
                        },
                        "required": [
                          "key",
                          "value"
                        ],
                        "title": "Headers",
                        "markdownDescription": "**Key** and **value** of the response header will be added to the response."
                      },
                      "defaultSnippets": [
                        {
                          "label": "Examples: Add custom header",
                          "markdownDescription": "Add a custom header to the response",
                          "body": [
                            {
                              "key": "X-Custom-Header",
                              "value": "CustomValue"
                            }
                          ]
                        }
                      ],
                      "markdownDescription": "Array of headers to be added when the rule is matched."
                    },
                    "applyHeadersToEnd": {
                      "title": "Apply Headers to End",
                      "markdownDescription": "By default, headers are added when forming the response. In some cases, headers set in SRR may be overridden by headers from other parts of the system. If you set this flag to **true**, headers from SRR will be added at the very end, just before the response is sent. In this case, SRR headers may override headers from other sections.",
                      "type": "boolean"
                    },
                    "subscriptionTemplate": {
                      "title": "Subscription Template",
                      "markdownDescription": "Override the subscription template with the given name. If not provided, the default subscription template will be used. If the template name is not found, the default subscription template for this type will be used. **This modification have higher priority than settings from External Squads.**",
                      "type": "string",
                      "minLength": 1
                    },
                    "ignoreHostXrayJsonTemplate": {
                      "title": "Ignore Host Xray Json Template",
                      "markdownDescription": "Each Host may have its own Xray Json Template. If you set this flag to **true**, the Xray Json Template defined by the SRR will be used. **The Host's Xray Json Template will be ignored.**",
                      "type": "boolean"
                    },
                    "ignoreServeJsonAtBaseSubscription": {
                      "title": "Ignore Serve Json at Base Subscription",
                      "markdownDescription": "If you set this flag to **true**, the **Serve JSON at Base Subscription** setting will be ignored (set to **false**).",
                      "type": "boolean"
                    },
                    "additionalExtendedClientsRegex": {
                      "markdownDescription": "Additional regex patterns to match extended clients. Matched clients will receive `serverDescription` in the subscription response.\n\n**Default Mihomo extended clients:**\n- `^FlClash ?X/`\n- `^Flowvy/`\n- `^prizrak-box/`\n- `^koala-clash/`\n\n**Default Xray extended clients:**\n- `^Happ/`\n- `^INCY/`\n\n**Example:** `[\"^MyClient/\", \"^CustomApp\\\\/v2\"]`",
                      "type": "array",
                      "items": {
                        "type": "string",
                        "minLength": 1
                      }
                    },
                    "disableHwidCheck": {
                      "title": "Disable HWID Check",
                      "markdownDescription": "If you set this flag to **true**, the HWID check will be disabled. **This modification have higher priority than settings from Subscription Settings.**",
                      "type": "boolean"
                    },
                    "encryption": {
                      "title": "Encryption",
                      "markdownDescription": "Encrypt response body with given parameters. Generate keypairs with Rescue CLI: `docker exec -it remnawave cli`, select \"Generate keypairs\".",
                      "type": "object",
                      "properties": {
                        "method": {
                          "type": "string",
                          "enum": [
                            "age1",
                            "age1pq1"
                          ]
                        },
                        "key": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "method",
                        "key"
                      ]
                    },
                    "excludeHostsByTags": {
                      "title": "Exclude Hosts by Tags",
                      "markdownDescription": "Excludes hosts from the subscription output if at least one tag in the host matches the given tags.",
                      "minItems": 1,
                      "type": "array",
                      "items": {
                        "type": "string",
                        "maxLength": 36,
                        "pattern": "^[A-Z0-9_:]+$"
                      }
                    },
                    "respondWithRemarks": {
                      "title": "Respond With Remarks",
                      "markdownDescription": "Replaces the response body with the provided remarks. If this array contains more than one element, actual hosts will not be sent.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "required": [
                "name",
                "enabled",
                "operator",
                "conditions",
                "responseType"
              ],
              "title": "Response Rule",
              "markdownDescription": "Response rule configuration.\n\n**Fields:**\n- **name**: Name of the response rule.\n- **description**: Description of the response rule. Optional.\n- **enabled**: Control whether the response rule is enabled or disabled. \n\n - `true` the rule will be applied. \n\n - `false` the rule will be always ignored.\n- **operator**: Operator to use for combining conditions in the rule.\n- **conditions**: Array of conditions to check against the request headers. Conditions are applied with **operator**. If conditions are empty, the rule will be matched.\n- **responseType**: Type of the response. Determines the type of **response** to be returned when the rule is matched.\n- **responseModifications**: Response modifications to be applied when the rule is matched. Optional.\n\n**Example:**\n```json\n{\n  \"name\": \"Block Legacy Clients\",\n  \"description\": \"Block requests from legacy clients\",\n  \"enabled\": true,\n  \"operator\": \"OR\",\n  \"conditions\": [\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"Hiddify\",\n      \"caseSensitive\": true\n    },\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"FoxRay\",\n      \"caseSensitive\": true\n    }\n  ],\n  \"responseType\": \"BLOCK\"\n}\n```",
              "defaultSnippets": [
                {
                  "label": "Examples: Blank rule",
                  "markdownDescription": "Simple blank rule with no conditions or modifications.\n```json\n{\n  \"name\": \"Blank rule\",\n  \"description\": \"Blank rule\",\n  \"operator\": \"AND\",\n  \"enabled\": true,\n  \"conditions\": [],\n  \"responseType\": \"BLOCK\",\n  \"responseModifications\": {\n    \"headers\": []\n  }\n}\n```",
                  "body": {
                    "name": "Blank rule",
                    "description": "Blank rule",
                    "operator": "AND",
                    "enabled": true,
                    "conditions": [],
                    "responseType": "BLOCK",
                    "responseModifications": {
                      "headers": []
                    }
                  }
                },
                {
                  "label": "Examples: Block Legacy Clients",
                  "markdownDescription": "Block requests from legacy clients\n```json\n{\n  \"name\": \"Block Legacy Clients\",\n  \"description\": \"Block requests from legacy clients\",\n  \"enabled\": true,\n  \"operator\": \"OR\",\n  \"conditions\": [\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"Hiddify\",\n      \"caseSensitive\": true\n    },\n    {\n      \"headerName\": \"user-agent\",\n      \"operator\": \"CONTAINS\",\n      \"value\": \"FoxRay\",\n      \"caseSensitive\": true\n    }\n  ],\n  \"responseType\": \"BLOCK\"\n}\n```",
                  "body": {
                    "name": "Block Legacy Clients",
                    "description": "Block requests from legacy clients",
                    "enabled": true,
                    "operator": "OR",
                    "conditions": [
                      {
                        "headerName": "user-agent",
                        "operator": "CONTAINS",
                        "value": "Hiddify",
                        "caseSensitive": true
                      },
                      {
                        "headerName": "user-agent",
                        "operator": "CONTAINS",
                        "value": "FoxRay",
                        "caseSensitive": true
                      }
                    ],
                    "responseType": "BLOCK"
                  }
                }
              ]
            },
            "title": "Response Rules",
            "markdownDescription": "Array of **response rules**. Rules are evaluated in order and the first rule that matches is applied. If no rule matches, request will be blocked by default.\n\n**Example:**\n```json\n[\n  {\n    \"name\": \"Blank rule\",\n    \"description\": \"Blank rule\",\n    \"operator\": \"AND\",\n    \"enabled\": true,\n    \"conditions\": [],\n    \"responseType\": \"BLOCK\",\n    \"responseModifications\": {\n      \"headers\": []\n    }\n  }\n]\n```",
            "defaultSnippets": []
          }
        },
        "required": [
          "version",
          "rules"
        ]
      },
      "hwidSettings": {
        "type": "object",
        "properties": {
          "enabled": {
            "type": "boolean"
          },
          "fallbackDeviceLimit": {
            "type": "number"
          },
          "maxDevicesAnnounce": {
            "type": "string",
            "maxLength": 200,
            "nullable": true
          }
        },
        "required": [
          "enabled",
          "fallbackDeviceLimit",
          "maxDevicesAnnounce"
        ]
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateTemplateBodyDto": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
      },
      "name": {
        "type": "string",
        "minLength": 2,
        "maxLength": 255,
        "pattern": "^[A-Za-z0-9_\\s-]+$"
      },
      "templateJson": {
        "type": "object",
        "properties": {},
        "additionalProperties": {}
      },
      "encodedTemplateYaml": {
        "type": "string"
      }
    },
    "required": [
      "uuid"
    ]
  },
  "UpdateUserBodyDto": {
    "type": "object",
    "properties": {
      "username": {
        "type": "string",
        "description": "Username of the user"
      },
      "id": {
        "type": "number",
        "description": "ID of the user"
      },
      "status": {
        "type": "string",
        "enum": [
          "ACTIVE",
          "DISABLED"
        ]
      },
      "trafficLimitBytes": {
        "type": "number",
        "minimum": 0,
        "description": "Traffic limit in bytes. 0 - unlimited"
      },
      "trafficLimitStrategy": {
        "type": "string",
        "enum": [
          "NO_RESET",
          "DAY",
          "WEEK",
          "MONTH",
          "MONTH_ROLLING"
        ],
        "description": "Traffic limit reset strategy"
      },
      "expireAt": {
        "description": "Expiration date: 2025-01-17T15:38:45.065Z",
        "type": "string",
        "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d))|(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?)$"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "tag": {
        "type": "string",
        "maxLength": 16,
        "pattern": "^[A-Z0-9_]+$",
        "nullable": true
      },
      "telegramId": {
        "type": "number",
        "nullable": true
      },
      "email": {
        "type": "string",
        "format": "email",
        "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$",
        "nullable": true
      },
      "hwidDeviceLimit": {
        "type": "integer",
        "minimum": 0,
        "maximum": 9007199254740991,
        "nullable": true
      },
      "activeInternalSquads": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
        }
      },
      "externalSquadUuid": {
        "type": "string",
        "format": "uuid",
        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
        "description": "Optional. External squad UUID.",
        "nullable": true
      }
    }
  },
  "UpsertNodeMetadataBodyDto": {
    "type": "object",
    "properties": {
      "metadata": {
        "type": "object",
        "properties": {},
        "additionalProperties": {}
      }
    },
    "required": [
      "metadata"
    ]
  },
  "UpsertUserMetadataBodyDto": {
    "type": "object",
    "properties": {
      "metadata": {
        "type": "object",
        "properties": {},
        "additionalProperties": {}
      }
    },
    "required": [
      "metadata"
    ]
  }
};

export const OPERATIONS: readonly OperationDescriptor[] = [
  {
    "name": "internal_squad_stats_get_internal_squad_user_usage",
    "operationId": "InternalSquadStatsController_getInternalSquadUserUsage",
    "method": "GET",
    "path": "/api/bandwidth-stats/internal-squads/{squadUuid}/users/{userId}/usage",
    "kind": "read",
    "summary": "Get a single user daily traffic usage on the internal squad nodes for a period",
    "description": "Returns users whose total usage over the period on the given nodes is >= minTotalBytes, scoped to the nodes reachable via the Internal Squad inbounds. Every day in the range is present (zero-filled). Underlying usage data is flushed to the database roughly every 2 minutes.",
    "parameters": [
      {
        "name": "squadUuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "Internal squad UUID",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      },
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      },
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "internal_squad_stats_get_internal_squad_usage",
    "operationId": "InternalSquadStatsController_getInternalSquadUsage",
    "method": "GET",
    "path": "/api/bandwidth-stats/internal-squads/{uuid}/usage",
    "kind": "read",
    "summary": "Get internal squad users traffic usage for a period",
    "description": "Returns users whose total usage over the period on the given nodes is >= minTotalBytes, scoped to the nodes reachable via the internal squad inbounds. Underlying usage data is flushed to the database roughly every 2 minutes.",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "Internal squad UUID",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      },
      {
        "name": "cursor",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Pass the nextCursor from the previous response. Omit on the first request.",
        "schema": {
          "type": "number"
        }
      },
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of users to return, no more than 1000",
        "schema": {
          "minimum": 1,
          "maximum": 1000,
          "default": 250,
          "type": "number"
        }
      },
      {
        "name": "minTotalBytes",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Only include users whose total usage over the period is >= this (bytes)",
        "schema": {
          "minimum": 0,
          "default": 0,
          "type": "number"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "nodes_usage_history_get_stats_nodes_usage",
    "operationId": "NodesUsageHistoryController_getStatsNodesUsage",
    "method": "GET",
    "path": "/api/bandwidth-stats/nodes",
    "kind": "read",
    "summary": "Get Nodes Usage by Range",
    "parameters": [
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "topNodesLimit",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Limit of top nodes to return",
        "schema": {
          "minimum": 1,
          "default": 20,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "bandwidth_stats_nodes_get_node_usage",
    "operationId": "BandwidthStatsNodesController_getNodeUsage",
    "method": "POST",
    "path": "/api/bandwidth-stats/nodes/usage",
    "kind": "read",
    "summary": "Get users exceeding a traffic threshold on the given nodes for a period",
    "description": "Returns users whose total usage over the period on the given nodes is >= minTotalBytes. Underlying usage data is flushed to the database roughly every 2 minutes.",
    "parameters": [
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "minTotalBytes",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Only include users whose total usage over the period is >= this (bytes)",
        "schema": {
          "minimum": 0,
          "default": 0,
          "type": "number"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/GetNodeUsageBodyDto"
      }
    }
  },
  {
    "name": "bandwidth_stats_nodes_get_stats_nodes_users_usage",
    "operationId": "BandwidthStatsNodesController_getStatsNodesUsersUsage",
    "method": "POST",
    "path": "/api/bandwidth-stats/nodes/users",
    "kind": "read",
    "summary": "Get Nodes Users Usage by Nodes UUIDs",
    "parameters": [
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "topUsersLimit",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "minimum": 1,
          "default": 100,
          "type": "number"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/GetStatsNodesUsersUsageBodyDto"
      }
    }
  },
  {
    "name": "bandwidth_stats_nodes_get_stats_node_users_usage",
    "operationId": "BandwidthStatsNodesController_getStatsNodeUsersUsage",
    "method": "GET",
    "path": "/api/bandwidth-stats/nodes/{uuid}/users",
    "kind": "read",
    "summary": "Get Node Users Usage by Node UUID",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      },
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "topUsersLimit",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "minimum": 1,
          "default": 100,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "bandwidth_stats_users_get_stats_nodes_usage",
    "operationId": "BandwidthStatsUsersController_getStatsNodesUsage",
    "method": "GET",
    "path": "/api/bandwidth-stats/users/{userId}",
    "kind": "read",
    "summary": "Get User Usage by Range",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "ID of the user",
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      },
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "topNodesLimit",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "minimum": 1,
          "default": 20,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "config_profile_get_config_profiles",
    "operationId": "ConfigProfileController_getConfigProfiles",
    "method": "GET",
    "path": "/api/config-profiles",
    "kind": "read",
    "summary": "Get config profiles",
    "parameters": []
  },
  {
    "name": "config_profile_create_config_profile",
    "operationId": "ConfigProfileController_createConfigProfile",
    "method": "POST",
    "path": "/api/config-profiles",
    "kind": "write",
    "summary": "Create config profile",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateConfigProfileBodyDto"
      }
    }
  },
  {
    "name": "config_profile_update_config_profile",
    "operationId": "ConfigProfileController_updateConfigProfile",
    "method": "PATCH",
    "path": "/api/config-profiles",
    "kind": "write",
    "summary": "Update Core Config in specific config profile",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateConfigProfileBodyDto"
      }
    }
  },
  {
    "name": "config_profile_reorder_config_profiles",
    "operationId": "ConfigProfileController_reorderConfigProfiles",
    "method": "POST",
    "path": "/api/config-profiles/actions/reorder",
    "kind": "write",
    "summary": "Reorder config profiles",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderConfigProfilesBodyDto"
      }
    }
  },
  {
    "name": "config_profile_get_all_inbounds",
    "operationId": "ConfigProfileController_getAllInbounds",
    "method": "GET",
    "path": "/api/config-profiles/inbounds",
    "kind": "read",
    "summary": "Get all inbounds from all config profiles",
    "parameters": []
  },
  {
    "name": "config_profile_get_tags",
    "operationId": "ConfigProfileController_getTags",
    "method": "GET",
    "path": "/api/config-profiles/tags",
    "kind": "read",
    "summary": "Get tags of Config Profiles",
    "parameters": []
  },
  {
    "name": "config_profile_set_tags",
    "operationId": "ConfigProfileController_setTags",
    "method": "PATCH",
    "path": "/api/config-profiles/tags",
    "kind": "write",
    "summary": "Set tags of Config Profile",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SetConfigProfilesTagsBodyDto"
      }
    }
  },
  {
    "name": "config_profile_get_config_profile_by_uuid",
    "operationId": "ConfigProfileController_getConfigProfileByUuid",
    "method": "GET",
    "path": "/api/config-profiles/{uuid}",
    "kind": "read",
    "summary": "Get config profile by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "config_profile_delete_config_profile_by_uuid",
    "operationId": "ConfigProfileController_deleteConfigProfileByUuid",
    "method": "DELETE",
    "path": "/api/config-profiles/{uuid}",
    "kind": "write",
    "summary": "Delete config profile",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "UUID of the config profile",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "config_profile_get_computed_config_profile_by_uuid",
    "operationId": "ConfigProfileController_getComputedConfigProfileByUuid",
    "method": "GET",
    "path": "/api/config-profiles/{uuid}/computed-config",
    "kind": "read",
    "summary": "Get computed config profile by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "config_profile_get_inbounds_by_profile_uuid",
    "operationId": "ConfigProfileController_getInboundsByProfileUuid",
    "method": "GET",
    "path": "/api/config-profiles/{uuid}/inbounds",
    "kind": "read",
    "summary": "Get inbounds by profile uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "UUID of the config profile",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "connections_connections_by_node_result",
    "operationId": "ConnectionsController_connectionsByNodeResult",
    "method": "GET",
    "path": "/api/connections/by-node/{jobId}",
    "kind": "read",
    "summary": "Get Connections for Node by Job ID",
    "parameters": [
      {
        "name": "jobId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "connections_connections_by_node",
    "operationId": "ConnectionsController_connectionsByNode",
    "method": "POST",
    "path": "/api/connections/by-node/{nodeUuid}",
    "kind": "read",
    "summary": "Request Connections for Node",
    "parameters": [
      {
        "name": "nodeUuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "Node UUID",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "connections_connections_by_user_result",
    "operationId": "ConnectionsController_connectionsByUserResult",
    "method": "GET",
    "path": "/api/connections/by-user/{jobId}",
    "kind": "read",
    "summary": "Get Connections for User by Job ID",
    "parameters": [
      {
        "name": "jobId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "connections_connections_by_user",
    "operationId": "ConnectionsController_connectionsByUser",
    "method": "POST",
    "path": "/api/connections/by-user/{userId}",
    "kind": "read",
    "summary": "Request Connections for User",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "connections_drop_connections",
    "operationId": "ConnectionsController_dropConnections",
    "method": "POST",
    "path": "/api/connections/drop",
    "kind": "write",
    "summary": "Drop Connections for Users or IPs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/DropConnectionsBodyDto"
      }
    }
  },
  {
    "name": "connections_geocheck_by_node_result",
    "operationId": "ConnectionsController_geocheckByNodeResult",
    "method": "GET",
    "path": "/api/connections/geocheck/{jobId}",
    "kind": "read",
    "summary": "Get Geocheck for Node by Job ID",
    "parameters": [
      {
        "name": "jobId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "connections_geocheck_by_node",
    "operationId": "ConnectionsController_geocheckByNode",
    "method": "POST",
    "path": "/api/connections/geocheck/{nodeUuid}",
    "kind": "read",
    "summary": "Request Geocheck for Node",
    "description": "Queues a geocheck on the node and returns a job ID. Poll \"Get Geocheck for Node by Job ID\" for the result, the node may take up to a minute to answer.",
    "parameters": [
      {
        "name": "nodeUuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "Node UUID",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/GeocheckByNodeBodyDto"
      }
    }
  },
  {
    "name": "external_squad_get_external_squads",
    "operationId": "ExternalSquadController_getExternalSquads",
    "method": "GET",
    "path": "/api/external-squads",
    "kind": "read",
    "summary": "Get all external squads",
    "parameters": []
  },
  {
    "name": "external_squad_create_external_squad",
    "operationId": "ExternalSquadController_createExternalSquad",
    "method": "POST",
    "path": "/api/external-squads",
    "kind": "write",
    "summary": "Create external squad",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateExternalSquadBodyDto"
      }
    }
  },
  {
    "name": "external_squad_update_external_squad",
    "operationId": "ExternalSquadController_updateExternalSquad",
    "method": "PATCH",
    "path": "/api/external-squads",
    "kind": "write",
    "summary": "Update external squad",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateExternalSquadBodyDto"
      }
    }
  },
  {
    "name": "external_squad_reorder_external_squads",
    "operationId": "ExternalSquadController_reorderExternalSquads",
    "method": "POST",
    "path": "/api/external-squads/actions/reorder",
    "kind": "write",
    "summary": "Reorder external squads",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderExternalSquadsBodyDto"
      }
    }
  },
  {
    "name": "external_squad_get_tags",
    "operationId": "ExternalSquadController_getTags",
    "method": "GET",
    "path": "/api/external-squads/tags",
    "kind": "read",
    "summary": "Get tags of External Squads",
    "parameters": []
  },
  {
    "name": "external_squad_set_tags",
    "operationId": "ExternalSquadController_setTags",
    "method": "PATCH",
    "path": "/api/external-squads/tags",
    "kind": "write",
    "summary": "Set tags of External Squad",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SetExternalSquadsTagsBodyDto"
      }
    }
  },
  {
    "name": "external_squad_get_external_squad_by_uuid",
    "operationId": "ExternalSquadController_getExternalSquadByUuid",
    "method": "GET",
    "path": "/api/external-squads/{uuid}",
    "kind": "read",
    "summary": "Get external squad by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "UUID of the external squad",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "external_squad_delete_external_squad",
    "operationId": "ExternalSquadController_deleteExternalSquad",
    "method": "DELETE",
    "path": "/api/external-squads/{uuid}",
    "kind": "write",
    "summary": "Delete external squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "UUID of the external squad",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "external_squad_add_users_to_external_squad",
    "operationId": "ExternalSquadController_addUsersToExternalSquad",
    "method": "POST",
    "path": "/api/external-squads/{uuid}/bulk-actions/add-users",
    "kind": "write",
    "summary": "Add all users to external squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "UUID of the external squad",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "external_squad_remove_users_from_external_squad",
    "operationId": "ExternalSquadController_removeUsersFromExternalSquad",
    "method": "DELETE",
    "path": "/api/external-squads/{uuid}/bulk-actions/remove-users",
    "kind": "write",
    "summary": "Delete users from external squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "UUID of the external squad",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "hosts_get_hosts",
    "operationId": "HostsController_getHosts",
    "method": "GET",
    "path": "/api/hosts",
    "kind": "read",
    "summary": "Get hosts",
    "parameters": []
  },
  {
    "name": "hosts_create_host",
    "operationId": "HostsController_createHost",
    "method": "POST",
    "path": "/api/hosts",
    "kind": "write",
    "summary": "Create a new host",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateHostBodyDto"
      }
    }
  },
  {
    "name": "hosts_update_host",
    "operationId": "HostsController_updateHost",
    "method": "PATCH",
    "path": "/api/hosts",
    "kind": "write",
    "summary": "Update a host",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateHostBodyDto"
      }
    }
  },
  {
    "name": "hosts_clone_host",
    "operationId": "HostsController_cloneHost",
    "method": "POST",
    "path": "/api/hosts/actions/clone",
    "kind": "write",
    "summary": "Clone host",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CloneHostBodyDto"
      }
    }
  },
  {
    "name": "hosts_reorder_hosts",
    "operationId": "HostsController_reorderHosts",
    "method": "POST",
    "path": "/api/hosts/actions/reorder",
    "kind": "write",
    "summary": "Reorder hosts",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderHostsBodyDto"
      }
    }
  },
  {
    "name": "hosts_bulk_actions_delete_hosts",
    "operationId": "HostsBulkActionsController_deleteHosts",
    "method": "POST",
    "path": "/api/hosts/bulk/delete",
    "kind": "write",
    "summary": "Delete hosts by UUIDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkDeleteHostsBodyDto"
      }
    }
  },
  {
    "name": "hosts_bulk_actions_disable_hosts",
    "operationId": "HostsBulkActionsController_disableHosts",
    "method": "POST",
    "path": "/api/hosts/bulk/disable",
    "kind": "write",
    "summary": "Disable hosts by UUIDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkDisableHostsBodyDto"
      }
    }
  },
  {
    "name": "hosts_bulk_actions_enable_hosts",
    "operationId": "HostsBulkActionsController_enableHosts",
    "method": "POST",
    "path": "/api/hosts/bulk/enable",
    "kind": "write",
    "summary": "Enable hosts by UUIDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkEnableHostsBodyDto"
      }
    }
  },
  {
    "name": "hosts_bulk_actions_set_port_to_hosts",
    "operationId": "HostsBulkActionsController_setPortToHosts",
    "method": "PATCH",
    "path": "/api/hosts/bulk/update",
    "kind": "write",
    "summary": "Update many hosts",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateManyHostsBodyDto"
      }
    }
  },
  {
    "name": "hosts_get_hosts_tags",
    "operationId": "HostsController_getHostsTags",
    "method": "GET",
    "path": "/api/hosts/tags",
    "kind": "read",
    "summary": "Get tags of hosts",
    "parameters": []
  },
  {
    "name": "hosts_get_one_host",
    "operationId": "HostsController_getOneHost",
    "method": "GET",
    "path": "/api/hosts/{uuid}",
    "kind": "read",
    "summary": "Get a host by UUID",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "hosts_delete_host",
    "operationId": "HostsController_deleteHost",
    "method": "DELETE",
    "path": "/api/hosts/{uuid}",
    "kind": "write",
    "summary": "Delete a host by UUID",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "hwid_user_devices_get_all_users",
    "operationId": "HwidUserDevicesController_getAllUsers",
    "method": "GET",
    "path": "/api/hwid/devices",
    "kind": "read",
    "summary": "Get HWID devices",
    "description": "Please note that the filters here are primarily intended for use by the frontend and rely on expensive operators such as LIKE under the hood. Misusing these filters may negatively impact the performance of your database.",
    "parameters": [
      {
        "name": "filterModes",
        "in": "query",
        "required": false,
        "style": "deepObject",
        "explode": false,
        "schema": {
          "additionalProperties": {
            "type": "string"
          },
          "type": "object"
        }
      },
      {
        "name": "filters",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "value": {}
            },
            "required": [
              "id",
              "value"
            ]
          }
        }
      },
      {
        "name": "globalFilterMode",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of results to return, no more than 1000",
        "schema": {
          "minimum": 1,
          "maximum": 1000,
          "default": 25,
          "type": "number"
        }
      },
      {
        "name": "sorting",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "desc": {
                "type": "boolean"
              }
            },
            "required": [
              "id",
              "desc"
            ]
          }
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Start index (offset) of the results to return, default is 0",
        "schema": {
          "default": 0,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "hwid_user_devices_create_user_hwid_device",
    "operationId": "HwidUserDevicesController_createUserHwidDevice",
    "method": "POST",
    "path": "/api/hwid/devices",
    "kind": "write",
    "summary": "Create a user HWID device",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateUserHwidDeviceBodyDto"
      }
    }
  },
  {
    "name": "hwid_user_devices_delete_user_hwid_device",
    "operationId": "HwidUserDevicesController_deleteUserHwidDevice",
    "method": "POST",
    "path": "/api/hwid/devices/delete",
    "kind": "write",
    "summary": "Delete a user HWID device",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/DeleteUserHwidDeviceBodyDto"
      }
    }
  },
  {
    "name": "hwid_user_devices_delete_all_user_hwid_devices",
    "operationId": "HwidUserDevicesController_deleteAllUserHwidDevices",
    "method": "POST",
    "path": "/api/hwid/devices/delete-all",
    "kind": "write",
    "summary": "Delete all user HWID devices",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/DeleteAllUserHwidDevicesBodyDto"
      }
    }
  },
  {
    "name": "hwid_user_devices_get_hwid_devices_stats",
    "operationId": "HwidUserDevicesController_getHwidDevicesStats",
    "method": "GET",
    "path": "/api/hwid/devices/stats",
    "kind": "read",
    "summary": "Get HWID devices stats",
    "parameters": []
  },
  {
    "name": "hwid_user_devices_get_top_users_by_hwid_devices",
    "operationId": "HwidUserDevicesController_getTopUsersByHwidDevices",
    "method": "GET",
    "path": "/api/hwid/devices/top-users",
    "kind": "read",
    "summary": "Get top users by HWID devices",
    "parameters": [
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of results to return, no more than 100",
        "schema": {
          "minimum": 1,
          "maximum": 100,
          "default": 5,
          "type": "number"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Start index (offset) of the results to return, default is 0",
        "schema": {
          "default": 0,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "hwid_user_devices_get_user_hwid_devices",
    "operationId": "HwidUserDevicesController_getUserHwidDevices",
    "method": "GET",
    "path": "/api/hwid/devices/{userId}",
    "kind": "read",
    "summary": "Get user HWID devices",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "infra_billing_get_infra_billing_records",
    "operationId": "InfraBillingController_getInfraBillingRecords",
    "method": "GET",
    "path": "/api/infra-billing/history",
    "kind": "read",
    "summary": "Get infra billing history",
    "parameters": [
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of billing records to return, no more than 500",
        "schema": {
          "minimum": 1,
          "maximum": 500,
          "default": 50,
          "type": "number"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Start index (offset) of the billing history records to return, default is 0",
        "schema": {
          "default": 0,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "infra_billing_create_infra_billing_record",
    "operationId": "InfraBillingController_createInfraBillingRecord",
    "method": "POST",
    "path": "/api/infra-billing/history",
    "kind": "write",
    "summary": "Create infra billing history",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateInfraBillingRecordBodyDto"
      }
    }
  },
  {
    "name": "infra_billing_delete_infra_billing_record",
    "operationId": "InfraBillingController_deleteInfraBillingRecord",
    "method": "DELETE",
    "path": "/api/infra-billing/history/{uuid}",
    "kind": "write",
    "summary": "Delete infra billing history",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "infra_billing_get_billing_nodes",
    "operationId": "InfraBillingController_getBillingNodes",
    "method": "GET",
    "path": "/api/infra-billing/nodes",
    "kind": "read",
    "summary": "Get infra billing nodes",
    "parameters": []
  },
  {
    "name": "infra_billing_create_infra_billing_node",
    "operationId": "InfraBillingController_createInfraBillingNode",
    "method": "POST",
    "path": "/api/infra-billing/nodes",
    "kind": "write",
    "summary": "Create infra billing node",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateInfraBillingNodeBodyDto"
      }
    }
  },
  {
    "name": "infra_billing_update_infra_billing_node",
    "operationId": "InfraBillingController_updateInfraBillingNode",
    "method": "PATCH",
    "path": "/api/infra-billing/nodes",
    "kind": "write",
    "summary": "Update infra billing nodes",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateInfraBillingNodeBodyDto"
      }
    }
  },
  {
    "name": "infra_billing_delete_infra_billing_node",
    "operationId": "InfraBillingController_deleteInfraBillingNode",
    "method": "DELETE",
    "path": "/api/infra-billing/nodes/{uuid}",
    "kind": "write",
    "summary": "Delete infra billing node",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "infra_billing_get_infra_providers",
    "operationId": "InfraBillingController_getInfraProviders",
    "method": "GET",
    "path": "/api/infra-billing/providers",
    "kind": "read",
    "summary": "Get all infra providers",
    "parameters": []
  },
  {
    "name": "infra_billing_create_infra_provider",
    "operationId": "InfraBillingController_createInfraProvider",
    "method": "POST",
    "path": "/api/infra-billing/providers",
    "kind": "write",
    "summary": "Create infra provider",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateInfraProviderBodyDto"
      }
    }
  },
  {
    "name": "infra_billing_update_infra_provider",
    "operationId": "InfraBillingController_updateInfraProvider",
    "method": "PATCH",
    "path": "/api/infra-billing/providers",
    "kind": "write",
    "summary": "Update infra provider",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateInfraProviderBodyDto"
      }
    }
  },
  {
    "name": "infra_billing_get_infra_provider",
    "operationId": "InfraBillingController_getInfraProvider",
    "method": "GET",
    "path": "/api/infra-billing/providers/{uuid}",
    "kind": "read",
    "summary": "Get infra provider by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "infra_billing_delte_infra_provider",
    "operationId": "InfraBillingController_delteInfraProvider",
    "method": "DELETE",
    "path": "/api/infra-billing/providers/{uuid}",
    "kind": "write",
    "summary": "Delete infra provider by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "internal_squad_get_internal_squads",
    "operationId": "InternalSquadController_getInternalSquads",
    "method": "GET",
    "path": "/api/internal-squads",
    "kind": "read",
    "summary": "Get all internal squads",
    "parameters": []
  },
  {
    "name": "internal_squad_create_internal_squad",
    "operationId": "InternalSquadController_createInternalSquad",
    "method": "POST",
    "path": "/api/internal-squads",
    "kind": "write",
    "summary": "Create internal squad",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateInternalSquadBodyDto"
      }
    }
  },
  {
    "name": "internal_squad_update_internal_squad",
    "operationId": "InternalSquadController_updateInternalSquad",
    "method": "PATCH",
    "path": "/api/internal-squads",
    "kind": "write",
    "summary": "Update internal squad",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateInternalSquadBodyDto"
      }
    }
  },
  {
    "name": "internal_squad_reorder_internal_squads",
    "operationId": "InternalSquadController_reorderInternalSquads",
    "method": "POST",
    "path": "/api/internal-squads/actions/reorder",
    "kind": "write",
    "summary": "Reorder internal squads",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderInternalSquadsBodyDto"
      }
    }
  },
  {
    "name": "internal_squad_get_tags",
    "operationId": "InternalSquadController_getTags",
    "method": "GET",
    "path": "/api/internal-squads/tags",
    "kind": "read",
    "summary": "Get tags of Internal Squads",
    "parameters": []
  },
  {
    "name": "internal_squad_set_tags",
    "operationId": "InternalSquadController_setTags",
    "method": "PATCH",
    "path": "/api/internal-squads/tags",
    "kind": "write",
    "summary": "Set tags of Internal Squad",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SetInternalSquadsTagsBodyDto"
      }
    }
  },
  {
    "name": "internal_squad_get_internal_squad_by_uuid",
    "operationId": "InternalSquadController_getInternalSquadByUuid",
    "method": "GET",
    "path": "/api/internal-squads/{uuid}",
    "kind": "read",
    "summary": "Get internal squad by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "internal_squad_delete_internal_squad",
    "operationId": "InternalSquadController_deleteInternalSquad",
    "method": "DELETE",
    "path": "/api/internal-squads/{uuid}",
    "kind": "write",
    "summary": "Delete internal squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "internal_squad_get_internal_squad_accessible_nodes",
    "operationId": "InternalSquadController_getInternalSquadAccessibleNodes",
    "method": "GET",
    "path": "/api/internal-squads/{uuid}/accessible-nodes",
    "kind": "read",
    "summary": "Get internal squad accessible nodes",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "internal_squad_add_many_users_to_internal_squad",
    "operationId": "InternalSquadController_addManyUsersToInternalSquad",
    "method": "POST",
    "path": "/api/internal-squads/{uuid}/bulk-actions/add-many-users",
    "kind": "write",
    "summary": "Add many users to internal squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/AddManyUsersToInternalSquadBodyDto"
      }
    }
  },
  {
    "name": "internal_squad_add_users_to_internal_squad",
    "operationId": "InternalSquadController_addUsersToInternalSquad",
    "method": "POST",
    "path": "/api/internal-squads/{uuid}/bulk-actions/add-users",
    "kind": "write",
    "summary": "Add all users to internal squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "internal_squad_remove_many_users_from_internal_squad",
    "operationId": "InternalSquadController_removeManyUsersFromInternalSquad",
    "method": "DELETE",
    "path": "/api/internal-squads/{uuid}/bulk-actions/remove-many-users",
    "kind": "write",
    "summary": "Delete many users from internal squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/DeleteManyUsersFromInternalSquadBodyDto"
      }
    }
  },
  {
    "name": "internal_squad_remove_users_from_internal_squad",
    "operationId": "InternalSquadController_removeUsersFromInternalSquad",
    "method": "DELETE",
    "path": "/api/internal-squads/{uuid}/bulk-actions/remove-users",
    "kind": "write",
    "summary": "Delete users from internal squad",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "internal_squad_get_internal_squad_usage",
    "operationId": "InternalSquadController_getInternalSquadUsage",
    "method": "GET",
    "path": "/api/internal-squads/{uuid}/usage",
    "kind": "read",
    "summary": "Get internal squad users traffic usage for a period",
    "description": "Returns users whose total usage over the period on the given nodes is >= minTotalBytes, scoped to the nodes reachable via the internal squad inbounds. Underlying usage data is flushed to the database roughly every 2 minutes.",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "Internal squad UUID",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      },
      {
        "name": "cursor",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Pass the nextCursor from the previous response. Omit on the first request.",
        "schema": {
          "type": "number"
        }
      },
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of users to return, no more than 1000",
        "schema": {
          "minimum": 1,
          "maximum": 1000,
          "default": 250,
          "type": "number"
        }
      },
      {
        "name": "minTotalBytes",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Only include users whose total usage over the period is >= this (bytes)",
        "schema": {
          "minimum": 0,
          "default": 0,
          "type": "number"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start date (YYYY-MM-DD)",
        "schema": {
          "format": "date",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "keygen_generate_key",
    "operationId": "KeygenController_generateKey",
    "method": "GET",
    "path": "/api/keygen",
    "kind": "read",
    "summary": "Get SECRET_KEY for Remnawave Node",
    "parameters": []
  },
  {
    "name": "metadata_get_node_metadata",
    "operationId": "MetadataController_getNodeMetadata",
    "method": "GET",
    "path": "/api/metadata/node/{uuid}",
    "kind": "read",
    "summary": "Get node metadata",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "metadata_upsert_node_metadata",
    "operationId": "MetadataController_upsertNodeMetadata",
    "method": "PUT",
    "path": "/api/metadata/node/{uuid}",
    "kind": "write",
    "summary": "Update or create Node Metadata",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpsertNodeMetadataBodyDto"
      }
    }
  },
  {
    "name": "metadata_get_user_metadata",
    "operationId": "MetadataController_getUserMetadata",
    "method": "GET",
    "path": "/api/metadata/user/{userId}",
    "kind": "read",
    "summary": "Get user metadata",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "metadata_upsert_user_metadata",
    "operationId": "MetadataController_upsertUserMetadata",
    "method": "PUT",
    "path": "/api/metadata/user/{userId}",
    "kind": "write",
    "summary": "Update or create User Metadata",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpsertUserMetadataBodyDto"
      }
    }
  },
  {
    "name": "node_integration_get_all_integrations",
    "operationId": "NodeIntegrationController_getAllIntegrations",
    "method": "GET",
    "path": "/api/node-integrations",
    "kind": "read",
    "summary": "Get all Node Integrations",
    "parameters": []
  },
  {
    "name": "node_integration_create_integration",
    "operationId": "NodeIntegrationController_createIntegration",
    "method": "POST",
    "path": "/api/node-integrations",
    "kind": "write",
    "summary": "Create Node Integration",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateNodeIntegrationBodyDto"
      }
    }
  },
  {
    "name": "node_integration_update_integration",
    "operationId": "NodeIntegrationController_updateIntegration",
    "method": "PATCH",
    "path": "/api/node-integrations",
    "kind": "write",
    "summary": "Update Node Integration",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateNodeIntegrationBodyDto"
      }
    }
  },
  {
    "name": "node_integration_get_integration_by_uuid",
    "operationId": "NodeIntegrationController_getIntegrationByUuid",
    "method": "GET",
    "path": "/api/node-integrations/{uuid}",
    "kind": "read",
    "summary": "Get Node Integration by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "node_integration_delete_integration",
    "operationId": "NodeIntegrationController_deleteIntegration",
    "method": "DELETE",
    "path": "/api/node-integrations/{uuid}",
    "kind": "write",
    "summary": "Delete Node Integration",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "node_plugin_get_all_configs",
    "operationId": "NodePluginController_getAllConfigs",
    "method": "GET",
    "path": "/api/node-plugins",
    "kind": "read",
    "summary": "Get all Node Plugins",
    "parameters": []
  },
  {
    "name": "node_plugin_create_config",
    "operationId": "NodePluginController_createConfig",
    "method": "POST",
    "path": "/api/node-plugins",
    "kind": "write",
    "summary": "Create Node Plugin",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateNodePluginBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_update_config",
    "operationId": "NodePluginController_updateConfig",
    "method": "PATCH",
    "path": "/api/node-plugins",
    "kind": "write",
    "summary": "Update Node Plugin",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateNodePluginBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_clone_node_plugin",
    "operationId": "NodePluginController_cloneNodePlugin",
    "method": "POST",
    "path": "/api/node-plugins/actions/clone",
    "kind": "write",
    "summary": "Clone Node Plugin",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CloneNodePluginBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_reorder_node_plugins",
    "operationId": "NodePluginController_reorderNodePlugins",
    "method": "POST",
    "path": "/api/node-plugins/actions/reorder",
    "kind": "write",
    "summary": "Reorder Node Plugins",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderNodePluginsBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_sync_node_plugin",
    "operationId": "NodePluginController_syncNodePlugin",
    "method": "POST",
    "path": "/api/node-plugins/actions/sync",
    "kind": "write",
    "summary": "Sync Node Plugin to nodes",
    "description": "Push the current plugin config, including referenced shared lists, to every connected node this plugin is active on.",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SyncNodePluginBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_plugin_executor",
    "operationId": "NodePluginController_pluginExecutor",
    "method": "POST",
    "path": "/api/node-plugins/executor",
    "kind": "write",
    "summary": "Execute command on node plugins",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/PluginExecutorBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_get_all_shared_lists",
    "operationId": "NodePluginController_getAllSharedLists",
    "method": "GET",
    "path": "/api/node-plugins/shared-lists",
    "kind": "read",
    "summary": "Get Shared Lists (Preview)",
    "description": "Returns only the name, type and item count of every shared list. Use \"Get Shared List by name\" to fetch the items themselves.",
    "parameters": []
  },
  {
    "name": "node_plugin_create_shared_list",
    "operationId": "NodePluginController_createSharedList",
    "method": "POST",
    "path": "/api/node-plugins/shared-lists",
    "kind": "write",
    "summary": "Create Shared List",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateSharedListBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_update_shared_list",
    "operationId": "NodePluginController_updateSharedList",
    "method": "PATCH",
    "path": "/api/node-plugins/shared-lists",
    "kind": "write",
    "summary": "Update Shared List",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateSharedListBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_delete_shared_list",
    "operationId": "NodePluginController_deleteSharedList",
    "method": "DELETE",
    "path": "/api/node-plugins/shared-lists",
    "kind": "write",
    "summary": "Delete Shared List by name",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/DeleteSharedListBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_sync_shared_list",
    "operationId": "NodePluginController_syncSharedList",
    "method": "POST",
    "path": "/api/node-plugins/shared-lists/actions/sync",
    "kind": "write",
    "summary": "Sync Shared List to nodes",
    "description": "Push every plugin referencing this shared list to the nodes it is active on.",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SyncSharedListBodyDto"
      }
    }
  },
  {
    "name": "node_plugin_get_shared_list_by_name",
    "operationId": "NodePluginController_getSharedListByName",
    "method": "GET",
    "path": "/api/node-plugins/shared-lists/by-name",
    "kind": "read",
    "summary": "Get Shared List by name",
    "parameters": [
      {
        "name": "name",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "schema": {
          "minLength": 2,
          "maxLength": 255,
          "pattern": "^[A-Za-z0-9_-]+(\\/[A-Za-z0-9_-]+)*$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "node_plugin_get_tags",
    "operationId": "NodePluginController_getTags",
    "method": "GET",
    "path": "/api/node-plugins/tags",
    "kind": "read",
    "summary": "Get tags of Node Plugins",
    "parameters": []
  },
  {
    "name": "node_plugin_set_tags",
    "operationId": "NodePluginController_setTags",
    "method": "PATCH",
    "path": "/api/node-plugins/tags",
    "kind": "write",
    "summary": "Set tags of Node Plugin",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SetNodePluginsTagsBodyDto"
      }
    }
  },
  {
    "name": "torrent_blocker_reports_get_torrent_blocker_reports",
    "operationId": "TorrentBlockerReportsController_getTorrentBlockerReports",
    "method": "GET",
    "path": "/api/node-plugins/torrent-blocker",
    "kind": "read",
    "summary": "Get Torrent Blocker Reports",
    "description": "Please note that the filters here are primarily intended for use by the frontend and rely on expensive operators such as LIKE under the hood. Misusing these filters may negatively impact the performance of your database.",
    "parameters": [
      {
        "name": "filterModes",
        "in": "query",
        "required": false,
        "style": "deepObject",
        "explode": false,
        "schema": {
          "additionalProperties": {
            "type": "string"
          },
          "type": "object"
        }
      },
      {
        "name": "filters",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "value": {}
            },
            "required": [
              "id",
              "value"
            ]
          }
        }
      },
      {
        "name": "globalFilterMode",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of results to return, no more than 1000",
        "schema": {
          "minimum": 1,
          "maximum": 1000,
          "default": 25,
          "type": "number"
        }
      },
      {
        "name": "sorting",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "desc": {
                "type": "boolean"
              }
            },
            "required": [
              "id",
              "desc"
            ]
          }
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Start index (offset) of the results to return, default is 0",
        "schema": {
          "default": 0,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "torrent_blocker_reports_get_torrent_blocker_reports_stats",
    "operationId": "TorrentBlockerReportsController_getTorrentBlockerReportsStats",
    "method": "GET",
    "path": "/api/node-plugins/torrent-blocker/stats",
    "kind": "read",
    "summary": "Get Torrent Blocker Reports Stats",
    "parameters": []
  },
  {
    "name": "torrent_blocker_reports_truncate_torrent_blocker_reports",
    "operationId": "TorrentBlockerReportsController_truncateTorrentBlockerReports",
    "method": "DELETE",
    "path": "/api/node-plugins/torrent-blocker/truncate",
    "kind": "write",
    "summary": "Truncate Torrent Blocker Reports",
    "parameters": []
  },
  {
    "name": "node_plugin_get_config_by_uuid",
    "operationId": "NodePluginController_getConfigByUuid",
    "method": "GET",
    "path": "/api/node-plugins/{uuid}",
    "kind": "read",
    "summary": "Get Node Plugin by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "node_plugin_delete_config",
    "operationId": "NodePluginController_deleteConfig",
    "method": "DELETE",
    "path": "/api/node-plugins/{uuid}",
    "kind": "write",
    "summary": "Delete Node Plugin",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "nodes_get_nodes",
    "operationId": "NodesController_getNodes",
    "method": "GET",
    "path": "/api/nodes",
    "kind": "read",
    "summary": "Get nodes",
    "parameters": []
  },
  {
    "name": "nodes_create_node",
    "operationId": "NodesController_createNode",
    "method": "POST",
    "path": "/api/nodes",
    "kind": "write",
    "summary": "Create a new node",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateNodeBodyDto"
      }
    }
  },
  {
    "name": "nodes_update_node",
    "operationId": "NodesController_updateNode",
    "method": "PATCH",
    "path": "/api/nodes",
    "kind": "write",
    "summary": "Update node",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateNodeBodyDto"
      }
    }
  },
  {
    "name": "nodes_reorder_nodes",
    "operationId": "NodesController_reorderNodes",
    "method": "POST",
    "path": "/api/nodes/actions/reorder",
    "kind": "write",
    "summary": "Reorder nodes",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderNodesBodyDto"
      }
    }
  },
  {
    "name": "nodes_restart_all_nodes",
    "operationId": "NodesController_restartAllNodes",
    "method": "POST",
    "path": "/api/nodes/actions/restart-all",
    "kind": "write",
    "summary": "Restart all nodes",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/RestartAllNodesBodyDto"
      }
    }
  },
  {
    "name": "nodes_bulk_nodes_actions",
    "operationId": "NodesController_bulkNodesActions",
    "method": "POST",
    "path": "/api/nodes/bulk-actions",
    "kind": "write",
    "summary": "Perform actions for many nodes",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkNodesActionsBodyDto"
      }
    }
  },
  {
    "name": "nodes_profile_modification",
    "operationId": "NodesController_profileModification",
    "method": "POST",
    "path": "/api/nodes/bulk-actions/profile-modification",
    "kind": "write",
    "summary": "Modify Inbounds & Profile for many nodes",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ProfileModificationBodyDto"
      }
    }
  },
  {
    "name": "nodes_bulk_nodes_update",
    "operationId": "NodesController_bulkNodesUpdate",
    "method": "POST",
    "path": "/api/nodes/bulk-actions/update",
    "kind": "write",
    "summary": "Update many nodes",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkNodesUpdateBodyDto"
      }
    }
  },
  {
    "name": "nodes_get_nodes_tags",
    "operationId": "NodesController_getNodesTags",
    "method": "GET",
    "path": "/api/nodes/tags",
    "kind": "read",
    "summary": "Get nodes tags",
    "parameters": []
  },
  {
    "name": "nodes_get_node",
    "operationId": "NodesController_getNode",
    "method": "GET",
    "path": "/api/nodes/{uuid}",
    "kind": "read",
    "summary": "Get node by UUID",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "nodes_delete_node",
    "operationId": "NodesController_deleteNode",
    "method": "DELETE",
    "path": "/api/nodes/{uuid}",
    "kind": "write",
    "summary": "Delete a node",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "nodes_disable_node",
    "operationId": "NodesController_disableNode",
    "method": "POST",
    "path": "/api/nodes/{uuid}/actions/disable",
    "kind": "write",
    "summary": "Disable a node",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "nodes_enable_node",
    "operationId": "NodesController_enableNode",
    "method": "POST",
    "path": "/api/nodes/{uuid}/actions/enable",
    "kind": "write",
    "summary": "Enable a node",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "nodes_reset_node_traffic",
    "operationId": "NodesController_resetNodeTraffic",
    "method": "POST",
    "path": "/api/nodes/{uuid}/actions/reset-traffic",
    "kind": "write",
    "summary": "Reset Node Traffic",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "nodes_restart_node",
    "operationId": "NodesController_restartNode",
    "method": "POST",
    "path": "/api/nodes/{uuid}/actions/restart",
    "kind": "write",
    "summary": "Restart node",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/RestartNodeBodyDto"
      }
    }
  },
  {
    "name": "remnawave_settings_get_settings",
    "operationId": "RemnawaveSettingsController_getSettings",
    "method": "GET",
    "path": "/api/remnawave-settings",
    "kind": "read",
    "summary": "Get Remnawave settings",
    "parameters": []
  },
  {
    "name": "remnawave_settings_update_settings",
    "operationId": "RemnawaveSettingsController_updateSettings",
    "method": "PATCH",
    "path": "/api/remnawave-settings",
    "kind": "write",
    "summary": "Update Remnawave settings",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateRemnawaveSettingsBodyDto"
      }
    }
  },
  {
    "name": "snippets_get_snippets",
    "operationId": "SnippetsController_getSnippets",
    "method": "GET",
    "path": "/api/snippets",
    "kind": "read",
    "summary": "Get snippets",
    "parameters": []
  },
  {
    "name": "snippets_create_snippet",
    "operationId": "SnippetsController_createSnippet",
    "method": "POST",
    "path": "/api/snippets",
    "kind": "write",
    "summary": "Create snippet",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateSnippetBodyDto"
      }
    }
  },
  {
    "name": "snippets_update_snippet",
    "operationId": "SnippetsController_updateSnippet",
    "method": "PATCH",
    "path": "/api/snippets",
    "kind": "write",
    "summary": "Update snippet",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateSnippetBodyDto"
      }
    }
  },
  {
    "name": "snippets_delete_snippet_by_name",
    "operationId": "SnippetsController_deleteSnippetByName",
    "method": "DELETE",
    "path": "/api/snippets",
    "kind": "write",
    "summary": "Delete snippet",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/DeleteSnippetBodyDto"
      }
    }
  },
  {
    "name": "snippets_sync_snippet",
    "operationId": "SnippetsController_syncSnippet",
    "method": "POST",
    "path": "/api/snippets/actions/sync",
    "kind": "write",
    "summary": "Sync snippet to affected config profiles",
    "description": "Trigger the sync of a snippet to all config profiles that reference it. Nodes which use affected config profiles will be restarted.",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SyncSnippetBodyDto"
      }
    }
  },
  {
    "name": "subscription_page_config_get_all_configs",
    "operationId": "SubscriptionPageConfigController_getAllConfigs",
    "method": "GET",
    "path": "/api/subscription-page-configs",
    "kind": "read",
    "summary": "Get all subscription page configs",
    "parameters": []
  },
  {
    "name": "subscription_page_config_create_config",
    "operationId": "SubscriptionPageConfigController_createConfig",
    "method": "POST",
    "path": "/api/subscription-page-configs",
    "kind": "write",
    "summary": "Create subscription page config",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateSubpageConfigBodyDto"
      }
    }
  },
  {
    "name": "subscription_page_config_update_config",
    "operationId": "SubscriptionPageConfigController_updateConfig",
    "method": "PATCH",
    "path": "/api/subscription-page-configs",
    "kind": "write",
    "summary": "Update subscription page config",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateSubpageConfigBodyDto"
      }
    }
  },
  {
    "name": "subscription_page_config_clone_subscription_page_config",
    "operationId": "SubscriptionPageConfigController_cloneSubscriptionPageConfig",
    "method": "POST",
    "path": "/api/subscription-page-configs/actions/clone",
    "kind": "write",
    "summary": "Clone subscription page config",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CloneSubpageConfigBodyDto"
      }
    }
  },
  {
    "name": "subscription_page_config_reorder_subscription_page_configs",
    "operationId": "SubscriptionPageConfigController_reorderSubscriptionPageConfigs",
    "method": "POST",
    "path": "/api/subscription-page-configs/actions/reorder",
    "kind": "write",
    "summary": "Reorder subscription page configs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderSubpageConfigsBodyDto"
      }
    }
  },
  {
    "name": "subscription_page_config_get_tags",
    "operationId": "SubscriptionPageConfigController_getTags",
    "method": "GET",
    "path": "/api/subscription-page-configs/tags",
    "kind": "read",
    "summary": "Get tags of Subpage Configs",
    "parameters": []
  },
  {
    "name": "subscription_page_config_set_tags",
    "operationId": "SubscriptionPageConfigController_setTags",
    "method": "PATCH",
    "path": "/api/subscription-page-configs/tags",
    "kind": "write",
    "summary": "Set tags of Subpage Config",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SetSubpageConfigsTagsBodyDto"
      }
    }
  },
  {
    "name": "subscription_page_config_get_config_by_uuid",
    "operationId": "SubscriptionPageConfigController_getConfigByUuid",
    "method": "GET",
    "path": "/api/subscription-page-configs/{uuid}",
    "kind": "read",
    "summary": "Get subscription page config by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "subscription_page_config_delete_config",
    "operationId": "SubscriptionPageConfigController_deleteConfig",
    "method": "DELETE",
    "path": "/api/subscription-page-configs/{uuid}",
    "kind": "write",
    "summary": "Delete subscription page config",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "user_subscription_request_history_get_subscription_request_history",
    "operationId": "UserSubscriptionRequestHistoryController_getSubscriptionRequestHistory",
    "method": "GET",
    "path": "/api/subscription-request-history",
    "kind": "read",
    "summary": "Get all subscription request history",
    "description": "Please note that the filters here are primarily intended for use by the frontend and rely on expensive operators such as LIKE under the hood. Misusing these filters may negatively impact the performance of your database.",
    "parameters": [
      {
        "name": "filterModes",
        "in": "query",
        "required": false,
        "style": "deepObject",
        "explode": false,
        "schema": {
          "additionalProperties": {
            "type": "string"
          },
          "type": "object"
        }
      },
      {
        "name": "filters",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "value": {}
            },
            "required": [
              "id",
              "value"
            ]
          }
        }
      },
      {
        "name": "globalFilterMode",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of results to return, no more than 1000",
        "schema": {
          "minimum": 1,
          "maximum": 1000,
          "default": 25,
          "type": "number"
        }
      },
      {
        "name": "sorting",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "desc": {
                "type": "boolean"
              }
            },
            "required": [
              "id",
              "desc"
            ]
          }
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Start index (offset) of the results to return, default is 0",
        "schema": {
          "default": 0,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "user_subscription_request_history_get_subscription_request_history_stats",
    "operationId": "UserSubscriptionRequestHistoryController_getSubscriptionRequestHistoryStats",
    "method": "GET",
    "path": "/api/subscription-request-history/stats",
    "kind": "read",
    "summary": "Get subscription request history stats",
    "parameters": []
  },
  {
    "name": "subscription_settings_get_settings",
    "operationId": "SubscriptionSettingsController_getSettings",
    "method": "GET",
    "path": "/api/subscription-settings",
    "kind": "read",
    "summary": "Get subscription settings",
    "parameters": []
  },
  {
    "name": "subscription_settings_update_settings",
    "operationId": "SubscriptionSettingsController_updateSettings",
    "method": "PATCH",
    "path": "/api/subscription-settings",
    "kind": "write",
    "summary": "Update subscription settings",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateSubscriptionSettingsBodyDto"
      }
    }
  },
  {
    "name": "subscription_template_get_all_templates",
    "operationId": "SubscriptionTemplateController_getAllTemplates",
    "method": "GET",
    "path": "/api/subscription-templates",
    "kind": "read",
    "summary": "Get all subscription templates (wihout content)",
    "parameters": []
  },
  {
    "name": "subscription_template_create_template",
    "operationId": "SubscriptionTemplateController_createTemplate",
    "method": "POST",
    "path": "/api/subscription-templates",
    "kind": "write",
    "summary": "Create subscription template",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateSubscriptionTemplateBodyDto"
      }
    }
  },
  {
    "name": "subscription_template_update_template",
    "operationId": "SubscriptionTemplateController_updateTemplate",
    "method": "PATCH",
    "path": "/api/subscription-templates",
    "kind": "write",
    "summary": "Update subscription template",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateTemplateBodyDto"
      }
    }
  },
  {
    "name": "subscription_template_reorder_subscription_templates",
    "operationId": "SubscriptionTemplateController_reorderSubscriptionTemplates",
    "method": "POST",
    "path": "/api/subscription-templates/actions/reorder",
    "kind": "write",
    "summary": "Reorder subscription templates",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ReorderSubscriptionTemplatesBodyDto"
      }
    }
  },
  {
    "name": "subscription_template_get_tags",
    "operationId": "SubscriptionTemplateController_getTags",
    "method": "GET",
    "path": "/api/subscription-templates/tags",
    "kind": "read",
    "summary": "Get tags of Subscription Templates",
    "parameters": []
  },
  {
    "name": "subscription_template_set_tags",
    "operationId": "SubscriptionTemplateController_setTags",
    "method": "PATCH",
    "path": "/api/subscription-templates/tags",
    "kind": "write",
    "summary": "Set tags of Subscription Template",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/SetSubscriptionTemplatesTagsBodyDto"
      }
    }
  },
  {
    "name": "subscription_template_get_template_by_uuid",
    "operationId": "SubscriptionTemplateController_getTemplateByUuid",
    "method": "GET",
    "path": "/api/subscription-templates/{uuid}",
    "kind": "read",
    "summary": "Get subscription template by uuid",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "subscription_template_delete_template",
    "operationId": "SubscriptionTemplateController_deleteTemplate",
    "method": "DELETE",
    "path": "/api/subscription-templates/{uuid}",
    "kind": "write",
    "summary": "Delete subscription template",
    "parameters": [
      {
        "name": "uuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "subscriptions_get_all_subscriptions",
    "operationId": "SubscriptionsController_getAllSubscriptions",
    "method": "GET",
    "path": "/api/subscriptions",
    "kind": "read",
    "summary": "Get all subscriptions",
    "parameters": [
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of subscriptions to return, no more than 500",
        "schema": {
          "minimum": 1,
          "maximum": 500,
          "default": 25,
          "type": "number"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Start index (offset) of the users to return, default is 0",
        "schema": {
          "default": 0,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "subscriptions_get_subscription_by_uuid",
    "operationId": "SubscriptionsController_getSubscriptionByUuid",
    "method": "GET",
    "path": "/api/subscriptions/by-id/{userId}",
    "kind": "read",
    "summary": "Get subscription by User ID",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "User ID",
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "subscriptions_get_subscription_by_short_uuid_protected",
    "operationId": "SubscriptionsController_getSubscriptionByShortUuidProtected",
    "method": "GET",
    "path": "/api/subscriptions/by-short-uuid/{shortUuid}",
    "kind": "read",
    "summary": "Get subscription by short uuid (protected route)",
    "parameters": [
      {
        "name": "shortUuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "subscriptions_get_raw_subscription_by_short_uuid",
    "operationId": "SubscriptionsController_getRawSubscriptionByShortUuid",
    "method": "GET",
    "path": "/api/subscriptions/by-short-uuid/{shortUuid}/raw",
    "kind": "read",
    "summary": "Get Raw Subscription by Short UUID",
    "parameters": [
      {
        "name": "shortUuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "withDisabledHosts",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "default": "false",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "subscriptions_get_subscription_by_username",
    "operationId": "SubscriptionsController_getSubscriptionByUsername",
    "method": "GET",
    "path": "/api/subscriptions/by-username/{username}",
    "kind": "read",
    "summary": "Get subscription by username",
    "parameters": [
      {
        "name": "username",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "Username",
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "subscriptions_get_connection_keys_by_user_id",
    "operationId": "SubscriptionsController_getConnectionKeysByUserId",
    "method": "GET",
    "path": "/api/subscriptions/connection-keys/{userId}",
    "kind": "read",
    "summary": "Get connection keys (base64 format) by user id",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "description": "User ID",
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "subscriptions_get_subpage_config_by_short_uuid",
    "operationId": "SubscriptionsController_getSubpageConfigByShortUuid",
    "method": "GET",
    "path": "/api/subscriptions/subpage-config/{shortUuid}",
    "kind": "read",
    "summary": "Get Subpage Config by Short UUID",
    "parameters": [
      {
        "name": "shortUuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/GetSubpageConfigByShortUuidBodyDto"
      }
    }
  },
  {
    "name": "system_get_configuration",
    "operationId": "SystemController_getConfiguration",
    "method": "GET",
    "path": "/api/system/configuration",
    "kind": "read",
    "summary": "Get Remnawave Configuration",
    "description": "Returns some of the configuration values.",
    "parameters": []
  },
  {
    "name": "system_get_remnawave_health",
    "operationId": "SystemController_getRemnawaveHealth",
    "method": "GET",
    "path": "/api/system/health",
    "kind": "read",
    "summary": "Get Remnawave Health",
    "parameters": []
  },
  {
    "name": "system_get_metadata",
    "operationId": "SystemController_getMetadata",
    "method": "GET",
    "path": "/api/system/metadata",
    "kind": "read",
    "summary": "Get Remnawave Information",
    "parameters": []
  },
  {
    "name": "system_get_nodes_metrics",
    "operationId": "SystemController_getNodesMetrics",
    "method": "GET",
    "path": "/api/system/nodes/metrics",
    "kind": "read",
    "summary": "Get Nodes Metrics",
    "parameters": []
  },
  {
    "name": "system_get_stats",
    "operationId": "SystemController_getStats",
    "method": "GET",
    "path": "/api/system/stats",
    "kind": "read",
    "summary": "Get Stats",
    "parameters": []
  },
  {
    "name": "system_get_bandwidth_stats",
    "operationId": "SystemController_getBandwidthStats",
    "method": "GET",
    "path": "/api/system/stats/bandwidth",
    "kind": "read",
    "summary": "Get Bandwidth Stats",
    "parameters": [
      {
        "name": "tz",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "system_get_stats_digest",
    "operationId": "SystemController_getStatsDigest",
    "method": "GET",
    "path": "/api/system/stats/digest",
    "kind": "read",
    "summary": "Get Stats Digest",
    "description": "Aggregated statistics for a datetime range [start, end): created and expired users, total traffic, traffic spent by users created within the range and new HWID devices. Per-user traffic history is stored with daily granularity (UTC), so the \"traffic by new users\" metric snaps to whole days at the range edges.",
    "parameters": [
      {
        "name": "end",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "End of the range, ISO 8601 datetime with timezone (e.g. 2026-07-16T00:00:00Z). Exclusive.",
        "schema": {
          "format": "date-time",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d)))$",
          "type": "string"
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": true,
        "style": "form",
        "explode": true,
        "description": "Start of the range, ISO 8601 datetime with timezone (e.g. 2026-07-15T00:00:00Z). Inclusive.",
        "schema": {
          "format": "date-time",
          "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d)))$",
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "system_get_http_stats",
    "operationId": "SystemController_getHttpStats",
    "method": "GET",
    "path": "/api/system/stats/http",
    "kind": "read",
    "summary": "Get HTTP Stats",
    "parameters": []
  },
  {
    "name": "system_get_nodes_statistics",
    "operationId": "SystemController_getNodesStatistics",
    "method": "GET",
    "path": "/api/system/stats/nodes",
    "kind": "read",
    "summary": "Get Nodes Statistics",
    "parameters": []
  },
  {
    "name": "system_get_recap",
    "operationId": "SystemController_getRecap",
    "method": "GET",
    "path": "/api/system/stats/recap",
    "kind": "read",
    "summary": "Get Recap",
    "parameters": []
  },
  {
    "name": "system_debug_srr_matcher",
    "operationId": "SystemController_debugSrrMatcher",
    "method": "POST",
    "path": "/api/system/testers/srr-matcher",
    "kind": "write",
    "summary": "Test SRR Matcher",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/DebugSrrMatcherBodyDto"
      }
    }
  },
  {
    "name": "system_get_x25519_keypairs",
    "operationId": "SystemController_getX25519Keypairs",
    "method": "GET",
    "path": "/api/system/tools/x25519/generate",
    "kind": "read",
    "summary": "Generate 30 X25519 keypairs",
    "parameters": []
  },
  {
    "name": "users_get_users",
    "operationId": "UsersController_getUsers",
    "method": "GET",
    "path": "/api/users",
    "kind": "read",
    "summary": "Get all users using offset-based pagination",
    "description": "Please note that the filters here are primarily intended for use by the frontend and rely on expensive operators such as LIKE under the hood. Misusing these filters may negatively impact the performance of your database.",
    "parameters": [
      {
        "name": "filterModes",
        "in": "query",
        "required": false,
        "style": "deepObject",
        "explode": false,
        "schema": {
          "additionalProperties": {
            "type": "string"
          },
          "type": "object"
        }
      },
      {
        "name": "filters",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "value": {}
            },
            "required": [
              "id",
              "value"
            ]
          }
        }
      },
      {
        "name": "globalFilterMode",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of results to return, no more than 1000",
        "schema": {
          "minimum": 1,
          "maximum": 1000,
          "default": 25,
          "type": "number"
        }
      },
      {
        "name": "sorting",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "desc": {
                "type": "boolean"
              }
            },
            "required": [
              "id",
              "desc"
            ]
          }
        }
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Start index (offset) of the results to return, default is 0",
        "schema": {
          "default": 0,
          "type": "number"
        }
      }
    ]
  },
  {
    "name": "users_create_user",
    "operationId": "UsersController_createUser",
    "method": "POST",
    "path": "/api/users",
    "kind": "write",
    "summary": "Create a new user",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/CreateUserBodyDto"
      }
    }
  },
  {
    "name": "users_update_user",
    "operationId": "UsersController_updateUser",
    "method": "PATCH",
    "path": "/api/users",
    "kind": "write",
    "summary": "Update a user",
    "description": "Update a user by ID or username. Exactly one of the fields must be provided.",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/UpdateUserBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_all_extend_expiration_date",
    "operationId": "UsersBulkActionsController_bulkAllExtendExpirationDate",
    "method": "POST",
    "path": "/api/users/bulk/all/extend-expiration-date",
    "kind": "write",
    "summary": "Extend expiration date for all users by days",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkAllExtendExpirationDateBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_all_reset_user_traffic",
    "operationId": "UsersBulkActionsController_bulkAllResetUserTraffic",
    "method": "POST",
    "path": "/api/users/bulk/all/reset-traffic",
    "kind": "write",
    "summary": "Reset user used traffic for all users",
    "parameters": []
  },
  {
    "name": "users_bulk_actions_bulk_update_all_users",
    "operationId": "UsersBulkActionsController_bulkUpdateAllUsers",
    "method": "POST",
    "path": "/api/users/bulk/all/update",
    "kind": "write",
    "summary": "Bulk update all users",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkAllUpdateUsersBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_delete_users",
    "operationId": "UsersBulkActionsController_bulkDeleteUsers",
    "method": "POST",
    "path": "/api/users/bulk/delete",
    "kind": "write",
    "summary": "Bulk delete users by User IDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkDeleteUsersBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_delete_users_by_status",
    "operationId": "UsersBulkActionsController_bulkDeleteUsersByStatus",
    "method": "POST",
    "path": "/api/users/bulk/delete-by-status",
    "kind": "write",
    "summary": "Bulk delete users by status",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkDeleteUsersByStatusBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_extend_expiration_date",
    "operationId": "UsersBulkActionsController_bulkExtendExpirationDate",
    "method": "POST",
    "path": "/api/users/bulk/extend-expiration-date",
    "kind": "write",
    "summary": "Extend expiration date for specified users by days",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkExtendExpirationDateBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_reset_user_traffic",
    "operationId": "UsersBulkActionsController_bulkResetUserTraffic",
    "method": "POST",
    "path": "/api/users/bulk/reset-traffic",
    "kind": "write",
    "summary": "Bulk reset traffic users by User IDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkResetTrafficUsersBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_revoke_users_subscription",
    "operationId": "UsersBulkActionsController_bulkRevokeUsersSubscription",
    "method": "POST",
    "path": "/api/users/bulk/revoke-subscription",
    "kind": "write",
    "summary": "Revoke users subscription by User IDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkRevokeUsersSubscriptionBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_update_users",
    "operationId": "UsersBulkActionsController_bulkUpdateUsers",
    "method": "POST",
    "path": "/api/users/bulk/update",
    "kind": "write",
    "summary": "Bulk update users by User IDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkUpdateUsersBodyDto"
      }
    }
  },
  {
    "name": "users_bulk_actions_bulk_update_users_internal_squads",
    "operationId": "UsersBulkActionsController_bulkUpdateUsersInternalSquads",
    "method": "POST",
    "path": "/api/users/bulk/update-squads",
    "kind": "write",
    "summary": "Bulk update users internal squads by User IDs",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/BulkUpdateUsersSquadsBodyDto"
      }
    }
  },
  {
    "name": "users_get_user_by_short_uuid",
    "operationId": "UsersController_getUserByShortUuid",
    "method": "GET",
    "path": "/api/users/by-short-uuid/{shortUuid}",
    "kind": "read",
    "summary": "Get user by Short UUID",
    "parameters": [
      {
        "name": "shortUuid",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "users_get_user_by_username",
    "operationId": "UsersController_getUserByUsername",
    "method": "GET",
    "path": "/api/users/by-username/{username}",
    "kind": "read",
    "summary": "Get user by username",
    "parameters": [
      {
        "name": "username",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
        }
      }
    ]
  },
  {
    "name": "users_resolve_user",
    "operationId": "UsersController_resolveUser",
    "method": "POST",
    "path": "/api/users/resolve",
    "kind": "read",
    "summary": "Resolve a user",
    "description": "Resolve a user by ID, Short UUID or username. Exactly one of the fields must be provided.",
    "parameters": [],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ResolveUserBodyDto"
      }
    }
  },
  {
    "name": "users_get_users_stream",
    "operationId": "UsersController_getUsersStream",
    "method": "GET",
    "path": "/api/users/stream",
    "kind": "read",
    "summary": "Get all users using cursor-based (keyset) pagination with filtering options",
    "parameters": [
      {
        "name": "cursor",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Cursor for pagination — pass the nextCursor from the previous response. Omit on the first request.",
        "schema": {
          "type": "number"
        }
      },
      {
        "name": "email",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Email to filter users by",
        "schema": {
          "format": "email",
          "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$",
          "type": "string"
        }
      },
      {
        "name": "externalSquadUuid",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "External squad UUID to filter users by",
        "schema": {
          "format": "uuid",
          "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$",
          "type": "string"
        }
      },
      {
        "name": "size",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Number of results to return, no more than 1000",
        "schema": {
          "minimum": 1,
          "maximum": 1000,
          "default": 250,
          "type": "number"
        }
      },
      {
        "name": "status",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Status to filter users by",
        "schema": {
          "type": "string",
          "enum": [
            "ACTIVE",
            "DISABLED",
            "LIMITED",
            "EXPIRED"
          ]
        }
      },
      {
        "name": "tag",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Tag to filter users by",
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "telegramId",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Telegram ID to filter users by",
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "trafficLimitStrategy",
        "in": "query",
        "required": false,
        "style": "form",
        "explode": true,
        "description": "Traffic limit strategy to filter users by",
        "schema": {
          "type": "string",
          "enum": [
            "NO_RESET",
            "DAY",
            "WEEK",
            "MONTH",
            "MONTH_ROLLING"
          ]
        }
      }
    ]
  },
  {
    "name": "users_get_users_tags",
    "operationId": "UsersController_getUsersTags",
    "method": "GET",
    "path": "/api/users/tags",
    "kind": "read",
    "summary": "Get users tags",
    "parameters": []
  },
  {
    "name": "users_get_user_by_id",
    "operationId": "UsersController_getUserById",
    "method": "GET",
    "path": "/api/users/{userId}",
    "kind": "read",
    "summary": "Get user by ID",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "users_delete_user",
    "operationId": "UsersController_deleteUser",
    "method": "DELETE",
    "path": "/api/users/{userId}",
    "kind": "write",
    "summary": "Delete user",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "users_get_user_accessible_nodes",
    "operationId": "UsersController_getUserAccessibleNodes",
    "method": "GET",
    "path": "/api/users/{userId}/accessible-nodes",
    "kind": "read",
    "summary": "Get user accessible nodes",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "users_disable_user",
    "operationId": "UsersController_disableUser",
    "method": "POST",
    "path": "/api/users/{userId}/actions/disable",
    "kind": "write",
    "summary": "Disable user",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "users_enable_user",
    "operationId": "UsersController_enableUser",
    "method": "POST",
    "path": "/api/users/{userId}/actions/enable",
    "kind": "write",
    "summary": "Enable user",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "users_extend_user_expiration_date",
    "operationId": "UsersController_extendUserExpirationDate",
    "method": "POST",
    "path": "/api/users/{userId}/actions/extend",
    "kind": "write",
    "summary": "Extend user expiration date",
    "description": "If user status is EXPIRED, the new expiration date is calculated from the current date and the user becomes ACTIVE. If user status is ACTIVE, the given number of days is added to the existing expiration date. DISABLED and LIMITED users will be extended, but their status will not change.",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/ExtendUserBodyDto"
      }
    }
  },
  {
    "name": "users_reset_user_traffic",
    "operationId": "UsersController_resetUserTraffic",
    "method": "POST",
    "path": "/api/users/{userId}/actions/reset-traffic",
    "kind": "write",
    "summary": "Reset user traffic",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  },
  {
    "name": "users_revoke_user_subscription",
    "operationId": "UsersController_revokeUserSubscription",
    "method": "POST",
    "path": "/api/users/{userId}/actions/revoke",
    "kind": "write",
    "summary": "Revoke user subscription",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ],
    "requestBody": {
      "required": true,
      "schema": {
        "$ref": "#/components/schemas/RevokeUserSubscriptionBodyDto"
      }
    }
  },
  {
    "name": "users_get_user_subscription_request_history",
    "operationId": "UsersController_getUserSubscriptionRequestHistory",
    "method": "GET",
    "path": "/api/users/{userId}/subscription-request-history",
    "kind": "read",
    "summary": "Get user subscription request history, recent 24 records",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "exclusiveMinimum": true,
          "type": "number",
          "minimum": 0
        }
      }
    ]
  }
];
