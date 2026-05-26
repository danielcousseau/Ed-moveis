const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const { createClient } = require('@supabase/supabase-js')

const prisma = new PrismaClient()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

async function main() {
  // Admin padrão
  const senhaHash = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where:  { email: 'admin@edmoveis.com.br' },
    update: { senha: senhaHash },
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

  // Criar bucket de imagens no Supabase Storage
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucketExiste = buckets && buckets.some(b => b.name === 'galeria')
  if (!bucketExiste) {
    await supabase.storage.createBucket('galeria', { public: true })
    console.log('✅ Bucket "galeria" criado no Supabase Storage')
  } else {
    console.log('ℹ️  Bucket "galeria" já existe')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
