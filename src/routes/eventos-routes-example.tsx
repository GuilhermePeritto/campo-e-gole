
// Este é um exemplo de como as rotas devem ser atualizadas após a reorganização
// Substitua os imports antigos pelos novos caminhos

// ANTES:
// import NewReceivable from '@/pages/eventos/NewReceivable';
// import EditReceivable from '@/pages/eventos/EditReceivable';

// DEPOIS:
import EditarRecebivel from '@/pages/eventos/recebiveis/EditarRecebivel';
import NovoRecebivel from '@/pages/eventos/recebiveis/NovoRecebivel';

// Exemplos de rotas atualizadas:
const eventosRoutes = [
  {
    path: '/eventos/contas-a-receber/novo',
    component: NovoRecebivel
  },
  {
    path: '/eventos/contas-a-receber/editar/:id',
    component: EditarRecebivel
  }
];

export default eventosRoutes;
