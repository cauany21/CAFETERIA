import conexao from '../config/conexao.js'

const ItemSchema = conexao.Schema({
  produto: { type: conexao.Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidade: { type: Number, required: true, default: 1 },
  preco: { type: Number, required: true }
})

const Pedido = conexao.Schema({
  itens: { type: [ItemSchema], required: true },
  cliente: {
    nome: { type: String, required: true },
    email: { type: String },
    telefone: { type: String },
    endereco: { type: String }
  },
  total: { type: Number, required: true },
  status: { type: String, default: 'pendente' },
  criadoEm: { type: Date, default: Date.now }
})

export default conexao.model('Pedido', Pedido)
