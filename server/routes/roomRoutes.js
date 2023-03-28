/**
 * Handle API requests related to the Room table.
 *
 * @author Axel Tang
 * @since  March, 2023
 */

// Setup
const express = require('express');
const pool = require("../db");
const bodyParser = require("body-parser");
const router = express.Router();

/**
 * Room API Routes
 */

router.post("/room", async(req, res)=> {
    try {
        const room = req.body;
        console.log("Adding Room: "+JSON.stringify(room)+" to database.");

        const newRoom = await pool.query(
            "INSERT INTO Room (roomNumber, companyName, hotelid, viewtype, price, capacity, expandable) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [room.roomNumber, 
                room.companyname, room.hotelid, room.viewtype, room.price, room.capacity, room.expandable]
        );

        res.json(newRoom.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/room", async(req, res)=>{
    try {
        console.debug("Retriving all room from database.");

        const allRooms = await pool.query("Select * from room");
        res.json(allRooms.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.get("/room/:roomNumber", async(req, res)=>{

    try {
        const {roomNumber} = req.params;
        console.debug("Retriving Room with Room Number:"+ roomNumber +" from database.")

        const room = await pool.query("SELECT * FROM room WHERE roomNumber = $1", [roomNumber])
        res.json(room.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
    
});
router.put("/room/price/:roomNumber", async(req, res)=>{

    try {
        const roomNumber = req.params.roomNumber;
        const price = req.body.price;
        console.debug("Updating Room Price of Room with ID:"+roomNumber+" to "+price+".");

        const updateRoom = await pool.query("UPDATE room SET price = $1 WHERE roomNumber = $2 RETURNING *", [price, roomNumber]);
        res.json(updateRoom.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});
router.put("/room/capacity/:roomNumber", async(req, res)=>{

    try {
        const roomNumber = req.params.roomNumber;
        const capacity = req.body.capacity;
        console.debug("Updating room capacity of room with ID:"+roomNumber+" to "+capacity+".");

        const updateRoom = await pool.query("UPDATE room SET capacity = $1 WHERE roomNumber = $2 RETURNING *", [capacity, roomNumber]);
        res.json(updateRoom.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});
router.put("/room/viewtype/:roomNumber", async(req, res)=>{

    try {
        const roomNumber = req.params.roomNumber;
        const viewtype = req.body.viewtype;
        console.debug("Updating room viewtype of room with ID:"+roomNumber+" to "+viewtype+".");

        const updateRoom = await pool.query("UPDATE room SET viewtype = $1 WHERE roomNumber = $2 RETURNING *", [viewtype, roomNumber]);
        res.json(updateRoom.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.delete("/room/:roomNumber", async(req, res)=>{

    try {
        const {roomNumber} = req.params;
        console.log("Deleting room with ID:"+roomNumber+".")

        const deleteRoom = await pool.query("DELETE FROM room WHERE roomNumber = $1", [roomNumber]);
        res.json("Room was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});


module.exports = router;