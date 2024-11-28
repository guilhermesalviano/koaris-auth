import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(routes)

export { app }
