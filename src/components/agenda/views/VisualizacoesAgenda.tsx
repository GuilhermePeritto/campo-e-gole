import { memo } from 'react';
import type { EventoAgenda } from '../hooks/useCalendar';
import VisaoDiaria from './VisaoDiaria';
import VisaoLista from './VisaoLista';
import VisaoMensal from './VisaoMensal';
import VisaoSemanal from './VisaoSemanal';

interface VisualizacoesAgendaProps {
  tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
  dataAtual: Date;
  eventos: EventoAgenda[];
  locaisSelecionados: string[];
  aoClicarEvento: (evento: EventoAgenda) => void;
  aoClicarData: (data: Date) => void;
}

const VisualizacoesAgenda = memo(({
  tipoVisualizacao,
  dataAtual,
  eventos,
  locaisSelecionados,
  aoClicarEvento,
  aoClicarData
}: VisualizacoesAgendaProps) => {
  const propsComuns = {
    dataAtual,
    eventos,
    locaisSelecionados,
    aoClicarEvento,
    aoClicarData
  };

  switch (tipoVisualizacao) {
    case 'semana':
      return <VisaoSemanal {...propsComuns} />;
    case 'mes':
      return <VisaoMensal {...propsComuns} />;
    case 'dia':
      return <VisaoDiaria {...propsComuns} />;
    case 'lista':
      return <VisaoLista {...propsComuns} />;
    default:
      return <VisaoSemanal {...propsComuns} />;
  }
});

VisualizacoesAgenda.displayName = 'VisualizacoesAgenda';

export default VisualizacoesAgenda;