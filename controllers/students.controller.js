const express = require('express')
const router = express.Router();
const db = require('../db')
const service = require('../services/students.service')


// get all students
router.get('/', async(req,res)=>{
    try {
        const students = await service.getStudents();
        res.send(students)
    } catch (error) {
        console.error("Error getting all students",error);
        throw error
    }
})

// get student details by id
router.get('/:employee_id', async(req,res)=>{
    try {
        const employee_id = req.params.employee_id;
        const student = await service.getStudentById(employee_id);
        
        if(student.length > 0){
            res.status(200).json(student);
        }else{
            res.status(404).json("No such Student");
        }
    } catch (error) {
        console.error('Error getting student by id',error);
        res.status(500).json({error:'Internal server error'});
    }
})

// Delete student by id
router.delete('/:studentId', async(req,res)=>{
    try {
        const studentId = req.params.studentId;
        const result = await service.deleteStudentById(studentId);

        if (result ) {
            res.status(200).json({ message: 'Student deleted successfully' });
          } else {
            res.status(404).json({ error: 'Student not found' });
          }
        
        } catch (error) {
            console.error('Error deleting student', error)
            res.sendStatus(500).json({error:"student deletion eror"})
        }
})

// add student
router.post('/', async (req, res) => {
    try {
        const {
            student_id,
            full_name,
            email_address,
            gender,
            birthday,
            education_level,
            website,
            mailing_address,
            phone_number,
            business_fax_number,
            employee_id
        } = req.body;

        await service.addStudent({
            student_id,  // Make sure student_id is included
            full_name,
            email_address,
            gender,
            birthday,
            education_level,
            website,
            mailing_address,
            phone_number,
            business_fax_number,
            employee_id
        });

        res.status(201).send("Student created successfully");
    } catch (error) {
        console.error("Error Adding student", error);
        res.status(500).json({ error: 'Error in adding student' });
    }
});


module.exports = router;