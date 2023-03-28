/**
 * Handle API requests related to the Customer table.
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
 * Customer API Routes
 */
router.post("/customers", async(req, res) => {
    try {
        const customer = req.body;
        const address = req.body.address;
        const name = req.body.name;

        console.debug("Adding Customer: "+JSON.stringify(customer)+" to database.")

        const newCustomer =  await pool.query(
            "INSERT INTO Customer (CustomerID, SIN, RegistrationDate, FirstName, LastName, StreetNumber, StreetName, AptNumber, City, State, PostalCode) VALUES \
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [customer.customerID, customer.SIN , customer.registrationDate, name.firstName, name.lastName, address.streetNumber, address.streetName, address.aptNumber, address.city, address.state, address.postalCode]
        );

        res.json(newCustomer.rows);
    } catch (err) {
        console.error(err.message);
    }
});





module.exports = router;