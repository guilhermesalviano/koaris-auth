import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000'  // Configures CORS to allow requests from your frontend
}));

app.use(routes)

export { app }
