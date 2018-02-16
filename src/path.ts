import { Operation, ExternalDocs, Parameter, Security, Response, Schema, Path as SwgPath, Header } from "swagger-schema-official";

/**
 * @request(post, /api/user) Create user
 * @parameter?(user, body, array, #/definitions/User) User parameter
 * @response(200, object, #/definitions/User) Success
 * @response(default, #/definitions/Error) Error
 */

export default class Path {
  operation: Operation
  path: string
  method: string

  constructor(
    path: string,
    method: string,
    operationId: string,
    tags: string[] = [],
    description = "",
    produces?: string[],
    consumes?: string[],
  ) {
    this.path = path
    this.method = method
    this.operation = {
      produces,
      consumes,
      description,
      operationId,
      tags,
      parameters: [],
      responses: {},
      security: []
    }
  }

  static parseSchema(schema: string|Schema): Schema {
    if (typeof schema !== "string") return schema
    const match = schema.match(/^(\[?)(.+?)(\]?)$/)
    const type = match[2]
    const typeKey = type[0] === "#" ? "$ref" : "type"
    const isArray = match[1] === "[" && match[3] === "]"
    const resultType = { [typeKey]: type }
    return isArray ? { type: "array", items: resultType } : resultType
  }

  parameter(name: string, place: string, schema: string|Schema, required: boolean = true, description?: string): Path {
    schema = Path.parseSchema(schema)
    this.operation.parameters.push({
      name, in: place, description, required, schema,
    })
    return this
  }

  response(responseName: string, description: string, schema: string|Schema, headers?: { [headerName: string]: Header }): Path {
    schema = Path.parseSchema(schema)
    this.operation.responses[responseName] = {
      description, headers, schema,
    }
    return this
  }

  security(name: string, scopes: string[] = []) {
    this.operation.security.push({ [name]: scopes } as any)
  }

  toJSON() {
    return this.operation
  }
}
