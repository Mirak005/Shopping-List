const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model

const User = require("../../models/Users");


//@route POST api/users
//@desc  Register new user
//@acess Public
router.post("/", (req, res) => {
  const { name, email, password, registerDate } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //Check for existing user
  User.findOne({ email: email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({ name, email, password, registerDate });
    //Create Salt and Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
            jwt.sign(
                { id: user.id},
                config.get("jwtSecret"),
                {expiresIn : 3600} ,
                (err , token) =>{
                    if(err) throw err ;
                    res.json({
                        token,
                      user: { 
                          name: user.name,
                           email: user.email, 
                           id: user.id ,
                          
                          }
                }
            )
          });
        });
      });
    });
  });
});

module.exports = router;