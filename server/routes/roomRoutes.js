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

router.get("/room/specific", async(req, res)=>{

    try {
        const requestBody = req.body;
        console.debug("Retriving Room: "+JSON.stringify(requestBody));

        const room = await pool.query("SELECT * FROM room WHERE (roomNumber = $1 AND hotelid = $2 AND companyname = $3)", 
            [requestBody.roomNumber, requestBody.hotelID, requestBody.companyName]);
        res.json(room.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
    
});



router.put("/room/price", async(req, res)=>{
    try {
        const roomNumber = req.body.roomNumber;
        const hotelID = req.body.hotelID;
        const companyName = req.body.companyName;
        const price = req.body.price;
        console.debug("Updating Room Price of Room with ID:"+roomNumber+" to "+price+".");

        const updateRoom = await pool.query("UPDATE room SET price = $1 WHERE (roomNumber = $2 AND hotelID = $3 AND companyName = $4) RETURNING *", 
        [price, roomNumber, hotelID, companyName]);
        res.json(updateRoom.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.put("/room/capacity", async(req, res)=>{

    try {
        const roomNumber = req.body.roomNumber;
        const hotelID = req.body.hotelID;
        const companyName = req.body.companyName;
        const capacity = req.body.capacity;
        console.debug("Updating room capacity of room with ID:"+roomNumber+" to "+capacity+".");

        const updateRoom = await pool.query("UPDATE room SET capacity = $1 WHERE (roomNumber = $2 AND hotelID = $3 AND companyName = $4) RETURNING *", 
        [capacity, roomNumber, hotelID, companyName]);
        res.json(updateRoom.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.put("/room/viewtype", async(req, res)=>{

    try {
        const roomNumber = req.body.roomNumber;
        const hotelID = req.body.hotelID;
        const companyName = req.body.companyName;
        const viewtype = req.body.viewtype;
        console.debug("Updating room viewtype of room with ID:"+roomNumber+" to "+viewtype+".");

        const updateRoom = await pool.query("UPDATE room SET viewtype = $1 WHERE (roomNumber = $2 AND hotelID = $3 AND companyName = $4) RETURNING *",
         [viewtype, roomNumber, hotelID, companyName]);
        res.json(updateRoom.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.delete("/room", async(req, res)=>{

    try {
        const requestBody = req.body;
        console.log("Deleting room: "+JSON.stringify(requestBody));

        const deleteRoom = await pool.query("DELETE FROM room WHERE (roomNumber = $1 AND hotelid = $2 AND companyName = $3)", 
            [requestBody.roomNumber, requestBody.hotelid, requestBody.companyname]);
        res.json("Room was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});


/**
 * Create a new Room issue
 * 
 * Endpoint: /api/room/issue
 * Request Type: POST
 * Request Body:
 *  {
 *      "issue": "Broken light",
 *      "roomNumber": 1,
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.post("/room/issue", async(req, res) => {
    try {
        const requestBody = req.body;

        const newRoomIssue = await pool.query("INSERT INTO RoomIssue (Issue, RoomNumber, HotelD, CompanyName) VALUES\
            ($1, $2, $3, $4) RETURNING *", [requestBody.issue, requestBody.roomNumber, requestBody.hotelID, requestBody.companyName]);

        console.debug("Added room issue: "+JSON.stringify(requestBody));
        res.json(newRoomIssue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete a Room issue
 * 
 * Endpoint: /api/room/issue
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "issue": "Broken light",
 *      "roomNumber": 1,
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.delete("/room/issue", async(req, res) => {
    try {
        const requestBody = req.body;

        const deleteRoomIssue = await pool.query("DELETE FROM RoomIssue WHERE (Issue = $1 AND RoomNumber = $2 AND HotelID = $3 AND CompanyName = $4)",
            [requestBody.issue, requestBody.roomNumber, requestBody.hotelID, requestBody.companyName]);

        res.json("Room issue deleted");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get all issues from a certain room.
 * 
 * Endpoint: /api/room/issue
 * Request Type: GET
 * Request Body:
 *  {
 *      "roomNumber": 1,
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/room/issue", async(req, res) => {
    try {
        const requestBody = req.body;

        const allRoomIssues = await pool.query("SELECT * FROM RoomIssue WHERE (RoomNumber = $1 AND HotelID = $2 AND CompanyName = $3)",
        [requestBody.roomNumber, requestBody.hotelID, requestBody.companyName]);

        res.json(allRoomIssues.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Create a new Room amenity
 * 
 * Endpoint: /api/room/amenity
 * Request Type: POST
 * Request Body:
 *  {
 *      "amenity": "Hot tub",
 *      "roomNumber": 1,
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.post("/room/amenity", async(req, res) => {
    try {
        const requestBody = req.body;

        const newRoomAmenity = await pool.query("INSERT INTO RoomAmenity (Amenity, RoomNumber, HotelID, CompanyName) VALUES\
            ($1, $2, $3, $4) RETURNING *", [requestBody.amenity, requestBody.roomNumber, requestBody.hotelID, requestBody.companyName]);

        console.debug("Added room amenity: "+JSON.stringify(requestBody));
        res.json(newRoomAmenity.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete a Room amenity
 * 
 * Endpoint: /api/room/amenity
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "amenity": "Hottub",
 *      "roomNumber": 1,
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.delete("/room/amenity", async(req, res) => {
    try {
        const requestBody = req.body;

        const deleteRoomAmenity = await pool.query("DELETE FROM RoomAmenity WHERE (Amenity = $1 AND RoomNumber = $2 AND HotelID = $3 AND CompanyName = $4)",
            [requestBody.amenity, requestBody.roomNumber, requestBody.hotelID, requestBody.companyName]);

        res.json("Room amenity deleted");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get all amenities from a certain room.
 * 
 * Endpoint: /api/room/amenity
 * Request Type: GET
 * Request Body:
 *  {
 *      "roomNumber": 1,
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/room/amenity", async(req, res) => {
    try {
        const requestBody = req.body;

        const allRoomIssues = await pool.query("SELECT * FROM RoomAmenity WHERE (RoomNumber = $1 AND HotelID = $2 AND CompanyName = $3)",
        [requestBody.roomNumber, requestBody.hotelID, requestBody.companyName]);

        res.json(allRoomIssues.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;