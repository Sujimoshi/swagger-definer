import { assert } from "chai"

import { parseSchema } from "../src/types"

describe("Types resolver tester", () => {
  it("Should correctly resolve types", () => {
    assert.deepEqual(parseSchema("[#/definitions/User]"), { type: "array", items: { $ref: "#/definitions/User" } })
    assert.deepEqual(parseSchema("#/definitions/User"), { $ref: "#/definitions/User" })
    assert.deepEqual(parseSchema({ $ref: "#/definitions/User" }), { $ref: "#/definitions/User" })
    assert.deepEqual(parseSchema("[string]"), { type: "array", items: { type: "string" } })
    assert.deepEqual(parseSchema("password"), { type: "string", format: "password" })
    assert.deepEqual(parseSchema("string"), { type: "string" })
    assert.deepEqual(parseSchema({ type: "array", items: { type: "string" } }), { type: "array", items: { type: "string" } })
    assert.deepEqual(parseSchema("long"), { type: "integer", format: "int64" })
  })
})
