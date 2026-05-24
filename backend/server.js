require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
  console.log(`📋 API disponível em http://localhost:${PORT}/api`)
  console.log(`🖼️  Frontend em http://localhost:${PORT}`)
})
