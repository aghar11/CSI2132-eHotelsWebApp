const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(5000, () => {
    console.log("Server started on port 5000.")
});

//Create

app.post("/Hotel", async(req, res)=> {

    try {
        const hotel = req.body;
        const newHotel = await pool.query(
            "INSERT INTO Hotel (HotelID, CompanyName, Address, Category, NumberOfRooms) VALUES ($1, $2, $3, $4, $5) RETURNING *", [hotel.HotelID, 
            hotel.CompanyName, hotel.Address, hotel.Category, hotel.NumberOfRooms]
        );

        res.json(newHotel.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

//Get all

app.get("/Hotel", async(req, res)=>{

    try {
        const allHotels = await pool.query("Select * from Hotel");
        res.json(allHotels.rows);

    } catch (err) {
        console.error(err.message);
    }
    
});

//Get


app.get("/Hotel/:id", async(req, res)=>{

    try {
        const {id} = req.params;
        const hotel = await pool.query("SELECT * FROM Hotel WHERE HotelID = $1", [id])
        res.json(hotel.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
    
});


//Update

app.put("/Hotel/:id", async(req, res)=>{

    try {
        const {id} = req.params;
        const {category} = req.body;
        const updateHotel = await pool.query("UPDATE Hotel SET category = $1 WHERE HotelID = $2", [category, id]);
        res.json("Hotel was updated!");

    } catch (err) {
        console.error(err.message);
    }
    
});

//Delete


app.delete("/Hotel/:id", async(req, res)=>{

    try {
        const {id} = req.params;
        const deleteHotel = await pool.query("DELETE FROM Hotel WHERE HotelID = $1", [id]);
        res.json("Hotel was deleted!");

    } catch (err) {
        console.error(err.message);
    }
    
});
