const { assert } = require("chai")
const Path = require("../src/path")

describe("Path class tester", () => {
  it("#parseType - should correctly map type to schema", () => {
    const definition = "#/definitions/User"
    assert.deepEqual(Path.parseSchema(definition), { $ref: definition })
    assert.deepEqual(Path.parseSchema("[#/definitions/User]"), { type: "array", items: { $ref: definition } })
    assert.deepEqual(Path.parseSchema("[string]"), { type: "array", items: { type: "string" } })
    assert.deepEqual(Path.parseSchema("string"), { type: "string" })
    assert.deepEqual(Path.parseSchema({ $ref: definition }), { $ref: definition })
  })
})
