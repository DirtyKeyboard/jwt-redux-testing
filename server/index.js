const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT || 12
require('dotenv').config()
const app = express();
app.use(express.json());
const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

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
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45s'})
        res.status(200).send({accessToken: accessToken})
    }
    catch (err)
    {
        console.log(err)
        res.status(500).send({message: 'Error!'})
    }
})

app.get('/login', async (req,res) => {
    try {
        const user = await prisma.user.findUnique({where: {username: req.body.username}})
        const isAuthed = await bcrypt.compare(req.body.password, user.password)
        if (isAuthed) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45s'})
            res.status(200).send({accessToken: accessToken})
        }
        else {
            res.status(401).send({message: 'Invalid username or password.'})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({message: 'Error'})
    }
})

app.get('/tokenCheck', authToken, (req, res) => {
    res.status(200).send({'message': 'verified!', 'user': req.user})
})

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //Bearer TOKEn
    console.log(`Token : ${authHeader}`)
    if (!token) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(process.env.PORT || 5555, () => {
    console.log(`Listening to port ${process.env.PORT || 5555}`)
})