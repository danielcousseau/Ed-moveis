const prisma = require('../config/prisma')

const listarTodas = () => {
  return prisma.categoria.findMany({ orderBy: { nome: 'asc' } })
}

const encontrarPorSlug = (slug) => {
  return prisma.categoria.findUnique({ where: { slug } })
}

const encontrarPorId = (id) => {
  return prisma.categoria.findUnique({ where: { id } })
}

module.exports = { listarTodas, encontrarPorSlug, encontrarPorId }
