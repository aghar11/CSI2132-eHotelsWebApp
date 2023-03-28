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
 Create a new customer
 */
router.post("/customer", async(req, res) => {
    try {
        const customer = req.body;
        const address = req.body.address;
        const name = req.body.name;

        console.debug("Adding Customer with ID: "+customer.customerID+" to database.");

        const newCustomer =  await pool.query(
            "INSERT INTO Customer (CustomerID, SIN, RegistrationDate, FirstName, LastName, StreetNumber, StreetName, AptNumber, City, State, PostalCode) VALUES \
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [customer.customerID, customer.SIN , customer.registrationdate, name.firstName, name.lastName, address.streetNumber, address.streetName, address.aptNumber, address.city, address.state, address.postalCode]
        );

        res.json(newCustomer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all customers
router.get("/customer", async(req, res)=>{
    try {
        console.debug("Retriving all Customers from database.");

        const allCustomers = await pool.query("Select * from customer");
        res.json(allCustomers.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

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

//get customer from customer id
router.get("/customer/specific", async(req, res)=>{

    try {
        const custid = req.body.customerid;
        console.debug("Retriving Customer with customer ID: "+ custid +" from database.")

        const customer = await pool.query("SELECT * FROM customer WHERE customerid = $1", [custid])
        res.json(customer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// delete customer from customer id
router.delete("/customer/:customerid", async(req, res)=>{

    try {
        const custid = req.params.customerid;
        console.log("Deleting customer with customer ID: "+custid+".")

        const deleteCustomer = await pool.query("DELETE FROM customer WHERE customerid = $1", [custid]);
        res.json("Customer was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});


// update sin from customer id
router.put("/customer/sin", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const sin = req.body.sin;
        console.debug("Updating customer sin of customer with customer ID: "+customerid+" to "+sin+".");

        const updateCustomer = await pool.query("UPDATE customer SET sin = $1 WHERE customerid = $2 RETURNING *", [sin, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update registrationdate from customer id
router.put("/customer/registrationdate", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const registrationdate = req.body.registrationdate;
        console.debug("Updating customer registration date of customer with customer ID: "+customerid+" to "+registrationdate+".");

        const updateCustomer = await pool.query("UPDATE customer SET registrationdate = $1 WHERE customerid = $2 RETURNING *", [registrationdate, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update firstname from customer id
router.put("/customer/firstname", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const firstname = req.body.firstname;
        console.debug("Updating customer firstname of customer with customer ID: "+customerid+" to "+firstname+".");

        const updateCustomer = await pool.query("UPDATE customer SET first name = $1 WHERE customerid = $2 RETURNING *", [firstname, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update lastname from customer id
router.put("/customer/lastname", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const lastname = req.body.lastname;
        console.debug("Updating customer last name of customer with customer ID: "+customerid+" to "+sin+".");

        const updateCustomer = await pool.query("UPDATE customer SET lastname = $1 WHERE customerid = $2 RETURNING *", [lastname, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update streetnumber from customer id
router.put("/customer/streetnumber", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const streetnumber = req.body.streetnumber;
        console.debug("Updating customer streetnumber of customer with customer ID: "+customerid+" to "+streetnumber+".");

        const updateCustomer = await pool.query("UPDATE customer SET streetnumber = $1 WHERE customerid = $2 RETURNING *", [streetnumber, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update streetname from customer id
router.put("/customer/streetname", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const streetname = req.body.streetname;
        console.debug("Updating customer streetname of customer with customer ID: "+customerid+" to "+streetname+".");

        const updateCustomer = await pool.query("UPDATE customer SET streetname = $1 WHERE customerid = $2 RETURNING *", [streetname, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update aptnumber from customer id
router.put("/customer/aptnumber", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const aptnumber = req.body.aptnumber;
        console.debug("Updating customer aptnumber of customer with customer ID: "+customerid+" to "+aptnumber+".");

        const updateCustomer = await pool.query("UPDATE customer SET aptnumber = $1 WHERE customerid = $2 RETURNING *", [aptnumber, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});


// update city from customer id
router.put("/customer/city", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const city = req.body.city;
        console.debug("Updating customer city of customer with customer ID: "+customerid+" to "+city+".");

        const updateCustomer = await pool.query("UPDATE customer SET city = $1 WHERE customerid = $2 RETURNING *", [city, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update state from customer id
router.put("/customer/state", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const state = req.body.state;
        console.debug("Updating customer state of customer with customer ID: "+customerid+" to "+state+".");

        const updateCustomer = await pool.query("UPDATE customer SET state = $1 WHERE customerid = $2 RETURNING *", [state, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

// update postalcode from customer id
router.put("/customer/postalcode", async(req, res)=>{

    try {
        const customerid = req.body.customerid;
        const postalcode = req.body.postalcode;
        console.debug("Updating customer postalcode of customer with customer ID: "+customerid+" to "+postalcode+".");

        const updateCustomer = await pool.query("UPDATE customer SET postalcode = $1 WHERE customerid = $2 RETURNING *", [postalcode, customerid]);
        res.json(updateCustomer.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});



module.exports = router;