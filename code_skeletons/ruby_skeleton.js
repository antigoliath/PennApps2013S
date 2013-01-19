function ruby_skeleton(json)
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
		var parname = " < " + parent
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
	class_string = class_string + "# " + description + "\n" + "class "
	class_string = class_string + name + parname  + "\n"
	if(attributes){
		for(var xy in attributes)
		{
			class_string = class_string + "\t" + ruby_attr_string(attributes[xy])
		}
	}
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