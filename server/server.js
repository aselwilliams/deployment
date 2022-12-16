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
        email:"camran@gmail.com",
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

// app.delete('/api/users/:index', (req, res)=> {
//     const targetIndex = +req.params.index

//     users.splice(targetIndex, 1)
//     rollbar.critical(`Someone deleted ${users[targetIndex]}`)
//     res.status(200).send(users)
// })


// app.post('/api/users', (req, res) => {
//     let {name} = req.body
 
//     const index = users.findIndex(user => {
//         return user === name
//     })
 
//     try {
//         if (index === -1 && name !== '') {
//             console.log(req.body,'body')
//             users.push(req.body)
//             rollbar.info('Someone added a new user')
//             res.status(200).send(users)
//         } else if (name === ''){
//              rollbar.error('someone tried to enter a blank user')
//             res.status(400).send('You must enter a name.')
//         } else {
//              rollbar.error('User already exists')
//             res.status(400).send('That user already exists.')
//         }
//     } catch (err) {
//         console.log(err)
//         rollbar.error(err)
//     }
//  })
app.listen(8040, () => console.log(`Server running on port 8040`))
