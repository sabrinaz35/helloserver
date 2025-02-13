//console.log("hello world")

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => { //Arrow function staat hier meteen al achter, als iemand een get request stuurt dan moet er hello world verstuurd worden.
  res.send('Olaa!')//res.send('<h1>Hello world<h1>')
})


app.listen(port, () => { //Arrow function als hij aan het luisteren is dan console.logt hij wat hieronder staat.
  console.log(`Example app listening on port ${port}`)
})