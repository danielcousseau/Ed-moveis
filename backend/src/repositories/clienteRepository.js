const prisma = require('../config/prisma')

const encontrarPorEmail = (email) => {
  return prisma.cliente.findUnique({ where: { email } })
}

const criar = (dados) => {
  return prisma.cliente.create({ data: dados })
}

const upsert = (dados) => {
  return prisma.cliente.upsert({
    where: { email: dados.email },
    update: { nome: dados.nome, telefone: dados.telefone },
    create: dados
  })
}

module.exports = { encontrarPorEmail, criar, upsert }
