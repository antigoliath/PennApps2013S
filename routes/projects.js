/* DAVID XU */

var models = require('../models/models.js');
var mongoose = require('mongoose');
var _ = require('underscore');
var ObjectId = mongoose.Types.ObjectId;

function show_json(type, res){
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
  
  switch(req.body.action)
  {
    case 'add': create_helper(req.body.type, req.body.info);
                break;
    case 'modify': change_helper(req.body.type, req.body.info, 'modify');
                   break;
    case 'delete': change_helper(req.body.type, req.body.info, 'delete');
                   break;
    case 'lock': break; // doesn't do anything atm
    case 'unlock': break;
  }
};
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

