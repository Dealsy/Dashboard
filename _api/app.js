const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const db = require('./models')
const Role = db.role

const cors = require('cors')

require('dotenv').config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
})
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log('Synced db.')
//   })
//   .catch((err) => {
//     console.log('Failed to sync db: ' + err.message)
//   })

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.')
  initial()
})

const app = express()
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors())

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`)
})

app.post('/send', function (req, res) {
  let mailOptions = {
    from: process.env.EMAIL,
    to: `${req.body.mailerState.email}`,
    subject: 'Reset Link',
    text: `${
      process.env.URL ||
      `click the link to reset your password http://localhost:3000/login/ResetPassword?${req.body.mailerState.email}`
    }`,
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: 'fail',
      })
    } else {
      console.log('== Message Sent ==')
      res.json({
        status: 'success',
      })
    }
  })
})

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API',
  })
})

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/todo.routes')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  })

  Role.create({
    id: 2,
    name: 'moderator',
  })

  Role.create({
    id: 3,
    name: 'admin',
  })
}
