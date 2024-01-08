const express = require('express');
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const { userrouter } = require("./Controller/user");

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./public')));

app.use("/user", userrouter);

app.listen(8000,() => {
    console.log("Server Active on 8000");
})