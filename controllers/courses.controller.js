const express = require('express');
const router = express.Router();
const service = require('../services/courses.service')

router.post('/add', async(req,res)=>{
    try {
        const {CourseID, CourseName, CourseDescription} = req.body;
        const newCourse = await service.addCourse(CourseID, CourseName, CourseDescription);
        res.status(200).send('Course Added succesfully')
    } catch (error) {
        console.error("Error in adding course", error);
        res.status(500).json({error: 'Internal Server error'});
    }
})

// get all courses
router.get('/',async(req,res)=>{
    try {
        const courses = await service.getCourses();
        res.send(courses)
    } catch (error) {
        console.error("Error fetching courses",error);
        // throw(error);
        res.status(500).json('Error fetching course',error)
    }
})

module.exports = router;