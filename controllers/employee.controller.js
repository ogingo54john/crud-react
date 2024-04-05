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

// add
router.post('/',async(req,res)=>{
    await service.addOrEditEmployee(req.body)
    res.status(201).send("Employe created successfully")
})

// edit employee
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, employee_code, salary } = req.body;
    try {
        // check if employyee exist
        const existingEmployee = await service.getEmployeesById(id);

        if(!existingEmployee){
            return res.sendStatus(404).json({message:'Employee not found'});
        }

        // update the employee

        const affectedRows = await service.updateEmployee(id, name, employee_code, salary);
            res.status(200).json({ message: 'Employee updated successfully' });
        
    } catch (error) {
        console.error('Error updating employee', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// delete by id

router.delete('/:id', async(req,res)=>{
    try {
        const successDeletion = await service.deleteEmployeeById(req.params.id);

        if (successDeletion) {
      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
    } catch (error) {
        console.error('Error deleting employee', error)
        res.sendStatus(500).json({error:"internal server eror"})
    }
})

module.exports = router