const validarCriarOrcamento = (body) => {
  const erros = []

  if (!body.nome || body.nome.trim().length < 3) {
    erros.push('Nome é obrigatório e deve ter no mínimo 3 caracteres')
  }

  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    erros.push('E-mail inválido')
  }

  if (!body.telefone || body.telefone.replace(/\D/g, '').length < 10) {
    erros.push('Telefone inválido (mínimo 10 dígitos)')
  }

  if (!body.ambiente || body.ambiente.trim().length < 3) {
    erros.push('Ambiente é obrigatório (ex: Cozinha, Quarto)')
  }

  if (!body.mensagem || body.mensagem.trim().length < 10) {
    erros.push('Mensagem é obrigatória e deve ter no mínimo 10 caracteres')
  }

  return erros
}

const validarAtualizarStatus = (body) => {
  const statusValidos = ['pendente', 'em_andamento', 'concluido', 'cancelado']
  const erros = []

  if (!body.status || !statusValidos.includes(body.status)) {
    erros.push(`Status inválido. Use: ${statusValidos.join(', ')}`)
  }

  return erros
}

module.exports = { validarCriarOrcamento, validarAtualizarStatus }
