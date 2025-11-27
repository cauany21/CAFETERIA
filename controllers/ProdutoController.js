import Produto from '../models/produto.js'
import Cafeteria from '../models/cafeteria.js'

export default class ProdutoController {

    constructor(caminhoBase = 'produto/') {
        this.caminhoBase = caminhoBase

        // ➕ Abrir formulário de cadastro
        this.openAdd = async (req, res) => {
            const cafeterias = await Cafeteria.find({})
            res.render(this.caminhoBase + "add", { Cafeteria: cafeterias })
        }

        // 💾 Adicionar produto
        this.add = async (req, res) => {
            try {
                console.log('Produto add - req.file =', req.file)
                const created = await Produto.create({
                    id_produto: req.body.id_produto,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    categoria: req.body.categoria,
                    descricao: req.body.descricao,
                    imagem: req.file ? req.file.filename : undefined,
                    cafeteria: req.body.cafeteria
                })
                console.log('Produto criado:', created._id, 'imagem=', created.imagem)
                res.redirect('/' + this.caminhoBase + 'lst')
            } catch (err) {
                console.error('Erro ao criar produto:', err)
                res.status(500).send('Erro ao salvar produto: ' + err.message)
            }
        }

        // 📋 Listar todos os produtos
        this.list = async (req, res) => {
            const resultado = await Produto.find({}).populate("cafeteria")
            res.render(this.caminhoBase + 'lst', { lista: resultado }) // ✅ corrigido
        }

        // 🔍 Buscar produtos por nome
        this.find = async (req, res) => {
            const filtro = req.body.nome // deve bater com o campo do form
            const resultado = await Produto.find({
                nome: { $regex: filtro, $options: "i" }
            }).populate("cafeteria")
            res.render(this.caminhoBase + 'lst', { lista: resultado }) // ✅ corrigido
        }

        // ✏️ Abrir formulário de edição
        this.openEdt = async (req, res) => {
            const produto = await Produto.findById(req.params.id)
            const cafeterias = await Cafeteria.find({})
            res.render(this.caminhoBase + "edt", { Produto: produto, Cafeteria: cafeterias })
        }

        // 📝 Editar produto
        this.edt = async (req, res) => {
            try {
                console.log('Produto edt - req.file =', req.file)
                const updateData = {
                    id_produto: req.body.id_produto,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    categoria: req.body.categoria,
                    descricao: req.body.descricao,
                    cafeteria: req.body.cafeteria
                }
                if (req.file) {
                    updateData.imagem = req.file.filename
                }
                const updated = await Produto.findByIdAndUpdate(req.params.id, updateData, { new: true })
                console.log('Produto atualizado:', req.params.id, 'imagem=', updated ? updated.imagem : null)
                res.redirect('/' + this.caminhoBase + 'lst')
            } catch (err) {
                console.error('Erro ao atualizar produto:', err)
                res.status(500).send('Erro ao atualizar produto: ' + err.message)
            }
        }

        // ❌ Excluir produto
        this.del = async (req, res) => {
            await Produto.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst')
        }
    }
}
