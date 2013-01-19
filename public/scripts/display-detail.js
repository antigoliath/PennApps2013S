function loadClass(class_id) {
	for(var i in project.classes) {
		if(project.classes[i].id == class_id) {
			var the_class = project.classes[i];
			$("#current-object-type").text("class");
			$("#current-object-id").text(the_class.id);
			loadObject(the_class);
		}
	}
}
function loadInterface(interface_id) {
	for(var i in project.interfaces) {
		if(project.interfaces[i].id == interface_id) {
			var the_interface = project.interfaces[i];
			$("#current-object-type").text("interface");
			$("#current-object-id").text(the_interface.id);
			loadObject(the_interface);
		}
	}
	
}

function loadObject(the_obj) {
			var edit_obj = $(".edit-object");
			edit_obj.attr("id","edit-object-"+the_obj.id);
			edit_obj.find(".info .name").text(the_obj.name);
			edit_obj.find(".info .description").text(the_obj.description);
			
			var attrs = edit_obj.find(".attributes");
			attrs.html("<h3>Attributes</h3");
			for(var j in the_obj.attributes) {
				var the_attr = the_obj.attributes[j];
				attrs.append('<div class="attribute">'+
				'<div class="vital-info">'+
					'<div class="scope">'+the_attr.scope+'</div>'+
					'<div class="name"><span>'+the_attr.name+'</span></div>'+
					'<div class="type">'+the_attr.type+'</div>'+
					'<div id="delete-attribute-'+the_attr.name+'" class="delete">Delete</div>'+
				'</div>'+
				'<div class="description">'+the_attr.description+'</div>'+
				'</div>');
			}
			
			var meths = edit_obj.find(".methods");
			meths.html("<h3>Methods</h3>");
			for(var j in the_obj.methods) {
				var the_method = the_obj.methods[j];
				meths.append('<div class="method">'+
				'<div class="vital-info">'+
					'<div class="scope">'+the_method.scope+'</div>'+
					'<div class="name"><span>'+the_method.name+'</span></div>'+
					'<div class="return-type">'+the_method.ret+'</div>'+
					'<div id="delete-method-'+the_method.id+'" class="delete">Delete</div>'+
				'</div>'+
				'<div class="description">'+the_method.description+'</div>'+
				'<div class="arguments"></div>'+
				'</div>');
				var args = meths.find('.method:last .arguments');
				for(var k in the_method.args) {
					var the_arg = the_method.args[k];
					args.append('<div class="argument">'+
					'<div class="vital-info">'+
						'<div class="name"><span>'+the_arg.name+'</span></div>'+
						'<div class="type">'+the_arg.type+'</div>'+
						'<div class="description">'+the_arg.description+'</div>'+
						'<div id="delete-argument-'+the_arg.name+'" class="delete">Delete</div>'+
					'</div>'+
					'</div>');
				}
				args.append('<div class="toggle-add-argument">Add Argument</div>');
				args.append('<div class="add-argument">'+
								'<div class="method-id">'+the_method.id+'</div>'+
								'<div class="form-state">0</div>'+
								'<div class="argument-prompt prompt"></div>'+
								'<div class="argument-preview"></div>'+
								'<div class="argument-form">'+
										'<input class="argument-textbox" type="text" />'+
								'</div>'+
				'</div>');
			}
			
			
		attributeListeners();  
		methodListeners();  
		resetAddAttribute();  
		resetAddMethod();
	
}
function modifyClass(class_obj){
	
}
function deleteClass(class_id){
	
}
function modifyInterface(interface_obj){
	
}
function deleteInterface(interface_id){
	
}
function addMethod(method_obj) {
	
}
function modifyMethod(method_obj) {
	
}
function deleteMethod() {
	
}