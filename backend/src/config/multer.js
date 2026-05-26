const multer = require('multer')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Formato de imagem inválido. Use JPG, PNG ou WebP.'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

module.exports = upload
