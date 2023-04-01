/**
 * Handle API requests related to the Employee table.
 *
 * @author Axel Tang.
 * @author Axel Tang.
 * @since  March, 2023
 */

// Setup
const express = require('express');
const pool = require("../db");
const bodyParser = require("body-parser");
const router = express.Router();

/**
 * Employee API Routes
 */

/**
 * Create a new employee
 * 
 * Endpoint: /api/employee
 * Request Type: POST
 * Request Body:
 *  {
 *      "employeeID": 1,
 *      "SIN": "12234334",
 *      "hotelID": 1,
 *      "companyName": "Mariott",
 *      "name": {
 *          "firstName": "Bob",
 *          "middleName": "A", (OPTIONAL)
 *          "lastName": "LastName"
 *      },
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
router.post("/employee", async(req, res)=> {
    try {
        const employee = req.body;
        
        console.log("Adding Employee with employee ID: "+employee.employeeid+" to database.");

        const newEmployee = await pool.query(
            "INSERT INTO Employee (employeeid, sin, hotelid, companyname, firstname, middlename, lastname, streetnumber, streetname, aptnumber, city, state, postalcode) \
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", 
            [employee.employeeid, employee.sin, employee.hotelid, employee.companyname, employee.firstname, employee.middlename, employee.lastname, employee.streetnumber, employee.streetname, employee.aptnumber, employee.city, employee.state, employee.postalcode]
        );

        res.json(newEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

// Get all employees
router.get("/employee", async(req, res)=>{
    try {
        console.debug("Retriving all Employee from database.");

        const allEmployee = await pool.query("Select * from Employee");
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Get a specific employee
 * 
 * Endpoint: /api/employee/specific
 * Request Type: GET
 * Request Body:
 *  {
 *      "employeeID": 1,
 *      "hotelID": 1,
 *      "companyName": "Mariott"
 *  }
 */
router.get("/employee/specific", async(req, res)=>{

    try {
        const requestBody = req.body;

        const employee = await pool.query("SELECT * FROM Employee WHERE (EmployeeID = $1 AND HotelID = $2 AND CompanyName = $3)", 
            [requestBody.employeeid, requestBody.hotelid, requestBody.companyname]);

        console.debug("Retrieving employee: "+JSON.stringify(requestBody));
        res.json(employee.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

/**
 * Update employee address
 * 
 * Endpoint: /api/employee/address
 * Request Type: PUT
 * Request Body:
 *  {
 *      "employeeID": 1,
 *      "hotelID": 1,
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
router.put("/employee/address", async(req, res)=>{

    try {
        const requestBody = req.body;
        console.debug("Updating address of Employee with new streetName: "+requestBody.streetname+".");
        const updateEmployee = await pool.query("UPDATE Employee \
            SET streetnumber = $1, streetname = $2, aptnumber = $3, city = $4, state = $5, postalcode = $6\
            WHERE (employeeid = $7 AND hotelid = $8 AND companyname = $9) RETURNING *",
            [requestBody.streetnumber, requestBody.streetname, requestBody.aptnumber, requestBody.city, requestBody.state, requestBody.postalcode,
            requestBody.employeeid, requestBody.hotelid, requestBody.companyname]);
        res.json(updateEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

//Update empoyee Name
router.put("/employee/name", async(req, res)=>{

    try {
        const info = req.body;
        console.debug("Updating name of Employee with new name: "+info.firstname+".");
        const updateEmployeeName = await pool.query("UPDATE Employee SET firstname = $1, middlename = $2, lastname = $3 WHERE (employeeid = $4 AND hotelid = $5 AND companyname = $6) RETURNING *", [info.firstname, info.middlename, info.lastname , info.employeeid, info.hotelid, info.companyname]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});



router.delete("/employee", async(req, res)=>{

    try {
        const employeeid = req.body.employeeid;
        console.debug("Deleting Employee with ID: "+employeeid+".")

        const deleteEmployee = await pool.query("DELETE FROM Employee WHERE EmployeeID = $1", [employeeid]);
        res.json("Employee was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});



module.exports = router;