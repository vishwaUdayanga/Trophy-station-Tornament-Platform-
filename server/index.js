const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./models/user.model')
const Token = require('./models/token')
const Tournament = require('./models/tournament.model')
const sendEmail = require('./utils/sendEmail')
const crypto = require('crypto')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '2mb'}))

mongoose.connect('mongodb://127.0.0.1:27017/tournament_platform')

app.post('/api/register-admin', async (req, res) => {
    console.log(req.body)

    try {
        const newPassword = await bcrypt.hash(req.body.createdPassword, 10)
        const user = await User.create({
            email: req.body.email,
            userName: req.body.userName,
            password: newPassword
        })
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()
        const url = `http://localhost:3000/users/${user._id}/verify/${token.token}`
        await sendEmail(user.email, "Verify Email", url)
        res.json({ status: 'An email sent to your account please verify!', registered: 'done' })
    } catch (error) {
        res.json({ status: 'error', error: 'Duplicate email' })
        console.log(error.message)
    }
})

app.post('/api/login-admin', async (req, res) => {
    const user = await User.findOne({
        email: req.body.loginEmail
    })

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email' })
    }

    if (!user.verified) {
        let token = await Token.findOne({
            userId: user._id
        })
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()
        }
        const url = `http://localhost:3000/users/${user._id}/verify/${token.token}`
        await sendEmail(user.email, "Verify Email", url)
        res.json({ status: 'An email sent to your account please verify!', message: 'sent an email'})
    } else {
        const IsPasswordValid = await bcrypt.compare(
            req.body.loginPassword,
            user.password
        )
        if (IsPasswordValid) {
            const generatedTokenAdmin = jwt.sign(
                {
                    email: user.email,
                    userName: user.userName
                },
                'secret123'
            )
            return res.json({ status: 'ok', user: generatedTokenAdmin })
        } else {
            return res.json({ status: 'error', user: 'not' })
        }
    }
})

app.get('/api/users/:id/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        if (!user) return res.status(400).send({message: "Invalid link"})

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!token) return res.status(400).send({message: "Invalid link"})

        await User.updateOne({_id: user._id}, {verified: true})
        await token.remove()
        res.status(200).send({message: "Email verified successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal service error"})
    }
})

app.get('/api/users/get-verified', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', email: user.email, profilePicture: user.profilePicture, userName: user.userName })
    } catch (error) {
        console.log(error)
        res.json({ status: 'ok', error: 'Invalid token' })
    }
})

app.get('/api/users/main/get-verified', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
})

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage })

app.post('/api/users/upload-profile-pic' , async (req, res) => {
    const token = req.headers['x-access-token']
    const payload = req.body.payload
    try {
        const decoded = jwt.verify(token, 'secret123')
        await User.updateOne(
            { email: decoded.email },
            { $set : { profilePicture : payload }}
        )
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error.message)
        res.json({ error: error })
    }
})

app.post('/api/register/tournaments', async (req, res) => {
    console.log(req.body)
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const tournament = await Tournament.create({
            tournamentName: req.body.formData.tournamentName,
            maxNoOfTeams: req.body.formData.maxNoOfTeams,
            noOfPlayersForATeam: req.body.formData.noOfPlayersForATeam,
            gameName: req.body.formData.gameName,
            gameType: req.body.formData.gameType,
            adminEmail: decoded.email
        })
        res.json({ status: 'ok', tournament: tournament._id })

    } catch (error) {
        console.log(error.message)
    }
})

app.get('/api/get/tournament-details', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const tournament = await Tournament.findOne({ _id: token })
        res.json({ status: 'ok', details: tournament })
    } catch (error)     {
        console.log(error.message)
    }
})

app.post('/api/users/upload-tournament-theme', async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const payload = req.body.payload
        await Tournament.updateOne(
            { _id: token },
            { $set: { tournamentTheme: payload } }
        )
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error.message)
        res.json({ error })
    }
})

app.listen('1337', () => {
    console.log('server running at port 1337')
})