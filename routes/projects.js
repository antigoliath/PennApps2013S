/* DAVID XU */

var models = require('../models/models.js');

exports.json = function(req, res){
  var new_project = models.Project.find().exec(
    function (err, results) {
      res.json(results);
    } 
  );
};

exports.new_project = function(req, res){
  res.render('new', {});
};

exports.create = function(req,res) {
  create_helper(req.body.type, req.body.info);
};

function create_helper(type, info){
  var new_obj;
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
      return;
    } 
    else {
      console.log('creating' + type);
    }
  });
}

// exports.create_project = function(req, res) {
//   console.log(req.body);
//   var new_project = new models.Project(req.body);
//   console.log(req.body);
//   new_project.save(function(err){
//     if(err) {
//       console.log('ERROR: creating project failed');
//       return;
//     } 
//     else {
//       console.log('creating project');
//     }
//   });
// };

// exports.create_class = function(req, res) {
//   console.log(req.body);
//   var new_class = new models.Class(req.body);
//   console.log(req.body);
//   new_class.save(function(err){
//     if(err) {
//       console.log('ERROR: creating class failed');
//       return;
//     } 
//     else {
//       console.log('creating class');
//     }
//   });
// };

// exports.create_method = function(req, res) {
//   console.log(req.body);
//   var new_method = new models.Method(req.body);
//   console.log(req.body);
//   new_method.save(function(err){
//     if(err) {
//       console.log('ERROR: creating method failed');
//       return;
//     } 
//     else {
//       console.log('creating method');
//     }
//   });
// };
// exports.create_interface = function(req, res) {
//   console.log(req.body);
//   var new_interface = new models.Interface(req.body);
//   console.log(req.body);
//   new_interface.save(function(err){
//     if(err) {
//       console.log('ERROR: creating interface failed');
//       return;
//     } 
//     else {
//       console.log('creating interface');
//     }
//   });
// };

function change_helper(type, info, change_type){
  var mod_obj;
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

  model.findById(info.id).exec(
    function (err, results) {
      mod_obj = result;
      _.each(info, function(attr){
        mod_obj.attr = attr;  
      });
      mod_obj.save(function(err){
        if(err) {
          console.log('ERROR: modifying ' + type + ' failed');
          return;
        } 
        else {
          console.log('modifying' + type);
        }
      });
    } 
  );
}

exports.save = function(req,res) {
  var example = {
    action : "modify",
    type : "method",
    info : {
      id : "15adfdsf",
      name : "asdfasdf"
    },
    project_id : "1244asdf"
  }; 
  switch(req.body.action)
  {
    case 'add': create_helper(req.body.type, req.body.info);
                break;
    case 'modify': modify_helper(req.body.type, req.body.info);
                   break;
    case 'delete': delete_helper(req.body.type, req.body.info);
                   break;
    case 'lock': break; // doesn't do anything atm
    case 'unlock': break;
  }
};
