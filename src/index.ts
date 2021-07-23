import express from 'express'
import imagesRouter from './routes/api/images'

const app = express()
const port = 3000

app.use('/', imagesRouter)

app.listen(port, () =>
    console.log(`server started at http://localhost:${port}`)
)

export default app
