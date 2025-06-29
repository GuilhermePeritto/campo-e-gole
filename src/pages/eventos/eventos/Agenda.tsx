
import ModuleHeader from '@/components/ModuleHeader';
import AgendaOriginUI from '@/core/componentes/agenda/AgendaOriginUI';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Calendar as CalendarIcon } from 'lucide-react';

const Agenda = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title="Agenda"
        icon={<CalendarIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <AgendaOriginUI />
    </div>
  );
};

export default Agenda;
