const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const auth = (req, res, next) => {
	const getToken = req.header("x-auth-token");
	if (!getToken) {
		return res.status(401).json({ msg: "No token in header" });
	}
	try {
		const decoded = jwt.verify(getToken, JWT_SECRET_TOKEN);
		res.authToken = decoded;
		next();
	} catch (e) {
		res.status(401).json({ msg: "Invalid Token" });
	}
};
module.exports = auth;
