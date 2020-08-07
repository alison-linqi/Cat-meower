var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/demo.html', function(req, res){
 console.log('request for demo.html');
 res.sendFile(__dirname + '/' + 'demo.html');

})

app.post('/process_post', urlencodedParser, function(req, res){
 console.log('process_post');
 response ={
  first_name: req.body.firstName,
  last_name : req.body.lastName
};
 console.log(response);
 res.end(JSON.stringify(response));
  //res.end();

})



var server = app.listen(8081, function(){
     var host =server.address().address;
     var port = server.address().port;
    console.log("host is %s, and port is %s", host, port);
})