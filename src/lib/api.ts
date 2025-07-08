// ============================================================================
// ABSTRAÇÃO DA API - MÓDULO DE EVENTOS
// ============================================================================

// ============================================================================
// CONFIGURAÇÕES DA API
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 10000; // 10 segundos

// ============================================================================
// TIPOS DE RESPOSTA DA API
// ============================================================================

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface ApiError {
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

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
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
  // MÉTODOS AUXILIARES
  // ============================================================================

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);
    
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
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw await this.handleError(response);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return await response.text() as T;
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.handleRequestError(error);
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

// ============================================================================
// FUNÇÕES DE EXEMPLO PARA INTEGRAÇÃO FUTURA COM BACKEND
// ============================================================================

// Função para carregar cliente por ID do backend
export const loadClienteByIdFromAPI = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`/api/clientes/${id}`);
    if (!response.ok) {
      throw new Error('Cliente não encontrado');
    }
    const cliente = await response.json();
    
    // Retornar no formato esperado pelo CampoBusca
    return {
      id: cliente.id,
      label: cliente.name,
      subtitle: cliente.document,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      notes: cliente.notes,
      status: cliente.status
    };
  } catch (error) {
    console.error('Erro ao carregar cliente:', error);
    throw error;
  }
};

// Função para carregar local por ID do backend
export const loadLocalByIdFromAPI = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`/api/locais/${id}`);
    if (!response.ok) {
      throw new Error('Local não encontrado');
    }
    const local = await response.json();
    
    // Retornar no formato esperado pelo CampoBusca
    return {
      id: local.id,
      label: local.nome,
      subtitle: local.tipo,
      tipo: local.tipo,
      valorHora: local.valorHora,
      capacidade: local.capacidade,
      descricao: local.descricao,
      comodidades: local.comodidades,
      status: local.status,
      cor: local.cor,
      intervalo: local.intervalo,
      horarioAbertura: local.horarioAbertura,
      horarioFechamento: local.horarioFechamento
    };
  } catch (error) {
    console.error('Erro ao carregar local:', error);
    throw error;
  }
};

// Função para buscar clientes por termo no backend
export const searchClientesFromAPI = async (termo: string): Promise<any[]> => {
  try {
    const response = await fetch(`/api/clientes/search?q=${encodeURIComponent(termo)}`);
    if (!response.ok) {
      throw new Error('Erro na busca');
    }
    const clientes = await response.json();
    
    return clientes.map((cliente: any) => ({
      id: cliente.id,
      label: cliente.name,
      subtitle: cliente.document,
      email: cliente.email
    }));
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }
};

// Função para buscar locais por termo no backend
export const searchLocaisFromAPI = async (termo: string): Promise<any[]> => {
  try {
    const response = await fetch(`/api/locais/search?q=${encodeURIComponent(termo)}`);
    if (!response.ok) {
      throw new Error('Erro na busca');
    }
    const locais = await response.json();
    
    return locais.map((local: any) => ({
      id: local.id,
      label: local.nome,
      subtitle: local.tipo,
      cor: local.cor
    }));
  } catch (error) {
    console.error('Erro ao buscar locais:', error);
    return [];
  }
};

// Funções para integração com API de eventos
export const eventosAPI = {
  // Buscar eventos por período
  async buscarPorPeriodo(params: {
    dataInicio: string;
    dataFim: string;
    localIds?: string[]; // Mudança: agora aceita array de locais
    clienteId?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    queryParams.append('dataInicio', params.dataInicio);
    queryParams.append('dataFim', params.dataFim);
    if (params.localIds && params.localIds.length > 0) {
      // Adicionar cada local como parâmetro separado
      params.localIds.forEach(localId => {
        queryParams.append('localIds', localId);
      });
    }
    if (params.clienteId) queryParams.append('clienteId', params.clienteId);
    if (params.status) queryParams.append('status', params.status);

    const response = await fetch(`/api/eventos?${queryParams}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }
    return response.json();
  },

  // Buscar eventos por visualização
  async buscarPorVisualizacao(params: {
    tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
    dataAtual: string;
    localIds?: string[]; // Mudança: agora aceita array de locais
  }) {
    const response = await fetch('/api/eventos/visualizacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos por visualização');
    }
    return response.json();
  },

  // Criar evento
  async criar(evento: any) {
    const response = await fetch('/api/eventos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar evento');
    }
    return response.json();
  },

  // Atualizar evento
  async atualizar(id: string, evento: any) {
    const response = await fetch(`/api/eventos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar evento');
    }
    return response.json();
  },

  // Deletar evento
  async deletar(id: string) {
    const response = await fetch(`/api/eventos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar evento');
    }
    return response.json();
  },
};
