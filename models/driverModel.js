var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var driverSchema = new Schema({
	'vehicle_assigned' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'vehicle'
	},
	'phone_number' : String,
	'password' : String,
	'licence_number' : String,
	'full_name' : String,
	'email' : String,
	'role' : String
});
driverSchema.set("timestamps", true);

module.exports = mongoose.model('driver', driverSchema);
