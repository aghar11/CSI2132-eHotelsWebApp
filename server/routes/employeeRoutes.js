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

//employee
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

router.put("/employee/firstname/:EmployeeID", async(req, res)=>{

    try {
        const EmployeeID = req.params.EmployeeID;
        const firstname = req.body.firstname;
        console.debug("Updating Employee firstname of Employe with new firstname:"+EmployeeID+" to "+firstname+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET firstname = $1 WHERE EmployeeID = $2 RETURNING *", [firstname, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});
router.put("/employee/middlename/:EmployeeID", async(req, res)=>{

    try {
        const EmployeeID = req.params.EmployeeID;
        const middlename = req.body.middlename;
        console.debug("Updating Employee middlename of Employee with new middlename:"+EmployeeID+" to "+middlename+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET middlename = $1 WHERE EmployeeID = $2 RETURNING *", [middlename, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});
router.put("/employee/lastname/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const lastname = req.body.lastname;
        console.debug("Updating Employee lastname of Employee with new lastname:"+EmployeeID+" to "+lastname+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET lastname = $1 WHERE EmployeeID = $2 RETURNING *", [lastname, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.put("/employee/streetnumber/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const streetnumber = req.body.streetnumber;
        console.debug("Updating Employee streetnumber of Employee with new streetnumber:"+EmployeeID+" to "+streetnumber+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET streetnumber = $1 WHERE EmployeeID = $2 RETURNING *", [streetnumber, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.put("/employee/streetname/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const streetname = req.body.streetname;
        console.debug("Updating Employee streetname of Employee with new streetname:"+EmployeeID+" to "+streetname+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET streetname = $1 WHERE EmployeeID = $2 RETURNING *", [streetname, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.put("/employee/aptnumber/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const aptnumber = req.body.aptnumber;
        console.debug("Updating Employee aptnumber of Employee with new aptnumber:"+EmployeeID+" to "+aptnumber+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET aptnumber = $1 WHERE EmployeeID = $2 RETURNING *", [aptnumber, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.put("/employee/city/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const city = req.body.city;
        console.debug("Updating Employee city of Employee with new city:"+EmployeeID+" to "+city+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET city = $1 WHERE EmployeeID = $2 RETURNING *", [city, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});
router.put("/employee/state/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const state = req.body.state;
        console.debug("Updating Employee state of Employee with new state:"+EmployeeID+" to "+state+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET state = $1 WHERE EmployeeID = $2 RETURNING *", [state, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});
router.put("/employee/postalcode/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const postalcode = req.body.postalcode;
        console.debug("Updating Employee postalcode of Employee with new postalcode:"+EmployeeID+" to "+postalcode+".");

        const updateEmployeeName = await pool.query("UPDATE Employee SET postalcode = $1 WHERE EmployeeID = $2 RETURNING *", [postalcode, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});
router.delete("/employee/:employeeid", async(req, res)=>{

    try {
        const {employeeid} = req.params;
        console.debug("Deleting Employee with ID:"+employeeid+".")

        const deleteEmployee = await pool.query("DELETE FROM Employee WHERE EmployeeID = $1", [employeeid]);
        res.json("Employee was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});
//manages
router.post("/manages", async(req, res)=> {
    try {
        const manages = req.body;
        
        console.log("Adding Manages: "+JSON.stringify(manages)+" to database.");

        const newManage = await pool.query(
            "INSERT INTO Manages (EmployeeID, HotelID, CompanyName) VALUES ($1, $2, $3) RETURNING *", [manages.employeeid, 
                manages.hotelid, manages.companyname]
        );

        res.json(newManage.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/manages", async(req, res)=>{
    try {
        console.debug("Retriving all Manages from database.");

        const allEmployee = await pool.query("Select * from manages");
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/manages/:EmployeeID", async(req, res)=>{
    try {
        const employeeid = req.params.EmployeeID;
        console.debug("Retriving Manages From EmployeeID: "+employeeid+" from database.");

        const allEmployee = await pool.query("Select * from manages WHERE EmployeeID = $1", [employeeid]);
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/manages/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        console.debug("Retriving Manages From EmployeeID: "+EmployeeID+" from database.");

        const allEmployee = await pool.query("Select * from manages WHERE EmployeeID = $1", [employeeid]);
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/manages/:EmployeeID", async(req, res)=>{
    try {
        const {EmployeeID} = req.params;
        console.debug("Deleting manages with ID:"+EmployeeID+".")

        const deleteManages = await pool.query("DELETE FROM manages WHERE EmployeeID = $1", [EmployeeID]);
        res.json("Manage was deleted!");

    } catch (err) {
        console.error(err.message);
    }
});
module.exports = router;