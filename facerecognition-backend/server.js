const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const database = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'leeang6969',
        password : '',
        database : 'smart-brain'
    },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

app.listen(3001, () => {
    console.log('App is running on port 3001');
});

// const database = {
//     user: [
//         {
//             id: '123',
//             name: 'shawn',
//             email: 'shawn@gmail.com',
//             password: 'pwd',
//             entries: 0,
//             joined: new Date(),
//         },
//         {
//             id: '124',
//             name: 'eric',
//             email: 'eric@gmail.com',
//             password: 'bananas',
//             entries: 3,
//             joined: new Date(),
//         },
//     ]
// }

// app.get('/', (req, res) => {
//     res.send(database.user)
// })

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, database, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, database, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, database) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.put('/image', (req, res) => { image.handleImage(req, res, database) })