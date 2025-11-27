import express from 'express';
const router = express.Router();

// Controller
import CafeteriaController from '../controllers/CafeteriaController.js';
const controle = new CafeteriaController();

// Rotas sem prefixo duplicado
router.get('/add', controle.openAdd);
router.post('/add', controle.add);
router.get('/lst', controle.list);
router.post('/lst', controle.find);
router.get('/del/:id', controle.del);
router.get('/edt/:id', controle.openEdt);
router.post('/edt/:id', controle.edt);

export default router;

