import React from 'react';
import { motion } from 'framer-motion';

interface ResponseTimeMeterProps {
  responseTime: number;
}

const ResponseTimeMeter: React.FC<ResponseTimeMeterProps> = ({ responseTime }) => {
  const getVisualPercentage = () => {
    if (responseTime <= 100) return 100;
    if (responseTime >= 600) return 10;
    return 100 - ((responseTime - 100) / 500) * 90;
  };

  const percentage = getVisualPercentage();

  const getColor = () => {
    if (responseTime < 150) return 'bg-green-500';
    if (responseTime < 250) return 'bg-green-400';
    if (responseTime < 350) return 'bg-yellow-300';
    if (responseTime < 450) return 'bg-orange-300';
    return 'bg-orange-400';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-text-muted mb-1">
        <span>Response Time</span>
        {/* 👇 Show 10ms lower, but cap at 0 */}
        <span>{Math.max(0, responseTime - 10)}ms</span>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ResponseTimeMeter;
