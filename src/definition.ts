import { Schema } from "swagger-schema-official"
import { parseSchema } from "./types"

export default class Definition {
  definition: Schema = { required: [], properties: {} }
  name: string

  constructor(name: string) {
    this.name = name
  }

  property(
    name: string,
    type: string | Schema,
    description: string = "",
    required: boolean = true,
    example: any = ""
  ): Definition {
    if (required) this.definition.required.push(name)
    this.definition.properties[name] = {
      ...parseSchema(type),
      description,
      example
    }
    return this
  }

  toJSON() {
    return this.definition
  }
}
