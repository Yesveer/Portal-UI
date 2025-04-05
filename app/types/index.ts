export type UserRole = "teacher" | "student" | "accountant" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  class?: string
  section?: string
}

export interface AttendanceRecord {
  id: string
  date: string
  studentId: string
  studentName: string
  class: string
  section: string
  status: "present" | "absent" | "late" | "excused"
  remarks?: string
  markedBy: string
  markedAt: string
}

export interface ClassSession {
  id: string
  subject: string
  class: string
  section: string
  teacher: string
  teacherId: string
  day: string
  startTime: string
  endTime: string
  room: string
}

export interface TimetableEntry {
  id: string
  day: string
  period: number
  startTime: string
  endTime: string
  subject: string
  teacher: string
  room: string
  class?: string
  section?: string
}

export interface ViewMode {
  mode: "grid" | "list"
}

