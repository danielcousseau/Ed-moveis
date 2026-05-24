const { PrismaClient } = require('@prisma/client')

// Instância única do Prisma compartilhada em toda a aplicação
const prisma = new PrismaClient()

module.exports = prisma
