import express from 'express';
const router = express.Router();
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dest = path.resolve('public', 'img')
		cb(null, dest)
	},
	filename: function (req, file, cb) {
		const unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, unique + path.extname(file.originalname))
	}
})
const upload = multer({ storage })
// garante que a pasta exista
const imgDir = path.resolve('public', 'img')
try {
	fs.mkdirSync(imgDir, { recursive: true })
} catch (e) {
	console.error('Erro ao criar pasta de imagens:', e)
}

// Controller
import ProdutoController from '../controllers/ProdutoController.js'
const controle = new ProdutoController();

// Rotas sem prefixo duplicado
router.get('/add', controle.openAdd);
router.post('/add', upload.single('imagem'), controle.add);
router.get('/lst', controle.list);
router.post('/lst', controle.find);
router.get('/del/:id', controle.del);
router.get('/edt/:id', controle.openEdt);
router.post('/edt/:id', upload.single('imagem'), controle.edt);

export default router;