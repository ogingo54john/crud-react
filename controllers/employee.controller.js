const express = require('express')
const router = express.Router();
const db = require('../db')
const service = require('../services/employees.services')

// get all
router.get('/', async(req,res)=>{
    try {
        const employees = await service.getEmployees();
        res.send(employees)
    } catch (error) {
        
    }
})

// get by id
router.get('/:id', async(req,res)=>{
    try {
        const employee = await service.getEmployeesById(req.params.id);
        if (employee.length === 0){
            res.send("User does not exist")
        }else{
            
        res.send(employee)
        }
    } catch (error) {
        console.log(error)
    }
})

// add/edit
router.post('/update',service.addOrEditEmployee)

// delete by id
router.delete('/:id', async(req,res)=>{
    try {
        const sucessDeletion = await service.deleteEmployeeById(req.params.id);
        if(sucessDeletion){
            res.status(200).json({message:"User deleted succesful"})
        }else{
            res.status(404).json({error:"Employee not found"})
        }
    } catch (error) {
        console.error('Error deleting employee', error)
        res.sendStatus(500).json({error:"internal server eror"})
    }
})

module.exports = router