var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/tuesday';

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// example POST request using curl
// curl -X POST -H 'content-type: application/json' -d '{"name":"ryan", "address" : "123 fake st."}' localhost:3000/people
app.post('/people', function(req, res) {
  console.log('body: ', req.body);
  var name = req.body.name;
  var address = req.body.address;

  // connect to DB
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      done();
      console.log('Error connecting to DB: ', err);
      res.status(500).send(err);
    } else {
      var result = [];

      var query = client.query('INSERT INTO people (name, address) VALUES ($1, $2) ' +
                                'RETURNING id, name, address', [name, address]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        res.send(result);
      });

      query.on('error', function(error) {
        console.log('Error running query:', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});

app.get('/*', function(req, res){
  var filename = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '/public/', filename)); // ..../server/public/filename
});

app.listen(port, function(){
  console.log('Listening for requests on port', port);
});
