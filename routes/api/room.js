const express = require("express");
const router = express.Router();
const Room = require("../../models/RoomSchema");
const User = require("../../models/UserSchema");
const auth = require("../../middleware/auth");

//Get all rooms
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (e) {
        console.log(e.message);
    }
});

//Delete all rooms
router.delete("/delete", async (req, res) => {
    try {
        await Room.remove();
        res.json({ ms: "success" });
    } catch (e) {
        console.log(e.message);
    }
});

//Create room
router.post("/", auth, async (req, res) => {
    try {
        const {
            title,
            price,
            shift,
            imageOne,
            imageTwo,
            roomsInfo,
            extraFacility,
            placeName,
            latitude,
            longitude,
            cancelAvailable,
            description,
        } = req.body;
        //User schema
        const user = await User.findById(res.authToken.id).select("-password");

        //Create a new room object in booking schema
        const room = new Room({
            user: user,
            title,
            price,
            shift,
            thumbnail: {
                imageOne,
                imageTwo,
            },
            roomsInfo,
            extraFacility,
            address: {
                placeName,
                latitude,
                longitude,
            },
            cancelAvailable,
            description,
        });
        //Save into database
        await room.save();
        res.json(room);
    } catch (e) {
        console.log(e.message);
    }
});

//Put Rules
router.put("/rule/:roomId", async (req, res) => {
    const { rulesTitle, rulesDesc } = req.body;
    try {
        //Room schema
        const room = await Room.findById(req.params.roomId);
        //Create rule object
        const newRoom = {
            rulesTitle,
            rulesDesc,
        };
        //Push rule object into rules array
        room.rules.push(newRoom);
        //Save into DB
        await room.save();
        //Response
        res.json(room);
    } catch (e) {
        console.log(e.message);
    }
});

//Put review
router.put("/review/:roomId", async (req, res) => {
    const { userName, reviewTxt, rating } = req.body;
    try {
        //Room schema
        const room = await Room.findById(req.params.roomId);
        //Create new review object
        const newReview = {
            userName,
            reviewTxt,
            rating,
        };
        //Push object into room schema review array using push method
        room.reviews.push(newReview);
        //Save into DB
        await room.save();
        //Response
        res.json(room);
    } catch (e) {
        console.log(e.message);
    }
});

module.exports = router;
