var socket = io.connect("http://localhost");

function saveAction(action_obj) {
	socket.emit('saveAction',action_obj);
}
function processAction() {
	
}
var example = {
	action : "modify",
	type : "method",
	info : {
		id : "15adfdsf",
		name : "asdfasdf",
		}
	project_id : "1244asdf"
}
