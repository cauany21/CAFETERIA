import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 


// Importa todas as rotas
import routes from './routes/route.js';
import cafeteriaRoutes from './routes/CafeteriaRoutes.js';
import funcionarioRoutes from './routes/FuncionarioRoutes.js';
import fornecedorRoutes from './routes/FornecedorRoutes.js';
import mantimentoRoutes from './routes/MantimentoRoutes.js';
import produtoRoutes from './routes/ProdutoRoutes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Configuração de diretórios
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas principais
app.use('/', routes);
app.use('/cafeteria', cafeteriaRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/fornecedor', fornecedorRoutes);
app.use('/mantimento', mantimentoRoutes);
app.use('/produto', produtoRoutes);

// Servidor
app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});

export default app;
