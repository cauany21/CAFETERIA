import conexao from '../config/conexao.js'

const Produto = conexao.Schema({
    id_produto: { type: String, required: true },
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    descricao: { type: String, required: true },
    imagem: { type: String },
    cafeteria: { type: conexao.Schema.Types.ObjectId, ref: 'Cafeteria', required: true }
})

export default conexao.model('Produto', Produto)