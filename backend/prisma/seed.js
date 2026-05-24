const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Admin padrão
  const senhaHash = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where:  { email: 'admin@edmoveis.com.br' },
    update: {},
    create: { email: 'admin@edmoveis.com.br', senha: senhaHash, nome: 'Ednilson' }
  })
  console.log('✅ Admin criado: admin@edmoveis.com.br / admin123')

  // Categorias da galeria
  const categorias = [
    { nome: 'Cozinha',    slug: 'cozinha'    },
    { nome: 'Quarto',     slug: 'quarto'     },
    { nome: 'Banheiro',   slug: 'banheiro'   },
    { nome: 'Sala',       slug: 'sala'       },
    { nome: 'Escritório', slug: 'escritorio' },
    { nome: 'Comercial',  slug: 'comercial'  }
  ]

  for (const cat of categorias) {
    await prisma.categoria.upsert({
      where:  { slug: cat.slug },
      update: { nome: cat.nome },
      create: cat
    })
  }
  console.log('✅ Categorias criadas:', categorias.map(c => c.slug).join(', '))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
