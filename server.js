const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    const name = req.body.name
    const plainPassword = req.body.password
    try {
        const password = await bcrypt.hash(plainPassword, 10)
        users.push({ name, password })
    } catch (error) {
        res.status(500)
    }
    res.send(name)
})

app.post('/users/login', async (req, res) => {
    const name = req.body.name
    const plainPassword = req.body.password
    const user = users.find(user => user.name == name)
    if (!Boolean(user)) return res.status(400).send('cannot find user')
    try {
        const isValidCredentils = await bcrypt.compare(plainPassword, user?.password)
        if (Boolean(isValidCredentils))
            res.json(user)
        res.status(403).send('Invalid Credentials')
    } catch (error) {
        res.status(500)
    }
})













app.listen(3000)