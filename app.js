require("dotenv").config()
const express = require("express")
const app = express()
const path = require('path')
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan')
const fs = require("fs")
const routers = require("./route")
const port = process.env.PORT || 8000



let options = {
    origin: "*"
};

app.use(cors(options));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));


//Access Logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.get("/", (req, res) => {
    res.send("Hello World !!!")
});

routers.routeHelper(app).catch(error => {
    console.error("Route Error", error);
});


app.listen(port, () => {
    console.log(`Employee Tasks application is running on http://localhost:${port}`)
})
