const express = require("express");
const router = express.Router();
const Booking = require("../../models/BookingSchema");
const auth = require("../../middleware/auth");

//Create room
router.post("/", auth, async (req, res) => {
	try {
		//User schema
		const user = await User.findById(res.authToken.id).select("-password");
		//Create a new booking object in booking schema
		const booking = new Booking({
			user: user,
			bookingInfo: req.body,
		});
		//Save into database
		await booking.save();
		res.json(booking);
	} catch (e) {
		console.log(e.message);
	}
});

module.exports = router;
