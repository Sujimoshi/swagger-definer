import { bundle } from "swagger-parser"
import { Spec, Info, ExternalDocs, Schema, BodyParameter, QueryParameter, Security, Tag } from "swagger-schema-official"

import Definition from "./definition"
import Path from "./path"

export default class Swagger {
  spec: Spec
  reflections: any[] = []

  constructor(
    host: string,
    basePath: string,
    title: string = "",
    description: string = "",
    version: string = "1.0.0",
    consumes: string[] = ["application/json"],
    produces: string[] = ["application/json"],
    schemes: string[] = ["http", "https"],
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
      consumes,
      produces,
      paths: {},
      definitions: {},
      tags: [],
      securityDefinitions: {}
    }
  }

  tag(name: string, description: string): Swagger  {
    this.spec.tags.push({ name, description })
    return this
  }

  definition(name: string): Definition {
    const def = new Definition(name)
    this.spec.definitions[name] = def.toJSON()
    return def
  }

  path(
    path: string,
    type: string,
    operationId: string,
    tags: string[] = [],
    description: string = "",
    produces?: string[],
    consumes?: string[],
  ): Path {
    const newPath = new Path(path, type, operationId, tags, description, produces, consumes)
    this.spec.paths[path] = { ...this.spec.paths[path], ...{ [type]: newPath.toJSON() } }
    return newPath
  }

  security(name: string, securityDefinition: Security) {
    this.spec.securityDefinitions[name] = securityDefinition
  }

  validate() {
    return bundle(this.toJSON())
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.spec))
  }
}
