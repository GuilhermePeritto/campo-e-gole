import { toast } from 'sonner';
import { ApiError } from '../lib/api';

export interface NotificationOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useNotifications = () => {
  const showSuccess = (message: string, options?: NotificationOptions) => {
    toast.success(message, {
      duration: options?.duration || 4000,
      action: options?.action,
    });
  };

  const showError = (message: string, options?: NotificationOptions) => {
    toast.error(message, {
      duration: options?.duration || 6000,
      action: options?.action,
    });
  };

  const showWarning = (message: string, options?: NotificationOptions) => {
    toast.warning(message, {
      duration: options?.duration || 5000,
      action: options?.action,
    });
  };

  const showInfo = (message: string, options?: NotificationOptions) => {
    toast.info(message, {
      duration: options?.duration || 4000,
      action: options?.action,
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const handleApiError = (error: ApiError | Error | any) => {
    let message = 'Ocorreu um erro inesperado';
    let details = '';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'object' && error !== null) {
      // Se for um erro da API
      if ('message' in error && typeof error.message === 'string') {
        message = error.message;
      }
      
      if ('status' in error) {
        const status = error.status;
        
        switch (status) {
          case 400:
            details = 'Dados inválidos fornecidos';
            break;
          case 401:
            message = 'Não autorizado. Faça login novamente.';
            break;
          case 403:
            message = 'Acesso negado. Você não tem permissão para esta ação.';
            break;
          case 404:
            message = 'Recurso não encontrado';
            break;
          case 409:
            message = 'Conflito. O recurso já existe ou está em uso.';
            break;
          case 422:
            message = 'Dados inválidos. Verifique as informações fornecidas.';
            break;
          case 500:
            message = 'Erro interno do servidor. Tente novamente mais tarde.';
            break;
          case 0:
            message = 'Erro de conexão. Verifique sua internet.';
            break;
          default:
            details = `Erro ${status}`;
        }
      }
    }

    // Se temos detalhes adicionais, mostrar em uma linha separada
    const fullMessage = details ? `${message}\n${details}` : message;
    
    showError(fullMessage, {
      duration: 8000,
      action: {
        label: 'Fechar',
        onClick: () => dismiss(),
      },
    });
  };

  const handleApiSuccess = (message: string, options?: NotificationOptions) => {
    showSuccess(message, options);
  };

  const handleApiWarning = (message: string, options?: NotificationOptions) => {
    showWarning(message, options);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
    handleApiError,
    handleApiSuccess,
    handleApiWarning,
  };
}; 