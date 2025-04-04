// Mock API functions for timetable management
// In a real application, these would make actual API calls to your backend

// Mock data
const mockTimetableData = [
  {
    _id: "1",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    subject: "Mathematics",
    teacher: "Mr. Johnson",
    room: "Room 101",
    class: "Class 10A",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "2",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
    subject: "Physics",
    teacher: "Mrs. Smith",
    room: "Lab 3",
    class: "Class 10A",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "3",
    day: "Tuesday",
    startTime: "09:00",
    endTime: "10:30",
    subject: "Chemistry",
    teacher: "Dr. Williams",
    room: "Lab 2",
    class: "Class 10A",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "4",
    day: "Wednesday",
    startTime: "13:00",
    endTime: "14:30",
    subject: "English",
    teacher: "Ms. Davis",
    room: "Room 105",
    class: "Class 10A",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
  {
    _id: "5",
    day: "Thursday",
    startTime: "09:00",
    endTime: "10:30",
    subject: "History",
    teacher: "Mr. Brown",
    room: "Room 201",
    class: "Class 10A",
    createdBy: {
      _id: "user1",
      name: "Admin User",
      role: "admin",
    },
  },
]

// Filter data based on user role
const filterDataByRole = (data, role) => {
  if (role === "admin") {
    return data // Admin sees all data
  } else if (role === "teacher") {
    // Teachers see only their classes
    return data.filter((item) => item.teacher.includes("Mr. Johnson") || item.teacher.includes("Mrs. Smith"))
  } else if (role === "student") {
    // Students see only their class
    return data.filter((item) => item.class === "Class 10A")
  }
  return []
}

// Fetch timetable data
export const fetchTimetableData = async (role) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Filter data based on user role
    const filteredData = filterDataByRole(mockTimetableData, role)

    return {
      success: true,
      data: filteredData,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch timetable data",
    }
  }
}

// Create new timetable entry
export const createTimetableEntry = async (data) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a POST request to your API
    console.log("Creating timetable entry:", data)

    // Add the new entry to our mock data (for demo purposes)
    const newEntry = {
      _id: `${mockTimetableData.length + 1}`,
      ...data,
      createdBy: {
        _id: "user1",
        name: "Admin User",
        role: "admin",
      },
    }

    mockTimetableData.push(newEntry)

    return {
      success: true,
      data: newEntry,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to create timetable entry",
    }
  }
}

// Update timetable entry
export const updateTimetableEntry = async (id, data) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a PUT request to your API
    console.log("Updating timetable entry:", id, data)

    // Find and update the entry in our mock data (for demo purposes)
    const index = mockTimetableData.findIndex((item) => item._id === id)
    if (index !== -1) {
      mockTimetableData[index] = {
        ...mockTimetableData[index],
        ...data,
      }
    }

    return {
      success: true,
      data: mockTimetableData[index],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to update timetable entry",
    }
  }
}

// Delete timetable entry
export const deleteTimetableEntry = async (id) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // In a real app, this would be a DELETE request to your API
    console.log("Deleting timetable entry:", id)

    // Remove the entry from our mock data (for demo purposes)
    const index = mockTimetableData.findIndex((item) => item._id === id)
    if (index !== -1) {
      mockTimetableData.splice(index, 1)
    }

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to delete timetable entry",
    }
  }
}

