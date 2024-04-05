const db = require('../db');

// Fetch all students
module.exports.getStudents = async(req,res)=>{
    try {
        const connection = await db;
        const [results] = await connection.query('SELECT * FROM students');
        return results
    } catch (error) {
        console.error("Error Fetching all student",error);

    }
}
// get a student
module.exports.getStudentById = async(employee_id) => {
    try {
        const connection = await db;
        const [result] = await connection.query('SELECT * FROM students WHERE employee_id = ?', [employee_id]);
        return result;
        
    } catch (error) {
        console.error("Error Getting student by his id", error);
        throw error;
    }
}

// delete student
module.exports.deleteStudentById = async (studentId) => {
    try {
        const connection = await db;
        const [result] = await connection.query('DELETE FROM students WHERE student_id = ?', [studentId]);
        
        // Check if any rows were affected (i.e., if the student was found and deleted)
        if (result.affectedRows > 0) {
            return true; // Student deleted successfully
            
        } else {
            return false; // Student not found
        }
    } catch (error) {
        console.error("Error deleting student by id", error);
        throw error;
    }
}


// add studnet
module.exports.addStudent = async(obj)=>{
    try {
        const connection = await db;
        const [result] = await connection.query('CALL add_student(?,?,?,?,?,?,?,?,?,?,?)',[
            obj.student_id,
            obj.full_name, 
            obj.email_address, 
            obj.gender, 
            obj.birthday, 
            obj.education_level, 
            obj.website, 
            obj.mailing_address, 
            obj.phone_number, 
            obj.business_fax_number, 
            obj.employee_id
        ])
        return result
    } catch (error) {
        console.error("Error adding student", error);
        throw error; 
    }
}