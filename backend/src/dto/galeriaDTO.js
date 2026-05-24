const CATEGORIAS_VALIDAS = ['cozinha', 'quarto', 'banheiro', 'sala', 'escritorio', 'comercial']

const validarCriarProjeto = (body) => {
  const erros = []

  if (!body.titulo || body.titulo.trim().length < 3) {
    erros.push('Título é obrigatório e deve ter no mínimo 3 caracteres')
  }

  if (!body.descricao || body.descricao.trim().length < 10) {
    erros.push('Descrição é obrigatória e deve ter no mínimo 10 caracteres')
  }

  if (!body.categoria || !CATEGORIAS_VALIDAS.includes(body.categoria)) {
    erros.push(`Categoria inválida. Use: ${CATEGORIAS_VALIDAS.join(', ')}`)
  }

  if (!body.alt || body.alt.trim().length < 3) {
    erros.push('Texto alternativo da imagem (alt) é obrigatório')
  }

  return erros
}

const validarAtualizarProjeto = (body) => {
  const erros = []

  if (body.titulo !== undefined && body.titulo.trim().length < 3) {
    erros.push('Título deve ter no mínimo 3 caracteres')
  }

  if (body.descricao !== undefined && body.descricao.trim().length < 10) {
    erros.push('Descrição deve ter no mínimo 10 caracteres')
  }

  if (body.categoria !== undefined && !CATEGORIAS_VALIDAS.includes(body.categoria)) {
    erros.push(`Categoria inválida. Use: ${CATEGORIAS_VALIDAS.join(', ')}`)
  }

  return erros
}

module.exports = { validarCriarProjeto, validarAtualizarProjeto }
