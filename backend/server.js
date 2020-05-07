const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const port = 5000

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'patryk',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'password',
    port: 5432,
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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))