import Swagger from "./swagger"
import Path from "./path"
import { Schema, Header } from "swagger-schema-official";
import Definition from "./definition";

export default (swagger: Swagger) => {
  let reflections: { data: any, key: string, target: any }[] = []
  return {
    path: (path: string, method: string, operationId: string, tags: string[] = [], description = "", produces?: string[], consumes?: string[]) =>
      (target: any, key: string, property: PropertyDescriptor) => {
        let found: any = reflections.find((el: any) => el.target === target && el.key === key)
        if(found === undefined) {
          found = { target: target, data: { responses: [], parameters: [] }, key } 
          reflections.push(found)        
        }
        const pathInstance: Path = swagger.path(path, method, operationId, tags, description, produces, consumes)
        found.data.parameters.forEach((el: any) => 
          pathInstance.parameter(el.name, el.place, el.schema, el.required, el.description))
        found.data.responses.forEach((el: any) => 
          pathInstance.response(el.responseName, el.description, el.schema, el.headers))
      },
    parameter: (name: string, place: string, schema: string|Schema, required: boolean = true, description?: string) =>
      (target: any, key: string, property: PropertyDescriptor) => {
        let found: any = reflections.find((el: any) => el.target === target && el.key === key)
        if(found === undefined) {
          found = { target: target, data: { responses: [], parameters: [] }, key } 
          reflections.push(found)
        }
        found.data.parameters.push({name, place, schema, required, description})
      },
    response: (responseName: string, description: string, schema: string|Schema, headers?: { [headerName: string]: Header }) =>
      (target: any, key: string, property: PropertyDescriptor) => {
        let found: any = reflections.find((el: any) => el.target === target && el.key === key)
        if(found === undefined) {
          found = { target: target, data: { responses: [], parameters: [] }, key } 
          reflections.push(found)    
        }
        found.data.responses.push({responseName, description, schema, headers})
      },

    definition: (name: string): any => 
      (target: any) => {
        let found: any = reflections.find((el: any) => el.target === target.prototype)
        if(found === undefined) {
          found = { target: target, data: { definitions: [] } } 
          reflections.push(found)        
        }                   
        const definitionInstance: Definition = swagger.definition(name)
        found.data.definitions.forEach((el: any) => definitionInstance.property(el.name, el.type, el.description, el.required))
      },
    property: (name: string, type: string | Schema, description: string = "", required: boolean = true): any => 
      (target: any, key: string, property: PropertyDescriptor) => {
        let found: any = reflections.find((el: any) => el.target === target)
        if(found === undefined) {
          found = { target: target, data: { definitions: [] } } 
          reflections.push(found)
        }
        found.data.definitions.push({ name, type, description, required })
      }
  }
}