const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT || 12
require('dotenv').config()
const app = express();
app.use(express.json());
const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient();

/*
admin
password12345
*/

app.get('/', async(req, res) => {
    res.status(200).send({message: 'Hello World!'})
})

app.post('/register', async(req,res) => {
    try { 
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword
            }
        })
    }
    catch (err)
    {
        console.log(err)
        res.status(500).send({message: 'Error!'})
    }
})

app.post('/login', async (req,res) => {
    try {
        const user = await prisma.user.findUnique({where: {username: req.body.username}})
        const isAuthed = await bcrypt.compare(req.body.password, user.password)
        res.status(200).send({message: isAuthed})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({message: 'Error'})
    }
})

app.listen(process.env.PORT || 5555, () => {
    console.log(`Listening to port ${process.env.PORT || 5555}`)
})