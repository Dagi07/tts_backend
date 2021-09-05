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
	'trip_estimated' : Date,
	'trip_start_time' : Date,
	'active' : Boolean,
	'started' : Boolean,
	'stopped' : Boolean
});
tripsSchema.set("timestamps", true);

module.exports = mongoose.model('trips', tripsSchema);
