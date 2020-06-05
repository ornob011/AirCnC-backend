const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
useNewUrlParser: true;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routers
app.use("/api/room", require("./routes/api/room"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/book", require("./routes/api/booking"));

//DB CONNECTION
mongoose.connect(
	process.env.MONGODB_URI,
	{
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	() => {
		console.log("Database connected successfully");
	}
);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("../front-end/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../front-end/build", "index.html"));
	});
}

app.listen(process.env.PORT || 8080, function () {
	console.log("Express server listening on port 4000");
});











