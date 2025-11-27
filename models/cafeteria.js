import conexao from '../config/conexao.js'

const Cafeteria = conexao.Schema({
    nome: {type:String, required:true},
    endereco:{type:String, required:true},
    telefone:{type:String, required:true},
    cnpj:{type:String, required:true},
    horario:{type:String, required:true}


        
})

export default conexao.model('Cafeteria',Cafeteria)