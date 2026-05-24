const orcamentoService = require('../services/orcamentoService')
const { sucesso } = require('../utils/response')

const listar = async (req, res, next) => {
  try {
    const orcamentos = await orcamentoService.listar()
    return sucesso(res, orcamentos, 'Orçamentos listados com sucesso')
  } catch (err) {
    next(err)
  }
}

const buscarPorId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const orcamento = await orcamentoService.buscarPorId(id)
    return sucesso(res, orcamento, 'Orçamento encontrado')
  } catch (err) {
    next(err)
  }
}

const criar = async (req, res, next) => {
  try {
    const orcamento = await orcamentoService.criar(req.body)
    return sucesso(res, orcamento, 'Orçamento enviado com sucesso! Entraremos em contato em breve.', 201)
  } catch (err) {
    next(err)
  }
}

const atualizarStatus = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const orcamento = await orcamentoService.atualizarStatus(id, req.body)
    return sucesso(res, orcamento, 'Status atualizado com sucesso')
  } catch (err) {
    next(err)
  }
}

const remover = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    await orcamentoService.remover(id)
    return sucesso(res, null, 'Orçamento removido com sucesso')
  } catch (err) {
    next(err)
  }
}

module.exports = { listar, buscarPorId, criar, atualizarStatus, remover }
