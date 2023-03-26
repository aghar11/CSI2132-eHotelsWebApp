const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json())

app.listen(5555, () => {
    console.log("Server started on port 5000.")
})