const { Router } = require('express')
const orcamentoController = require('../controllers/orcamentoController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = Router()

// Rota pública — cliente envia pedido de orçamento
router.post('/', orcamentoController.criar)

// Rotas protegidas — somente admin
router.get('/',      authMiddleware, orcamentoController.listar)
router.get('/:id',   authMiddleware, orcamentoController.buscarPorId)
router.patch('/:id', authMiddleware, orcamentoController.atualizarStatus)
router.delete('/:id',authMiddleware, orcamentoController.remover)

module.exports = router
