const db = require('../db');

// add teachers
module.exports.addTeacher = async(FirstName, LastName, Email, EducationLevel, employee_id)=>{
    try {
        const connection = await db;
        const teacher = await connection.query('CALL AddOrUpdateTeacher(?,?,?,?,?)',[FirstName, LastName, Email, EducationLevel, employee_id]);

        return teacher
    } catch (error) {
        console.error('Error adding teacher',error);
        throw error
    }
}

// get all teachers
module.exports.getTeachers = async()=>{
    try {
        const connection = await db;
        const [teachers] = await connection.query("SELECT * FROM teachers");
        return teachers;
    } catch (error) {
        console.error("Error fetching teachers",error);
        throw error
    }
}