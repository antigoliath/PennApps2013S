exports.java_skeleton = function(json)
{
	var body = json
	var class_string = ""
	var _warnings = []

	//get class info
	var _class =  body.class
	var id = _class.id
	var name = _class.name
	var description = _class.description
	var attributes = _class.attributes

	//get methods
	var methods = body.methods
	console.log(methods)

	//get parent info if exists
	var parent = _class.parent
	var parname = ""
	if (parent)
	{
		var parname = " extends " + parent.join(", ")
	}

	//get interfaces info if exists
	var interfaces = body.interfaces
	var int_names = []
	var intmethods = []
	var intstring = ""
	if(interfaces[0])
	{
		for(var i in interfaces)
		{
			int_names.push(interfaces[i].name)
			if(interfaces[i].methods[0])
			{
				for(var j in interfaces[i].methods)
				{
					methods.push(interfaces[i].methods[j])
				}
			}
		}
		intstring = " implements " + int_names.join(", ")
	}

	//build the string
	class_string = class_string + "/* " + description + " */\n" + "public class "
	class_string = class_string + name + parname + intstring + " {\n"
	if(attributes){
		for(var xy in attributes)
		{
			class_string = class_string + "\t" + attr_string(attributes[xy], _warnings)
		}
	}
	//init constructor here
	class_string = class_string + "\n"+ java_constructor(_class)

	if(methods){
		for(var xy in methods)
		{
			class_string = class_string + "\t" + javadoc(methods[xy])
			class_string = class_string + "\t" + method_string(methods[xy], _warnings)
		}
	}
	class_string = class_string + "\n}"
	return {code: class_string, warnings: _warnings}
}

function attr_string(attr, warn)
{
	var attr_type = check_warnings(attr.type, warn)
	return attr.scope + " " + attr_type + " " + attr.name + ";\n"
}

function method_string(method, warn)
{
	var arguments = []
	for(var xy in method.args)
	{
		arguments.push(method.args[xy].type + " " + method.args[xy].name)
	}
	var argument_string = arguments.join(", ")
	var ret_type = check_warnings(method.ret, warn)

	return method.scope + " " + ret_type + " " + method.name + "(" +
		argument_string + ")\n\t{\n\t\t//TODO\n\t}\n"
}

function javadoc(method)
{
	var retstring = "\n\t/* \n"
	retstring = retstring + "\t* " + method.description + "\n"
	for(var xy in method.args)
	{
		retstring = retstring + "\t* " + "@param " + method.args[xy].name + " " + 
		method.args[xy].description + "\n"
	}
	retstring = retstring + "\t* " + "@return " +  method.ret + "\n\t*/\n"
	return retstring
}

function java_constructor(_class)
{
	var attr = []
	var initstring = []
	if(_class.attributes)
	{
		for(var a in _class.attributes)
		{
			attr.push(_class.attributes[a].type + " " +
				_class.attributes[a].name)
			initstring.push("self"+"."+_class.attributes[a].name+" = "+
				_class.attributes[a].name+";")
		}
	}

	return "\tpublic " + _class.name +"("+attr.join(", ")+
		"){\n\t\t"+initstring.join("\n\t\t")+"\n"+"\t}\n"
}

function check_warnings(name, warn)
{
	var types = ["int", "double", "float", "boolean", "char", "String",
		"long", "short"]
	for(var c in project.classes)
	{
		types.push(project.classes[c].name)
	}

	var attr_type = name.downcase

	if(attr_type.search("count") != 1 || attr_type.search("num") != 1 || attr_type.search("int") != -1)
	{
		attr_type = "int"
	}
	else if(attr_type.search("word") != -1 || attr_type.search("sentence") != -1 || attr_type.search("string") != -1)
	{
		attr_type = "String"
	}
	else if(attr_type.search("deci") != -1 || attr_type.search("double") != -1)
	{
		attr_type = "double"
	}
	else if(attr_type.search("bool") != -1 || attr_type.search("true") != -1 || attr_type.search("false") != 1)
	{
		attr_type = "boolean"
	}
	if(types.indexOf(attr_type) == -1)
	{
		warn.push("Unknown type " + attr_type + " could cause an error.")
	}
	return attr_type
}