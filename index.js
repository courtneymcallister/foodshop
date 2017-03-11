var express = require('express');
var server = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./secrets').mongoURI;

//connect to the database
mongoose.connect(mongoURI);

//powerup -- middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//create schema
var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: Boolean,
  calories: Number
});

//create the Mongoose model
var Food = mongoose.model('Food', foodSchema);

//testing
// var chocolateBar = new Food({
//   price: 3,
//   category: 'candy',
//   isGlutenFree: true,
//   calories: 200
// })
// chocolateBar.save(function(err, data){
//   if(err){
//     console.log(err);
//   } else{
//     console.log(data);
//   }
// });

//GET /foods
server.get('/foods', function(req, res){
  Food.find({}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});

//GET /foods/:id
server.get('/foods/:id', function(req, res){
  Food.find({_id: req.params.id}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});

//GET /foods/category/:categoryName
server.get('/foods/category/:categoryName', function(req, res){
  Food.find({category: req.params.categoryName}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});

//GET /foods/price/:dollarAmount
server.get('/foods/price/:dollarAmount', function(req, res){
  Food.find({price: req.params.dollarAmount}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});

//POST /foods
server.post('/foods', function(req, res){
  var food = new Food(req.body);
  food.save(function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(201).json({
        msg: 'Success'
      });
    }
  });
});

//PUT /foods/:id
server.put('/foods/:id', function(req, res){
  Food.findOneAndUpdate({_id: req.params.id}, req.body, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Sucessfully updated'
      });
    }
  });
});

//DELETE /foods/:id
server.delete('/foods/:id', function(req, res){
  Food.remove({_id: req.params.id}, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully deleted'
      });
    }
  });
});

//DELETE /foods/category/:category


server.listen(port, function(){
  console.log('Now listening on', port);
})
