const Definition = require("./definition")
const Path = require("./path")
const SwaggerParser = require("swagger-parser")

class Swagger {
  constructor(
    host,
    basePath,
    title = "",
    description = "",
    version = "1.0.0",
    consumes = ["application/json"],
    produces = ["application/json"],
    schemes = ["http", "https"],
  ) {
    this.spec = {
      swagger: "2.0",
      info: {
        title,
        description,
        version,
      },
      host,
      basePath,
      schemes,
    }

    this.consumes = consumes
    this.produces = produces
    this.tags = []
    this.definitions = {}
    this.paths = {}
  }

  tag(name, description) {
    this.tags.push({ name, description })
    return this
  }

  definition(name) {
    const def = new Definition(name)
    this.definitions[name] = def
    return def
  }

  path(
    path,
    type,
    operationId,
    tags = [],
    description = "",
    produces,
    consumes,
  ) {
    const newPath = new Path(path, type, operationId, tags, description, produces, consumes)
    this.paths[path] = this.paths[path] || {}
    this.paths[path][type] = newPath
    return newPath
  }

  validate() {
    return SwaggerParser.bundle(this.toJSON())
  }

  toJSON() {
    const {
      spec, definitions, paths, tags, consumes, produces,
    } = this
    return JSON.parse(JSON.stringify({
      ...spec,
      paths,
      consumes,
      produces,
      definitions,
      tags,
    }))
  }
}

module.exports = Swagger
