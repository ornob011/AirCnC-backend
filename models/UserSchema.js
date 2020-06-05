const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = User = mongoose.model("user", UserSchema);
