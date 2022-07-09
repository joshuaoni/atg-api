const express = require('express');
// for password hashing
const bcrypt = require('bcryptjs');
// to avoid cors errors
const cors = require('cors');
// i used knex to connect the API to the database
const knex = require('knex');


// importing controllers
const register = require('./controllers/register');
const login = require('./controllers/login');
const verify = require('./controllers/verify');
const updatePassword = require('./controllers/updatePassword');


// configuring knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'psql',
      database : 'atg'
    }
});

const app = express();


// adding middleware
app.use(express.json());
app.use(cors());


// Login
app.post('/', (req, res) => {login.handleLogin(req, res, db, bcrypt)})
// Register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
// Verify user exists
app.post('/verify', (req, res) => {verify.handleVerify(req, res, db)})
// Update Password
app.put('/update', (req, res) => {updatePassword.handleUpdate(req, res, db, bcrypt)})


app.listen(3001, ()=>{
    console.log(`app running on port 3001`);
})