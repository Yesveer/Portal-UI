// Add to your existing api.tsx
const ERP_URL = import.meta.env.VITE_ERP_URL; 

interface Fee {
    _id?: string;
    studentId: string;
    amount: number;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue';
    paymentDate?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  // Create Fees
  export const createFee = async (feeData: Fee): Promise<{ success: boolean; data?: Fee; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const domain = localStorage.getItem('domainName');
      const payload = {
        ...feeData,
        domainName: domain
      };
  
      const response = await fetch(`${ERP_URL}/api/fees/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create fee');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error creating fee:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create fee'
      };
    }
  };
  
  // Update Fees
  export const updateFee = async (
    feeId: string,
    feeData: Partial<Fee>
  ): Promise<{ success: boolean; data?: Fee; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const domain = localStorage.getItem('domainName');
      const payload = {
        ...feeData,
        domainName: domain
      };
  
      const response = await fetch(`${ERP_URL}/api/fees/update/${feeId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update fee');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error updating fee:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update fee'
      };
    }
  };
  
  // Get Fees
  export const getFees = async (
    studentId?: string
  ): Promise<{ success: boolean; data?: Fee[]; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const domain = localStorage.getItem('domainName');
      const url = new URL(`${ERP_URL}/api/fees/getFees`);
      url.searchParams.append('domainName', domain || '');
      if (studentId) {
        url.searchParams.append('studentId', studentId);
      }
  
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch fees');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching fees:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch fees'
      };
    }
  };
  
  // Delete Fee (if needed)
  export const deleteFee = async (feeId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${ERP_URL}/api/fees/${feeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete fee');
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error deleting fee:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to delete fee'
      };
    }
  };
  