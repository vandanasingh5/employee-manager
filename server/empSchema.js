const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    id:Number,
    name:String,
    gender:String,
    phone:Number,
    email:String,
    department:String,
    company:String,
    city:String
})

const empModel =  mongoose.model('EmployeeCollection',empSchema)

module.exports = empModel