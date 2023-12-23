const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload = require("express-fileupload");//for file upload
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.json()) //for data get from postman


app.use(cors()) // for api communication in react

app.use(cookieParser())//for getting token in auth 

// for file upload
app.use(fileUpload({ useTempFiles: true }));

app.use(express.json()) //for data get from postman

connectDb()

//load route
app.use('/api', web)
//localhost:4000/api





//server create
app.listen(process.env.PORT, () => {
    console.log(`server running on localhost: ${process.env.PORT}`)
})