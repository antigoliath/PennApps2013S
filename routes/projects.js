/* DAVID XU */
var io  = require('socket.io');
var models = require('../models/models.js');
var mongoose = require('mongoose');
var _ = require('underscore');
var ObjectId = mongoose.Types.ObjectId;
var sio;


exports.start_sockets = function(server){
  sio = io.listen(server);
  console.log('Server started!');
  //Configure the socket.io connection settings. 
  //See http://socket.io/
  sio.configure(function (){
    sio.set('log level', 0);
    sio.set('authorization', function (handshakeData, callback) {
      callback(null, true); // error first callback style 
    });
  });
  sio.sockets.on('connection', function (client) {
    console.log('connected bro');
    client.on('saveAction', function(data){
      console.log('inside socket save action');
      saveActionHelper(data);
    });
  });
};
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
		parent : ["DBObj"],
		interfaces : ["Commentable","Likeable"],
		attributes : [
		{scope : "private", name : "id", attr_type : "int", description : "The DB id."},
		{scope : "private", name : "comment", attr_type : "string", description : "The comment"}
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
          { name : "user", attr_type : "User", description : "The user liking it" },
          { name : "timestamp", attr_type : "long", description : "The UNIX timestamp" }
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
		{scope : "private", name : "other_id", attr_type : "int", description : "The other id."},
		{scope : "private", name : "details", attr_type : "string", description : "Some details."}
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
			{name : "comment", attr_type : "string", description : "The comment to add"},
			{name : "user", attr_type : "User", description : "The user commenting."}
			]
		}
		]
	}
	]
};



exports.view = function(req, res) {
  console.log(req.params.id);
  models.Project.findById(req.params.id, function(err, project_result){
    if(err) {
      console.log('ERROR: project search failed');
      console.log(err);
      return;
    } 
    else {
      console.log(project_result);
      console.log(project_result.id);
      models.Interface.find({ project: project_result.id }, function(err, interface_result){
        if(err) {
          console.log('ERROR: interface search failed');
          console.log(err);
          return;
        } 
        else {
          _.each(interface_result, function(interface_item){
            project_result.interfaces = project_result.interfaces || [];
            models.Method.find({ parent: interface_item.id}, function(err, method_result){
              if(err){
                console.log('ERROR: method search failed');
                console.log(err);
                return;     
              } 
              else {
                _.each(method_result, function(method_item){
                  interface_item.methods = interface_item.methods || [];
                  interface_item.methods.push(method_item);
                });
              }
            });
            project_result.interfaces.push(interface_item);
          });
        }
      });

      models.Class.find({ project: project_result.id }, function(err, class_result){
        if(err) {
          console.log('ERROR: class search failed');
          console.log(err);
          return;
        } 
        else {
          _.each(class_result, function(class_item){
            project_result.classes = project_result.classes || [];
            models.Method.find({ parent: class_item.id}, function(err, method_result){
              if(err){
                console.log('ERROR: method search failed');
                console.log(err);
                return;     
              } 
              else {
                _.each(method_result, function(method_item){
                  class_item.methods = class_item.methods || [];
                  class_item.methods.push(method_item);
                });
              }
            });
            project_result.classes.push(class_item);
          });
        }
      });
    }
  }); 
};



function show_json(type, res) {
  var model;
  switch(type)
  {
    case 'project': model = models.Project;
                    break;
    case 'method': model = models.Method;
                    break;
    case 'interface': model = models.Interface;
                    break;
    case 'class': model = models.Class;
                    break;
  }
  model.find().exec(
    function (err, results) {
      res.json(results);
    } 
  );
}
exports.project_json = function(req, res){
  show_json('project', res);
};

exports.class_json = function(req, res){
  show_json('class', res);
};

exports.method_json = function(req, res){
  show_json('method', res);
};

exports.interface_json = function(req, res){
  show_json('interface', res);
};


exports.new_project = function(req, res){
  res.render('new', {});
};

exports.create_project = function(req,res) {
  create_helper('project', req.body);
};

exports.create_class = function(req,res) {
  create_helper('class', req.body);
};

exports.create_interface = function(req,res) {
  create_helper('interface', req.body);
};
exports.create_method = function(req,res) {
  create_helper('method', req.body);
};
exports.save = function(req,res) {
  

  // var example = {
  //   action : "modify",
  //   type : "method",
  //   info : {
  //     id : "15adfdsf",
  //     name : "asdfasdf"
  //   },
  //   project_id : "1244asdf"
  //   needed for emitting
  // }; 
  saveActionHelper(req.body);
};

function saveActionHelper(info){

  switch(info.action)
  {
    case 'add': create_helper(info.type, info.info);
                break;
    case 'modify': change_helper(info.type, info.info, 'modify');
                   break;
    case 'delete': change_helper(info.type, info.info, 'delete');
                   break;
    case 'lock': break; // doesn't do anything atm
    case 'unlock': break;
  }
}

function create_helper(type, info){
  var new_obj;
  var hex_string = info.project || info.parent;
  // create from hexstring
  if(hex_string) hex_string = ObjectId.fromString(hex_string);
  switch(type)
  {
    case 'project': new_obj = new models.Project(info);
                    break;
    case 'method': new_obj = new models.Method(info);
                    break;
    case 'interface': new_obj = new models.Interface(info);
                    break;
    case 'class': new_obj = new models.Class(info);
                    break;
  }
  new_obj.save(function(err){
    if(err) {
      console.log('ERROR: creating ' + type + ' failed');
      console.log(err);
      return;
    } 
    else {
      console.log('creating' + type);
    }
  });
}

function change_helper(type, info, change_type){
  var mod_obj;
  var model; 
  // create from hexstring
  var hex_string = info.project || info.parent;
  // create from hexstring
  if(hex_string) hex_string = ObjectId.fromString(hex_string);

  switch(type)
  {
    case 'project': model = models.Project;
                    break;
    case 'method': model = models.Method;
                    break;
    case 'interface': model = models.Interface;
                    break;
    case 'class': model = models.Class;
                    break;
  }


  if(change_type === 'modify') {
    model.findByIdAndUpdate(info.id, info, {}, function(err){
          if(err) {
            console.log('ERROR: modifying ' + type + ' failed');
            console.log(err);
            return;
          } 
          else {
            console.log(mod_obj);
            console.log('modifying' + type);
          }
        });
  }
  else if(change_type === 'delete') {
    model.findByIdAndRemove(info.id, {}, function(err, product){
      if(err) {
        console.log('ERROR: removing ' + type + 'failed.');
        console.log(err);
      }
      else {
        console.log('deleting' + type);
      }
    });
  }
}

