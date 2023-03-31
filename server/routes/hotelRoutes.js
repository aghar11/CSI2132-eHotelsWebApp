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
            "INSERT INTO Hotel (hotelid, companyname, category, numberofrooms, streetnumber, streetname, aptnumber, city, state, postalcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", 
            [hotel.hotelid, hotel.companyname, hotel.category, hotel.numberofrooms, hotel.streetnumber, hotel.streetname, hotel.aptnumber, hotel.city, hotel.state, hotel.postalcode]
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
 * Get hotel by primary key.
 * 
 * Endpoint: /api/hotel/specific
 * Endpoint: /api/hotel/specific
 * Request Type: GET
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/hotel/specific", async(req, res)=>{

    try {
        const requestBody = req.body;
        console.debug("Retriving Hotel: "+JSON.stringify(requestBody));

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

//update all
router.put("/hotel/all", async(req, res)=>{

    try {
        const requestBody = req.body;
        console.debug("Updating Hotel all attributes: "+JSON.stringify(requestBody));

        const updateHotel = await pool.query("UPDATE hotel SET category = $1, numberofrooms = $2, streetnumber = $3, streetname = $4, aptnumber = $5, city = $6, state = $7, postalcode = $8 WHERE (hotelid = $9 AND companyname = $10) RETURNING *", 
            [requestBody.category, requestBody.numberofrooms, requestBody.streetnumber, requestBody.streetname, requestBody.aptnumber, requestBody.city, requestBody.state, requestBody.postalcode, requestBody.hotelid, requestBody.companyname]);
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
        const deleteHotel = await pool.query("DELETE FROM Hotel WHERE (HotelID = $1 AND CompanyName = $2)", [requestBody.hotelid, requestBody.companyname]);
        res.json("Hotel was deleted!");
    } catch (err) {
        console.error(err.message);
    }
    
});

/**
 * Create hotel phone instance.
 * 
 * Endpoint: /api/hotel/phone
 * Request Type: POST
 * Request Body:
 *  {
 *      "hotelID": "1",
 *      "companyName": "Mariott",
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.post("/hotel/phone", async(req, res) => {
    try {
        const requestBody = req.body;
        
        console.debug("Creating Hotel phone instance"+JSON.stringify(requestBody));
        
        const newPhoneNumber = await pool.query("INSERT INTO HotelPhone (HotelID, CompanyName, phoneNumber) VALUES ($1, $2, $3) RETURNING *", 
            [requestBody.hotelID, requestBody.companyName, requestBody.phoneNumber]);

        res.json(newPhoneNumber.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete hotel phone instance.
 * 
 * Endpoint: /api/hotel/phone
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.delete("/hotel/phone", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Deleting Hotel phone instance: "+JSON.stringify(requestBody));

        const deletePhone = await pool.query("DELETE FROM HotelPhone WHERE (HotelID = $1 AND CompanyName = $2 AND phoneNumber = $3)", 
        [requestBody.hotelID, requestBody.companyName, requestBody.phoneNumber]);

        res.json("Phone number was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all phonenumbers for a certain hotel.
 * 
 * Endpoint: /api/hotel/phone
 * Request Type: GET
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/hotel/phone", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Retrieving all phone numbers for Hotel: "+JSON.stringify(requestBody));

        const phoneNumbers = await pool.query("SELECT * FROM HotelPhone WHERE (HotelID = $1 AND CompanyName = $2)", 
        [requestBody.hotelID, requestBody.companyName]);

        res.json(phoneNumbers.rows);
    } catch (error) {
        console.error(err.message);
    }
});

/**
 * Create hotel email instance.
 * 
 * Endpoint: /api/hotel/email
 * Request Type: POST
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "email": "test@gmail.com"
 *  }
 */
router.post("/hotel/email", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Creating Hotel email instance: "+JSON.stringify(requestBody));

        const newEmail = await pool.query("INSERT INTO HotelEmail (HotelID, CompanyName, email) VALUES ($1, $2, $3) RETURNING *", 
        [requestBody.hotelID, requestBody.companyName, requestBody.email]);

        res.json(newEmail.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete hotel email instance.
 * 
 * Endpoint: /api/hotel/email
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "email": "test@gmail.com"
 *  }
 */
router.delete("/hotel/email", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Deleting Headquarter email instance: "+JSON.stringify(requestBody));

        const deleteEmail = await pool.query("DELETE FROM HotelEmail WHERE (HotelID = $1 AND CompanyName = $2 AND email = $3)", 
        [requestBody.hotelID, requestBody.companyName, requestBody.email]);

        res.json("Email was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all emails for a certain hotel.
 * 
 * Endpoint: /api/hotel/email
 * Request Type: GET
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/headquarters/email", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Retrieving all emails for Headquarter: "+JSON.stringify(requestBody));

        const emails = await pool.query("SELECT * FROM HeadquartersEmail WHERE (HotelID = $1 AND CompanyName = $2)", 
        [requestBody.hotelID, requestBody.companyName]);

        res.json(emails.rows);
    } catch (error) {
        console.error(err.message);
    }
});

