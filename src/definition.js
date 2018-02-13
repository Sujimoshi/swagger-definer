class Definition {
  constructor(name) {
    this.name = name
    this.type = "object"

    this.properties = {}
    this.required = []
  }

  static resolveType(type) {
    if (typeof type === "object") return type
    if (type[0] === "#") return { $ref: type }
    return Definition.types[type]
  }

  /**
   * Name     type    format    Comments
   * integer  integer int32     signed 32 bits
   * long     integer int64     signed 64 bits
   * float    number  float
   * double   number  double
   * string   string
   * byte     string  byte      base64 encoded characters
   * binary   string  binary    any sequence of octets
   * boolean  boolean
   * date     string  date      As defined by full-date - RFC3339
   * dateTime string  date-time As defined by date-time - RFC3339
   * password string  password  Used to hint UIs the input needs to be obscured.
   *
   * @property { string } name
   * @property { Definition.types } type
  */
  property(
    name,
    type,
    required,
    description = "",
  ) {
    if (required) this.required.push(name)
    this.properties[name] = {
      ...Definition.resolveType(type),
      description,
    }
    return this
  }

  toJSON() {
    const { type, properties, required } = this
    return {
      type,
      properties,
      required,
    }
  }
}

/**
 * @readonly
 * @enum {object}
 */
Definition.types = {
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

module.exports = Definition
