const jwt = require('jsonwebtoken')
const { erro } = require('../utils/response')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return erro(res, 'Token de autenticação não fornecido', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = payload
    next()
  } catch {
    return erro(res, 'Token inválido ou expirado', 401)
  }
}

module.exports = authMiddleware
