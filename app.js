
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , test = require('./routes/test')
  , user = require('./routes/user')
  , projects = require('./routes/projects')
  , http = require('http')
  , project = require('./routes/project')
  , path = require('path')
  , mongoose = require("mongoose")
  , MongoStore = require('connect-mongo')(express)
  , app = express()
  , server = http.createServer(app)
  , socket_start = require('./routes/projects.js').start_sockets
  ;
socket_start(server);

  
var settings =
  {
    db: "pennapps2013",
    // collection: "sessions"
    // host: ,
    // port: ,
    // username:,
    // password:,
    // auto_reconnect:,
    // url: ,
    // mongoose_connection:,
    // clear_interval:,
    // stringify:,
    cookie_secret: "COOKIE SECRET"
  };



app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler());
});

mongoose.connect(process.env.MONGOLAB_URI );

app.get('/', routes.index);
app.get('/test', test.test);
app.get('/project', project.view);
app.get('/projects/new', projects.new_project);
app.get('/projects/:id.json', projects.view_json);
app.get('/projects/:id', projects.view);
app.get('/users', user.list);
app.get('/projects.json', projects.project_json);
app.get('/classes.json', projects.class_json);
app.get('/methods/:id.json', projects.project_methods);
app.get('/methods.json', projects.method_json);
app.get('/interfaces.json', projects.interface_json);
app.post('/projects/new', projects.create_project);
app.post('/classes/new', projects.create_class);
app.post('/methods/new', projects.create_method);
app.post('/interfaces/new', projects.create_interface);
app.post('/save', projects.save);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
