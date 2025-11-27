import conexao from '../config/conexao.js'

const Fornecedor = conexao.Schema({
    id_fornecedor: { type: String, required: true },
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
    cnpj: { type: String, required: true },
    email: { type: String, required: true },
    tipo_produto: { type: String, required: true }
})

export default conexao.model('Fornecedor', Fornecedor)