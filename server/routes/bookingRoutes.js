/**
 * Handle API requests related to the Booking table.
 *
 * @author Akarsh Gharge.
 * @since  March, 2023
 */

// Setup
const express = require('express');
const pool = require("../db");
const bodyParser = require("body-parser");
const router = express.Router();


/**
 * Booking API Routes
 */

/**
 * Create new booking.
 * 
 * Endpoint: /api/booking
 * Request Type: POST
 * Request Body:
 *   {
 *      "checkInDate": "17/12/2023", (FORMAT: DD/MM/YYYY)
 *      "checkOutDate": "20/12/2023", (FORMAT: DD/MM/YYYY)
 *      "roomNumber": 12,
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "customerID": 1232,
 *      "status": "RESERVED"     
 *   }
 */
router.post("/booking", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Creating new booking: "+JSON.stringify(requestBody));
        const newBooking = await pool.query(
            "INSERT INTO Booking (CheckInDate, CheckOutDate, HotelID, RoomNumber, CustomerID, CompanyName, Status)\
            VALUES (TO_DATE($1, 'DD/MM/YYYY'), TO_DATE($2, 'DD/MM/YYYY'), $3, $4, $5, $6, $7) RETURNING *",
            [requestBody.checkInDate, requestBody.checkOutDate, requestBody.hotelID, requestBody.roomNumber, requestBody.customerID, requestBody.companyName, requestBody.status]);
        
        res.json(newBooking.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get all booking.
 * 
 * Endpoint: /api/booking
 * Request Type: get
 * Request Body:
 *   { }
 */
router.get("/booking", async(req, res) => {
    try {
        console.debug("Retrieving all bookings");
        const allBookings = await pool.query("SELECT * FROM Booking");

        res.json(allBookings.rows);
    } catch (err) {
        console.error(err.message);
    }
});


/**
 * Get specific booking.
 * 
 * Endpoint: /api/booking
 * Request Type: DELETE
 * Request Body:
 *   {
 *      "checkInDate": "17/12/2023", (FORMAT: DD/MM/YYYY)
 *      "checkOutDate": "20/12/2023", (FORMAT: DD/MM/YYYY)
 *      "roomNumber": 12,
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "customerID": 1232 
 *   }
 */
router.get("/booking/specific", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Retrieving specific booking: "+JSON.stringify(requestBody));
        const specificBooking = await pool.query("SELECT * FROM Booking WHERE (CheckInDate = TO_DATE($1, 'DD/MM/YYYY') AND CheckOutDate = TO_DATE($2, 'DD/MM/YYYY') AND HotelID = $3\
            AND RoomNumber = $4 AND CustomerID = $5 AND CompanyName = $6)",
            [requestBody.checkInDate, requestBody.checkOutDate, requestBody.hotelID, requestBody.roomNumber, requestBody.customerID, requestBody.companyName]);

        res.json(specificBooking.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Change booking status
 * 
 * Endpoint: /api/booking/status
 * Request Type: PUT
 * Request Body:
 *   {
 *      "checkInDate": "17/12/2023", (FORMAT: DD/MM/YYYY)
 *      "checkOutDate": "20/12/2023", (FORMAT: DD/MM/YYYY)
 *      "roomNumber": 12,
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "customerID": 1232,
 *      "status": "ACTIVE"
 *   }
 */
router.put("/booking/status", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Updating booking status: "+JSON.stringify(requestBody));
        const updateBooking = await pool.query("UPDATE Booking \
        SET Status = $7 \
        WHERE (CheckInDate = TO_DATE($1, 'DD/MM/YYYY') AND CheckOutDate = TO_DATE($2, 'DD/MM/YYYY') AND HotelID = $3 AND RoomNumber = $4 AND CustomerID = $5 AND CompanyName = $6) RETURNING *",
        [requestBody.checkInDate, requestBody.checkOutDate, requestBody.hotelID, requestBody.roomNumber, requestBody.customerID, requestBody.companyName, requestBody.status]);

        res.json(updateBooking.rows);
    } catch (err) {
        console.error(err.message);
    }
});


/**
 * Delete booking.
 * 
 * Endpoint: /api/booking
 * Request Type: DELETE
 * Request Body:
 *   {
 *      "checkInDate": "17/12/2023", (FORMAT: DD/MM/YYYY)
 *      "checkOutDate": "20/12/2023", (FORMAT: DD/MM/YYYY)
 *      "roomNumber": 12,
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "customerID": 1232,  
 *   }
 */
router.delete("/booking", async(req, res) => {
    try {
        const requestBody = req.body;

        console.debug("Deleting booking: "+JSON.stringify(requestBody));
        const deleteBooking = await pool.query("DELETE FROM Booking WHERE (CheckInDate = TO_DATE($1, 'DD/MM/YYYY') AND CheckOutDate = TO_DATE($2, 'DD/MM/YYYY') AND HotelID = $3\
            AND RoomNumber = $4 AND CustomerID = $5 AND CompanyName = $6)",
            [requestBody.checkInDate, requestBody.checkOutDate, requestBody.hotelID, requestBody.roomNumber, requestBody.customerID, requestBody.companyName]);

        res.json("Deleted booking!");
    } catch (err) {
        console.error(err.message);
    }
});





module.exports = router;