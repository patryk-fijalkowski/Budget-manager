const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');
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

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Wbito na endpoint /')
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query('SELECT id, first_name FROM public.accounts', (err, result) => {
            release()
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log(result.rows)
            res.send(result.rows)
        })
    })
})

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});