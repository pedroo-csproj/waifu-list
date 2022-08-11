import express from 'express'

const app = express()

app.use('', (req, res) => {
  return res.status(201).json({ yamete: 'kudasai oni-chan' })
})

app.listen(3000, () => {
  console.log('app running')
})
