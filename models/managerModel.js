var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var managerSchema = new Schema({
	'full_name' : String,
	'username' : String,
	'password' : String,
	'role' : String
});
managerSchema.set("timestamps", true);

module.exports = mongoose.model('manager', managerSchema);
