require('dotenv').config();

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const conn = require('./db/conn');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()
const port = process.env.PORT || 3000

conn()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api', userRoutes)
app.use('/api', authRoutes)

app.use((err, req, res, next) => errorHandler(err, req, res, next))

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
