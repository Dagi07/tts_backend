var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var maintainanceSchema = new Schema({
	'vehicle' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'vehicle'
	},
	'description' : String,
	'mileage' : {
		type:Number,
		default:0
	}
});
maintainanceSchema.set("timestamps", true);


module.exports = mongoose.model('maintainance', maintainanceSchema);
