/**
 * Handle API requests related to the Employee table.
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
 * Employee API Routes
 */

router.post("/employee", async(req, res)=> {
    try {
        const employee = req.body;
        const name = req.body.name; 
        const address = req.body.address;
        
        console.log("Adding Employee: "+JSON.stringify(employee)+" to database.");

        const newEmployee = await pool.query(
            "INSERT INTO Employee (EmployeeID, SIN, HotelID, CompanyName, FirstName, MiddleName, LastName, StreetNumber, StreetName, AptNumber, City, State, PostalCode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", [employee.employeeid, 
                employee.sin, employee.hotelid, employee.companyName, name.firstName, name.middleName, name.lastName, address.streetNumber, address.streetName, address.aptNumber, address.city, address.state, address.postalCode]
        );

        res.json(newEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/employee", async(req, res)=>{
    try {
        console.debug("Retriving all Employee from database.");

        const allEmployee = await pool.query("Select * from Employee");
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/employee/:EmployeeID", async(req, res)=>{

    try {
        const employeeid = req.params.EmployeeID;
        console.debug("Retriving Employee with Employee ID:"+ employeeid +" from database.")

        const employee = await pool.query("SELECT * FROM Employee WHERE EmployeeID = $1", [employeeid])
        res.json(employee.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.put("/employee/name/:EmployeeID", async(req, res)=>{

    try {
        const EmployeeID = req.params.EmployeeID;
        const name = req.body.name;
        console.debug("Updating Employee Name of Employe with new Name:"+EmployeeID+" to "+name+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET name = $1 WHERE roomNumber = $2 RETURNING *", [price, roomNumber]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.delete("/employee/:employeeid", async(req, res)=>{

    try {
        const {employeeid} = req.params;
        console.debug("Deleting Employee with ID:"+employeeid+".")

        const deleteHotel = await pool.query("DELETE FROM Employee WHERE EmployeeID = $1", [employeeid]);
        res.json("Employee was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});




module.exports = router;