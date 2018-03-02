import Swagger from "../src/swagger"
import { ApiKeySecurity } from "swagger-schema-official";

describe("Swagger definition test", () => {
  it("should create valid definition", (done: () => {}) => {
    const swg = new Swagger("petstore.swagger.io", "/v2")
    swg.tag("user", "User operations")
    const jwt: ApiKeySecurity = {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT Auth"
    }
    swg.security("jwt", jwt)

    // Error definition
    const error = swg.definition("Error")
    error.property("message", "string", "Error message", true, "Unexpected server error")

    // User definition
    const user = swg.definition("User")
    user.property("name", "string")

    // Path definition
    const userGet = swg.path("/user", "get", "readUser")
    userGet.parameter("limit", "query", "integer", false, "Number of users to recive")
    userGet.response("200", "Success", "#/definitions/User")
    userGet.response("default", "Error response", "#/definitions/Error")

    // Path definition
    const userPost = swg.path("/user", "post", "readUser", ["user"], "Add user")
    userPost.parameter("limit", "query", "integer", false, "Number of users to recive")
    userPost.response("200", "Success", "#/definitions/User")
    userPost.response("default", "Error response", "#/definitions/Error")
    userPost.security("jwt")

    swg.validate().then(() => {
      done()
    }).catch(done)
  })
})
