const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const empModel = require('./empSchema')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// connect mongoDB

mongoose
  .connect("mongodb://localhost:27017/EmployeesDB", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to mongoDatabase");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

  // read employees
  app.get('/employees', async(req,res) => {

    try {
        const employees = await empModel.find()
        res.json(employees)
    } catch (error) {
        res.status(5000).json({message: error.message})
    }
  })

  // create new Employee
  app.post('/employees', async(req,res) => {
    const enterEmp = new empModel(req.body)
    try {
        const newEmp = await enterEmp.save();
        res.status(201).json(newEmp)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })

  app.put('/employees/:id', async(req,res) => {
   try {
    const employee = await empModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
    if (!employee){
        return res.status(404).json({message:'No employee find with this email'})
    }
    res.json(employee)
   } catch (error) {
    res.status(400).json({ message: error.message });
   }
  })

  app.delete('/employees/:id', async(req, res) => {
    try {
        const employee = await empModel.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
          }
          res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

  app.listen(5000, () => {
    console.log('server is running on 5000');
  })

