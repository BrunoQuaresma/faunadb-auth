require('dotenv').config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import signUp from './endpoints/signUp'
import signIn from './endpoints/signIn'
import db from './endpoints/db'

const app: express.Application = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN || 'http://localhost:3001',
    credentials: true
  })
)

app.post('/signup', signUp)
app.post('/signin', signIn)
app.post('/db', db)

app.listen(process.env.PORT, function() {
  console.log('Example app listening on port 3000!')
})
