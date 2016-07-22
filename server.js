var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

app.set('port', (process.env.PORT || 5000));

var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://todouser:SNmithun007@ds027145.mlab.com:27145/todo'
//var url = 'mongodb://localhost:27017/todo';
var myPort = 5000;

app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//*------------------------------api--------------------------------*

app.get('/api/alltodo',function(req,res){
  //res.send("hello world");

  MongoClient.connect(url, function(err, db) {
    db.collection('lists').find().toArray(function(err,results){
      if(err){
        console.log(err);
      }else{
        res.json(results);
      }
    });
  });

});

app.post('/api/addtodo',function(req,res){
  var des = req.body.des;
  console.log('from server');
  console.log(des);
    MongoClient.connect(url, function(err, db) {
      if(err){
        console.log(err);
      }else{
        db.collection('lists').insert({
          "description":des
        });
        res.json({"success":"done"});
      }

    });

});

app.post('/api/deletetodo',function(req,res){
  console.log("delete api");
  //var des = {_id: new MongoClient.ObjectID('578c807d5bc76c2423122936')};
    MongoClient.connect(url, function(err, db) {
      db.collection('lists', function(err, collection) {
        if(err){
          res.json(err);
        }else{
          collection.remove({_id: new mongodb.ObjectID(req.body.id)},function(err){
            if(err){
              res.json(err);
            }else{
              res.json({
                "success":"done"
              });
            }
          });
        }
      });

    });

})



//*------------------------------public-----------------------------*

app.get('/',function(req,res){
  res.send("hello world");
});





app.listen(app.get('port'),function(){
	console.log("Using port "+app.get('port'));
});