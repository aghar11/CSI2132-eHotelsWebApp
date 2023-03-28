/**
 * Handle API requests related to the Headquarters table.
 *
 * @author 
 * @since  March, 2023
 */

// Setup
const express = require('express');
const pool = require("../db");
const bodyParser = require("body-parser");
const router = express.Router();

/**
 * Headquarters API Routes
 */

/**
 * Create a new Headquarter
 * 
 * Endpoint: /api/headquarters
 * Request Type: POST
 * Request Body:
 *  {
 *      "companyName": "Mariott",
 *      "numberOfHotels": 10,
 *      "address": "123 Mariott Way"
 *  }
 */
router.post("/headquarters", async(req, res) => {
    try {
        const headquarter = req.body;
        console.debug("Adding Headquarter: "+JSON.stringify()+" to database.")

        const newHeadquarter =  await pool.query(
            "INSERT INTO Headquarters (CompanyName, NumberOfHotels, Address) VALUES ($1, $2, $3) RETURNING *",
            [headquarter.companyName, headquarter.numberOfHotels, headquarter.address]
        );

        res.json(newHeadquarter.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get all headquarters.
 * 
 * Endpoint: /api/headquarters
 * Request Type: GET
 * Request Body:
 * {    }
 */
router.get("/headquarters", async(req, res) => {
    try {
        console.debug("Retrieving all headquarters from the database.");

        const allHeaddquarters = await pool.query("SELECT * FROM Headquarters");
        res.json(allHeaddquarters.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get headquarter by comapnyName
 * 
 * Endpoint: /api/headquarters/:companyName
 * Request Type: GET
 * Request Body:
 *  { }
 */
router.get("/headquarters/:companyName", async(req , res) => {
    try {
        const comapnyName = req.params;
        console.debug("Retrieving Headquarter with company name: "+comapnyName+" from database.");

        const headquarter = await pool.query("SELECT * FROM Headquarters WHERE companyName = $1", [comapnyName]);
        res.json(headquarter.rows);
    } catch (err) {
        console.error(err.message);
    }
})

/**
 * Update headquarter number of hotels.
 * 
 * Endpoint: /api/headquarters/numberOfHotels/:companyName
 * Request Type: PUT
 * Request Body:
 *  {
 *      "numberOfHotels": 12
 *  }
 */
router.put("/headquarters/numberOfHotels/:companyName", async(req, res) => {
    try {
        const companyName = req.params;
        const numberOfHotels = req.body.numberOfHotels;
        console.debug("Updating Headquarter number of hotels of headquarter with Company Name:"
        +companyName+" to "+numberOfHotels+".");

        const updatedHeadquarter = await pool.query("UPDATE Headquarter SET NumberOfHotels = $1 WHERE CompanyName = $2",
        [numberOfHotels, companyName]);
        res.json(updatedHeadquarter.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Update headquarter address.
 * 
 * Endpoint: /api/headquarters/address/:companyName
 * Request Type: PUT
 * Request Body:
 *  {
 *      "address": 12
 *  }
 */
router.put("/headquarters/address/:companyName", async(req, res) => {
    try {
        const companyName = req.params;
        const address = req.body.address;
        console.debug("Updating Headquarter address of headquarter with Company Name:"
        +companyName+" to "+address+".");

        const updatedHeadquarter = await pool.query("UPDATE Headquarter SET Address = $1 WHERE CompanyName = $2",
        [address, companyName]);
        res.json(updatedHeadquarter.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete headquarter by company name.
 * 
 * Endpoint: /api/headquarter/:companyName
 * Request Type: DELETE
 * Request Body:
 *  {   }
 */
router.delete("/headquarter/:companyName", async(req, res) => {
    try {
        const companyName = req.params;
        console.debug("Deleting Headquarter with company name: "+companyName+".");

        const deleteHeadquarter = await pool.query("DELETE FROM Hotel WHERE CompanyName = $1", [companyName]);
        res.json("Headquarter was deleted!")
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;