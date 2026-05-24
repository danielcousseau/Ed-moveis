const orcamentoRepository = require('../repositories/orcamentoRepository')
const clienteRepository = require('../repositories/clienteRepository')
const { validarCriarOrcamento, validarAtualizarStatus } = require('../dto/orcamentoDTO')

const listar = async () => {
  return orcamentoRepository.listarTodos()
}

const buscarPorId = async (id) => {
  const orcamento = await orcamentoRepository.encontrarPorId(id)
  if (!orcamento) throw { status: 404, message: 'Orçamento não encontrado' }
  return orcamento
}

const criar = async (body) => {
  const erros = validarCriarOrcamento(body)
  if (erros.length > 0) throw { status: 400, message: erros.join(', ') }

  // Normalização: upsert do cliente — evita duplicar dados do mesmo cliente
  const cliente = await clienteRepository.upsert({
    nome:     body.nome.trim(),
    email:    body.email.trim().toLowerCase(),
    telefone: body.telefone.trim()
  })

  return orcamentoRepository.criar({
    clienteId: cliente.id,
    ambiente:  body.ambiente.trim(),
    mensagem:  body.mensagem.trim()
  })
}

const atualizarStatus = async (id, body) => {
  await buscarPorId(id)

  const erros = validarAtualizarStatus(body)
  if (erros.length > 0) throw { status: 400, message: erros.join(', ') }

  return orcamentoRepository.atualizarStatus(id, body.status)
}

const remover = async (id) => {
  await buscarPorId(id)
  return orcamentoRepository.remover(id)
}

module.exports = { listar, buscarPorId, criar, atualizarStatus, remover }
