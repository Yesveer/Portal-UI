const ERP_URL = import.meta.env.VITE_ERP_URL; 

interface Class {
  _id: string;
  name: string;
  section: string;
  description: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  students?: {
    _id: string;
    name: string;
    email: string;
  }[];
  createdAt: string;
  __v: number;
}

export const fetchAllClasses = async (): Promise<{ success: boolean; data?: Class[]; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const domain = localStorage.getItem('domainName');
    const url = new URL(`${ERP_URL}/api/classes/all-class`);
    // url.searchParams.append('domainName', domain || '');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch classes');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching classes:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch classes'
    };
  }
};

export const fetchClassDetails = async (classId: string): Promise<{ success: boolean; data?: Class; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${ERP_URL}/api/classes/${classId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch class details');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching class details:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch class details'
    };
  }
};

export const createClass = async (classData: {
  name: string;
  section: string;
  description: string;
}): Promise<{ success: boolean; data?: Class; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${ERP_URL}/api/classes/create-class`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...classData,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create class');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error creating class:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create class'
    };
  }
};

export const updateClass = async (
  classId: string,
  classData: {
    name: string;
    section: string;
    description: string;
  }
): Promise<{ success: boolean; data?: Class; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${ERP_URL}/api/classes/${classId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update class');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error updating class:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update class'
    };
  }
};

export const deleteClass = async (classId: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${ERP_URL}/api/classes/${classId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete class');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting class:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to delete class'
    };
  }
};


// Add to your existing classApi.tsx
export const addStudentToClass = async (
    classId: string,
    email: string
  ): Promise<{ success: boolean; data?: Class; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${ERP_URL}/api/classes/${classId}/add-student`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add student to class');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error adding student to class:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add student to class'
      };
    }
  };
  
  export const removeStudentFromClass = async (
    classId: string,
    email: string
  ): Promise<{ success: boolean; data?: Class; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${ERP_URL}/api/classes/${classId}/remove-student`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove student from class');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error removing student from class:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to remove student from class'
      };
    }
  };