var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var vehicleSchema = new Schema({
	'driver' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'driver',
		unique:true
	},
	'device' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'devices',
		unique:true
	},
	'plate_number' : String,
	'car_manufacturer' : String,
	'car_model' : String,
	'fuel_usage' : Number,
	'carrying_capacity' : Number,
	'make_date' : Date,
	'manufacture_date' : Date,
	'on_trip':{
		type:Boolean,
		default:false
	},
	'milage' : Number,

});
vehicleSchema.set("timestamps", true);

module.exports = mongoose.model('vehicle', vehicleSchema);
