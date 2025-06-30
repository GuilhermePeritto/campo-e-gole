
import { useState, useCallback } from 'react';

export const useSidebarAgenda = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return {
    isExpanded,
    toggleSidebar,
    expandSidebar,
    collapseSidebar
  };
};
