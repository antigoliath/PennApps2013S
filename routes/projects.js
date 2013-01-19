/* DAVID XU */

var models = require('../models/models.js');

exports.list = function(req, res){
  res.render('new', { title: 'projects list' });
};

exports.projects = function(req, res){
  res.render('list', { title: 'projects list' });
};

exports.new_project = function(req, res){
  res.render('new', {});
};

exports.create_project = function(req, res) {
  console.log(req.body);
  var new_project = new models.Project(req.body);
  console.log(req.body);
  new_project.save(function(err){
    if(err) {
      console.log('ERROR: creating project failed');
      return;
    } 
    else {
      console.log('creating project');
    }
  });
};

exports.create_class = function(req, res) {
  console.log(req.body);
  var new_class = new models.Class(req.body);
  console.log(req.body);
  new_class.save(function(err){
    if(err) {
      console.log('ERROR: creating class failed');
      return;
    } 
    else {
      console.log('creating class');
    }
  });
};

exports.create_method = function(req, res) {
  console.log(req.body);
  var new_project = new models.Project(req.body);
  console.log(req.body);
  new_project.save(function(err){
    if(err) {
      console.log('ERROR: creating project failed');
      return;
    } 
    else {
      console.log('creating project');
    }
  });
};
exports.create_interface = function(req, res) {
  console.log(req.body);
  var new_project = new models.Project(req.body);
  console.log(req.body);
  new_project.save(function(err){
    if(err) {
      console.log('ERROR: creating project failed');
      return;
    } 
    else {
      console.log('creating project');
    }
  });
};
