/**
 * Handle API requests related to the Employee Role table.
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
 * Employee Role API Routes
 */
router.post("/employeeRole", async(req, res)=> {
    try {
        const employeeRole = req.body;

        console.log("Adding Employee Role: "+JSON.stringify(employeeRole)+" to database.");

        const newEmployeeRole = await pool.query(
            "INSERT INTO Employeerole (EmployeeID, hotelid, CompanyName, Role) VALUES ($1, $2, $3, $4) RETURNING *", [employeeRole.employeeid, 
                employeeRole.hotelid, employeeRole.companyname, employeeRole.role]
        );
        res.json(newEmployeeRole.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/employeeRole", async(req, res)=>{
    try {
        console.debug("Retriving all Employee Roles from database.");

        const allEmployee = await pool.query("Select * from employeerole");
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

//get role from all PKs
router.get("/employeeRole/specific", async(req, res)=>{

    try {
        const employeeid = req.body.employeeid;
        const role = req.body.role;
        const hotelid = req.body.hotelid;
        const companyname = req.body.companyname;
        console.debug("Retriving Employee role with Employee ID: "+ employeeid +" from database.")

        const employee = await pool.query("SELECT * FROM employeerole WHERE EmployeeID = $1 AND role = $2 AND hotelid = $3 AND companyname = $4", [employeeid, role, hotelid, companyname])
        res.json(employee.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

//get role(s) from employeeid
router.get("/employeeRole/employeeid", async(req, res)=>{

    try {
        const employeeid = req.body.employeeid;
        console.debug("Retriving Employee role with Employee ID: "+ employeeid +" from database.")
        const employee = await pool.query("SELECT * FROM employeerole WHERE EmployeeID = $1", [employeeid])
        res.json(employee.rows);
    } catch (err) {
        console.error(err.message);
    }
    
});

//get role(s) from employeeid,hotelid,companyname
router.get("/employeeRole/idandcompanyname", async(req, res)=>{

    try {
        const employeeid = req.body.employeeid;
        const hotelid = req.body.hotelid;
        const companyname = req.body.companyname;
        console.debug("Retriving Employee role with Employee ID: "+ employeeid +" from database.")
        const employee = await pool.query("SELECT * FROM employeerole WHERE EmployeeID = $1 AND hotelid = $2 AND companyname = $3", [employeeid, hotelid, companyname])
        res.json(employee.rows);
    } catch (err) {
        console.error(err.message);
    }
    
});


router.delete("/employeeRole", async(req, res)=>{

    try {
        const employeeid = req.body.employeeid;
        const role = req.body.role;
        const hotelid = req.body.hotelid;
        const companyname = req.body.companyname;
        console.debug("Deleting Employee with ID: "+employeeid+".")
        const deleteEmployeeRole = await pool.query("DELETE FROM employeerole WHERE EmployeeID = $1 AND role = $2 AND hotelid = $3 AND companyname = $4", [employeeid, role, hotelid, companyname]);
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

router.get("/manages/specific", async(req, res)=>{
    try {
        const employeeid = req.body.employeeid;
        const companyname = req.body.companyname;
        const hotelid = req.body.hotelid;
        console.debug("Retriving Manages From EmployeeID: "+employeeid+" from database.");

        const allEmployee = await pool.query("Select * from manages WHERE EmployeeID = $1 AND companyname = $2 AND hotelid = $3", [employeeid, companyname, hotelid]);
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});

router.put("/hotel/manages", async(req, res)=>{
    try {
        const companyname = req.body.companyname;
        const hotelid = req.body.hotelid;
        console.debug("Retriving Manages From Hotel Id and Company Name: "+companyname+" from database.");
        const allEmployee = await pool.query("Select * from manages WHERE companyname = $1 AND hotelid = $2", [companyname, hotelid]);
        res.json(allEmployee.rows);
    } catch (err) {
        console.error(err.message);
    }
});


router.delete("/manages", async(req, res)=>{
    try {
        const EmployeeID = req.body.employeeid;
        const companyname = req.body.companyname;
        const hotelid = req.body.hotelid;
        console.debug("Deleting manages with ID: "+EmployeeID+".")

        const deleteManages = await pool.query("DELETE FROM manages WHERE EmployeeID = $1 AND companyname = $2 AND hotelid = $3", [EmployeeID, companyname, hotelid]);
        res.json("Manage was deleted!");

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;