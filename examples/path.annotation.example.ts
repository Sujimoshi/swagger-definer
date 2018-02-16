import Annotations from "../src/annotations"
import Swagger from "../src/swagger"

const {path, parameter, response} = Annotations(new Swagger("example.com", "/api"))

class UserController {
  @path("/user", "post", "createUser", ["user"], "Create user")
  @parameter("body", "body", "string", true, "User instance")
  @response("default", "Success", "string")
  create() {
    console.log('User created')
  }
}