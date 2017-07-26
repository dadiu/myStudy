var express = require('express');
var app = express();

app.get('/', function(req, res){
    // console.log(req);
    res.send("Hello Word");
});

app.listen(3000, function(){
    console.log('app is listening in prot 3000');
})
