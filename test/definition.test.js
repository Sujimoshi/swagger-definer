const { assert } = require("chai")
const Definition = require("../src/definition")

describe("Definition class tester", () => {
  it("Should correctly resolve types", () => {
    const arraySchema = { type: "array", items: { type: "string" } }
    assert.deepEqual(Definition.resolveType("string"), { type: "string" })
    assert.equal(Definition.resolveType(arraySchema), arraySchema)
    assert.deepEqual(Definition.resolveType("#/definitions/User"), { $ref: "#/definitions/User" })
    assert.deepEqual(Definition.resolveType("long"), { type: "integer", format: "int64" })
  })
})
