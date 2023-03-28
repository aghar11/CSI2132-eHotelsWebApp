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
 *      "hotelID" : 5,
 *      "companyName" : "Tipton",
 *      "address": {
 *          "streetNumber": 12,
 *          "streetName": "Mariott Way",
 *          "aptNumber": 12 (OPTIONAL),
 *          "city": "New York",
 *          "state": "New York",
 *          "postalCode": "00000"
 *      },
 *      "category": "test",
 *      "numberOfRooms": 12
 *   }
 */
router.post("/hotel", async(req, res)=> {
    try {
        const hotel = req.body;
        const address = req.body.address;
        console.debug("Adding Hotel: "+JSON.stringify(hotel)+" to database.");

        const newHotel = await pool.query(
            "INSERT INTO Hotel (HotelID, CompanyName, Category, NumberOfRooms, StreetNumber, StreetName, AptNumber, City, State, PostalCode) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", 
            [hotel.hotelID, hotel.companyName, hotel.category, hotel.numberOfRooms, 
            address.streetNumber, address.streetName, address.aptNumber, address.city, address.state, address.postalCode]
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
 * Get hotel by primary key.
 * 
 * Endpoint: /api/hotel
 * Request Type: GET
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/hotel", async(req, res)=>{

    try {
        const requestBody = req.params;
        console.debug("Retriving Hotel with key"+JSON.stringify(primaryKey)+" from database.")

        const hotel = await pool.query("SELECT * FROM Hotel WHERE (HotelID = $1 AND CompanyName = $2)", [requestBody.hotelID, requestBody.companyName]);
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
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "category": "5 Star"
 *  }
 */
router.put("/hotel/category", async(req, res)=>{

    try {
        const requestBody = req.body;
        console.debug("Updating Hotel category: "+JSON.stringify(requestBody));

        const updateHotel = await pool.query("UPDATE Hotel SET Category = $1 WHERE (HotelID = $2 AND CompanyName = $3)", 
            [requestBody.category, requestBody.hotelID, requestBody.companyName]
        );
        res.json("Hotel was updated!");

    } catch (err) {
        console.error(err.message);
    }
    
});

/**
 * Delete hotel by primary key.
 * 
 * Endpoint: /api/hotel
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.delete("/hotel", async(req, res)=>{

    try {
        const requestBody = req.body;
        console.debug("Deleting Hotel: "+JSON.stringify(requestBody));

        const deleteHotel = await pool.query("DELETE FROM Hotel WHERE (HotelID = $1 AND CompanyName = $2)", [requestBody.hotelID, requestBody.companyName]);
        res.json("Hotel was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});

module.exports = router;