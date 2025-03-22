export async function loginUser(credentials: { email: string; password: string; domainName: string}) {
    const ERP_URL = import.meta.env.VITE_ERP_URL; // For Vite
    // const ERP_URL = process.env.REACT_APP_ERP_URL; // For Create React App
  
    if (!ERP_URL) {
      throw new Error('ERP_URL is not defined in environment variables');
    }
  
    const response = await fetch(`${ERP_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json();
  }


  export async function verifyDomain(credentials: { domainName: string }) {
    const ERP_URL = import.meta.env.VITE_ERP_URL; // For Vite
    // const ERP_URL = process.env.REACT_APP_ERP_URL; // For Create React App
  
    if (!ERP_URL) {
      throw new Error('ERP_URL is not defined in environment variables');
    }
  
    const response = await fetch(`${ERP_URL}/api/super-admin/domain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json();
  }
  