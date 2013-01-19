function java_skeleton(json)
{
	var body = JSON.parse(json)
	var class_string = ""

	//get class info
	var _class =  body.class
	var id = _class.id
	var name = _class.name
	var description = _class.description
	var attributes = _class.attributes
	console.log(attributes)

	//get methods
	var methods = body.methods

	//get parent info if exists
	var parent = _class.parent
	var parname = ""
	if (parent)
	{
		var parname = " extends " + parent + " "
	}

	//get interfaces info if exists
	var interfaces = body.interfaces
	var int_names = []
	var intmethods = []
	for(var i in interfaces)
	{
		int_names.push(interfaces[i].name)
		intmethods.concat(interfaces[i].methods)
	}

	//build the string
	class_string = class_string + "/* " + description + " */\n" + "public class "
	class_string = class_string + name + parname + int_names.join(", ") + " {\n"
	if(attributes){
		for(var xy in attributes)
		{
			alert(xy)
			class_string = class_string + "\t" + attr_string(attributes[xy])
		}
	}
	if(methods){
		for(var xy in methods)
		{
			class_string = class_string + "\t" + javadoc(methods[xy])
			class_string = class_string + "\t" + method_string(methods[xy])
		}
	}
	if(intmethods[0]){
		for(var xy in intmethods)
		{
			class_string = class_string + "\t" + javadoc(intmethods[xy])
			class_string = class_string + "\t" + method_string(intmethods[xy])
		}
	}

	class_string = class_string + "\n}"
	return class_string
}

function attr_string(attr)
{
	return attr.scope + " " + attr.type + " " + attr.name + ";\n"
}

function method_string(method)
{
	var arguments = []
	for(var xy in method.args)
	{
		arguments.push(method.args[xy].type + " " + method.args[xy].name)
	}
	var argument_string = arguments.join(", ")

	return method.scope + " " + method.ret + " " + method.name + "(" +
		argument_string + ")\n{\t//TODO\n}\n"
}

function javadoc(method)
{
	var retstring = "/* \n"
	retstring = retstring + "* " + method.description + "\n"
	for(var xy in method.args)
	{
		retstring = retstring + "* " + "@param " + method.args[xy].name + " " + 
		method.args[xy].description + "\n"
	}
	retstring = retstring + "* " + "@return " +  method.ret + "\n*/"
	return retstring
}