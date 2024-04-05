const db = require('../db');

module.exports.addCourse = async (CourseID, CourseName, CourseDescription)=>{
    try {
        const connection = await db;
        const newCourse = await connection.query('CALL AddOrUpdateCourse(?,?,?)',[CourseID, CourseName, CourseDescription]);

        return newCourse;
    } catch (error) {
        console.error("Error adding course",error);
        throw error;
    }
}

// get all courses
module.exports.getCourses = async()=>{
    try {
        const connection = await db;
        const [courses] = await connection.query('SELECT * FROM courses');
        return courses
    } catch (error) {
        console.error("Error fetching course",error);
        throw error
    }
}