const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  eID: {
    type: String,
    unique: true,
    required: true,
  },
  empName: {
    type: String,
    required: true,
  },
  empEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email address"],
  },
  empAge: {
    type: Number,
    required: true,
    min: [0, "Age cannot be negative"],
    max: [150, "Age seems unrealistic"],
  },
  salary: {
    type: Number,
    min: 0,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
