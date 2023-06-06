const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./routers");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 3000;


//db connection
mongoose.connect("mongodb://localhost:27017/stack-overflow", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    try
    {

        console.log("Mongodb connection established")
    }
    catch (e)
    {
        console.log('error:', e)
    }
})




//middleware 
app.use(bodyParser.json({ limit: "55mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "55mb" }))
app.use(express.json());


//cors header methods
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})


//api

app.use('/api', router);

//static resources

// app.use('/upload', express.static(path.join(__dirname, "/../uploads")))
app.use(express.static(path.join(__dirname, "/../frontend/dist")))

app.get('*', (req, res) => {

    try
    {

        res.sendFile(path.join(`${__dirname}/../frontend/dist/index.html`))
    }
    catch (e)
    {
        res.send("Error Occured")
    }
})

//cors
app.use(cors())


//server listen
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})