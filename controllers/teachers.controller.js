const express = require('express')
const router = express.Router()
const service = require('../services/teachers.service')

// add techer route
router.post('/add',async(req,res)=>{
    try {
        const {FirstName, LastName, Email, EducationLevel, employee_id} = req.body;
        const newTeacher = await service.addTeacher(FirstName, LastName, Email, EducationLevel, employee_id);
        res.status(200).send("Teacher added succesfully");
    } catch (error) {
        console.error('Error Adding teacher',error);
        req.status(500).send('internal server error');
    }
})

// get all teachers
router.get('/',async(req,res)=>{
    try {
        const teachers = await service.getTeachers();
        res.send(teachers)
    } catch (error) {
        console.error("Error fetching teachers",error)
        // throw error
        res.status(500).json("Error fetching teachers",error)
    }
})

module.exports = router;