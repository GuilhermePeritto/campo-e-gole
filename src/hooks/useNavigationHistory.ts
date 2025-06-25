
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigationHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const historyRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const history = historyRef.current;
    
    // Evitar adicionar a mesma página consecutivamente
    if (history[history.length - 1] !== currentPath) {
      // Se não estamos na última posição do histórico, remover páginas posteriores
      if (currentIndexRef.current < history.length - 1) {
        historyRef.current = history.slice(0, currentIndexRef.current + 1);
      }
      
      historyRef.current.push(currentPath);
      currentIndexRef.current = historyRef.current.length - 1;
      
      // Manter apenas as últimas 10 páginas no histórico
      if (historyRef.current.length > 10) {
        historyRef.current = historyRef.current.slice(-10);
        currentIndexRef.current = historyRef.current.length - 1;
      }
    }
  }, [location.pathname]);

  const goBack = () => {
    const history = historyRef.current;
    
    if (history.length > 1) {
      // Procurar a página anterior que não seja a atual
      let previousIndex = currentIndexRef.current - 1;
      
      while (previousIndex >= 0 && history[previousIndex] === location.pathname) {
        previousIndex--;
      }
      
      if (previousIndex >= 0) {
        currentIndexRef.current = previousIndex;
        navigate(history[previousIndex]);
        return true;
      }
    }
    
    // Se não há histórico ou todas as páginas no histórico são iguais à atual
    // navegar para uma página padrão baseada na rota atual
    const defaultRoutes: Record<string, string> = {
      '/eventos/locais/': '/eventos/locais',
      '/eventos/clientes/': '/eventos/clientes',
      '/eventos/recebiveis/': '/eventos/recebiveis',
      '/eventos/': '/eventos',
      '/configuracoes/': '/configuracoes',
      '/': '/inicio'
    };
    
    const currentPath = location.pathname;
    for (const [prefix, defaultRoute] of Object.entries(defaultRoutes)) {
      if (currentPath.startsWith(prefix) && currentPath !== defaultRoute) {
        navigate(defaultRoute);
        return true;
      }
    }
    
    // Como último recurso, ir para o painel
    navigate('/inicio');
    return true;
  };

  const canGoBack = () => {
    const history = historyRef.current;
    return history.length > 1 && currentIndexRef.current > 0;
  };

  return {
    goBack,
    canGoBack,
    history: historyRef.current,
    currentIndex: currentIndexRef.current
  };
};
