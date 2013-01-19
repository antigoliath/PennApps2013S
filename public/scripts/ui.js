function loadClassDetails(class_id) {
	
}
function loadInterfaceDetails(interface_id){
	
}

function resetAddAttribute() {
	var the_attribute = {name : "", type : "", description : ""};
	$('.attribute-prompt').html("Enter an attribute name <span>Press enter to continue</span>");
	$('.attribute-preview').html("");
	$("#add-attribute .form-state").text("0");
	$("#attribute-textbox").val("");
	$("#attribute-textbox").attr("placeholder","Start typing");
	$('#attribute-textbox').unbind('keydown');
	$('#attribute-textbox').keydown(function(event) {
		if(event.keyCode == 13) {
			
		switch($("#add-attribute .form-state").text()) {
			case "0":
				$('.attribute-prompt').html("Enter the attribute's type <span>Press enter to continue, esc to cancel</span>");
				the_attribute.name = $("#attribute-textbox").val();
				$('.attribute-preview').append(the_attribute.name);
				$("#add-attribute .form-state").text("1");
				$("#attribute-textbox").val("");
				break;
			case "1":
				$('.attribute-prompt').html("Enter the attribute's description <span>Press enter to continue, esc to cancel</span>");
				the_attribute.type = $("#attribute-textbox").val();
				$('.attribute-preview').append(the_attribute.type);
				$("#add-attribute .form-state").text("2");
				$("#attribute-textbox").val("");
				break;
			case "2":
				the_attribute.description = $("#attribute-textbox").val();
				var modified_class = getClass($("#current-object-id").text());
				modified_class.attributes.push(the_attribute);
				var data = {
					action : "modify",
					type : "class",
					info : modified_class,
					project_id : $("#current-project-id").text()
				}
				console.log(data);
				saveAction(data);
				resetAddAttribute();
				break;
		}
			
		}
		if(event.keyCode == 27) {
				resetAddAttribute();
		}
	});
}

function resetAddArgument(the_method) {
	var the_argument = {name : "", type : "", description : ""};
	the_method.find('.argument-prompt').html("Enter an argument name <span>Press enter to continue</span>");
	the_method.find('.argument-preview').html("");
	the_method.find(".add-argument .form-state").text("0");
	the_method.find(".argument-textbox").val("");
	the_method.find(".argument-textbox").attr("placeholder","Start typing");
	the_method.find('.argument-textbox').unbind('keydown');
	the_method.find('.argument-textbox').keydown(function(event) {
		if(event.keyCode == 13) {
			
		switch(the_method.find(".add-argument .form-state").text()) {
			case "0":
				the_method.find('.argument-prompt').html("Enter the argument's type <span>Press enter to continue, esc to cancel</span>");
				the_argument.name = the_method.find(".argument-textbox").val();
				the_method.find('.argument-preview').append(the_argument.name);
				the_method.find(".add-argument .form-state").text("1");
				the_method.find(".argument-textbox").val("");
				break;
			case "1":
				the_method.find('.argument-prompt').html("Enter the argument's description <span>Press enter to continue, esc to cancel</span>");
				the_argument.type = the_method.find(".argument-textbox").val();
				the_method.find('.argument-preview').append(the_argument.type);
				the_method.find(".add-argument .form-state").text("2");
				the_method.find(".argument-textbox").val("");
				break;
			case "2":
				the_argument.description = the_method.find(".argument-textbox").val();
				var modified_method = getMethod(the_method.find(".method-id").text());
				modified_method.arguments.push(the_argument);
				var data = {
					action : "modify",
					type : "method",
					info : modified_method,
					project_id : $("#current-project-id").text()
				}
				console.log(data);
				saveAction(data);
				resetAddArgument(the_method);
				break;
		}
			
		}
		if(event.keyCode == 27) {
				resetAddArgument(the_method);
		}
	});
}
function resetAddMethod() {
	var the_method = {name : "", ret : "", description : ""};
	$('.method-prompt').html("Enter an method name <span>Press enter to continue</span>");
	$('.method-preview').html("");
	$("#add-method .form-state").text("0");
	$("#method-textbox").val("");
	$("#method-textbox").attr("placeholder","Start typing");
	$('#method-textbox').unbind('keydown');
	$('#method-textbox').keydown(function(event) {
		if(event.keyCode == 13) {
				
		switch($("#add-method .form-state").text()) {
			case "0":
				$('.method-prompt').html("Enter the method's return type <span>Press enter to continue, esc to cancel</span>");
				the_method.name = $("#method-textbox").val();
				$('.method-preview').append(the_method.name);
				$("#add-method .form-state").text("1");
				$("#method-textbox").val("");
				break;
			case "1":
				$('.method-prompt').html("Enter the method's description <span>Press enter to continue, esc to cancel</span>");
				the_method.ret = $("#method-textbox").val();
				$('.method-preview').append(the_method.ret);
				$("#add-method .form-state").text("2");
				$("#method-textbox").val("");
				break;
			case "2":
				the_method.description = $("#method-textbox").val();
				var modified_method = the_method;
				modified_method.class = $("#current-object-id").text();
				modified_method.scope = "public";
				modified_method.args = [];
				var data = {
					action : "add",
					type : "method",
					info : modified_method,
					project_id : $("#current-project-id").text()
				}
				console.log(modified_method);
				saveAction(data);
				resetAddMethod();
				break;
		}
			
		}
		if(event.keyCode == 27) {
				resetAddMethod();
		}
	});
}

