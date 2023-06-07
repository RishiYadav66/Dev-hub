const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./routers");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.MONGODB_URI;

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "stack-overflow",
});

const db = mongoose.connection;
db.once("open", () => {
    try
    {
        console.log("MongoDB connection established");
    } catch (e)
    {
        console.log('Error:', e);
    }
});

// Middleware
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// API
app.use('https://devhub-backend-mnpr.onrender.com', router);

// Static resources
app.use(express.static(path.join(__dirname, "/../frontend/dist")));

app.get('*', (req, res) => {
    try
    {
        res.sendFile(path.join(`${__dirname}/../frontend/dist/index.html`));
    } catch (e)
    {
        res.send("Error Occurred");
    }
});


// CORS
app.use(cors());

// Server listen
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 // "start": "nodemon --watch backend --exec node backend/server.js"