const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const {PORT, DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER} = process.env

const Pool = require('pg').Pool
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
})

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query('SELECT id, first_name FROM public.accounts', (err, result) => {
            release()
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.send(result.rows)
        })
    })
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))