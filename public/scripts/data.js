var project = 
{
	id : "",
	name : "name",
	description : "asdf",
	classes : [
		{
			id : "",
			name : "",
			description : "",
			methods : [
				{
					id : "",
					name : "",
					arguments : []
				}
			]
		}
	],
	interfaces : []
};

function getClass(class_id) {
	for(var i=0;i<project.classes.length;i++) {
		if(project.classes[i].id == class_id) {
			return project.classes[i];
		}
	}
}

function getMethod(method_id) {
	for(var i=0;i<project.classes.length;i++) {
		var methods = project.classes[i].methods;
		for(var j=0;j<methods.length;j++) {
			if(methods[j].id == method_id) {
				return methods[j];
			}
		}
	}
}
