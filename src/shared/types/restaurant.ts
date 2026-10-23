export type Member = {
  id: string
  name: string
  email: string
  role: 'MEMBER' | 'ADMIN'
}

export type Reservation = {
  id: string
  memberId: string
  tableId: string
  reservationDate: string
  startTime: string
  endTime: string
  guestCount: number
  specialRequest?: string
  status: 'CONFIRMED' | 'CANCELLED'
}

export type Table = {
  id: string
  number: number
  capacity: number
  location: string
  active: boolean
}

export type ReservationDayStat = {
  date: string
  reservations: number
}

export type ActivityLog = {
  id: string
  action: string
  memberId: string
  details: string
  createdAt: string
}

export type ActivityLogPage = {
  items: ActivityLog[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type TablePage = {
  items: Table[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ReviewReply = {
  text: string
  repliedAt: string
}

export type ReviewItem = {
  id: string
  authorName: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
  reply: ReviewReply | null
}

export type MyReview = Omit<ReviewItem, 'authorName'>

export type ReviewSummary = {
  average: number | null
  count: number
  ratingCounts: number[]
}

export type ReviewPage = {
  items: ReviewItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  summary: ReviewSummary
}

export type AdminDashboard = {
  todayReservations: number
  upcomingReservations: number
  memberCount: number
  openTables: number
  totalTables: number
  review: {
    average: number | null
    count: number
  }
}
