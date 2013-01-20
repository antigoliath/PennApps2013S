var method = new Object()
method.name = "doesSomething"
method.description = "Adds a comment to the class"
method.class = "1234567"
method.scope = "public"
method.ret = "int"
method.args = [args]

var intmethod = new Object()
intmethod.name = "notDoneYet"
intmethod.description = "Implement this method please"
intmethod.class = "asdfgh"
intmethod.scope = "private"
intmethod.ret = "String"
intmethod.args = [args]

var attr = new Object()
attr.name = "id"
attr.scope = "private"
attr.type = "int"
attr.description = "The Id in the database"

var inter = new Object()
inter.name = "ImplementMe"
inter.id = "asdfgh"
inter.methods = [intmethod]

var obj = new Object()
obj.name = "class1"
obj.id = "1234567"
obj.project = "asdf"
obj.description = "Hey look at me"
obj.parent = ["Comparable"]
obj.attributes = [attr]

var args = new Object()
args.name = "comment"
args.type = "String"
args.description = "The comment to add"

var bigjson = new Object()
bigjson.class = obj
bigjson.methods = [method]
bigjson.interfaces = [inter]

var json_string = JSON.stringify(bigjson)