function attributeListeners() {
	$('.attribute .name span').unbind('click');
	$('.attribute .name span').click(function() {
		var _attribute = $(this).parent().parent();
		var _name = _attribute.find('.name').text();
		var _type = _attribute.find('.type').text();
		var _desc = _attribute.find('.description').text().replace('"',"&quot;");
		_attribute.find('.name').html("<input type='text' class='edit-attribute-name-"+_name+"' value='"+_name+"'/>");
		_attribute.find('.type').html("<input type='text' class='edit-attribute-type-"+_name+"' value='"+_type+"'/>");
		_attribute.find('.description').html('<input class="edit-attribute-desc-'+_name+'" value="'+_desc+'" />');
		
		_attribute.find('input').keydown(function(event) {
			if(event.keyCode == 13) {
				var n_name =$('.edit-attribute-name-'+_name).val();
				var n_type =$('.edit-attribute-type-'+_name).val();
				var n_desc =$('.edit-attribute-desc-'+_name).val();
				
				_attribute.find('.name').html("<span>"+n_name+"</span>");
				_attribute.find('.type').html(n_type);
				_attribute.find('.description').html(n_desc);
				var modified_class = getClass($("#current-object-id").text());
				for(var i=0;i<modified_class.attributes.length;i++) {
					if(modified_class.attributes[i].name == _name) {
						modified_class.attributes[i].name = n_name;
						modified_class.attributes[i].type = n_type;
						modified_class.attributes[i].description = n_description;
					}
				}
				var data = {
					action : "modify",
					type : "class",
					info : modified_class,
					project_id : $("#current-project-id").text()
				}
				console.log(data);
				saveAction(data);
				attributeListeners();
			}
		});
		
	});
}
function methodListeners() {
	$('.method').each(function() {
		var the_method = $(this);
			
		the_method.find('.toggle-add-argument').unbind('click');
		the_method.find('.toggle-add-argument').click(function() {
			the_method.find(".add-argument").toggle();
		});
		
		
		the_method.find('.name span').unbind('click');
		the_method.find('.name span').click(function() {
			var _method = the_method;
			var _name = _method.find('.name:first').text();
			var _type = _method.find('.return-type').text();
			var _desc = _method.find('.description:first').text().replace('"',"&quot;");
			_method.find('.name:first').html("<input type='text' class='edit-method-name-"+_name+"' value='"+_name+"'/>");
			_method.find('.return-type').html("<input type='text' class='edit-method-type-"+_name+"' value='"+_type+"'/>");
			_method.find('.description:first').html('<input class="edit-method-desc-'+_name+'" value="'+_desc+'" />');
			
			_method.find('input').keydown(function(event) {
				if(event.keyCode == 13) {
					var n_name = $('.edit-method-name-'+_name).val();
					var n_type = $('.edit-method-type-'+_name).val();
					var n_desc = $('.edit-method-desc-'+_name).val();
					
					_method.find('.name:first').html("<span>"+n_name+"</span>");
					_method.find('.return-type').html(n_type);
					_method.find('.description:first').html(n_desc);
					
					
					var modified_method = getMethod(_method.find(".method-id").text());
					modified_method.name = n_name;
					modified_method.ret = n_type;
					modified_method.description = n_desc;
					var data = {
						action : "modify",
						type : "method",
						info : modified_method,
						project_id : $("#current-project-id").text()
					}
					console.log(data);
					saveAction(data);
					
					methodListeners();
				}
			});
			
		});
		resetAddArgument(the_method);
		
	});
}

