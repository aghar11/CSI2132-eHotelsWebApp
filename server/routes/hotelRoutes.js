/**
 * Handle API requests related to the Hotel table.
 *
 * @author Eric Van De Lande.
 * @since  March, 2023
 */

// Setup
const express = require('express');
const pool = require("../db");
const bodyParser = require("body-parser");
const router = express.Router();

/**
 * Hotel API Routes
 */

/**
 * Create new Hotel.
 * 
 * Endpoint: /api/hotel
 * Request Type: POST
 * Request Body:
 *   {
 *       "hotelID" : 5,
 *       "companyName" : "Tipton",
 *       "address" : "TEST4",
 *       "category": "test",
 *       "numberOfRooms": 12
 *   }
 */
router.post("/hotel", async(req, res)=> {
    try {
        const hotel = req.body;
        console.debug("Adding Hotel: "+JSON.stringify(hotel)+" to database.");

        const newHotel = await pool.query(
            "INSERT INTO Hotel (HotelID, CompanyName, Address, Category, NumberOfRooms) VALUES ($1, $2, $3, $4, $5) RETURNING *", [hotel.hotelID, 
                hotel.companyName, hotel.address, hotel.category, hotel.numberOfRooms]
        );

        res.json(newHotel.rows);

    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get all hotels.
 * 
 * Endpoint: /api/hotel
 * Request Type: GET
 * Request Body:
 *   { }
 */
router.get("/hotel", async(req, res)=>{
    try {
        console.debug("Retriving all hotels from database.");

        const allHotels = await pool.query("Select * from Hotel");
        res.json(allHotels.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

/**
 * Get hotel by hotelID.
 * 
 * Endpoint: /api/hotel/:id
 * Request Type: GET
 * Request Body:
 *   { }
 */
router.get("/hotel/:id", async(req, res)=>{

    try {
        const {id} = req.params;
        console.debug("Retriving Hotel with ID:"+id+" from database.")

        const hotel = await pool.query("SELECT * FROM Hotel WHERE HotelID = $1", [id])
        res.json(hotel.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
    
});


/**
 * Update hotel category.
 * 
 * Endpoint: /api/hotel/category/:id
 * Request Type: PUT
 * Request Body:
 *   { "category": "test"}
 */
router.put("/hotel/category/:id", async(req, res)=>{

    try {
        const {id} = req.params;
        const {category} = req.body.category;
        console.debug("Updating Hotel category of hotel with ID:"+id+" to "+category+".");

        const updateHotel = await pool.query("UPDATE Hotel SET Category = $1 WHERE HotelID = $2", [category, id]);
        res.json("Hotel was updated!");

    } catch (err) {
        console.error(err.message);
    }
    
});

/**
 * Delete hotel by hotelID.
 * 
 * Endpoint: /api/hotel/:id
 * Request Type: DELETE
 * Request Body:
 *   { }
 */
router.delete("/hotel/:id", async(req, res)=>{

    try {
        const {id} = req.params;
        console.debug("Deleting Hotel with ID:"+id+".")

        const deleteHotel = await pool.query("DELETE FROM Hotel WHERE HotelID = $1", [id]);
        res.json("Hotel was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});

module.exports = router;