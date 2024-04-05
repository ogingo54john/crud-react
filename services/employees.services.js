const db = require('../db')

module.exports.getEmployees = async (req,res)=>{
    try {
        const connection = await db;
        const [rows] = await connection.query('SELECT * FROM employees');
        return rows
    } catch (error) {
        console.error('error fetching data',error)
    }
}

module.exports.getEmployeesById = async(id)=>{
    try {
        const connection = await db;
        const [employee] = await connection.query('SELECT * FROM employees WHERE id = ?', [id]);

        console.log(employee)
        return employee;
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteEmployeeById = async(id)=>{
    try {
        const connection = await db;
        const result = await connection.query('DELETE FROM employees WHERE id = ?',[id]);
        return result[0].affectedRows > 0;
    } catch (error) {
        console.error("Errror deleting",error)
        throw error
    }
}

// add employee

module.exports.addOrEditEmployee = async (obj, id = 0) => {
    try {
        const connection = await db;
        const [result] = await connection.query("CALL updateEmployee(?,?,?,?)", [id, obj.name, obj.employee_code, obj.salary]);
        
    } catch (error) {
        console.error("Error in addOrEditEmployee:", error);
        res.status()
        throw error;
    }
};

// edit employee
module.exports.updateEmployee = async (id, name, employee_code, salary) => {
    try {
        const connection = await db;
        const [result] = await connection.query("CALL updateEmployee(?,?,?,?)", [id, name, employee_code, salary]);
        return result;
    } catch (error) {
        console.error('Error updating employee', error);
        throw error;
    }
};

