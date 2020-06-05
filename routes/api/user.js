const express = require("express");
const router = express.Router();
const User = require("../../models/UserSchema");
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const gravatar = require("gravatar");

//Register new user
router.post(
	"/register",
	[
		check("displayName", "Provide a valid name").not().isEmpty(),
		check("email", "Provide a valid email").isEmail(),
		check("password", "Enter a Password must be 6 Character").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { displayName, password, email } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ msg: "User already exists" });
			}
			user = new User({
				displayName,
				password,
				email,
				avatar: gravatar.url(email, { s: "200", r: "pg", d: "404" }),
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			const payload = {
				id: user._id,
			};
			jwt.sign(
				payload,
				JWT_SECRET_TOKEN,
				{ expiresIn: 98600 },
				(err, token) => {
					if (err) {
						res.json({ msg: err });
					} else {
						res.json({ token });
					}
				}
			);
		} catch (e) {
			console.log(e.message);
			res.status(400).send("server error");
		}
	}
);

//Login and response token
router.post(
	"/login",
	[
		check("email", "Enter valid email").isEmail(),
		check("password", "Enter valid password").isLength({ min: 6 }),
	],
	async (req, res) => {
		const { email, password } = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			let user = await User.findOne({ email });
			if (!user) {
				res.status(400).json({ msg: "User not found" });
			}
			const isMatchPassword = await bcrypt.compare(password, user.password);
			if (!isMatchPassword) {
				res.status(400).json({ errors: [{ msg: "Password doesn't match" }] });
			}
			const payload = {
				id: user._id,
			};
			jwt.sign(payload, JWT_SECRET_TOKEN, { expiresIn: 3600 }, (err, token) => {
				if (err) {
					res.json({ msg: err });
				} else {
					res.json({ token });
				}
			});
		} catch (e) {
			res.status(500).send("server error");
		}
	}
);

//Get current login user info
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(res.authToken.id).select("-password");
		res.json(user);
	} catch (e) {
		console.log(e.message);
		res.status(500).send("server error");
	}
});

module.exports = router;
