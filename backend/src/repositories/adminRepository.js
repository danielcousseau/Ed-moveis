const prisma = require('../config/prisma')

const encontrarPorEmail = (email) => {
  return prisma.admin.findUnique({ where: { email } })
}

module.exports = { encontrarPorEmail }
