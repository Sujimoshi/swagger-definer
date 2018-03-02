import { Schema } from "swagger-schema-official"

export const TYPES: { [s: string]: { type: string, format?: string } } = {
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

export const parseSchema = (schema: string | Schema): Schema => {
  if (typeof schema !== "string") return schema
  const match = schema.match(/^(\[?)(.+?)(\]?)$/)
  const type = match[2]
  const isArray = match[1] === "[" && match[3] === "]"
  const resultType = type[0] === "#" ? { "$ref": type } : TYPES[type]
  return isArray ? { type: "array", items: resultType } : resultType
}