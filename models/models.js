var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// contains classes, interfaces
var Project = new mongoose.Schema({
  name: String,
  description: String
});

// Project.virtual('id').get(function(){
//   return this._id;
// });

exports.Project = mongoose.model('Project', Project);

var Class = new mongoose.Schema({
  name: String,
  description: String,
  project: ObjectId,
  parents: [String],
  interfaces: [String],
  attributes: [
    { 
      name: String,
      scope: String,
      attr_type: String,
      description: String
    }
  ]
});

exports.Class = mongoose.model('Class', Class);

var Interface = new mongoose.Schema({
  name: String,
  description: String,
  project: ObjectId,
  attributes: [
    { 
      name: String,
      scope: String,
      attr_type: String,
      description: String
    }
  ]
});

exports.Interface = mongoose.model('Interface', Interface);

var Method = new mongoose.Schema({
  name: String,
  description: String,
  scope: String,
  parent: ObjectId,
  parent_type: String, //class or interface
  project: ObjectId,
  ret: String,
  args: [
    {
      name: String,
      attr_type: String,
      description: String
    }
  ]
});

exports.Method = mongoose.model('Method', Method);
