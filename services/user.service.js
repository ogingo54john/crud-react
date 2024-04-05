const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config

// get all users
module.exports.getUsers = async (req,res)=>{
    try {
        const connection = await db;
        const [results] = await connection.query('SELECT * from users')
        return results
    } catch (error) {
        console.error("Error fetching data")
        throw error
    }
}

// get user by employee_id
module.exports.getUsersById = async(employee_id)=>{
    try {
        const connection = await db;
        const [admin] = await connection.query('SELECT * FROM users WHERE employee_id = ?',[employee_id]);
        return admin
    } catch (error) {
        console.error("Error getting user from the database",error);
        throw error;
    }
}

// register user
module.exports.addUser = async (username, password, email, employee_id,role)=>{
    try {
        const connection = await db;

        // check existing user
        const [existingUsers] = await connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

        if(existingUsers.length > 0){
            throw new Error('User already exists');
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await connection.query('CALL registerUser(?,?,?,?,?)', [username, hashedPassword, email, employee_id,role]);

        // Assuming newUser contains relevant information about the user created
        return newUser;

    } catch (error) {
        console.error("Error Adding User", error);
        throw error; // Throw the error to be caught by the router handler
    }
}

// login user
module.exports.loginUser = async(username, password)=>{
    try {
        const connection = await db;

        // fetch user with provided username
        const [existingUser] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if(existingUser.length === 0){
            throw new error('User not found!')
        }

        const user = existingUser[0];

        // compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new Error('Incorrect password');
        }

        // return user data without password
        delete user.password;

        // generate JWT token
        const token = jwt.sign({userID: user.id}, process.env.JWT_SECRET, {expiresIn:'30s'});

        // return user data with token
        return {user, token};

    } catch (error) {
        console.error("Error logging user!",error);
        throw error;
    }
}


