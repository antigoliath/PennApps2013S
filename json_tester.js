var attr = new Object()
attr.name = "id"
attr.scope = "private"
attr.type = "int"
attr.description = "The Id in the database"

var obj = new Object()
obj.name = "class1"
obj.id = "1234567"
obj.project = "asdf"
obj.description = "Hey look at me"
obj.parent = "Comparable"
obj.attributes = [attr]

var args = new Object()
args.name = "comment"
args.type = "String"
args.description = "The comment to add"

var method = new Object()
method.name = "doesSomething"
method.description = "Adds a comment to the class"
method.class = "1234567"
method.scope = "public"
method.ret = "int"
method.args = [args]

var bigjson = new Object()
bigjson.class = obj
bigjson.methods = [method]

var json_string = JSON.stringify(bigjson)