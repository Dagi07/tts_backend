var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminSchema = new Schema({
	'full_name' : {
		type:String,
		required:true
	},
	'username' : {
		type:String,
		required:true
	},
	'password' : {
		type:String,
		required:true
	},
	'role' : {
		type:String,
		required:true
	},
});

module.exports = mongoose.model('admin', adminSchema);
