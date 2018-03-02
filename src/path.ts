import { Operation, ExternalDocs, Parameter, Security, Response, Schema, Path as SwgPath, Header } from "swagger-schema-official"
import { parseSchema } from "./types"

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

  parameter(name: string, place: string, schema: string|Schema, required: boolean = true, description?: string): Path {
    schema = parseSchema(schema)
    this.operation.parameters.push({
      name, in: place, description, required, schema,
    })
    return this
  }

  response(responseName: string, description: string, schema: string|Schema, headers?: { [headerName: string]: Header }): Path {
    schema = parseSchema(schema)
    this.operation.responses[responseName] = {
      description, headers, schema,
    }
    return this
  }

  security(name: string, scopes: string[] = []): Path {
    this.operation.security.push({ [name]: scopes } as any)
    return this
  }

  toJSON() {
    return this.operation
  }
}
