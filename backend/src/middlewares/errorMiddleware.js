// Middleware global de tratamento de erros — captura qualquer erro não tratado
const errorMiddleware = (err, req, res, next) => {
  console.error(`[ERRO] ${err.message}`)

  const status = err.status || 500
  const message = err.message || 'Erro interno do servidor'

  return res.status(status).json({
    success: false,
    message,
    data: null
  })
}

module.exports = errorMiddleware
