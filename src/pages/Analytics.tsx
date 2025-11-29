import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

const signupData = [
  { day: 'Day-6', count: 2 },
  { day: 'Day-5', count: 4 },
  { day: 'Day-4', count: 6 },
  { day: 'Day-3', count: 3 },
  { day: 'Day-2', count: 5 },
  { day: 'Day-1', count: 8 },
  { day: 'Today', count: 4 }
]

const statusData = [
  { name: 'Active', value: 65 },
  { name: 'Inactive', value: 35 }
]

const COLORS = {
  active: '#10b981',
  inactive: '#ef4444'
}

export default function Analytics() {
  const totalSignups = signupData.reduce((sum, item) => sum + item.count, 0)
  const avgSignups = (totalSignups / signupData.length).toFixed(1)

  return (
    <div className="bg-gray-50 px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-600 rounded-xl">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">Track user signups and activity status</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Signups</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalSignups}</p>
                <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg per Day</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgSignups}</p>
                <p className="text-xs text-gray-500 mt-1">Daily average</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Rate</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{statusData[0].value}%</p>
                <p className="text-xs text-gray-500 mt-1">User engagement</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">User Signups</h3>
                <p className="text-sm text-gray-500 mt-1">Daily signup trends over the last 7 days</p>
              </div>
              <div className="px-3 py-1 bg-blue-50 rounded-md">
                <span className="text-xs font-semibold text-blue-700">7 Days</span>
              </div>
            </div>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={signupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: 600, color: '#111827' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Signups"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">User Status Distribution</h3>
                <p className="text-sm text-gray-500 mt-1">Active vs Inactive users breakdown</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie 
                  data={statusData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={true}
                >
                  <Cell fill={COLORS.active} />
                  <Cell fill={COLORS.inactive} />
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '14px', fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Active Users</h4>
          </div>
          <p className="text-4xl font-bold text-green-600 mb-2">{statusData[0].value}%</p>
          <p className="text-sm text-gray-600">Users actively engaging with the platform</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Inactive Users</h4>
          </div>
          <p className="text-4xl font-bold text-red-600 mb-2">{statusData[1].value}%</p>
          <p className="text-sm text-gray-600">Users who haven't been active recently</p>
        </div>
      </div>
    </div>
  )
}