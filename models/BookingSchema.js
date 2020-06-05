const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
	user: {
		type: Object,
	},
	bookingInfo: {
		type: Object,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
module.exports = Booking = mongoose.model("boooking", BookingSchema);
