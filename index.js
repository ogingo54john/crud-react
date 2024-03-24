const express = require('express')
const app = express()
require('express-async-errors')
employeeRoutes = require('./controllers/employee.controller')

db = require('./db')
const cors = require('cors')
const port = 3000

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/employee', employeeRoutes)

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
// global error handling middleware
app.use((err, req, res, next) => {
  console.log("Error in code"); // Log the error to the console
  res.status(500).send('Something went wrong'); // Send a 500 Internal Server Error response
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})