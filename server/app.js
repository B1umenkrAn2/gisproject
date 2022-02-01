import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import rentPointRouter from './router/rentPointRouter.js'

dotenv.config()
const app = express()

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'))

    app.get('/', (req, res) => {
        res.send('api is running')
    })
}

app.use(express.json())

app.use('/api/points', rentPointRouter)



app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(
    port,
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${port}`)
)
