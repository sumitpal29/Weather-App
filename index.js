var http = require('http');
var fs = require('fs');
var request = require('request');
var index = fs.readFileSync('index.html');

// var server = http.createServer(function(req,res){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(index);
// }).listen(8080);
//https://github.com/nshntarora/Indian-Cities-JSON/blob/master/cities.json

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// POST http://localhost:8080/api
// parameters sent with 
app.post('/api/', function(req, res) {
    var cap = req.body.id;
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+cap+",IN&appid=b458fbe5be41e08602b621a08fad02a7&units=metric"
    var data;
    request(url, function(err, response, body){
        if(response.statusCode === 200){
            data = JSON.parse(body);
            res.end(data.main.temp+'');
        }
    })
    
});


app.listen(3000, function() { console.log('listening'); });