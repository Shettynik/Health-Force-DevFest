require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(cookieParser());
app.use('/auth', require('./routes/auth'));
app.use('/doctor', require('./routes/doctor'));
app.use('/appointment', require('./routes/appointments'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});