


import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchUsers } from '../api/usersApi'
import UsersTable from '../components/UsersTable'
import FiltersBar from '../components/FiltersBar'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('createdAt')

  const { data, isLoading, refetch } = useQuery(
    ['users', page, limit, search, status, sort],
    () => fetchUsers(page, limit, search, status, sort),
    { keepPreviousData: true }
  )

  useEffect(() => {
    refetch()
  }, [page, limit, search, status, sort, refetch])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                Users Management
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and monitor all user accounts in your system
              </p>
            </div>
            
            {/* Stats Summary */}
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 font-medium">Total Users</div>
                <div className="text-2xl font-bold text-gray-900">{data?.total || 0}</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 font-medium">Active</div>
                <div className="text-2xl font-bold text-green-600">
                  {data?.data?.filter((u: any) => u.status === 'active').length || 0}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm">
                <div className="text-xs text-gray-500 font-medium">Inactive</div>
                <div className="text-2xl font-bold text-red-600">
                  {data?.data?.filter((u: any) => u.status === 'inactive').length || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-medium">Total</div>
              <div className="text-xl font-bold text-gray-900">{data?.total || 0}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-medium">Active</div>
              <div className="text-xl font-bold text-green-600">
                {data?.data?.filter((u: any) => u.status === 'active').length || 0}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm text-center">
              <div className="text-xs text-gray-500 font-medium">Inactive</div>
              <div className="text-xl font-bold text-red-600">
                {data?.data?.filter((u: any) => u.status === 'inactive').length || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <FiltersBar
            search={search}
            onSearch={setSearch}
            status={status}
            onStatus={setStatus}
            onLimit={setLimit}
          />
        </div>

        {/* Table Section */}
        <div>
          <UsersTable
            users={data?.data || []}
            total={data?.total || 0}
            page={page}
            limit={limit}
            onPageChange={setPage}
            onSortChange={setSort}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}