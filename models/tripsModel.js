var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var tripsSchema = new Schema({
	'driver' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'driver'
	},
	'vehicle' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'vehicle'
	},
	'device' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'devices'
	},
	'starting_location' : String,
	'destination_location' : String,
	'current_location' : String,
	'description' : String,
	'trip_distance' : String,
	'remaining_distance' : String,
	'remaining_time' : String,
	'trip_estimated' : String,
	'trip_start_time' : Date,
	'trip_estimated_fuel':String,
	'active' : Boolean,
	'started' : Boolean,
	'stopped' : Boolean,
	'starting_position' : String,
	'destination_position' : String,
	'current_position' : String,
});
tripsSchema.set("timestamps", true);

module.exports = mongoose.model('trips', tripsSchema);
