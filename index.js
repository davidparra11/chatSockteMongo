var express = require("express");
var app     = express();
var path    = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require ("mongoose"); 


app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

http.listen(3000,function(){
	console.log('Example app listening on port 3000!');
	
});




/*var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  if (err) throw err;
  console.log("Connected to Database");

  //simple json record
	var document = {name:"David", title:"About MongoDB"};
  
	//insert record
	db.collection('test').insert(document, function(err, records) {
		if (err) throw err;
		console.log("Record added as "+records[0]._id);
	});
});


*/


// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://davidmongodb:palermo93@ds061385.mongolab.com:61385/davidmongodb';
//mongodb://ds061385.mongolab.com:61385/davidmongodb
 mongodb://<dbuser>:<dbpassword>@ds061385.mongolab.com:61385/davidmongodb

var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});
/*
// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0}
});*/

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
//var PUser = mongoose.model('PowerUsers', userSchema);

// Clear out old data
/*PUser.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

// Creating one user.
var johndoe = new PUser ({
  name: { first: 'John', last: 'Doe' },
  age: 25
});

// Saving it to the database.  
johndoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually


var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
//////////*/

     var chatSchema = mongoose.Schema({
        name: String,
        text: String
    });
      var nodechat = mongoose.model('Chats', chatSchema);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log ('Succeeded connected con el segundo metodo');

  io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(mensaje){
    console.log('message: ' + mensaje);

    var values = {
    		name: 'usuario',
    		text: mensaje
    };
      var entrada = new nodechat(values);
     


      entrada.save(function (err, entrada) {
  if (err) return console.error(err);
   console.log(entrada.text); // 'Silence'
});



  });
});



io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
     
      
});

