const ERP_URL = import.meta.env.VITE_ERP_URL; 

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    createdBy: {
      _id: string;
      name: string;
      email: string;
    };
    createdAt: string;
    __v: number;
  }
  

export const createEvent = async (eventData: Event): Promise<{ success: boolean; data?: Event; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const domain = localStorage.getItem('domainName');
    const payload = {
      ...eventData,
      domainName: domain
    };

    const response = await fetch(`${ERP_URL}/api/events/create-event`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create event');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error creating event:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create event'
    };
  }
};

// Add to your existing api.tsx
export const updateEvent = async (
    eventId: string,
    eventData: {
      title: string;
      description: string;
      date: string;
      location: string;
    }
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const domain = localStorage.getItem('domainName');
      const payload = {
        ...eventData,
        domainName: domain
      };
  
      const response = await fetch(`${ERP_URL}/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update event');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error updating event:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update event'
      };
    }
  };


  export const fetchAllEvents = async (): Promise<{ success: boolean; data?: Event[]; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const domain = localStorage.getItem('domainName');
      const url = new URL(`${ERP_URL}/api/events/all-event`);
      url.searchParams.append('domainName', domain || '');

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch events');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch events'
      };
    }
};
  
  export const deleteEvent = async (eventId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${ERP_URL}/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete event');
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error deleting event:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to delete event'
      };
    }
  };