
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CalendarControlsProps {
  viewType: string;
  setViewType: (view: string) => void;
  selectedVenue: string;
  setSelectedVenue: (venue: string) => void;
  venues: Array<{ id: string; name: string }>;
  navigateDate: (direction: 'prev' | 'next') => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  dateTitle: string;
}

const CalendarControls = ({
  viewType,
  setViewType,
  selectedVenue,
  setSelectedVenue,
  venues,
  navigateDate,
  setCurrentDate,
  dateTitle
}: CalendarControlsProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Select value={selectedVenue} onValueChange={setSelectedVenue}>
            <SelectTrigger className="w-48 border">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {venues.map((venue) => (
                <SelectItem key={venue.id} value={venue.id}>{venue.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex bg-muted rounded-lg p-1">
            {['month', 'week', 'day'].map((view) => (
              <button
                key={view}
                onClick={() => setViewType(view)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewType === view
                  ? 'text-gray-900 dark:text-gray-300 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300'
                  }`}
              >
                {view === 'month' ? 'Mês' : view === 'week' ? 'Semana' : 'Dia'}
              </button>
            ))}
          </div>
        </div>

        <Button className="gap-2 text-gray-900 dark:text-gray-300" variant='outline' onClick={() => navigate('/eventos/novo')}>
          <Plus className="h-4 w-4" />
          Nova Reserva
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateDate('prev')}
              className="p-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateDate('next')}
              className="p-2"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-300">
            {dateTitle}
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentDate(new Date())}
          className="border text-gray-900 dark:text-gray-300"
        >
          Hoje
        </Button>
      </div>
    </>
  );
};

export default CalendarControls;
