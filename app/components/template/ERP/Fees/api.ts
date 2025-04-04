// Mock API functions for fees management
// In a real application, these would make actual API calls to your backend

// Mock data
const mockFeesData = [
  {
    _id: "fee1",
    studentId: "STU001",
    studentName: "Alice Johnson",
    class: "Class 10A",
    feeType: "Tuition Fee",
    amount: 1500,
    dueDate: "2023-07-15",
    status: "paid",
    paymentHistory: [
      {
        _id: "pay1",
        amount: 1500,
        date: "2023-07-10",
        method: "Credit Card",
        reference: "CC123456789",
      },
    ],
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "fee2",
    studentId: "STU001",
    studentName: "Alice Johnson",
    class: "Class 10A",
    feeType: "Exam Fee",
    amount: 300,
    dueDate: "2023-08-20",
    status: "pending",
    paymentHistory: [],
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "fee3",
    studentId: "STU002",
    studentName: "Bob Smith",
    class: "Class 9B",
    feeType: "Library Fee",
    amount: 100,
    dueDate: "2023-06-30",
    status: "overdue",
    paymentHistory: [],
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "fee4",
    studentId: "STU003",
    studentName: "Charlie Brown",
    class: "Class 11C",
    feeType: "Tuition Fee",
    amount: 1500,
    dueDate: "2023-07-15",
    status: "partial",
    paymentHistory: [
      {
        _id: "pay2",
        amount: 750,
        date: "2023-07-05",
        method: "Bank Transfer",
        reference: "BT987654321",
      },
    ],
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
  } else if (role === "student") {
    // Students see only their fees (assuming studentId matches userId)
    return data.filter((item) => item.studentId === userId || userId === "user123")
  }
  return []
}

// Fetch fees data
export const fetchFeesData = async (role, userId) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Filter data based on user role
    const filteredData = filterDataByRole(mockFeesData, role, userId)

    return {
      success: true,
      data: filteredData,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch fees data",
    }
  }
}

// Create new fee record
export const createFeeRecord = async (data) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a POST request to your API
    console.log("Creating fee record:", data)

    // Add the new entry to our mock data (for demo purposes)
    const newEntry = {
      _id: `fee${mockFeesData.length + 1}`,
      ...data,
      paymentHistory: [],
      createdBy: {
        _id: "user1",
        name: "Admin User",
        role: "admin",
      },
    }

    mockFeesData.push(newEntry)

    return {
      success: true,
      data: newEntry,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to create fee record",
    }
  }
}

// Update fee record
export const updateFeeRecord = async (id, data) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a PUT request to your API
    console.log("Updating fee record:", id, data)

    // Find and update the entry in our mock data (for demo purposes)
    const index = mockFeesData.findIndex((item) => item._id === id)
    if (index !== -1) {
      mockFeesData[index] = {
        ...mockFeesData[index],
        ...data,
      }
    }

    return {
      success: true,
      data: mockFeesData[index],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to update fee record",
    }
  }
}

// Delete fee record
export const deleteFeeRecord = async (id) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a DELETE request to your API
    console.log("Deleting fee record:", id)

    // Remove the entry from our mock data (for demo purposes)
    const index = mockFeesData.findIndex((item) => item._id === id)
    if (index !== -1) {
      mockFeesData.splice(index, 1)
    }

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to delete fee record",
    }
  }
}

// Record payment for fee
export const recordFeePayment = async (id, paymentData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a POST request to your API
    console.log("Recording payment for fee:", id, paymentData)

    // Find the fee record
    const feeIndex = mockFeesData.findIndex((item) => item._id === id)
    if (feeIndex !== -1) {
      const fee = mockFeesData[feeIndex]

      // Add payment to payment history
      const newPayment = {
        _id: `pay${Date.now()}`,
        ...paymentData,
      }
      fee.paymentHistory.push(newPayment)

      // Calculate total paid amount
      const totalPaid = fee.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)

      // Update fee status based on payment
      if (totalPaid >= fee.amount) {
        fee.status = "paid"
      } else if (totalPaid > 0) {
        fee.status = "partial"
      }

      // Update the fee in our mock data
      mockFeesData[feeIndex] = fee
    }

    return {
      success: true,
      data: mockFeesData[feeIndex],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to record payment",
    }
  }
}

