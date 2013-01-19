var mongoose = require('mongoose');

// contains classes, interfaces
var Project = new mongoose.Schema({
  name: String,
  description: String
});

exports.Project = mongoose.model('Project', Project);

var Class = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  parent: Number,
  interfaces: [Number],
  attributes: [
    { 
      name: String,
      scope: String,
      type: String,
      description: String
    }
  
  ],
  methods: [
    {
      name: String,
      description: String,
      scope: String,
      ret: String,
      args: [
        {
          name: String,
          type: String,
          description: String
        }
      ]
    }
  ]
});
exports.Class = mongoose.model('Class', Class);

var Interface = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  attributes: [
    { 
      name: String,
      scope: String,
      type: String,
      description: String
    }
  ],
  methods: [
    {
      name: String,
      description: String,
      scope: String,
      ret: String,
      args: [
        {
          name: String,
          type: String,
          description: String
        }
      ]
    }
  ]
});

exports.Interface = mongoose.model('Interface', Interface);
