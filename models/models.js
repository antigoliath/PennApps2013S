var mongoose = require('mongoose');

// contains classes, interfaces
var Project = new mongoose.Schema({
  name: String,
  description: String
});

exports.Project = mongoose.model('Project', Project);

var Class = new mongoose.Schema({
  name: String,
  description: String,
  project: ObjectId,
  parent: String,
  interfaces: [String],
  attributes: [
    { 
      name: String,
      scope: String,
      type: String,
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
      type: String,
      description: String
    }
  ]

});

exports.Interface = mongoose.model('Interface', Interface);

var Method = new mongoose.Schema({
  name: String,
  description: String,
  scope: String,
  class: ObjectId,
  ret: String,
  args: [
    {
      name: String,
      type: String,
      description: String
    }
  ]
});

exports.Method = mongoose.model('Method', Method);
