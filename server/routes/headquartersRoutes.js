/**
 * Handle API requests related to the Headquarters table.
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
        console.debug("Adding Headquarter: "+JSON.stringify(headquarter)+" to database.")

        const newHeadquarter =  await pool.query("INSERT INTO Headquarters (companyname, numberofhotels, streetnumber, streetname, aptnumber, city, state, postalcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [headquarter.companyname, headquarter.numberofhotels, headquarter.streetnumber, headquarter.streetname, headquarter.aptnumber, headquarter.city, headquarter.state, headquarter.postalcode]
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
 * Get headquarter by primary key
 * 
 * Endpoint: /api/headquarters/specifc
 * Request Type: GET
 * Request Body:
 *  { 
 *      "companyName": "Mariott"
 *  }
 */
router.get("/headquarters/specific", async(req , res) => {
    try {
        const companyName = req.body.companyName;
        console.debug("Retrieving Headquarter with company name: "+JSON.stringify(companyName)+" from database.");

        const headquarter = await pool.query("SELECT * FROM Headquarters WHERE CompanyName = $1", [companyName]);
        res.json(headquarter.rows);
    } catch (err) {
        console.error(err.message);
    }
})

/**
 * Update headquarter number of hotels.
 * 
 * Endpoint: /api/headquarters/numberOfHotels
 * Request Type: PUT
 * Request Body:
 *  {
 *      "companyName": "Mariott"
 *      "numberOfHotels": 12
 *  }
 */
router.put("/headquarters/numberOfHotels", async(req, res) => {
    try {
        const companyName = req.body.companyName;
        const numberOfHotels = req.body.numberOfHotels;
        console.debug("Updating Headquarter number of hotels of headquarter with Company Name:"
        +companyName+" to "+numberOfHotels+".");

        const updatedHeadquarter = await pool.query("UPDATE Headquarters SET NumberOfHotels = $1 WHERE CompanyName = $2 RETURNING *",
        [numberOfHotels, companyName]);
        res.json(updatedHeadquarter.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Update headquarter address.
 * 
 * Endpoint: /api/headquarters/address
 * Request Type: PUT
 * Request Body:
 *  {
 *      "companyName": "Mariott",
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
router.put("/headquarters/address", async(req, res) => {
    try {
        const body = req.body;
        console.debug("Updating Headquarter address of headquarter with Company Name:"
        +companyName+" to "+JSON.stringify(address)+".");

        const updatedHeadquarter = await pool.query("UPDATE Headquarters SET StreetNumber = $1, StreetName = $2, AptNumber = $3, City = $4, State = $5, PostalCode =$6 \
        WHERE CompanyName = $7 RETURNING *",
        [body.streetnumber, body.streetname, body.aptnumber, body.city, body.state, body.postalcode, body.companyname]);
        res.json(updatedHeadquarter.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete headquarter by company name.
 * 
 * Endpoint: /api/headquarters/:companyName
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "companyName": "Mariott"
 *  }
 */
router.delete("/headquarters", async(req, res) => {
    try {
        const companyName = req.body.companyname;
        console.debug("Deleting Headquarter with company name: "+companyName+".");

        const deleteHeadquarter = await pool.query("DELETE FROM Headquarters WHERE CompanyName = $1", [companyName]);
        res.json("Headquarter was deleted!")
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Create headquarter phone instance.
 * 
 * Endpoint: /api/headquarters/phone
 * Request Type: POST
 * Request Body:
 *  {
 *      "companyName": "Mariott",
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.post("/headquarters/phone", async(req, res) => {
    try {
        const companyName = req.body.companyName;
        const phoneNumber = req.body.phoneNumber;
        
        console.debug("Creating Headquarter phone instance( "+companyName+", "+phoneNumber+").");
        
        const newPhoneNumber = await pool.query("INSERT INTO HeadquartersPhone (CompanyName, phoneNumber) VALUES ($1, $2) RETURNING *", [companyName, phoneNumber]);

        res.json(newPhoneNumber.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete headquarter phone instance.
 * 
 * Endpoint: /api/headquarters/phone
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "companyName": "Mariott",
 *      "phoneNumber": "400 123 1222"
 *  }
 */
router.delete("/headquarters/phone", async(req, res) => {
    try {
        const companyName = req.body.companyName;
        const phoneNumber = req.body.phoneNumber;

        console.debug("Deleting Headquarter phone instance( "+companyName+", "+phoneNumber+").");

        const deletePhone = await pool.query("DELETE FROM HeadquartersPhone WHERE (CompanyName = $1 AND phoneNumber = $2)", [companyName, phoneNumber]);

        res.json("Phone number was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all phonenumbers for a certain headquarter.
 * 
 * Endpoint: /api/headquarters/phone
 * Request Type: GET
 * Request Body:
 *  {
 *      "companyName": "Mariott"
 *  }
 */
router.get("/headquarters/phone", async(req, res) => {
    try {
        const companyName = req.body.companyName;

        console.debug("Retrieving all phone numbers for Headquarter with company name: "+companyName+".");

        const phoneNumbers = await pool.query("SELECT * FROM HeadquartersPhone WHERE CompanyName = $1", [companyName]);

        res.json(phoneNumbers.rows);
    } catch (error) {
        console.error(err.message);
    }
});

/**
 * Create headquarter email instance.
 * 
 * Endpoint: /api/headquarters/email
 * Request Type: POST
 * Request Body:
 *  {
 *      "companyName": "Mariott",
 *      "email": "test@gmail.com"
 *  }
 */
router.post("/headquarters/email", async(req, res) => {
    try {
        const companyName = req.body.companyName;
        const email = req.body.email;

        console.debug("Creating Headquarter email instance( "+companyName+", "+email+").");

        const newEmail = await pool.query("INSERT INTO HeadquartersEmail (CompanyName, email) VALUES ($1, $2) RETURNING *", [companyName, email]);

        res.json(newEmail.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Delete headquarter email instance.
 * 
 * Endpoint: /api/headquarters/email
 * Request Type: DELETE
 * Request Body:
 *  {
 *      "companyName": "Mariott",
 *      "email": "test@gmail.com"
 *  }
 */
router.delete("/headquarters/email", async(req, res) => {
    try {
        const companyName = req.body.companyName;
        const email = req.body.email;

        console.debug("Deleting Headquarter email instance( "+companyName+", "+email+").");

        const deleteEmail = await pool.query("DELETE FROM HeadquartersEmail WHERE (CompanyName = $1 AND email = $2)", [companyName, email]);

        res.json("Email was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Find all emails for a certain headquarter.
 * 
 * Endpoint: /api/headquarters/email
 * Request Type: GET
 * Request Body:
 *  {
 *      "companyName": "Mariott"
 *  }
 */
router.get("/headquarters/email", async(req, res) => {
    try {
        const companyName = req.body.companyName;

        console.debug("Retrieving all emails for Headquarter with company name : "+companyName+".");

        const emails = await pool.query("SELECT * FROM HeadquartersEmail WHERE CompanyName = $1", [companyName]);

        res.json(emails.rows);
    } catch (error) {
        console.error(err.message);
    }
});


module.exports = router;