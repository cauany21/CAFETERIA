import Produto from '../models/produto.js'
import Cafeteria from '../models/cafeteria.js'
import Pedido from '../models/pedido.js'

export default class SiteController {

    constructor() {
        // 🏠 Home - Exibe página inicial com produtos em destaque
        this.home = async (req, res) => {
            try {
                const produtos = await Produto.find({}).populate('cafeteria').limit(6)
                const cafeterias = await Cafeteria.find({})
                res.render('site/index', { 
                    produtos: produtos, 
                    cafeterias: cafeterias 
                })
            } catch (err) {
                console.error('Erro ao carregar home:', err)
                res.status(500).send('Erro ao carregar página')
            }
        }

        // 📋 Lista todos os produtos da cafeteria
        this.listarProdutos = async (req, res) => {
            try {
                const produtos = await Produto.find({}).populate('cafeteria')
                const cafeterias = await Cafeteria.find({})
                res.render('site/produtos', { 
                    produtos: produtos,
                    cafeterias: cafeterias 
                })
            } catch (err) {
                console.error('Erro ao listar produtos:', err)
                res.status(500).send('Erro ao carregar produtos')
            }
        }

        // 🔍 Buscar produtos por categoria ou nome
        this.buscarProdutos = async (req, res) => {
            try {
                const { nome, categoria } = req.query
                let filtro = {}

                if (nome) {
                    filtro.nome = { $regex: nome, $options: 'i' }
                }
                if (categoria) {
                    filtro.categoria = { $regex: categoria, $options: 'i' }
                }

                const produtos = await Produto.find(filtro).populate('cafeteria')
                const cafeterias = await Cafeteria.find({})
                
                res.render('site/produtos', { 
                    produtos: produtos,
                    cafeterias: cafeterias,
                    busca: nome || categoria
                })
            } catch (err) {
                console.error('Erro ao buscar produtos:', err)
                res.status(500).send('Erro ao buscar produtos')
            }
        }

        // 📦 Detalhes de um produto específico
        this.detalhesProduto = async (req, res) => {
            try {
                const produto = await Produto.findById(req.params.id).populate('cafeteria')
                if (!produto) {
                    return res.status(404).render('site/notfound')
                }
                
                // Busca produtos relacionados (mesma categoria)
                const relacionados = await Produto.find({
                    categoria: produto.categoria,
                    _id: { $ne: produto._id }
                }).populate('cafeteria').limit(3)

                res.render('site/detalhe-produto', { 
                    produto: produto,
                    relacionados: relacionados
                })
            } catch (err) {
                console.error('Erro ao carregar detalhes do produto:', err)
                res.status(500).send('Erro ao carregar produto')
            }
        }

        // 🏢 Página de cafeterias
        this.cafeterias = async (req, res) => {
            try {
                const cafeterias = await Cafeteria.find({})
                res.render('site/cafeterias', { cafeterias: cafeterias })
            } catch (err) {
                console.error('Erro ao listar cafeterias:', err)
                res.status(500).send('Erro ao carregar cafeterias')
            }
        }

        // 📧 Formulário de contato
        this.contato = async (req, res) => {
            res.render('site/contato')
        }

        // 💬 Processar contato
        this.enviarContato = async (req, res) => {
            try {
                const { nome, email, mensagem } = req.body
                // Aqui você pode salvar em banco de dados ou enviar email
                console.log('Contato recebido:', { nome, email, mensagem })
                res.render('site/contato-sucesso', { nome: nome, email: email })
            } catch (err) {
                console.error('Erro ao processar contato:', err)
                res.status(500).send('Erro ao enviar mensagem')
            }
        }

        // 🛒 Abrir formulário de pedido
        this.openPedido = async (req, res) => {
            try {
                const produtos = await Produto.find({}).populate('cafeteria')
                const selected = req.query.product || null
                res.render('site/pedido', { produtos: produtos, selected: selected })
            } catch (err) {
                console.error('Erro ao abrir pedido:', err)
                res.status(500).send('Erro ao abrir pedido')
            }
        }

        // 📝 Criar pedido
        this.criarPedido = async (req, res) => {
            try {
                const { produto, quantidade, nome, email, telefone, endereco } = req.body
                // busca o produto para obter preço
                const prod = await Produto.findById(produto)
                if (!prod) return res.status(400).send('Produto inválido')

                const q = parseInt(quantidade) || 1
                const item = { produto: prod._id, quantidade: q, preco: prod.preco }
                const total = item.preco * item.quantidade

                const pedido = await Pedido.create({
                    itens: [item],
                    cliente: { nome, email, telefone, endereco },
                    total: total
                })

                console.log('Pedido criado:', pedido._id)
                res.render('site/pedido-sucesso', { id: pedido._id, nome: nome, total: total })
            } catch (err) {
                console.error('Erro ao criar pedido:', err)
                res.status(500).send('Erro ao criar pedido')
            }
        }
    }
}
