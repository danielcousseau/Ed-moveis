const authService = require('../services/authService')
const { validarLogin } = require('../dto/authDTO')
const { sucesso, erro } = require('../utils/response')

const login = async (req, res, next) => {
  try {
    const erros = validarLogin(req.body)
    if (erros.length > 0) {
      return erro(res, erros.join(', '), 400)
    }

    const resultado = await authService.login(req.body)
    return sucesso(res, resultado, 'Login realizado com sucesso')
  } catch (err) {
    next(err)
  }
}

module.exports = { login }
