import Fornecedor from '../models/fornecedor.js'

export default class FornecedorController {

    constructor(caminhoBase = 'fornecedor/') {
        this.caminhoBase = caminhoBase

        // ➕ Abrir formulário de cadastro
        this.openAdd = async (req, res) => {
            res.render(this.caminhoBase + "add")
        }

        // 💾 Adicionar novo fornecedor
        this.add = async (req, res) => {
            await Fornecedor.create({
                id_fornecedor: req.body.id_fornecedor,
                nome: req.body.nome,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                cnpj: req.body.cnpj,
                email: req.body.email,
                tipo_produto: req.body.tipo_produto
            })

            res.redirect('/' + this.caminhoBase + 'lst')
        }

        // 📋 Listar todos os fornecedores
        this.list = async (req, res) => {
            const resultado = await Fornecedor.find({})
            res.render(this.caminhoBase + 'lst', { lista: resultado }) // ✅ corrigido
        }

        // 🔍 Buscar fornecedor por nome
        this.find = async (req, res) => {
            const filtro = req.body.nome // deve coincidir com o campo do form
            const resultado = await Fornecedor.find({
                nome: { $regex: filtro, $options: "i" }
            })
            res.render(this.caminhoBase + 'lst', { lista: resultado }) // ✅ corrigido
        }

        // ✏️ Abrir formulário de edição
        this.openEdt = async (req, res) => {
            const fornecedor = await Fornecedor.findById(req.params.id)
            res.render(this.caminhoBase + "edt", { Fornecedor: fornecedor })
        }

        // 📝 Editar fornecedor
        this.edt = async (req, res) => {
            await Fornecedor.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + this.caminhoBase + 'lst')
        }

        // ❌ Excluir fornecedor
        this.del = async (req, res) => {
            await Fornecedor.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst')
        }
    }
}
