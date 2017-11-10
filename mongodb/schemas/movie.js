var mongoose = require('mongoose');

// 放置电影所需相关字符串类型
var MovieSchema = new mongoose.Schema({
	doctor : String,
	title : String,
	language : String,
	country : String,
	summary : String,
	flash : String,
	poster : String,
	year : Number,
	meta : {
		createAt : {
			type : Date,
			default : Date.now()
		},
		updateAt : {
			type : Date,
			default : Date.now()
		}
	}
});


// 保存数据
MovieSchema.pre('save', function(next){
	if ( this.isNew){	//是否已存在
		this.meta.createAt = this.meta.uploadAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	};

	next();
});

// 静态交互 - 不直接跟数据库交互 还有经过module编译进行实例化以后才会具有这个方法
MovieSchema.statics = {
	// 用来取出目前数据库所有的数据
	fetch : function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},

	//用来查询单条的数据
	findById : function(id, cb){
		return this
			.findOne({_id : id})
			.exec(cb)
	}
};

module.exports = MovieSchema;