import conexao from '../config/conexao.js'

const Mantimento = conexao.Schema({
    id_mantimento: { type: String, required: true },
    nome: { type: String, required: true },
    quantidade_estoque: { type: Number, required: true },
    validade: { type: Date, required: true },
    preco_unitario: { type: Number, required: true },
    fornecedor: { type: conexao.Schema.Types.ObjectId, ref: 'Fornecedor', required: true }
})

export default conexao.model('Mantimento', Mantimento)