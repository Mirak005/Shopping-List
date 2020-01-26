const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth")

//User Model

const User = require("../../models/Users");

//@route Post api/auth
//@desc  Register new user
//@acess Public
router.post("/", (req, res) => {
  const {  email, password} = req.body;
  if ( !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //Check for existing user
  User.findOne({ email: email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });
   
    //Validate password 
    bcrypt.compare(password , user.password)
    .then(isMatch => {
        if(!isMatch) return res.status(400).json({msg:"invalid credentials"})
        
        jwt.sign(
            { id: user.id },
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

    })
   
  });
});

//@route GET api/auth/user
//@desc  GET  user data
//@acess Private
router.get('/user' , auth , (req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;
