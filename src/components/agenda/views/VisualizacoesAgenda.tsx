import { useContextoAgenda } from '@/contexts/AgendaContext';
import { memo } from 'react';
import VisaoDiaria from './VisaoDiaria';
import VisaoLista from './VisaoLista';
import VisaoMensal from './VisaoMensal';
import VisaoSemanal from './VisaoSemanal';

const VisualizacoesAgenda = memo(() => {
  const { tipoVisualizacao } = useContextoAgenda();

  switch (tipoVisualizacao) {
    case 'mes':
      return <VisaoMensal />;
    case 'semana':
      return <VisaoSemanal />;
    case 'dia':
      return <VisaoDiaria />;
    case 'lista':
      return <VisaoLista />;
    default:
      return <VisaoMensal />;
  }
});

VisualizacoesAgenda.displayName = 'VisualizacoesAgenda';

export default VisualizacoesAgenda;