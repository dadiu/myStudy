var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'test',
    port: 8081
})

connection.connect( function (error, results, fields) {

    console.log(error)
    // if(error)  throw error;

    // console.log('The solution is : ' , results[0].solution);

});
connection.end();
// connection.query('SELECT 1 + 1AS solution', function(error, results, fields){

//     console.log(error)
//     // if(error)  throw error;

//     // console.log('The solution is : ' , results[0].solution);

// })