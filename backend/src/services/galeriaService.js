const galeriaRepository = require('../repositories/galeriaRepository')
const categoriaRepository = require('../repositories/categoriaRepository')
const { validarCriarProjeto, validarAtualizarProjeto } = require('../dto/galeriaDTO')
const supabase = require('../config/supabase')
const path = require('path')

const BUCKET = 'galeria'

async function uploadImagem(arquivo) {
  const ext = path.extname(arquivo.originalname)
  const nome = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(nome, arquivo.buffer, {
    contentType: arquivo.mimetype,
    upsert: false
  })
  if (error) throw { status: 500, message: 'Erro ao fazer upload da imagem: ' + error.message }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(nome)
  return data.publicUrl
}

const listar = async (categoriaSlug) => {
  let categoriaId

  if (categoriaSlug) {
    const categoria = await categoriaRepository.encontrarPorSlug(categoriaSlug)
    if (!categoria) throw { status: 404, message: 'Categoria não encontrada' }
    categoriaId = categoria.id
  }

  return galeriaRepository.listarTodos(categoriaId)
}

const buscarPorId = async (id) => {
  const projeto = await galeriaRepository.encontrarPorId(id)
  if (!projeto) throw { status: 404, message: 'Projeto não encontrado' }
  return projeto
}

const criar = async (body, arquivo) => {
  const erros = validarCriarProjeto(body)
  if (erros.length > 0) throw { status: 400, message: erros.join(', ') }

  if (!arquivo) throw { status: 400, message: 'Imagem do projeto é obrigatória' }

  const categoria = await categoriaRepository.encontrarPorSlug(body.categoria)
  if (!categoria) throw { status: 400, message: 'Categoria inválida' }

  const urlImagem = await uploadImagem(arquivo)

  return galeriaRepository.criar({
    titulo:      body.titulo.trim(),
    descricao:   body.descricao.trim(),
    alt:         body.alt.trim(),
    imagem:      urlImagem,
    categoriaId: categoria.id
  })
}

const atualizar = async (id, body, arquivo) => {
  await buscarPorId(id)

  const erros = validarAtualizarProjeto(body)
  if (erros.length > 0) throw { status: 400, message: erros.join(', ') }

  const dados = {}
  if (body.titulo)    dados.titulo    = body.titulo.trim()
  if (body.descricao) dados.descricao = body.descricao.trim()
  if (body.alt)       dados.alt       = body.alt.trim()
  if (body.ativo !== undefined) dados.ativo = body.ativo === 'true' || body.ativo === true
  if (arquivo) dados.imagem = await uploadImagem(arquivo)

  if (body.categoria) {
    const categoria = await categoriaRepository.encontrarPorSlug(body.categoria)
    if (!categoria) throw { status: 400, message: 'Categoria inválida' }
    dados.categoriaId = categoria.id
  }

  return galeriaRepository.atualizar(id, dados)
}

const remover = async (id) => {
  await buscarPorId(id)
  return galeriaRepository.remover(id)
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
