import Swagger from "../src/swagger";

const swg: Swagger = new Swagger("example.com", "/api")

swg.definition("User")
  .property("name", "string", "User name", true)
class User {
  name: string
}