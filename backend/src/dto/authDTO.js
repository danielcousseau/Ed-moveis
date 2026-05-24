// Valida os dados de entrada do login
const validarLogin = (body) => {
  const erros = []

  if (!body.email || typeof body.email !== 'string') {
    erros.push('E-mail é obrigatório')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    erros.push('E-mail inválido')
  }

  if (!body.senha || typeof body.senha !== 'string') {
    erros.push('Senha é obrigatória')
  } else if (body.senha.length < 6) {
    erros.push('Senha deve ter no mínimo 6 caracteres')
  }

  return erros
}

module.exports = { validarLogin }
