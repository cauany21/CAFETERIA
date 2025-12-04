import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 


// Importa todas as rotas
import routes from './routes/route.js';
import siteRoutes from './routes/SiteRoutes.js';
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
app.use('/', siteRoutes);  // Site público (/) - deve vir primeiro
app.use('/admin/cafeteria', cafeteriaRoutes);
app.use('/admin/funcionario', funcionarioRoutes);
app.use('/admin/fornecedor', fornecedorRoutes);
app.use('/admin/mantimento', mantimentoRoutes);
app.use('/admin/produto', produtoRoutes);
app.use('/admin', routes);  // Rotas administrativas gerais

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
