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

exports.create = function(req, res) {
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
