import { app } from './app'

// Creating an Express application
const PORT = process.env.PORT || 3333

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
