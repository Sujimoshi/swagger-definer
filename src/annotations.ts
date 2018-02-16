import Swagger from "./swagger"
import Path from "./path"
import { Schema, Header } from "swagger-schema-official";
import Definition from "./definition";

type ReflectionData = { target: any, key?: string, data: any }

export default (swagger: Swagger) => {
  let reflections: ReflectionData[] = []

  const findOrCreateReflection = (def: ReflectionData) => {
    let found = reflections.find((el: ReflectionData) => el.target === def.target && el.key === def.key)
    if(found === undefined) reflections.push(found = def)
    return found
  }

  const pathDefaultData: any = { responses: [], parameters: [], securities: [] }
  const definitionDefaultData: any = { definitions: [] }

  return {
    path: (path: string, method: string, operationId: string, tags: string[] = [], description = "", produces?: string[], consumes?: string[]) =>
      (target: any, key: string, property: PropertyDescriptor) => {
        let { data } = findOrCreateReflection({ target, key, data: pathDefaultData })
        const pathInstance: Path = swagger.path(path, method, operationId, tags, description, produces, consumes)
        data.parameters.forEach((el: any) => 
          pathInstance.parameter(el.name, el.place, el.schema, el.required, el.description))
        data.responses.forEach((el: any) => 
          pathInstance.response(el.responseName, el.description, el.schema, el.headers))
        data.securities.forEach((el: any) => 
          pathInstance.security(el.name, el.scopes))
      },
    parameter: (name: string, place: string, schema: string|Schema, required: boolean = true, description?: string) =>
      (target: any, key: string, property: PropertyDescriptor) => {
        let { data } = findOrCreateReflection({ target, key, data: pathDefaultData })
        data.parameters.push({name, place, schema, required, description})
      },
    response: (responseName: string, description: string, schema: string|Schema, headers?: { [headerName: string]: Header }) =>
      (target: any, key: string, property: PropertyDescriptor) => {
        let { data } = findOrCreateReflection({ target, key, data: pathDefaultData })
        data.responses.push({responseName, description, schema, headers})
      },
    security: (name: string, scopes: string[] = []) =>
      (target: any, key: string, property: PropertyDescriptor) => {
        let { data } = findOrCreateReflection({ target, key, data: pathDefaultData })
        data.securities.push({name, scopes})
      },

    definition: (name: string): any => (target: any) => {
        let { data } = findOrCreateReflection({ target: target.prototype, data: definitionDefaultData })
        const definitionInstance: Definition = swagger.definition(name)
        data.definitions.forEach((el: any) => definitionInstance.property(el.name, el.type, el.description, el.required))
      },
    property: (name: string, type: string | Schema, description: string = "", required: boolean = true): any => 
      (target: any, key: string, property: PropertyDescriptor) => {
        let { data } = findOrCreateReflection({ target, data: definitionDefaultData })
        data.definitions.push({ name, type, description, required })
      }
  }
}