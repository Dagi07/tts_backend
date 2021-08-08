var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var devicesSchema = new Schema({
	'deviceId' : String,
	'last_location' : String,
	'last_location_updated' : String
});

module.exports = mongoose.model('devices', devicesSchema);
