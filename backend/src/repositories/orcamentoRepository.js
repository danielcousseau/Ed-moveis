const prisma = require('../config/prisma')

const listarTodos = () => {
  return prisma.orcamento.findMany({
    include: { cliente: true },
    orderBy: { criadoEm: 'desc' }
  })
}

const encontrarPorId = (id) => {
  return prisma.orcamento.findUnique({
    where: { id },
    include: { cliente: true }
  })
}

const criar = (dados) => {
  return prisma.orcamento.create({
    data: dados,
    include: { cliente: true }
  })
}

const atualizarStatus = (id, status) => {
  return prisma.orcamento.update({
    where: { id },
    data: { status },
    include: { cliente: true }
  })
}

const remover = (id) => {
  return prisma.orcamento.delete({ where: { id } })
}

module.exports = { listarTodos, encontrarPorId, criar, atualizarStatus, remover }
