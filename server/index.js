const express = require('express')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5555

//middleware
//app.use(cors())  --> uncomment when we need

//basic route
app.get('/', (req, res) => {
  res.json({message: "This is the '/' route!"})
})
app.get('/test', (req, res) => {
  res.json({message: "This is the '/test' route!"})
})

//server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})