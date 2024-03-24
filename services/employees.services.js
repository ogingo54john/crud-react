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

// add or edit employee

module.exports.addOrEditEmployee = async(req, res)=>{
    try {
        const connection = await db;
        const { emp_id, emp_name, emp_employee_code, emp_salary } = req.body;
        if (emp_id) {
            // Edit operation: Call the stored procedure to update the employee
            db.query('CALL updateEmployee(?, ?, ?, ?)', [emp_id, emp_name, emp_employee_code, emp_salary], (error, results) => {
                if (error) {
                    console.error('Error updating employee:', error);
                    return res.status(500).json({ error: 'Error updating employee' });
                }
                res.status(200).json({ message: 'Employee updated successfully' });
            });
        } else {
            // Add operation: Implement your logic to insert a new employee into the database
            // This would typically involve executing an INSERT INTO query
            // Example:
            // db.query('INSERT INTO employees (name, employee_code, salary) VALUES (?, ?, ?)', [emp_name, emp_employee_code, emp_salary], (error, results) => {
            //     if (error) {
            //         console.error('Error adding employee:', error);
            //         return res.status(500).json({ error: 'Error adding employee' });
            //     }
            //     res.status(201).json({ message: 'Employee added successfully', emp_id: results.insertId });
            // });
        }
    } catch (error) {
        console.error("Errror deleting",error)
        throw error
    }
}