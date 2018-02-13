/**
 * @request(post, /api/user) Create user
 * @parameter?(user, body, array, #/definitions/User) User parameter
 * @response(200, object, #/definitions/User) Success
 * @response(default, #/definitions/Error) Error
 */

class Path {
  constructor(
    path,
    type,
    operationId,
    tags = [],
    description = "",
    produces,
    consumes,
  ) {
    this.path = path
    this.type = type
    this.produces = produces
    this.consumes = consumes
    this.description = description
    this.operationId = operationId
    this.tags = tags
    this.parameters = []
    this.responses = {}
  }

  static parseSchema(schema) {
    if (typeof schema !== "string") return schema
    const match = schema.match(/^(\[?)(.+?)(\]?)$/)
    const type = match[2]
    const typeKey = type[0] === "#" ? "$ref" : "type"
    const isArray = match[1] === "[" && match[3] === "]"
    const resultType = { [typeKey]: type }
    return isArray ? { type: "array", items: resultType } : resultType
  }

  parameter(name, place, schema, required, description) {
    schema = Path.parseSchema(schema)
    this.parameters.push({
      name, in: place, description, required, ...schema,
    })
    return this
  }

  response(status, description, schema, headers) {
    schema = Path.parseSchema(schema)
    this.responses[status] = {
      description,
      headers,
      schema,
    }
    return this
  }

  toJSON() {
    const {
      consumes,
      produces,
      tags,
      description,
      parameters,
      responses,
      operationId,
    } = this
    return {
      description,
      operationId,
      tags,
      consumes,
      produces,
      parameters,
      responses,
    }
  }
}

module.exports = Path
