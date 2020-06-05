const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
	user: {
		type: Object,
	},
	title: {
		type: String,
	},
	price: {
		type: String,
	},
	shift: {
		type: String,
	},
	thumbnail: {
		imageOne: {
			type: String,
		},
		imageTwo: {
			type: String,
		},
	},
	roomsInfo: {
		type: String,
	},
	extraFacility: {
		type: String,
	},
	address: {
		placeName: {
			type: String,
		},
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
	},
	cancelAvailable: {
		type: Boolean,
	},
	description: {
		type: String,
	},
	rules: [
		{
			rulesTitle: {
				type: String,
			},
			rulesDesc: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	reviews: [
		{
			userName: {
				type: String,
			},
			reviewTxt: {
				type: String,
			},
			rating: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Room = mongoose.model("room", RoomSchema);
