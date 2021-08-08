var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var vehicleSchema = new Schema({
	'driver' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'driver'
	},
	'device' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'device'
	},
	'plate_number' : String,
	'car_manufacturer' : String,
	'car_model' : String,
	'fuel_usage' : Number,
	'carrying_capacity' : Number,
	'make_date' : Date,
	'manufacture_date' : Date
});

module.exports = mongoose.model('vehicle', vehicleSchema);
