import conexao from '../config/conexao.js'

const Funcionario = conexao.Schema({
    id_funcionario: { type: String, required: true },
    nome: { type: String, required: true },
    cargo: { type: String, required: true },
    salario: { type: Number, required: true },
    data_admissao: { type: Date, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true }
})

export default conexao.model('Funcionario', Funcionario)