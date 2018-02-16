import Annotations from "../src/annotations"
import Swagger from "../src/swagger"

const { definition, property } = new Swagger("example.com", "/api").annotations()

@definition("User")
class User {

  @property("name", "string", "User name", true)
  name: string = "Igor"
}