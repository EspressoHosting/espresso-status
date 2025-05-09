import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ServiceStatus } from '../types/service';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface SystemMetricsProps {
  services: ServiceStatus[];
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({ services }) => {
  const metrics = useMemo(() => {
    if (!services.length) return { status: 'loading', operational: 0, total: 0 };
    
    const total = services.length;
    const operational = services.filter(s => s.status === 'online').length;
    
    let status = 'operational';
    if (operational === 0) status = 'major_outage';
    else if (operational < total) status = 'partial_outage';
    
    return { status, operational, total };
  }, [services]);
  
  const getStatusDetails = () => {
    switch (metrics.status) {
      case 'operational':
        return {
          icon: CheckCircle,
          color: 'text-status-online',
          bg: 'bg-status-online/10',
          text: 'All Systems Operational'
        };
      case 'partial_outage':
        return {
          icon: AlertTriangle,
          color: 'text-status-warning',
          bg: 'bg-status-warning/10',
          text: 'Partial System Outage'
        };
      case 'major_outage':
        return {
          icon: XCircle,
          color: 'text-status-offline',
          bg: 'bg-status-offline/10',
          text: 'Major System Outage'
        };
      default:
        return {
          icon: CheckCircle,
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          text: 'Checking System Status...'
        };
    }
  };
  
  const statusDetails = getStatusDetails();
  const StatusIcon = statusDetails.icon;
  
  return (
    <motion.div 
      className={`p-6 rounded-lg ${statusDetails.bg} flex flex-col md:flex-row items-center gap-4 justify-between`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <StatusIcon className={`h-6 w-6 ${statusDetails.color}`} />
        <h3 className={`text-lg font-semibold ${statusDetails.color}`}>
          {statusDetails.text}
        </h3>
      </div>
      
      {metrics.status !== 'loading' && (
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-text-muted text-xs">Operational</p>
            <p className="text-lg font-semibold">
              {metrics.operational}/{metrics.total}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-text-muted text-xs">Availability</p>
            <p className="text-lg font-semibold">
              {Math.round((metrics.operational / metrics.total) * 100)}%
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SystemMetrics;