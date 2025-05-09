export interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: string;
  responseTime: string;
  numericResponseTime: number;
  url: string;
}

export interface ServiceError {
  message: string;
  service: string;
}