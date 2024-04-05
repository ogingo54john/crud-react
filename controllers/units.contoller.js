const express = require('express');
const router = express.Router();
const service = require('../services/units.service')

// add units
router.post('/add',async(req,res)=>{
    try {
        const {UnitID, CourseID, UnitName, UnitDescription} = req.body;
        const units = await service.addUnits(UnitID, CourseID, UnitName, UnitDescription);
        
        if (units.success) {
            res.status(200).send(units.message);
        } else {
            res.status(400).send(units.message);
        }
    } catch (error) {
        console.error("Error adding units",error);
        throw error;
    }
})

// get all units
router.get('/', async(req,res)=>{
    try {
        const units = await service.getUnits();
        res.status(200).send(units);
    } catch (error) {
        console.error("Error getting units",error);
        res.status(500).json('Error getting units');
    }
})

// delete a unit by id
router.delete('/:UnitID', async (req,res)=>{
    try {
        const {UnitID} = req.params;
        const units = service.deleteUnitById(UnitID);

        if (units ) {
            res.status(200).json({ message: 'Unit deleted successfully' });
          } else {
            res.status(404).json({ error: 'Unit not found' });
          }
    } catch (error) {
        console.error("Error deleting units",error);
        throw error
    }
})


module.exports = router;