import Mantimento from '../models/mantimento.js'
import Fornecedor from '../models/fornecedor.js'

export default class MantimentoController {

    constructor(caminhoBase = 'mantimento/') {
        this.caminhoBase = caminhoBase

        // ➕ Abrir formulário de cadastro
        this.openAdd = async (req, res) => {
            const fornecedores = await Fornecedor.find({})
            res.render(this.caminhoBase + "add", { Fornecedor: fornecedores })
        }

        // 💾 Adicionar novo mantimento
        this.add = async (req, res) => {
            await Mantimento.create({
                id_mantimento: req.body.id_mantimento,
                nome: req.body.nome,
                quantidade_estoque: req.body.quantidade_estoque,
                validade: req.body.validade,
                preco_unitario: req.body.preco_unitario,
                fornecedor: req.body.fornecedor
            })
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        // 📋 Listar todos os mantimentos
        this.list = async (req, res) => {
            const resultado = await Mantimento.find({}).populate("fornecedor")
            res.render(this.caminhoBase + 'lst', { lista: resultado }) // ✅ corrigido
        }

        // 🔍 Buscar mantimento por nome
        this.find = async (req, res) => {
            const filtro = req.body.nome // deve bater com o campo do form
            const resultado = await Mantimento.find({
                nome: { $regex: filtro, $options: "i" }
            }).populate("fornecedor")
            res.render(this.caminhoBase + 'lst', { lista: resultado }) // ✅ corrigido
        }

        // ✏️ Abrir formulário de edição
        this.openEdt = async (req, res) => {
            const mantimento = await Mantimento.findById(req.params.id)
            const fornecedores = await Fornecedor.find({})
            res.render(this.caminhoBase + "edt", { Mantimento: mantimento, Fornecedor: fornecedores })
        }

        // 📝 Editar mantimento
        this.edt = async (req, res) => {
            await Mantimento.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        // ❌ Excluir mantimento
        this.del = async (req, res) => {
            await Mantimento.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst')
        }
    }
}
