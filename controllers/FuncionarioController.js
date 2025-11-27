import Funcionario from '../models/funcionario.js'

export default class FuncionarioController {

  constructor(caminhoBase = 'funcionario/') {
    this.caminhoBase = caminhoBase

    // ➕ Abrir formulário de cadastro
    this.openAdd = async (req, res) => {
      res.render(this.caminhoBase + 'add')
    }

    // 💾 Adicionar novo funcionário
    this.add = async (req, res) => {
      await Funcionario.create({
        id_funcionario: req.body.id_funcionario,
        nome: req.body.nome,
        cargo: req.body.cargo,
        salario: req.body.salario,
        data_admissao: req.body.data_admissao,
        cpf: req.body.cpf,
        email: req.body.email,
        telefone: req.body.telefone
      })
      res.redirect('/' + this.caminhoBase + 'lst')
    }

    // 📋 Listar todos os funcionários
    this.list = async (req, res) => {
      const resultado = await Funcionario.find({})
      res.render(this.caminhoBase + 'lst', { lista: resultado })
    }

    // 🔍 Buscar funcionário por nome
    this.find = async (req, res) => {
      const filtro = req.body.nome
      const resultado = await Funcionario.find({
        nome: { $regex: filtro, $options: 'i' }
      })
      res.render(this.caminhoBase + 'lst', { lista: resultado })
    }

    // ✏️ Abrir formulário de edição
    this.openEdt = async (req, res) => {
      const funcionario = await Funcionario.findById(req.params.id)
      res.render(this.caminhoBase + 'edt', { funcionario }) // ✅ faltava o render
    }

    // 📝 Editar funcionário
    this.edt = async (req, res) => {
      await Funcionario.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        cargo: req.body.cargo,
        salario: req.body.salario,
        data_admissao: req.body.data_admissao,
        cpf: req.body.cpf,
        email: req.body.email,
        telefone: req.body.telefone
      })
      res.redirect('/' + this.caminhoBase + 'lst')
    }

    // ❌ Deletar funcionário
    this.del = async (req, res) => {
      await Funcionario.findByIdAndDelete(req.params.id)
      res.redirect('/' + this.caminhoBase + 'lst')
    }
  }
}
