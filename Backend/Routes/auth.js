const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const Admins = require("../Models/Admin");
const router = express.Router();

router.post("/register",async (req,res)=>{
    const {username, password} = req.body;
    const hashed = await bcrypt.hash(password,10);

    try {
      const admin = await Admins.create({username,password:hashed})
      res.json({message:'Admin created',admin})
    } catch (error) {
        res.status(400).json({error:"Admin already exists"})
    }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admins.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({
    id:admin._id
  },process.env.JWT_SECRET)
  res.json({token})
});

module.exports = router