const { Router } = require('express')
const galeriaController = require('../controllers/galeriaController')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../config/multer')

const router = Router()

// Rotas públicas
router.get('/',    galeriaController.listar)
router.get('/:id', galeriaController.buscarPorId)

// Rotas protegidas (requerem JWT)
router.post('/',    authMiddleware, upload.single('imagem'), galeriaController.criar)
router.put('/:id',  authMiddleware, upload.single('imagem'), galeriaController.atualizar)
router.delete('/:id', authMiddleware, galeriaController.remover)

module.exports = router
