
import React from 'react';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Calendar as CalendarIcon } from 'lucide-react';
import AgendaLayout from '@/core/componentes/agenda/AgendaLayout';

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

      <main className="h-[calc(100vh-80px)]">
        <AgendaLayout />
      </main>
    </div>
  );
};

export default Agenda;
