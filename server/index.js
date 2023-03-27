/**
 * Mount API routes and start backend server.
 *
 * @author Eric Van De Lande.
 * @since  March, 2023
 */

// Setup
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Define route constants
const bookingRoutes = require("./routes/bookingRoutes");
const customerRoutes = require("./routes/customerRoutes");
const employeeRoleRoutes = require("./routes/employeeRoleRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const headquartersRoutes = require("./routes/headquartersRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");

// Mount api routes
app.use("/api", bookingRoutes);
app.use("/api", customerRoutes);
app.use("/api", employeeRoleRoutes);
app.use("/api", employeeRoutes);
app.use("/api", headquartersRoutes);
app.use("/api", hotelRoutes);
app.use("/api", roomRoutes);

/**
 * Start backend server
 */
app.listen(5000, () => {
    console.log("Server started on port 5000.")
});
