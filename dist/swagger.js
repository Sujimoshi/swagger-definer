"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_parser_1 = require("swagger-parser");
const definition_1 = require("./definition");
const path_1 = require("./path");
class Swagger {
    constructor(host, basePath, title = "", description = "", version = "1.0.0", consumes = ["application/json"], produces = ["application/json"], schemes = ["http", "https"]) {
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
        };
    }
    tag(name, description) {
        this.spec.tags.push({ name, description });
        return this;
    }
    definition(name) {
        const def = new definition_1.default(name);
        this.spec.definitions[name] = def.toJSON();
        return def;
    }
    path(path, type, operationId, tags = [], description = "", produces, consumes) {
        const newPath = new path_1.default(path, type, operationId, tags, description, produces, consumes);
        this.spec.paths[path] = Object.assign({}, this.spec.paths[path], { [type]: newPath.toJSON() });
        return newPath;
    }
    validate() {
        return swagger_parser_1.bundle(this.toJSON());
    }
    toJSON() {
        return JSON.parse(JSON.stringify(this.spec));
    }
}
exports.default = Swagger;
