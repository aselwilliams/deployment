require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors= require('cors')
const {ROLLBAR_KEY}= process.env

app.use(express.json())
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: ROLLBAR_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello USER!')

app.use(express.static('public'))
//app.use(express.static(`${__dirname}/public))

const users = [
    {
        name:"Camran",
        company:"G5",
        email:"camran@aol.com",
        phone:"3031245698"
    }
]

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.get('/api/users', (req, res)=> {
    rollbar.info('Someone got the users list')
    res.status(200).send(users)
})

app.delete('/api/users/:index', (req, res)=> {
    const targetIndex = +req.params.index

    users.splice(targetIndex, 1)
    rollbar.critical(`Someone deleted ${users[targetIndex]}`)
    res.status(200).send(users)
})

app.listen(8040, () => console.log(`Server running on port 8040`))
