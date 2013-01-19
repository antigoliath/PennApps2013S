
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , projects = require('./routes/projects')
  , http = require('http')
  , project = require('./routes/project')
  , path = require('path')
  , mongoose = require("mongoose")
  , MongoStore = require('connect-mongo')(express);

var app = express();

  
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
  app.use(express.session({
    secret: settings.cookie_secret,
    store: new MongoStore({
      db: settings.db
    })
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/pennapps2013');
});

app.get('/', routes.index);
app.get('/project', project.view);
app.get('/users', user.list);
app.get('/projects.json', projects.project_json);
app.get('/classes.json', projects.class_json);
app.get('/methods.json', projects.method_json);
app.get('/interfaces.json', projects.interface_json);
app.get('/projects/new', projects.new_project);
app.post('/projects/new', projects.create_project);
app.post('/classes/new', projects.create_class);
app.post('/methods/new', projects.create_method);
app.post('/interfaces/new', projects.create_interface);
app.post('/projects/save', projects.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
