import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ServiceStatus } from '../types/service';
import ResponseTimeMeter from './ResponseTimeMeter';

interface StatusCardProps {
  service: ServiceStatus;
  index: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ service, index }) => {
  const { name, status, uptime, responseTime, numericResponseTime, url } = service;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1
      }
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-status-online';
      case 'offline':
        return 'bg-status-offline';
      case 'degraded':
        return 'bg-status-warning';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Operational';
      case 'offline':
        return 'Offline';
      case 'degraded':
        return 'Degraded';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <motion.div
      className="card hover:shadow-xl transition-shadow"
      variants={cardVariants}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center">
            <div className={`ping-dot ${status}`}>
              <span className={status}></span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-text-secondary font-medium">
            {getStatusText(status)}
          </div>
          
          {status === 'online' && (
            <div className="text-sm text-text-muted">
              Uptime: {uptime}
            </div>
          )}
        </div>
        
        {status === 'online' && (
          <div className="mb-3">
            <ResponseTimeMeter responseTime={numericResponseTime} />
          </div>
        )}
        
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="text-sm text-text-muted">
            {status === 'online' ? responseTime : 'No response'}
          </div>
          
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:text-accent-hover flex items-center gap-1 transition-colors"
          >
            <span>Visit</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusCard;