const mysql = require('mysql2/promise');

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'epmloyee_db',
            port: 3306
        });

        console.log('Connected to MySQL database.');

        await testQuery(connection)

        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        throw error;
    }
}

async function testQuery(connection){
  try {
    const [rows,fields] =  await connection.query('SELECT 1');

    if (rows.length> 0 && rows[0][1]===1){
      console.log('Query successful')
    }else{
      console.log('query failed')
    }

  } catch (error) {
    console.error('Error executing the query', error)
  }
 }

 const dbconnection = connectToDatabase()
module.exports = dbconnection;
