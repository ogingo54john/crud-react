const express = require('express')
bodyparser = require('body-parser')
const app = express()
require('dotenv').config();
require('express-async-errors')
db = require('./db')
const cors = require('cors')
const port = process.env.PORT

employeeRoutes = require('./controllers/employee.controller')
usersRoute = require('./controllers/users.controller')
studentsRoute = require('./controllers/students.controller')
courseRoute = require('./controllers/courses.controller')
teacherRoute = require('./controllers/teachers.controller')
unitsRoute = require('./controllers/units.contoller')


app.use(cors());
app.use(bodyparser.json())

// Middleware to parse JSON bodies
app.use(express.json());

// register middlewares
app.use('/api/employee', employeeRoutes);
app.use('/api/users', usersRoute);
app.use('/api/students', studentsRoute);
app.use('/api/courses',courseRoute);
app.use('/api/teachers', teacherRoute);
app.use('/api/units',unitsRoute);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
// global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error in code", err); // Log the error to the console
  res.status(500).send('Something went wrong'); // Send a 500 Internal Server Error response
});


app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})