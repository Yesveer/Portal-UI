const ERP_URL = import.meta.env.VITE_ERP_URL;

export interface Attendance {
  _id: string;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
  remarks?: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  __v: number;
}

export const createAttendance = async (
  attendanceData: Omit<Attendance, '_id' | 'createdAt' | 'createdBy' | '__v'>
): Promise<{ success: boolean; data?: Attendance; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    const domain = localStorage.getItem('domainName');

    if (!token) throw new Error('No authentication token found');

    const payload = {
      ...attendanceData,
      domainName: domain,
    };

    const response = await fetch(`${ERP_URL}/api/attendance/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create attendance');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error creating attendance:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create attendance',
    };
  }
};

export const updateAttendance = async (
  attendanceId: string,
  updatedData: Partial<Omit<Attendance, '_id' | 'createdAt' | 'createdBy' | '__v'>>
): Promise<{ success: boolean; data?: Attendance; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    const domain = localStorage.getItem('domainName');

    if (!token) throw new Error('No authentication token found');

    const payload = {
      ...updatedData,
      domainName: domain,
    };

    const response = await fetch(`${ERP_URL}/api/attendance/${attendanceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update attendance');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error updating attendance:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update attendance',
    };
  }
};

export const fetchAllAttendance = async (): Promise<{ success: boolean; data?: Attendance[]; error?: string }> => {
  try {
    const token = localStorage.getItem('token');
    const domain = localStorage.getItem('domainName');

    if (!token) throw new Error('No authentication token found');

    const url = new URL(`${ERP_URL}/api/attendance/all`);
    url.searchParams.append('domainName', domain || '');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch attendance');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch attendance',
    };
  }
};

export const deleteAttendance = async (
  attendanceId: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${ERP_URL}/api/attendance/${attendanceId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete attendance');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting attendance:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete attendance',
    };
  }
};
