import express from 'express';
const router = express.Router();

import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

// 🏠 Home
router.get('/', controle.home);

// 📋 Produtos
router.get('/produtos', controle.listarProdutos);
router.get('/buscar', controle.buscarProdutos);
router.get('/produto/:id', controle.detalhesProduto);

// 🏢 Cafeterias
router.get('/cafeterias', controle.cafeterias);

// 📧 Contato
router.get('/contato', controle.contato);
router.post('/contato', controle.enviarContato);

// 🛒 Pedidos
router.get('/pedido', controle.openPedido);
router.post('/pedido', controle.criarPedido);

export default router;
