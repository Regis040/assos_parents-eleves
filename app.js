const express = require(`express`)
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = 3000
// const {sequelize}= require('./db/sequelizeSetup')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {   
    res.json('Hello World !')
})

const userRouter = require('./routes/userRoutes')
app.use('/users', userRouter)
const articleRouter = require('./routes/articleRoutes')
app.use(`/articles`, articleRouter)
const commentRouter = require(`./routes/commentRoutes`)
app.use(`/comments`, commentRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})