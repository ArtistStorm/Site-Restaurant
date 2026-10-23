import type { AxiosRequestConfig } from 'axios'
import { apiClient } from '@/shared/lib/api'
import type { BlogArticle } from '@/features/blog/types/article'
import type { MenuItem } from '@/features/menu/types/menu'
import type {
  ActivityLogPage,
  AdminDashboard,
  Member,
  MyReview,
  Reservation,
  ReservationDayStat,
  ReviewPage,
  Table,
  TablePage,
} from '@/shared/types/restaurant'

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config)
  return response.data
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const response = await apiClient.post<T>(url, body)
  return response.data
}

async function patch<T>(url: string, body: unknown): Promise<T> {
  const response = await apiClient.patch<T>(url, body)
  return response.data
}

async function put<T>(url: string, body: unknown): Promise<T> {
  const response = await apiClient.put<T>(url, body)
  return response.data
}

async function del<T>(url: string): Promise<T> {
  const response = await apiClient.delete<T>(url)
  return response.data
}

export type AvailableTablesParams = {
  reservationDate: string
  startTime: string
  endTime: string
  guestCount: number
}

export type TableValues = {
  number: number
  capacity: number
  location: string
}

export type ReservationValues = {
  reservationDate: string
  startTime: string
  endTime: string
  guestCount: number
  specialRequest: string
}

export type RegisterValues = {
  name: string
  email: string
  password: string
}

export type LoginValues = {
  email: string
  password: string
}

export type ChangePasswordValues = {
  currentPassword: string
  newPassword: string
}

export type LoginResult = {
  token: string
  memberId: string
}

export type GuestReservationValues = {
  reservationDate: string
  startTime: string
  endTime: string
  guestCount: number
  specialRequest: string
  guestName: string
  guestEmail: string
  guestPhone: string
}

export type BlogArticleValues = {
  title: string
  category: string
  excerpt: string
  author: string
  content: string
}

export type MenuItemValues = {
  title: string
  category: string
  price: number
  description: string
}

export type SubmitReviewValues = {
  rating: number
  comment: string
}

export const restaurantApi = {
  members: {
    get: (memberId: string) => get<Member>(`/members/${memberId}`),
    updateProfile: (memberId: string, name: string) =>
      patch<{ id: string; name: string }>(`/members/${memberId}`, { name }),
    changePassword: (memberId: string, values: ChangePasswordValues) =>
      put<{ changed: boolean }>(`/members/${memberId}/password`, values),
    register: (values: RegisterValues) => post<{ id: string }>('/members', values),
    login: (values: LoginValues) => post<LoginResult>('/login', values),
    logout: () => post<{ loggedOut: boolean }>('/logout', {}),
    reservations: (memberId: string, config?: AxiosRequestConfig) =>
      get<Reservation[]>(`/members/${memberId}/reservations`, config),
  },
  reservations: {
    create: (values: ReservationValues) => post<{ id: string }>('/reservations', values),
    createGuest: (values: GuestReservationValues) =>
      post<{ id: string }>('/reservations/guest', values),
    cancel: (reservationId: string) => del<{ cancelled: boolean }>(`/reservations/${reservationId}`),
  },
  blog: {
    list: () => get<BlogArticle[]>('/blog/articles'),
    get: (articleId: string) => get<BlogArticle>(`/blog/articles/${articleId}`),
  },
  menu: {
    list: () => get<MenuItem[]>('/menu/items'),
  },
  reviews: {
    list: (params: { page: number; pageSize: number }) => get<ReviewPage>('/reviews', { params }),
    mine: async (): Promise<MyReview | null> => (await get<MyReview | null>('/reviews/mine')) || null,
    submit: (values: SubmitReviewValues) =>
      post<{ id: string; created: boolean }>('/reviews', values),
  },
  tables: {
    list: () => get<Table[]>('/tables'),
    available: (params: AvailableTablesParams) => get<Table[]>('/tables/available', { params }),
  },
  admin: {
    dashboard: () => get<AdminDashboard>('/admin/dashboard'),
    tables: (params: { page: number; pageSize: number }) =>
      get<TablePage>('/admin/tables', { params }),
    createTable: (values: TableValues) => post<{ id: string }>('/admin/tables', values),
    setTableActive: (tableId: string, active: boolean) =>
      patch<Table>(`/admin/tables/${tableId}`, { active }),
    reservationStats: () => get<ReservationDayStat[]>('/admin/reservation-stats'),
    logs: (params: { page: number; pageSize: number }) =>
      get<ActivityLogPage>('/admin/logs', { params }),
    deleteReview: (reviewId: string) => del<{ deleted: boolean }>(`/admin/reviews/${reviewId}`),
    replyToReview: (reviewId: string, text: string) =>
      put<{ replied: boolean }>(`/admin/reviews/${reviewId}/reply`, { text }),
    deleteReviewReply: (reviewId: string) =>
      del<{ deleted: boolean }>(`/admin/reviews/${reviewId}/reply`),
    createBlogArticle: (values: BlogArticleValues) => post<BlogArticle>('/admin/blog/articles', values),
    deleteBlogArticle: (articleId: string) => del<{ deleted: boolean }>(`/admin/blog/articles/${articleId}`),
    createMenuItem: (values: MenuItemValues) => post<MenuItem>('/admin/menu/items', values),
    deleteMenuItem: (itemId: string) => del<{ deleted: boolean }>(`/admin/menu/items/${itemId}`),
  },
}
