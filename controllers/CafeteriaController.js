import Cafeteria from '../models/cafeteria.js'

export default class CafeteriaController {

  constructor(caminhoBase = 'cafeteria/') {
    this.caminhoBase = caminhoBase

    // ➕ Abrir formulário
    this.openAdd = async (req, res) => {
      res.render(this.caminhoBase + 'add')
    }

    // 💾 Adicionar cafeteria
    this.add = async (req, res) => {
      await Cafeteria.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        cnpj: req.body.cnpj,
        horario: req.body.horario
      })

      res.redirect('/' + this.caminhoBase + 'lst')
    }

    // 📋 Listar todas
    this.list = async (req, res) => {
      const resultado = await Cafeteria.find({})
      res.render(this.caminhoBase + 'lst', { lista: resultado })
    }

    // 🔍 Buscar por nome
    this.find = async (req, res) => {
      const filtro = req.body.nome
      const resultado = await Cafeteria.find({
        nome: { $regex: filtro, $options: 'i' }
      })
      res.render(this.caminhoBase + 'lst', { lista: resultado })
    }

    // ✏️ Abrir edição
    this.openEdt = async (req, res) => {
      const cafeteria = await Cafeteria.findById(req.params.id)
      res.render(this.caminhoBase + 'edt', { cafeteria })
    }

    // 📝 Editar
    this.edt = async (req, res) => {
      await Cafeteria.findByIdAndUpdate(req.params.id, req.body)
      res.redirect('/' + this.caminhoBase + 'lst')
    }

    // ❌ Deletar
    this.del = async (req, res) => {
      await Cafeteria.findByIdAndDelete(req.params.id)
      res.redirect('/' + this.caminhoBase + 'lst')
    }
  }
}



