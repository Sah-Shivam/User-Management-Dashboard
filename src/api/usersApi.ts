import axios from 'axios'
import { User } from '../store/slices/usersSlice'

const api = axios.create({ baseURL: 'http://localhost:4000' })

export const fetchUsers = async (page = 1, limit = 10, search = '', status = 'all', sort = 'createdAt', order: 'asc' | 'desc' = 'desc') => {
  const params: any = { _page: page, _limit: limit, _sort: sort, _order: order }
  if (search) params.q = search
  if (status !== 'all') params.status = status
  const res = await api.get<User[]>('/users', { params })
  return { data: res.data, total: Number(res.headers['x-total-count'] || res.data.length) }
}

export const fetchUserById = async (id: number) => {
  const res = await api.get<User>(`/users/${id}`)
  return res.data
}

export const patchUser = async (id: number, payload: Partial<User>) => {
  const res = await api.patch<User>(`/users/${id}`, payload)
  return res.data
}
