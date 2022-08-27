import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


const database = {
    users: [
        {
            id: '123',
            name: 'Dima',
            email: 'dima@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        },

        {
            id: '124',
            name: 'Sanya',
            email: 'Sanya@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '999',
            hash: '',
            email: 'Jojn@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        }
    else {
        res.status(400).json('error loggin in')
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    console.log(database.users[database.users.length-1])
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            console.log(id);
            found = true;
            return res.json(user);
        }
        
    })
})

app.put('/image', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
        
    })
    if(!found) {
        res.status(404).json('No such user');
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});