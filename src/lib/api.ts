// ============================================================================
// ABSTRAÇÃO DA API - SISTEMA LUDUS GESTÃO
// ============================================================================

import { toast } from 'sonner';

// ============================================================================
// CONFIGURAÇÕES DA API
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 10000; // 10 segundos

// ============================================================================
// TIPOS DE RESPOSTA DA API
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiPagedResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// ============================================================================
// CLASSE PRINCIPAL DA API
// ============================================================================

class Api {
  private baseURL: string;
  private timeout: number;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private showNotifications: boolean = true;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.loadTokens();
  }

  // ============================================================================
  // CONFIGURAÇÕES DE NOTIFICAÇÃO
  // ============================================================================

  setNotificationsEnabled(enabled: boolean) {
    this.showNotifications = enabled;
  }

  private showErrorNotification(error: ApiError) {
    if (!this.showNotifications) return;

    let message = error.message;
    let details = '';

    switch (error.status) {
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
        details = `Erro ${error.status}`;
    }

    const fullMessage = details ? `${message}\n${details}` : message;
    
    toast.error(fullMessage, {
      duration: 8000,
      action: {
        label: 'Fechar',
        onClick: () => toast.dismiss(),
      },
    });
  }

  private showSuccessNotification(message: string) {
    if (!this.showNotifications) return;
    
    toast.success(message, {
      duration: 4000,
    });
  }

  private showWarningNotification(message: string) {
    if (!this.showNotifications) return;
    
    toast.warning(message, {
      duration: 5000,
    });
  }

  // ============================================================================
  // MÉTODOS HTTP PRINCIPAIS
  // ============================================================================

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  // ============================================================================
  // MÉTODOS DE AUTENTICAÇÃO
  // ============================================================================

  private loadTokens() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  // ============================================================================
  // MÉTODOS AUXILIARES
  // ============================================================================

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    // Normalizar o endpoint removendo barras duplicadas
    const cleanEndpoint = endpoint.replace(/^\/+/, ''); // Remove barras iniciais
    
    // Construir URL completa evitando barras duplicadas
    const fullUrl = this.baseURL.endsWith('/') 
      ? `${this.baseURL}${cleanEndpoint}`
      : `${this.baseURL}/${cleanEndpoint}`;
    
    const url = new URL(fullUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      // Adicionar token automaticamente
      if (this.accessToken) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${this.accessToken}`
        };
      }

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (response.status === 401) {
        // Tentar refresh do token
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Reexecutar a requisição original
          return this.request(url, options);
        } else {
          // Só retorna erro de sessão expirada se houver refreshToken
          if (this.refreshToken) {
            this.handleUnauthorized();
            return {
              success: false,
              message: 'Sessão expirada. Faça login novamente.',
              data: null
            } as any;
          }
          // Se não houver token, deixa seguir o fluxo (não retorna nada aqui)
        }
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        // Se não for ok, mas o backend retornou um JSON, repasse para o frontend tratar
        if (!response.ok) {
          return json;
        }
        return json;
      }

      // Se não for JSON, trate como texto
      if (!response.ok) {
        // Retorne um objeto de erro genérico
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
          data: null
        } as any;
      }
      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timeoutId);
      // Só lançar exceção para erros de rede ou abort
      if (error && (error.name === 'AbortError' || error.name === 'TypeError')) {
        throw {
          success: false,
          message: 'Erro de conexão. Verifique sua internet.',
          data: null
        };
      }
      throw error;
    }
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const url = this.buildUrl('autenticacao/refresh');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          this.setTokens(data.data.accessToken, data.data.refreshToken);
          return true;
        }
      }
    } catch (error) {
      console.error('Erro ao renovar token:', error);
    }

    return false;
  }

  private handleUnauthorized() {
    this.clearTokens();
    this.showWarningNotification('Sessão expirada. Faça login novamente.');
    // Redirecionar para login apenas se não estiver já na página de login
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  private async handleError(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();
      return {
        message: errorData.message || `HTTP ${response.status}`,
        status: response.status,
        code: errorData.code
      };
    } catch {
      return {
        message: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status
      };
    }
  }

  private handleRequestError(error: any): ApiError {
    if (error.name === 'AbortError') {
      return {
        message: 'Timeout da requisição',
        status: 408
      };
    }

    if (error instanceof TypeError) {
      return {
        message: 'Erro de rede',
        status: 0
      };
    }

    return {
      message: error.message || 'Erro desconhecido',
      status: 0
    };
  }
}

// ============================================================================
// INSTÂNCIA GLOBAL DA API
// ============================================================================

export const api = new Api();

// ============================================================================
// EXPORTAÇÕES
// ============================================================================

export default api;
export { Api };


