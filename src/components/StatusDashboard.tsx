import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useServices } from '../context/ServiceContext';
import StatusCard from './StatusCard';
import SystemMetrics from './SystemMetrics';

const StatusDashboard: React.FC = () => {
  const { services, loading, error, lastUpdated, refreshServices, isRefreshDisabled } = useServices();
  
  const handleRefresh = () => {
    refreshServices();
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">System Status</h2>
          {lastUpdated && (
            <p className="text-sm text-text-muted mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        
        <motion.button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            isRefreshDisabled 
              ? 'bg-accent/50 cursor-not-allowed' 
              : 'bg-accent hover:bg-accent-hover'
          }`}
          onClick={handleRefresh}
          whileTap={{ scale: isRefreshDisabled ? 1 : 0.95 }}
          disabled={loading || isRefreshDisabled}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>
            {loading ? 'Refreshing...' : isRefreshDisabled ? 'Wait 1 minute' : 'Refresh Now'}
          </span>
        </motion.button>
      </div>
      
      {error && (
        <motion.div 
          className="p-6 rounded-lg bg-status-offline/10 border border-status-offline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-status-offline" />
            <p className="font-medium text-status-offline">
              {error.message} ({error.service})
            </p>
          </div>
        </motion.div>
      )}
      
      <SystemMetrics services={services} />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <StatusCard key={service.name} service={service} index={index} />
        ))}
        
        {services.length === 0 && !loading && !error && (
          <div className="col-span-full text-center py-12">
            <p className="text-text-muted">No services found</p>
          </div>
        )}
        
        {loading && services.length === 0 && (
          <div className="col-span-full flex justify-center py-12">
            <RefreshCw className="h-8 w-8 text-accent animate-spin" />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StatusDashboard;
