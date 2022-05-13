import express from 'express'
import routes from './routes'
import mongoose from 'mongoose'

class App{

  constructor() {
    this.server = express()

    mongoose.connect('mongodb+srv://juniordev:juniordev@cluster0.mdm1k.mongodb.net/juniordev?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    this.middlewares()
    this.routes()
  }
  
  middlewares () {
    this.server.use(express.json())
  }

  routes () {
    this.server.use(routes)
  }
}


export default new App().server