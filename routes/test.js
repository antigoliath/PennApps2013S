
/*
 * GET test page.
 */
var hljs = require('highlight.js');
var json = {
	class :
	{
		id : "1",
		name : "Comment",
		project : "1",
		description : "It's a class for comments",
		parent : ["DBObj"],
		interfaces : ["Commentable","Likeable"],
		attributes : [
		{scope : "private", name : "id", type : "int", description : "The DB id."},
		{scope : "private", name : "comment", type : "string", description : "The comment"}
		]
	},
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
			{name : "user", type : "User", description : "The user liking it"},
			{name : "timestamp", type : "long", description : "The UNIX timestamp"}
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
		{scope : "private", name : "other_id", type : "int", description : "The other id."},
		{scope : "private", name : "details", type : "string", description : "Some details."}
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
			{name : "comment", type : "string", description : "The comment to add"},
			{name : "user", type : "User", description : "The user commenting."}
			]
		}
		]
	}
	]
};
var javascripts = require('../code_skeletons/java_skeleton.js')
exports.test = function(req, res){
	res.render('test_html', { title: 'Test Page',
		something: hljs.highlightAuto(javascripts.java_skeleton(json)).value });
};