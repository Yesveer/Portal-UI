// Mock API functions for payroll management
// In a real application, these would make actual API calls to your backend

// Mock data
const mockPayrollData = [
  {
    _id: "pay1",
    teacherId: "TCH001",
    teacherName: "Jane Smith",
    department: "Mathematics",
    position: "Senior Teacher",
    month: "7",
    year: "2023",
    salary: 3500,
    benefits: 500,
    deductions: 700,
    netAmount: 3300,
    status: "processed",
    processedDate: "2023-07-28T10:30:00.000Z",
    paymentMethod: "Bank Transfer",
    accountDetails: "ACME Bank - ****4567",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "pay2",
    teacherId: "TCH002",
    teacherName: "Mike Johnson",
    department: "Science",
    position: "Head of Department",
    month: "7",
    year: "2023",
    salary: 4500,
    benefits: 800,
    deductions: 900,
    netAmount: 4400,
    status: "processed",
    processedDate: "2023-07-28T11:45:00.000Z",
    paymentMethod: "Bank Transfer",
    accountDetails: "City Bank - ****7890",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "pay3",
    teacherId: "TCH003",
    teacherName: "Sarah Williams",
    department: "Languages",
    position: "Junior Teacher",
    month: "7",
    year: "2023",
    salary: 2800,
    benefits: 300,
    deductions: 550,
    netAmount: 2550,
    status: "pending",
    processedDate: "",
    paymentMethod: "Bank Transfer",
    accountDetails: "National Bank - ****1234",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "pay4",
    teacherId: "TCH001",
    teacherName: "Jane Smith",
    department: "Mathematics",
    position: "Senior Teacher",
    month: "8",
    year: "2023",
    salary: 3500,
    benefits: 500,
    deductions: 700,
    netAmount: 3300,
    status: "pending",
    processedDate: "",
    paymentMethod: "Bank Transfer",
    accountDetails: "ACME Bank - ****4567",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
]

// Filter data based on user role
const filterDataByRole = (data, role, userId) => {
  if (role === "admin") {
    return data // Admin sees all data
  } else if (role === "teacher") {
    // Teachers see only their payroll (assuming teacherId matches userId)
    return data.filter((item) => item.teacherId === userId || userId === "user123")
  }
  return []
}

// Fetch payroll data
export const fetchPayrollData = async (role, userId) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Filter data based on user role
    const filteredData = filterDataByRole(mockPayrollData, role, userId)

    return {
      success: true,
      data: filteredData,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch payroll data",
    }
  }
}

// Create new payroll record
export const createPayrollRecord = async (data) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a POST request to your API
    console.log("Creating payroll record:", data)

    // Add the new entry to our mock data (for demo purposes)
    const newEntry = {
      _id: `pay${mockPayrollData.length + 1}`,
      ...data,
      createdBy: {
        _id: "user1",
        name: "Admin User",
        role: "admin",
      },
    }

    mockPayrollData.push(newEntry)

    return {
      success: true,
      data: newEntry,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to create payroll record",
    }
  }
}

// Update payroll record
export const updatePayrollRecord = async (id, data) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a PUT request to your API
    console.log("Updating payroll record:", id, data)

    // Find and update the entry in our mock data (for demo purposes)
    const index = mockPayrollData.findIndex((item) => item._id === id)
    if (index !== -1) {
      mockPayrollData[index] = {
        ...mockPayrollData[index],
        ...data,
      }
    }

    return {
      success: true,
      data: mockPayrollData[index],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to update payroll record",
    }
  }
}

// Delete payroll record
export const deletePayrollRecord = async (id) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a DELETE request to your API
    console.log("Deleting payroll record:", id)

    // Remove the entry from our mock data (for demo purposes)
    const index = mockPayrollData.findIndex((item) => item._id === id)
    if (index !== -1) {
      mockPayrollData.splice(index, 1)
    }

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to delete payroll record",
    }
  }
}

