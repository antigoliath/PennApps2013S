function loadClassDetails(the_class) {
	
}
function loadInterfaceDetails(the_interface){
	
}

function resetAddAttribute() {
	var the_attribute = {name : "", type : "", description : ""};
	$('.attribute-prompt').html("Enter an attribute name <span>Press enter to continue</span>");
	$('.attribute-preview').html("");
	$("#add-attribute .form-state").text("0");
	$("#attribute-textbox").val("");
	$("#attribute-textbox").attr("placeholder","Start typing");
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
				console.log(the_attribute);
				$('#attribute-textbox').unbind('keydown');
				resetAddAttribute();
				break;
		}
			
		}
	});
}
function resetAddMethod() {
	var the_method = {name : "", type : "", description : ""};
	$('.attribute-prompt').html("Enter an attribute name <span>Press enter to continue</span>");
	$('.attribute-preview').html("");
	$("#add-attribute .form-state").text("0");
	$("#attribute-textbox").val("");
	$("#attribute-textbox").attr("placeholder","Start typing");
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
				console.log(the_attribute);
				$('#attribute-textbox').unbind('keydown');
				resetAddAttribute();
				break;
		}
			
		}
	});
}

function attributeListeners() {
	$('.attribute .name span').click(function() {
		var _attribute = $(this).parent().parent();
		var _name = _attribute.find('.name').text();
		var _type = _attribute.find('.type').text();
		var _desc = _attribute.find('.description').text().replace('"',"&quot;");
		_attribute.find('.name').html("<input type='text' class='edit-attribute-name-"+_name+"' value='"+_name+"'/>");
		_attribute.find('.type').html("<input type='text' class='edit-attribute-type-"+_name+"' value='"+_type+"'/>");
		_attribute.find('.description').html('<input class="edit-attribute-desc-'+_name+'" value="'+_desc+'" />');
		
		$('.attribute input').keydown(function(event) {
			if(event.keyCode == 13) {
				_attribute.find('.name').html("<span>"+$('.edit-attribute-name-'+_name).val()+"</span>");
				_attribute.find('.type').html($('.edit-attribute-type-'+_name).val());
				_attribute.find('.description').html($('.edit-attribute-desc-'+_name).val());
				attributeListeners();
			}
		});
		
	});
}
function methodListeners() {
	
}

