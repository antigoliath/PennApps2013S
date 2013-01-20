var socket = io.connect("/");

function saveAction(action_obj) {
  console.log(action_obj);
	socket.emit('saveAction', {hi:'hi'});
  console.log('save action done');
	processAction(action_obj);
}
function processAction(action_obj) {
	switch(action_obj.type) {
		case "class":
			if(action_obj.action == "add") {
				addClass(action_obj.info);
			}
			else if(action_obj.action == "modify") {
				modifyClass(action_obj.info);
			}
			else if(action_obj.action == "delete") {
				deleteClass(action_obj.info);
			}
		break;
		case "interface":
			if(action_obj.action == "add") {
				addInterface(action_obj.info);
			}
			else if(action_obj.action == "modify") {
				modifyInterface(action_obj.info);
			}
			else if(action_obj.action == "delete") {
				deleteInterface(action_obj.info);
			}
		break;
		case "method":
			if(action_obj.action == "add") {
				addMethod(action_obj.info);
			}
			else if(action_obj.action == "modify") {
				modifyMethod(action_obj.info);
			}
			else if(action_obj.action == "delete") {
				deleteMethod(action_obj.info);
			}
		break;
	}
}
var example = {
	action : "modify",
	type : "method",
	info : {
		id : "15adfdsf",
		name : "asdfasdf"
		},
	project_id : "1244asdf"
};
