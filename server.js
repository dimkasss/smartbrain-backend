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
      host : process.env.DATABASE_URL,
      ssl: true
      
    }
  });


const app = express();
app.use(cors());
app.use(express.json());

app.post('https://afternoon-ridge-48780.herokuapp.com/signin', handleSignin(db, bcrypt))

app.post('https://afternoon-ridge-48780.herokuapp.com/register', handleRegister(db, bcrypt))

app.get('https://afternoon-ridge-48780.herokuapp.com/profile/:id', (req, res) => { handleProfileGet(req, res, db)})

app.put('https://afternoon-ridge-48780.herokuapp.com/image', handleImage(db))

app.post('https://afternoon-ridge-48780.herokuapp.com/imageurl', (req, res) => { handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});