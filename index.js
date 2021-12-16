const express = require('express')
const path = require('path')

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '7ba26f730dc440eabc9b250a62cefcd0',
  captureUncaught: true,
  captureUnhandledRejections: true,
})


let dogs = []

const app = express()
app.use(express.json())



app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('/api/dog', (req,res) => {
    let {name} = req.body

    name = name.trim()
    dogs.push(name)

    rollbar.log('Dog added successfully', {athor: "Molly", type: "manual"})

    res.status(200).send(dogs)
})

app.use(rollbar.errorHandler())
const port = process.env.PORT || 4040

app.listen(port, () => console.log(`Listening on port ${port}`))