import Swagger from "../src/swagger";

const swg: Swagger = new Swagger("example.com", "/api")

swg.path("/user", "post", "createUser", ["user"], "Create user")
.parameter("body", "body", "string", true, "User instance")
.response("default", "Success", "string")
function createUserAction() {
  console.log('User created')
}