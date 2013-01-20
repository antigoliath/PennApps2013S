export.ruby_skeleton = function(json)
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
		var parname = " < " + parent.join(", ")
	}

	//build the string
	class_string = class_string + "# " + description + "\n" + "class "
	class_string = class_string + name + parname  + "\n"
	if(attributes){
		for(var xy in attributes)
		{
			class_string = class_string + "\t" + ruby_attr_string(attributes[xy])
		}
	}

	//constructor setup here
	class_string = class_string + "\n"+ ruby_constructor(attributes)

	if(methods){
		for(var xy in methods)
		{
			class_string = class_string + "\t" + rubydoc(methods[xy])
			class_string = class_string + "\t" + ruby_method_string(methods[xy])
		}
	}
	if(intmethods[0]){
		for(var xy in intmethods)
		{
			class_string = class_string + "\t" + rubydoc(intmethods[xy])
			class_string = class_string + "\t" + ruby_method_string(intmethods[xy])
		}
	}

	class_string = class_string + "\nend"
	return class_string
}

function ruby_attr_string(attr)
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

function ruby_method_string(method)
{
	var arguments = []
	for(var xy in method.args)
	{
		arguments.push(method.args[xy].name)
	}
	var argument_string = arguments.join(", ")

	return "def "+ method.name + "(" +
		argument_string + ")\n\t\t#TODO\n\tend\n"
}

function rubydoc(method)
{
	var retstring = "\n\t# " + method.description + "\n"
	retstring = retstring + "\t# Params:\n"
	for(var xy in method.args)
	{
		retstring = retstring + "\t# " + "+" + method.args[xy].name + "+:: " + 
		method.args[xy].description + "\n"
	}
	return retstring
}

function ruby_constructor(attributes)
{
	var attr = []
	var initstring = []
	if(attributes[0])
	{
		for(var x in attributes)
		{
			attr.push(attributes[x].name)
			initstring.push("@"+attributes[x].name+" = "+attributes[x].name)
		}
	}
	return "\tdef initialize("+attr.join(", ")+")\n"+
		"\t\t"+initstring.join("\n\t\t")+"\n\tend\n"
}