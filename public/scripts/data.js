var project = {
	id : "1",
	name : "My Project",
	description : "It's a frickin awesome project",
	classes : [
	{
		id : "1",
		name : "Comment",
		project : "1",
		description : "It's a class for comments",
		parent : "DBObj",
		interfaces : ["Commentable","Likeable"],
		attributes : [
		{scope : "private", name : "id", type : "int", description : "The DB id."},
		{scope : "private", name : "comment", type : "string", description : "The comment"}
		],
		methods : [
		{
			id :  "1",
			scope : "public",
			name : "like",
			description : "testing",
			parent : "1",
			parent_type : "class",
			ret : "void",
			args : [
			{name : "user", type : "User", description : "The user liking it"},
			{name : "timestamp", type : "long", description : "The UNIX timestamp"}
			]
		}
		]
	}
	],
	interfaces : [
	{
		id : "1",
		name : "Commentable",
		project : "1",
		description : "Interface for things that are commentable",
		attributes : [
		{scope : "private", name : "other_id", type : "int", description : "The other id."},
		{scope : "private", name : "details", type : "string", description : "Some details."}
		],
		methods : [
		{
			id :  "1",
			scope : "public",
			name : "addComment",
			parent : "1",
			parent_type : "interface",
			ret : "boolean",
			args : [
			{name : "comment", type : "string", description : "The comment to add"},
			{name : "user", type : "User", description : "The user commenting."}
			]
		}
		]
	}
	]
};

function getInterClass(class_id,type) {
	if(type == "class") {		
		for(var i=0;i<project.classes.length;i++) {
			if(project.classes[i].id == class_id) {
				return project.classes[i];
			}
		}
	}
	else if(type == "interface") {
		for(var i=0;i<project.interfaces.length;i++) {
			if(project.interfaces[i].id == class_id) {
				return project.interfaces[i];
			}
		}
	}
}

function getMethod(method_id,parent_id,parent_type) {
	if(parent_type == "class") {
		for(var i=0;i<project.classes.length;i++) {
			if(project.classes[i].id == parent_id) {
				var methods = project.classes[i].methods;
				for(var j=0;j<methods.length;j++) {
					if(methods[j].id == method_id) {
						return methods[j];
					}
				}
			}
		}
	}
	else if(parent_type == "interface") {
		for(var i=0;i<project.interfaces.length;i++) {
			if(project.interfaces[i].id == parent_id) {
				var methods = project.interfaces[i].methods;
				for(var j=0;j<methods.length;j++) {
					if(methods[j].id == method_id) {
						return methods[j];
					}
				}
			}
		}
	}
}
