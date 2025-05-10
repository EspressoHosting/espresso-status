import React, { createContext, useContext, useEffect, useState } from 'react';
import { ServiceStatus, ServiceError } from '../types/service';
import { checkAllServices } from '../lib/api';

interface ServiceContextType {
  services: ServiceStatus[];
  loading: boolean;
  error: ServiceError | null;
  lastUpdated: Date | null;
  refreshServices: () => Promise<void>;
  isRefreshDisabled: boolean;
}

const ServiceContext = createContext<ServiceContextType>({
  services: [],
  loading: false,
  error: null,
  lastUpdated: null,
  refreshServices: async () => {},
  isRefreshDisabled: false,
});

export const useServices = () => useContext(ServiceContext);

interface ServiceProviderProps {
  children: React.ReactNode;
  refreshInterval?: number;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ 
  children, 
  refreshInterval = 300000 // 5 minutes default
}) => {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ServiceError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshDisabled, setIsRefreshDisabled] = useState<boolean>(false);
  
  const refreshServices = async () => {
    if (isRefreshDisabled) return;
    
    setLoading(true);
    setIsRefreshDisabled(true);
    
    try {
      const { services: newServices, error: apiError } = await checkAllServices();
      
      if (apiError) {
        setError(apiError);
      } else {
        setError(null);
      }
      
      setServices(newServices);
      setLastUpdated(new Date());
    } catch (err) {
      setError({ message: 'Failed to fetch service status', service: 'Status API' });
    } finally {
      setLoading(false);
      
      // Enable refresh button after 1 minute
      setTimeout(() => {
        setIsRefreshDisabled(false);
      }, 60000);
    }
  };
  
  // Initial fetch
  useEffect(() => {
    refreshServices();
  }, []);
  
  // Set up auto refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      refreshServices();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);
  
  return (
    <ServiceContext.Provider value={{ 
      services, 
      loading, 
      error, 
      lastUpdated, 
      refreshServices,
      isRefreshDisabled 
    }}>
      {children}
    </ServiceContext.Provider>
  );
};
