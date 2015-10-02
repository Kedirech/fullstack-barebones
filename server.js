var bodyParser  = require('body-parser'),
    cors        = require('cors'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express();


app.use( express.static('./public') );
app.use( bodyParser.json() );
app.use( cors() );


var Productschema = new mongoose.Schema({
  title: {type: String, unique: true, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true, min: 0},
});
var Product = mongoose.model('Product', Productschema);


app.post('/api/products', function(req, res){
    Product.create(req.body, function(err, result) {
      if(err) {
        res.send(err);
      }else {
        res.json(result);
      }
    });
});

app.get('/api/products', function(req, res){
    Product.find({},function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
});


var mongoPort = process.env.MONGO_PORT || 27017;
var mongoURI  = 'mongodb://localhost:' + mongoPort + '/fullstack-barebones';
// mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function(){
  console.log('mdb listening on:', mongoPort);
});

var serverPort = process.env.EXPRESS_PORT || 8181;
app.listen(serverPort, function() {
  console.log('srv listening on:', serverPort);
});
