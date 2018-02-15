"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Definition {
    constructor(name) {
        this.definition = { required: [], properties: {} };
        this.name = name;
    }
    static resolveType(type) {
        if (typeof type === "object")
            return type;
        if (type[0] === "#")
            return { $ref: type };
        return Definition.Types[type];
    }
    property(name, type, description = "", required = true) {
        if (required)
            this.definition.required.push(name);
        this.definition.properties[name] = Object.assign({}, Definition.resolveType(type), { description });
        return this;
    }
    toJSON() {
        return this.definition;
    }
}
Definition.Types = {
    integer: { type: "integer", format: "int32" },
    long: { type: "integer", format: "int64" },
    float: { type: "number", format: "float" },
    double: { type: "number", format: "double" },
    string: { type: "string" },
    byte: { type: "string", format: "byte" },
    binary: { type: "string", format: "binary" },
    boolean: { type: "boolean" },
    date: { type: "string", format: "date" },
    dateTime: { type: "string", format: "date-time" },
    password: { type: "string", format: "password" },
};
exports.default = Definition;
