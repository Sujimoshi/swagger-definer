# SWAGGER-DEFINER
> Document your api with ease

![enter image description here](https://s3.amazonaws.com/openshift-hub/production/quickstarts/243/nodejs_custom.png?1456926624) . . . .![enter image description here](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/100px-Heart_coraz%C3%B3n.svg.png) . . . . ![enter image description here](https://s.gravatar.com/avatar/c36e7e0d5554c4ab2d65e6c7caf68db3?size=100&default=retro)

##### SWAGGER-DEFINER is a simple node.js library for defining Swagger 2.0 Spec.

  - Simple API
  - Built-in validation
  - Use TypeScript Annotations or pure Javascript

## Installation
```sh
$ npm install swagger-definer
```
## Usage examples
```js
// swagger.js
export const swg = new Swagger("petstore.swagger.io", "/v2")
swg.tag("user", "User operations")
swg.security("jwt", {
  type: "apiKey",
  name: "Authorization",
  in: "header",
  description: "JWT Auth"
})

require("UserModel.js")
require("UserRoutes.js")

swg.validate().then(spec => { // Or simply call toJson() for skiping validation
    console.log(spec) // Or write to file
})
```
```js
// UserModel.js
import { swg } from "swagger.js"

// Using plain JS
swg.definition("User")
  .property("name", "string", "User name", true, "Igor")
class User {
    name: string
}

// Or using TypeScript annotations
const { definition, property } = swg.annotations()

@definition("User")
class User {
  @property("name", "string", "User name", true, "Igor")
  name: string = "Igor"
}
```
```js
// UserRoutes.js
import { swg } from "swagger.js"

// Using plain JS
swg.path("/user", "post", "createUsers", ["user"], "Create user")
  .parameter("body", "body", "[#/definitions/User]", true, "Array of users")
  .response("200", "Success", "string")
  .response("default", "Success", "string")
  .security("jwt")
function createListOfUsersAction() {
  console.log('User created')
}

// Or using TypeScript annotations
const { path, parameter, response, security } = swg.annotations()

// Annotations not working without class
class UserController {

  @path("/user", "post", "createUser", ["user"], "Create user")
  @parameter("body", "body", "#/definitions/User", true, "User instance")
  @response("200", "Success", "string")
  @response("default", "Error", "string")
  @security("jwt")
  create() {
    console.log('User created')
  }

}
```

## About types
```js
Definition.prototype.property(
    name: string, // Name of property
    type: string | Schema, // Type of property. allowed values:
        // {} - Swagger Schema object
        // "#/definitions/Model" - parses to "ModelReference" Schema
        // "[#/definitions/Model]" - parses to array of "ModelReferences" Schema
        // "[type]" - parses to array of "types" Schema
        // "type" - parses to parameter of "type" Schema
    description: string = "", // Description
    required: boolean = true, // Is required
    example: any = "" // Example value for UI
)
```
Types parsing table:
Common Name | [`type`](#dataTypeType) | [`format`](#dataTypeFormat) | Comments
----------- | ------ | -------- | --------
integer | `integer` | `int32` | signed 32 bits
long | `integer` | `int64` | signed 64 bits
float | `number` | `float` | |
double | `number` | `double` | |
string | `string` | | |
byte | `string` | `byte` | base64 encoded characters
binary | `string` | `binary` | any sequence of octets
boolean | `boolean` | | |
date | `string` | `date` | As defined by `full-date` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
dateTime | `string` | `date-time` | As defined by `date-time` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
password | `string` | `password` | Used to hint UIs the input needs to be obscured.
