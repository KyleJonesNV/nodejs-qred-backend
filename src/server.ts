import app from './app'

const port = process.env.PORT || 3000;

if (process.env.ENVIRONMENT !== 'production') {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
  })
}
