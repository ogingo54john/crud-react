const express = require('express')
const router = express.Router();

const db = require('../db')
const service = require('../services/user.service')

// get all users
router.get('/', async(req,res)=>{
    try {
        // add service here
        const users = await service.getUsers();
        res.send(users)
    } catch (error) {
        console.error("Error fetching data")
        throw error
    }
})

// get users by id
router.get('/:employee_id', async(req,res)=>{
    try {
        const employee_id = req.params.employee_id;
        const admin = await service.getUsersById(employee_id);

        if(admin.length > 0){
            res.status(200).json(admin);
        }else{
            res.status(404).send('No such admin or user')
        }
    } catch (error) {
        console.error('Error getting user by id',error);
        res.status(500).json({error:'Internla server error'})
    }
})

// add user
router.post('/register', async(req,res)=>{
    try {
        const {username, password, email, employee_id,role} =  req.body
        const newUser = await service.addUser(username, password, email, employee_id,role)
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error Adding User", error);
        res.status(500).json({error: 'Internal Server error'});
    }
});

// login user

router.post('/login',async(req,res)=>{
    try {
        const {username, password} = req.body;
        const user = await service.loginUser(username, password);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error logging in!", error)
        res.sendStatus(401).json({error:'Invalid credentials!'});
    }
})

module.exports = router;