const { Router } = require("express");
const { app } = require("../Service/Firebase");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { getDatabase, set, ref } = require("firebase/database");

const userrouter = Router();
  
// Initialize Firebase
const firebaseAuth = getAuth(app);
const firebaseDB = getDatabase(app);


userrouter.post("/signup", (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    // console.log(req.body);
    createUserWithEmailAndPassword(firebaseAuth, email, pass)
        .then((result) => {
            // console.log(result);
            return res.status(201).json({msg : "Successfull Create Account"});
        })
        .catch((err) => {
            console.log(err);
            return res.status(401);
        })
})

userrouter.post("/signin", (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    console.log(req.body);
    signInWithEmailAndPassword(firebaseAuth, email, pass)
        .then(result => {
            console.log("Login");
            return res.status(201).json({msg : result})
        })
        .catch((err) => {
            return res.status(401);
        });
})


module.exports = { userrouter };