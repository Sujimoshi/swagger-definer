import { Schema } from "swagger-schema-official";

export default class Definition {
  definition: Schema = { required: [], properties: {} }
  name: string

  static Types: { [s: string]: { type: string, format?: string } } = {
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
  }

  constructor(name: string) {
    this.name = name
  }

  static resolveType(type: string | Schema): Schema {
    if (typeof type === "object") return type
    if (type[0] === "#") return { $ref: type }
    return Definition.Types[type]
  }

  property(
    name: string,
    type: string | Schema,
    description: string = "",
    required: boolean = true,
  ): Definition {
    if (required) this.definition.required.push(name)
    this.definition.properties[name] = {
      ...Definition.resolveType(type),
      description,
    }
    return this
  }

  toJSON() {
    return this.definition
  }
}
