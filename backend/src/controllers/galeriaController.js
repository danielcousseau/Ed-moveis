const galeriaService = require('../services/galeriaService')
const { sucesso } = require('../utils/response')

const listar = async (req, res, next) => {
  try {
    const { categoria } = req.query
    const projetos = await galeriaService.listar(categoria)
    return sucesso(res, projetos, 'Projetos listados com sucesso')
  } catch (err) {
    next(err)
  }
}

const buscarPorId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const projeto = await galeriaService.buscarPorId(id)
    return sucesso(res, projeto, 'Projeto encontrado')
  } catch (err) {
    next(err)
  }
}

const criar = async (req, res, next) => {
  try {
    const projeto = await galeriaService.criar(req.body, req.file)
    return sucesso(res, projeto, 'Projeto criado com sucesso', 201)
  } catch (err) {
    next(err)
  }
}

const atualizar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const projeto = await galeriaService.atualizar(id, req.body, req.file)
    return sucesso(res, projeto, 'Projeto atualizado com sucesso')
  } catch (err) {
    next(err)
  }
}

const remover = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    await galeriaService.remover(id)
    return sucesso(res, null, 'Projeto removido com sucesso')
  } catch (err) {
    next(err)
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
