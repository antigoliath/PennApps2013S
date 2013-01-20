function python_skeleton(json)
{
	var body = JSON.parse(json)
	var class_string = ""
	var _warnings = []

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

	//get interfaces info if exists
	var interfaces = body.interfaces
	var int_names = []
	var intmethods = []
	if(interfaces[0])
	{
		for(var i in interfaces)
		{
			parent.push(interfaces[i].name)
			if(interfaces[i].methods[0])
			{
				for(var j in interfaces[i].methods)
				{
					methods.push(interfaces[i].methods[j])
				}
			}
		}
	}

	//build the parents array before creating string in ruby,
	//treating interfaces like parents because there are no interfaces
	if (parent)
	{
		var parname = " extends " + parent.join(", ")
	}

	//build the string
	class_string = class_string + "# " + description + "\n" + "class "
	class_string = class_string + name + parname  + "\n"

	//build constructor
	class_string = class_string + "\t" + python_constructor(attributes)

	if(methods){
		for(var xy in methods)
		{
			class_string = class_string + "\t" + python_method_string(methods[xy])
		}
	}
	if(intmethods[0]){
		for(var xy in intmethods)
		{
			class_string = class_string + "\t" + python_method_string(intmethods[xy])
		}
	}

	return {class: class_string, warnings: _warnings}
}

function python_attr_string(attr)
{
	var attr_scope = ""
	if(attr.scope == "private")
	{
		attr_scope = "attr_reader "
	}
	else
	{
		attr_scope = "attr_accessor "
	}
	return attr_scope + " :" + attr.name + "\n"
}

function python_method_string(method)
{
	var arguments = ["self"]
	for(var xy in method.args)
	{
		arguments.push(method.args[xy].name)
	}
	var argument_string = arguments.join(", ")

	return "def "+ method.name + "(" +
		argument_string + ")\n\t\t# " + method.description + "\n\t\t#TODO\n\n"
}

function python_constructor(attr)
{
	var arguments = ["self"]
	var initialize_string = []
	if(attr[0])
	{
		for(var xy in attr)
		{
			arguments.push(attr[xy].name)
			initialize_string.push("self"+"."+attr[xy].name+" = "+attr[xy].name)
		}
	}
	return "def __init__(" + arguments.join(", ") + ")\n\t\t#Constructor\n\t\t" +
		initialize_string.join("\n\t\t") + "\n\n"
}