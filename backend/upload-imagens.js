/**
 * Script para fazer upload de imagens da pasta assets/imagens2/ para o Supabase
 * e cadastrá-las automaticamente na galeria do site.
 *
 * Uso:
 *   1. Coloque as fotos nas subpastas de assets/imagens2/
 *   2. Execute: node backend/upload-imagens.js  (a partir da pasta Ed_Moveis/)
 */

require('dotenv').config({ path: __dirname + '/.env' })

const fs   = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const BUCKET      = 'galeria'
const IMAGENS_DIR = path.join(__dirname, '..', 'assets', 'imagens2')
const EXTENSOES   = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

const CATEGORIAS = {
  cozinha:    1,
  quarto:     2,
  banheiro:   3,
  sala:       4,
  escritorio: 5,
  comercial:  6
}

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png',  '.webp': 'image/webp', '.avif': 'image/avif'
}

function nomeParaTitulo(nomeArquivo) {
  return path.basename(nomeArquivo, path.extname(nomeArquivo))
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

async function uploadImagem(caminhoArquivo, nomeArquivo) {
  const buffer       = fs.readFileSync(caminhoArquivo)
  const ext          = path.extname(nomeArquivo).toLowerCase()
  const nomeSupabase = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(nomeSupabase, buffer, {
    contentType: MIME[ext] || 'image/jpeg',
    upsert: false
  })

  if (error) throw new Error('Erro no upload: ' + error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(nomeSupabase)
  return data.publicUrl
}

async function main() {
  console.log('🚀 Iniciando upload de imagens para a galeria...\n')

  let total = 0
  let erros = 0

  for (const [categoria, categoriaId] of Object.entries(CATEGORIAS)) {
    const pasta = path.join(IMAGENS_DIR, categoria)
    if (!fs.existsSync(pasta)) continue

    const arquivos = fs.readdirSync(pasta).filter(f =>
      EXTENSOES.includes(path.extname(f).toLowerCase())
    )

    if (arquivos.length === 0) {
      console.log(`📁 ${categoria}/ — vazia, pulando`)
      continue
    }

    console.log(`📁 ${categoria}/ — ${arquivos.length} imagem(ns)`)

    for (const arquivo of arquivos) {
      const caminho = path.join(pasta, arquivo)
      const titulo  = nomeParaTitulo(arquivo)

      try {
        process.stdout.write(`  ⬆️  "${arquivo}"... `)
        const urlImagem = await uploadImagem(caminho, arquivo)

        const agora = new Date().toISOString()
        const { error } = await supabase.from('projetos').insert({
          titulo,
          descricao:   titulo,
          alt:         titulo,
          imagem:      urlImagem,
          categoriaId: categoriaId,
          ativo:       true,
          criadoEm:    agora,
          atualizadoEm: agora
        })

        if (error) throw new Error(error.message)
        console.log('✅ OK')
        total++
      } catch (err) {
        console.log('❌ ERRO:', err.message)
        erros++
      }
    }
  }

  console.log(`\n✅ Concluído: ${total} imagem(ns) adicionada(s), ${erros} erro(s).`)
}

main().catch(err => {
  console.error('Erro fatal:', err.message)
  process.exit(1)
})
