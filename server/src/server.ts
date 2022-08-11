import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet.hidePoweredBy())

if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan(':method :url :status - :response-time ms'))
}

app.use('', (req, res) => {
  return res.status(201).json({ yamete: 'kudasai oni-chan' })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.info(`api running on port ${port}`)
})
