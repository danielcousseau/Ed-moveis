// Padroniza todas as respostas da API no formato { success, message, data }

const sucesso = (res, data, message = 'Operação realizada com sucesso', status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  })
}

const erro = (res, message = 'Erro interno do servidor', status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    data: null
  })
}

module.exports = { sucesso, erro }
