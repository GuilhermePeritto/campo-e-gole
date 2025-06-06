
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Edit3, Mail, MapPin, Phone, User, X } from 'lucide-react';
import React from 'react';

interface EventDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  event: {
    id: number;
    client: string;
    venue: string;
    startTime: string;
    endTime: string;
    status: string;
    day: Date;
    color: string;
    sport?: string;
    phone?: string;
    email?: string;
    price?: number;
    observations?: string;
  };
}

const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({ 
  isOpen, 
  onClose, 
  onEdit, 
  event 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return 'Indefinido';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Detalhes da Reserva
            </DialogTitle>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
              {getStatusText(event.status)}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Barra colorida do local */}
          <div 
            className="h-1 w-full rounded-full"
            style={{ backgroundColor: event.color }}
          />

          {/* Informações do Cliente */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="font-medium text-gray-900">{event.client}</p>
              </div>
            </div>

            {event.email && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="text-gray-900">{event.email}</p>
                </div>
              </div>
            )}

            {event.phone && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Phone className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="text-gray-900">{event.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Informações da Reserva */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Local</p>
                <p className="font-medium text-gray-900">{event.venue}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p className="text-gray-900">
                  {event.day.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Horário</p>
                <p className="text-gray-900">{event.startTime} às {event.endTime}</p>
              </div>
            </div>

            {event.sport && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <div className="h-4 w-4 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Esporte</p>
                  <p className="text-gray-900">{event.sport}</p>
                </div>
              </div>
            )}

            {event.price && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600 font-bold text-sm">R$</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valor</p>
                  <p className="text-gray-900 font-medium">
                    R$ {event.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {event.observations && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">Observações</p>
              <p className="text-gray-900 text-sm bg-gray-50 p-3 rounded-lg">
                {event.observations}
              </p>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            onClick={onEdit}
            className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-gray-600 dark:text-gray-300"
          >
            <Edit3 className="h-4 w-4" />
            Editar Reserva
          </Button>
          <Button 
            onClick={onClose}
            variant="outline"
            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsPopup;
