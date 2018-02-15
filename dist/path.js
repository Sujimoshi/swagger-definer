"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @request(post, /api/user) Create user
 * @parameter?(user, body, array, #/definitions/User) User parameter
 * @response(200, object, #/definitions/User) Success
 * @response(default, #/definitions/Error) Error
 */
class Path {
    constructor(path, method, operationId, tags = [], description = "", produces, consumes) {
        this.path = path;
        this.method = method;
        this.operation = {
            produces,
            consumes,
            description,
            operationId,
            tags,
            parameters: [],
            responses: {}
        };
    }
    static parseSchema(schema) {
        if (typeof schema !== "string")
            return schema;
        const match = schema.match(/^(\[?)(.+?)(\]?)$/);
        const type = match[2];
        const typeKey = type[0] === "#" ? "$ref" : "type";
        const isArray = match[1] === "[" && match[3] === "]";
        const resultType = { [typeKey]: type };
        return isArray ? { type: "array", items: resultType } : resultType;
    }
    parameter(name, place, schema, required = true, description) {
        schema = Path.parseSchema(schema);
        this.operation.parameters.push({
            name, in: place, description, required, schema,
        });
        return this;
    }
    response(responseName, description, schema, headers) {
        schema = Path.parseSchema(schema);
        this.operation.responses[responseName] = {
            description, headers, schema,
        };
        return this;
    }
    toJSON() {
        return this.operation;
    }
}
exports.default = Path;
