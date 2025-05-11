import axios from 'axios';
import { ServiceStatus, ServiceError } from '../types/service';

// Service endpoints to check
const servicesList = [
  { 
    name: 'Main Website', 
    url: 'https://espressohost.xyz'
  },
  { 
    name: 'Paid Panel', 
    url: 'https://panel.espressohost.xyz'
  },
  { 
    name: 'Free Panel', 
    url: 'https://free.espressohost.xyz'
  },
  { 
    name: 'EU Node', 
    url: 'https://panel.espressohost.xyz', // Using this instead of direct IP
    ip: '193.180.209.83' // Store the IP for reference
  }
];

// Function to check a single service status
export const checkServiceStatus = async (service: { name: string, url: string }): Promise<ServiceStatus> => {
  try {
    const startTime = performance.now();
    
    // For real implementation, this would call a Netlify function
    // that actually pings the service. For now, we'll simulate with
    // a direct request with a timeout
    const response = await axios.get(`/.netlify/functions/check-service`, {
      params: { url: service.url },
      timeout: 5000
    });
    
    // In actual implementation, we would parse response.data
    // For now, we'll simulate the response
    
    // Simulating response time (would be real in production)
    const responseTime = Math.floor(Math.random() * 300) + 50;
    const uptime = Math.random() > 0.95 ? "99." + Math.floor(Math.random() * 90 + 10) + "%" : "100.00%";
    
    return {
      name: service.name,
      status: 'online', // Simulated
      uptime: uptime,
      responseTime: `${responseTime}ms`,
      numericResponseTime: responseTime,
      url: service.url
    };
  } catch (error) {
    console.error(`Error checking ${service.name}:`, error);
    
    // In case of error, return offline status
    return {
      name: service.name,
      status: 'offline',
      uptime: 'N/A',
      responseTime: 'N/A',
      numericResponseTime: 0,
      url: service.url
    };
  }
};

// Function to check all services
export const checkAllServices = async (): Promise<{ services: ServiceStatus[], error?: ServiceError }> => {
  try {
    const statusPromises = servicesList.map(service => checkServiceStatus(service));
    const services = await Promise.all(statusPromises);
    
    return { services };
  } catch (error) {
    console.error('Error checking all services:', error);
    
    return { 
      services: [], 
      error: { 
        message: 'Could not fetch service statuses', 
        service: 'Status API' 
      } 
    };
  }
};
