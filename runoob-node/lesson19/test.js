var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongdb://localhost:27017/runoob'; // 数据库为runoob

var inserData = function (db, callback) {

    var collection = db.collection('site');

    var data = [{
        "name": "菜鸟教程",
        "url": "www.runoob.com"
    }, {
        "name": "菜鸟工具",
        "url": "c.runoob.com"
    }];

    collection.insert(data, function(err, result){

        if(err){
            console.log('Error : ' + err);
            return;
        }

        callback(result);
    })
};

MongoClient.connect(DB_CONN_STR, function(err, db){
    console.log("连接成功！");
    inserData(db, function(result){
        console.log(result);
        db.close();
    })
})