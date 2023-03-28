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
 *      "address": {
 *          "streetNumber": 12,
 *          "streetName": "Mariott Way",
 *          "aptNumber": 12 (OPTIONAL),
 *          "city": "New York",
 *          "state": "New York",
 *          "postalCode": "00000"
 *      }
 *  }
 */
router.post("/headquarters", async(req, res) => {
    try {
        const headquarter = req.body;
        const address = req.body.address;
        console.debug("Adding Headquarter: "+JSON.stringify(headquarter)+" to database.")

        const newHeadquarter =  await pool.query(
            "INSERT INTO Headquarters (CompanyName, NumberOfHotels, StreetNumber, StreetName, AptNumber, City, State, PostalCode) VALUES \
            ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [headquarter.companyName, headquarter.numberOfHotels, address.streetNumber, address.streetName, address.aptNumber, address.city, address.state, address.postalCode]
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
 * Get headquarter by comapanyName
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
 *      "address": {
 *          "streetNumber": 12,
 *          "streetName": "Mariott Way",
 *          "aptNumber": 12 (OPTIONAL),
 *          "city": "New York",
 *          "state": "New York",
 *          "postalCode": "00000"
 *      }
 *  }
 */
router.put("/headquarters/address/:companyName", async(req, res) => {
    try {
        const companyName = req.params;
        const address = req.body.address;
        console.debug("Updating Headquarter address of headquarter with Company Name:"
        +companyName+" to "+address+".");

        const updatedHeadquarter = await pool.query("UPDATE Headquarter SET StreetNumber = $1, StreetName = $2, AptNumber = $3, City = $4, State = $5, PostalCode =$6 \
        WHERE CompanyName = $7",
        [address.streetNumber, address.streetName, address.aptNumber, address.city, address.state, address.postalCode, companyName]);
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

/**
 * Create headquarter phone instance.
 * 
 * Endpoint: /api/headquarter/:companyName/phone
 * Request Type: POST
 * Request Body:
 *  {
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.post("/headquarter/:companyName/phone", async(req, res) => {
    try {
        const companyName = req.params;
        const phoneNumber = req.body.phoneNumber;

        const newPhoneNumber = await pool.query("INSERT INTO HeadquartersPhone (CompanyName, phoneNumber) VALUES ($1, $2) RETURNING *", [companyName, phoneNumber]);

        res.json(newPhoneNumber.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete headquarter phone instance.
 * 
 * Endpoint: /api/headquarter/:companyName/phone
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.delete("/headquarter/:companyName/phone", async(req, res) => {
    try {
        const companyName = req.params;
        const phoneNumber = req.body.phoneNumber;

        const deletePhone = await pool.query("DELETE FROM HeadquartersPhone WHERE (CompanyName = $1 AND phoneNumber = $2", [companyName, phoneNumber]);

        res.json("Phone number was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all phonenumbers for a certain headquarter.
 * 
 * Endpoint: /api/headquarter/:companyName/phone
 * Request Type: GET
 * Request Body:
 *  { }
 */
router.get("/headquarter/:companyName/phone", async(req, res) => {
    try {
        const companyName = req.params;

        const phoneNumbers = await pool.query("SELECT * FROM HeadquartersPhone WHERE CompanyName = $1", [companyName]);

        res.json(phoneNumbers.rows);
    } catch (error) {
        console.error(err.message);
    }
});

/**
 * Create headquarter email instance.
 * 
 * Endpoint: /api/headquarter/:companyName/email
 * Request Type: POST
 * Request Body:
 *  {
 *      "email": "test@gmail.com"
 *  }
 */
router.post("/headquarter/:companyName/email", async(req, res) => {
    try {
        const companyName = req.params;
        const email = req.body.phoneNumber;

        const newEmail = await pool.query("INSERT INTO HeadquartersEmail (CompanyName, email) VALUES ($1, $2) RETURNING *", [companyName, email]);

        res.json(newEmail.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete headquarter email instance.
 * 
 * Endpoint: /api/headquarter/:companyName/email
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "email": "test@gmail.com"
 *  }
 */
router.delete("/headquarter/:companyName/email", async(req, res) => {
    try {
        const companyName = req.params;
        const email = req.body.phoneNumber;

        const deleteEmail = await pool.query("DELETE FROM HeadquartersEmail WHERE (CompanyName = $1 AND email = $2", [companyName, email]);

        res.json("Phone number was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all emails for a certain headquarter.
 * 
 * Endpoint: /api/headquarter/:companyName/email
 * Request Type: GET
 * Request Body:
 *  { }
 */
router.get("/headquarter/:companyName/email", async(req, res) => {
    try {
        const companyName = req.params;

        const phoneNumbers = await pool.query("SELECT * FROM HeadquartersEmail WHERE CompanyName = $1", [companyName]);

        res.json(phoneNumbers.rows);
    } catch (error) {
        console.error(err.message);
    }
});


module.exports = router;