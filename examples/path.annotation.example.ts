import Annotations from "../src/annotations"
import Swagger from "../src/swagger"

const {path, parameter, response} = Annotations(new Swagger("example.com", "/api"))

// Annotations not working without class
class UserController {

  @path("/user", "post", "createUser", ["user"], "Create user")
  @parameter("body", "body", "string", true, "User instance")
  @response("200", "Success", "string")
  @response("default", "Error", "string")
  create() {
    console.log('User created')
  }

}