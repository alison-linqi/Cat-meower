var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/demo.html', function(req, res){
 console.log('request for demo.html');
 res.sendFile(__dirname + '/' + 'demo.html');

})

app.get('/process_get', function(req, res){
 console.log('The form is submitted');
 response ={
  first_name: req.query.firstName,
  last_name : req.query.lastName
};
 console.log(response);
 res.end(JSON.stringify(response));
  //res.end();

})

app.get('/', function(req, res){
    console.log('Received a Get request form the client');
    res.send('Hello Get!');
})

app.post('/', function(req, res){
    console.log("Got a POST request");
    res.send('Hello POST!');

})

app.delete('/del_user', function(req, res){
console.log('Got a delete request');
res.send('Hello delete');

})

app.get("/list_user", function(req, res){

console.log("Got a GET request for /list_user");
res.send('Page listing');


})

app.get('/ab*cd', function(req, res){
console.log("Got a GET request for /ab*cd");
res.send("Page Pattern Match");

})

var server = app.listen(8081, function(){
     var host =server.address().address;
     var port = server.address().port;
    console.log("host is %s, and port is %s", host, port);
})