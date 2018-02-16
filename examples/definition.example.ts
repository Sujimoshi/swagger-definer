import Annotations from "../src/annotations"
import Swagger from "../src/swagger"

const { definition, property } = Annotations(new Swagger("example.com", "/api"))

@definition("User")
class User {

  @property("name", "string", "User name", true)
  name: string = "Igor"
}