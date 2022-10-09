import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });


const app = express();
app.use(cors());
app.use(express.json());

app.post('/signin', handleSignin(db, bcrypt))

app.post('/register', handleRegister(db, bcrypt))

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db)})

app.put('/image', handleImage(db))

app.post('/imageurl', (req, res) => { handleApiCall(req, res)})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});