const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

// Criação da api
const app = express()

// Validação de conecção com banco
try {
  mongoose.connect('mongodb://localhost/mongoDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Db working!')
} catch (error) {
  console.error('Failed to connect\n Check if Docker is running\n')
  console.error(error)
}

// Trabalhar com Json
app.use(express.json())

// Rotas isoldas
app.use(routes)

// Definição de porta
app.listen(3030)
