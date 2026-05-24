const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminRepository = require('../repositories/adminRepository')

const login = async ({ email, senha }) => {
  const admin = await adminRepository.encontrarPorEmail(email)

  if (!admin) {
    throw { status: 401, message: 'E-mail ou senha incorretos' }
  }

  const senhaCorreta = await bcrypt.compare(senha, admin.senha)

  if (!senhaCorreta) {
    throw { status: 401, message: 'E-mail ou senha incorretos' }
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email, nome: admin.nome },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  )

  return {
    token,
    admin: {
      id: admin.id,
      nome: admin.nome,
      email: admin.email
    }
  }
}

module.exports = { login }
