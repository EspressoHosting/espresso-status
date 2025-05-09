import { Handler } from '@netlify/functions';

interface ServiceResponse {
  name: string;
  status: 'online' | 'offline';
  uptime: string;
  responseTime: string;
}

export const handler: Handler = async (event) => {
  // Get the URL from query parameters
  const { url } = event.queryStringParameters || {};
  
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing URL parameter" }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    };
  }
  
  try {
    // Record start time for response time calculation
    const startTime = Date.now();
    
    // Make the actual request to check service
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'EspressoHost-StatusChecker/1.0'
      }
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    const serviceResponse: ServiceResponse = {
      name: getServiceName(url),
      status: response.ok ? 'online' : 'offline',
      uptime: response.ok ? '99.99%' : 'N/A',
      responseTime: `${responseTime}ms`
    };
    
    return {
      statusCode: 200,
      body: JSON.stringify(serviceResponse),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    };
  } catch (error) {
    console.error("Error checking service:", error);
    
    return {
      statusCode: 200, // Still return 200 but with offline status
      body: JSON.stringify({
        name: getServiceName(url),
        status: 'offline',
        uptime: 'N/A',
        responseTime: 'N/A'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    };
  }
};

function getServiceName(url: string): string {
  if (url.includes("panel")) return "Game Panel";
  if (url.includes("espressohost.xyz")) return "Main Website";
  return "EU Node";
}