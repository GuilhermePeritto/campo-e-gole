// ============================================================================
// TIPOS DE AUTENTICAÇÃO
// ============================================================================

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiraEm: string;
  usuario: User;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  filialId: string;
  grupoId: string;
  ativo: boolean;
  ultimoAcesso: string;
  foto: string;
  permissoesCustomizadas: number[];
  dataCadastro: string;
} 