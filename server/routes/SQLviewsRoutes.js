/**
 * Handle API requests related to the SQL Views table.
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
 * SQL View API Routes
 */

/**
 * Get Hotel capacities.
 * 
 * Endpoint: /api/views/hotelCapacities
 * Request Type: GET
 * Request Body:
 *   {    }
 */
router.get("/views/hotelCapacities", async (req, res) => {
    try {
        console.debug("Retrieving all hotel capacities.");
        const hotelCapacities = await pool.query("SELECT * FROM total_capacity_by_hotel");

        res.json(hotelCapacities.rows);
    } catch (err) {
        console.error(err.message);
    }
});


/**
 * Get Rooms by area.
 * 
 * Endpoint: /api/views/roomsByCity
 * Request Type: GET
 * Request Body:
 *   {    }
 */
router.get("/views/roomsByCity", async (req, res) => {
    try {
        console.debug("Retrieving all rooms by area.");
        const roomsByArea = await pool.query("SELECT * FROM number_of_rooms_by_city");

        res.json(roomsByArea.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;