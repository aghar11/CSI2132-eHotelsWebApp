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
        console.debug("Retriving all Employee Role from database.");

        const allEmployee = await pool.query("Select * from employeerole");
        res.json(allEmployee.rows);

    } catch (err) {
        console.error(err.message);
    }
});
router.get("/employeeRole/:EmployeeID", async(req, res)=>{

    try {
        const employeeid = req.params.EmployeeID;
        console.debug("Retriving Employee with Employee ID:"+ employeeid +" from database.")

        const employee = await pool.query("SELECT * FROM employeerole WHERE EmployeeID = $1", [employeeid])
        res.json(employee.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
    
});

router.put("/employeeRole/role/:EmployeeID", async(req, res)=>{
    try {
        const EmployeeID = req.params.EmployeeID;
        const role = req.body.role;
        console.debug("Updating Employee Role of Employee with new Role:"+EmployeeID+" to "+role+".");

        const updateEmployeeName = await pool.query("UPDATE employeerole SET Role = $1 WHERE EmployeeID = $2 RETURNING *", [role, EmployeeID]);
        res.json(updateEmployeeName.rows);

    } catch (err) {
        console.error(err.message);
    }
});
router.delete("/employeeRole/:employeeid", async(req, res)=>{

    try {
        const {EmployeeID} = req.params;
        console.debug("Deleting Employee with ID:"+EmployeeID+".")

        const deleteEmployeeRole = await pool.query("DELETE FROM employeerole WHERE EmployeeID = $1", [EmployeeID]);
        res.json("Employee was deleted!");

    } catch (err) {
        console.error(err.message);
    }
});



module.exports = router;