
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchUserById, patchUser } from '../api/usersApi'
import EditUserModal from '../components/EditUserModal'

export default function UserDetails() {
  const { id } = useParams()
  const uid = Number(id)
  const qc = useQueryClient()

  const { data: user, isLoading } = useQuery(['user', uid], () => fetchUserById(uid))
  
  const mutation = useMutation((payload: any) => patchUser(uid, payload), {
    onSuccess: (data) => {
      qc.invalidateQueries(['users'])
      qc.setQueryData(['user', uid], data)
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">Loading user...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl text-gray-700 font-semibold">User not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="col-span-1 h-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl h-160 flex flex-col">
              {/* Header Background */}
              <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              
              {/* Profile Content */}
              <div className="relative px-6 pb-6 flex-1 flex flex-col">
                {/* Avatar */}
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="relative">
                    <img 
                      src={user.avatar} 
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      alt={user.name}
                    />
                    {user.status.toLowerCase() === 'active' && (
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
                  <p className="text-gray-600 mb-3 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    {user.email}
                  </p>
                  
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-sm ${
                    user.status.toLowerCase() === 'active' 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                      : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                      user.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                    {user.status}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 flex-1">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">24</p>
                    <p className="text-xs text-gray-500 font-medium">Projects</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-200">
                    <p className="text-2xl font-bold text-purple-600">156</p>
                    <p className="text-xs text-gray-500 font-medium">Tasks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-600">89%</p>
                    <p className="text-xs text-gray-500 font-medium">Complete</p>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="mt-auto">
                  <EditUserModal 
                    user={user} 
                    onSave={(payload: any) => mutation.mutate(payload)} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="col-span-1 md:col-span-2 h-full">
            <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Activity Summary</h3>
              </div>

              {/* Login Stats */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 mb-6 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Logins</p>
                      <p className="text-3xl font-bold text-indigo-600">5</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">This week</p>
                    <p className="text-sm font-semibold text-green-600">+20%</p>
                  </div>
                </div>
              </div>

              {/* Recent Actions */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-800">Recent Actions</h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">Last 5</span>
                </div>
                
                <ul className="space-y-3">
                  {[
                    { action: 'Logged in', icon: '🔑', color: 'from-blue-500 to-cyan-500', time: '2 hours ago' },
                    { action: 'Updated profile', icon: '✏️', color: 'from-purple-500 to-pink-500', time: '5 hours ago' },
                    { action: 'Viewed project', icon: '👁️', color: 'from-green-500 to-emerald-500', time: '1 day ago' },
                    { action: 'Logged out', icon: '🚪', color: 'from-orange-500 to-red-500', time: '1 day ago' },
                    { action: 'Changed preference', icon: '⚙️', color: 'from-indigo-500 to-purple-500', time: '2 days ago' }
                  ].map((item, idx) => (
                    <li key={idx} className="group">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-200">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{item.action}</p>
                          <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}