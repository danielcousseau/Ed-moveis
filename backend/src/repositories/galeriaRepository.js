const prisma = require('../config/prisma')

const listarTodos = (categoriaId) => {
  const where = { ativo: true }
  if (categoriaId) where.categoriaId = categoriaId

  return prisma.projeto.findMany({
    where,
    include: { categoria: true },
    orderBy: { criadoEm: 'desc' }
  })
}

const encontrarPorId = (id) => {
  return prisma.projeto.findUnique({
    where: { id },
    include: { categoria: true }
  })
}

const criar = (dados) => {
  return prisma.projeto.create({
    data: dados,
    include: { categoria: true }
  })
}

const atualizar = (id, dados) => {
  return prisma.projeto.update({
    where: { id },
    data: dados,
    include: { categoria: true }
  })
}

const remover = (id) => {
  return prisma.projeto.delete({ where: { id } })
}

module.exports = { listarTodos, encontrarPorId, criar, atualizar, remover }
