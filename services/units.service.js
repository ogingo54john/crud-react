const db = require('../db');

// add/update units
module.exports.addUnits = async(UnitID, CourseID, UnitName, UnitDescription)=>{
    try {
        const connection = await db;
        const [units] = await connection.query('CALL AddOrUpdateUnit(?,?,?,?)',[UnitID, CourseID, UnitName, UnitDescription]);
        
        // check unit already exist
        if(units.affectedRows > 0){
            return { success: true, message: "Units added/updated successfully" };
        }else {
            return { success: false, message: "No units added/updated" };
        }
       
    } catch (error) {
        console.error("Error adding units",error);
        throw error
    }
} 
// get units
module.exports.getUnits = async()=>{
    try {
        const connection = await db;
        const [units] = await connection.query('SELECT * FROM units');
        return units
    } catch (error) {
        console.error("Error getting units",error);
        throw error
    }
}

// delete units
module.exports.deleteUnitById = async(UnitID)=>{
    try {
        const connection = await db;
        const unit = await connection.query('DELETE FROM units WHERE UnitID = ?',[UnitID]);
        return unit.affectedRows > 0
            
    } catch (error) {
        console.error("Internal server error, failed to delete unit", error);
        throw error
    }
}