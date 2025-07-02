const mongoose = require("mongoose")
const auth = require('../Middleware/auth');
const Employee = require('../Models/Employee');
const express = require("express")

const router = express.Router()

router.get('/', auth, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

//get one employee
router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//create an employee
router.post('/',async (req,res) =>{
    try {
    const emp = await Employee.create(req.body);
    res.json(emp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

//update employee
router.put('/:id', auth, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE employee
router.delete('/:id', auth, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;