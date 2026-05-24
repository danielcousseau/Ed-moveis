const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes      = require('./src/routes/authRoutes')
const galeriaRoutes   = require('./src/routes/galeriaRoutes')
const orcamentoRoutes = require('./src/routes/orcamentoRoutes')
const errorMiddleware = require('./src/middlewares/errorMiddleware')

const app = express()

// Middlewares globais
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve imagens enviadas por upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Serve o frontend estático
app.use(express.static(path.join(__dirname, '../assets')))

// Rotas da API
app.use('/api/auth',      authRoutes)
app.use('/api/galeria',   galeriaRoutes)
app.use('/api/orcamentos', orcamentoRoutes)

// Rota de saúde — confirma que a API está no ar
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API Ed Móveis online', data: null })
})

// Middleware global de erros (deve ser o último)
app.use(errorMiddleware)

module.exports = app
