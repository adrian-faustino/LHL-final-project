const express = require('express')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5555

//middleware
//app.use(cors())  --> uncomment when we need

// new changes lasdfasdf

//basic route
app.get('/test', (req, res) => {
  res.json({message: "Hello World"})
})

//server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})