/**
 * Create hotel phone instance.
 * 
 * Endpoint: /api/hotel/phone
 * Request Type: POST
 * Request Body:
 *  {
 *      "hotelID": "1",
 *      "companyName": "Mariott",
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.post("/hotel/phone", async(req, res) => {
    try {
        const requestBody = req.body;
        
        console.debug("Creating Hotel phone instance"+JSON.stringify(requestBody));
        
        const newPhoneNumber = await pool.query("INSERT INTO HotelPhone (HotelID, CompanyName, phoneNumber) VALUES ($1, $2, $3) RETURNING *", 
            [requestBody.hotelID, requestBody.companyName, requestBody.phoneNumber]);

        res.json(newPhoneNumber.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete hotel phone instance.
 * 
 * Endpoint: /api/hotel/phone
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.delete("/hotel/phone", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Deleting Hotel phone instance: "+JSON.stringify(requestBody));

        const deletePhone = await pool.query("DELETE FROM HotelPhone WHERE (HotelID = $1 AND CompanyName = $2 AND phoneNumber = $3)", 
        [requestBody.hotelID, requestBody.companyName, requestBody.phoneNumber]);

        res.json("Phone number was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all phonenumbers for a certain hotel.
 * 
 * Endpoint: /api/hotel/phone
 * Request Type: GET
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/hotel/phone", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Retrieving all phone numbers for Hotel: "+JSON.stringify(requestBody));

        const phoneNumbers = await pool.query("SELECT * FROM HotelPhone WHERE (HotelID = $1 AND CompanyName = $2)", 
        [requestBody.hotelID, requestBody.companyName]);

        res.json(phoneNumbers.rows);
    } catch (error) {
        console.error(err.message);
    }
});

/**
 * Create hotel email instance.
 * 
 * Endpoint: /api/hotel/email
 * Request Type: POST
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "email": "test@gmail.com"
 *  }
 */
router.post("/hotel/email", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Creating Hotel email instance: "+JSON.stringify(requestBody));

        const newEmail = await pool.query("INSERT INTO HotelEmail (HotelID, CompanyName, email) VALUES ($1, $2, $3) RETURNING *", 
        [requestBody.hotelID, requestBody.companyName, requestBody.email]);

        res.json(newEmail.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete hotel email instance.
 * 
 * Endpoint: /api/hotel/email
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "email": "test@gmail.com"
 *  }
 */
router.delete("/hotel/email", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Deleting Headquarter email instance: "+JSON.stringify(requestBody));

        const deleteEmail = await pool.query("DELETE FROM HotelEmail WHERE (HotelID = $1 AND CompanyName = $2 AND email = $3)", 
        [requestBody.hotelID, requestBody.companyName, requestBody.email]);

        res.json("Email was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all emails for a certain hotel.
 * 
 * Endpoint: /api/hotel/email
 * Request Type: GET
 * Request Body:
 *  {
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/headquarters/email", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Retrieving all emails for Headquarter: "+JSON.stringify(requestBody));

        const emails = await pool.query("SELECT * FROM HeadquartersEmail WHERE (HotelID = $1 AND CompanyName = $2)", 
        [requestBody.hotelID, requestBody.companyName]);

        res.json(emails.rows);
    } catch (error) {
        console.error(err.message);
    }
});

module.exports = router;