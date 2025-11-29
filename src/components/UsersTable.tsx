
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../store/slices/usersSlice';

interface UsersTableProps {
  users: User[];
  total: number;
  isLoading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onSortChange: (field: 'name' | 'createdAt') => void;
}

const FALLBACK_AVATAR = 'https://i.pravatar.cc/150?img=0';

const truncate = (text: string | undefined, length: number) => {
  if (!text) return '—';
  return text.length > length ? text.slice(0, length - 3) + '...' : text;
};

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Invalid Date';
  }
};

export default function UsersTable({
  users,
  total,
  isLoading,
  page,
  limit,
  onPageChange,
  onSortChange,
}: UsersTableProps) {
  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Avatar
              </th>
              <th 
                onClick={() => onSortChange('name')}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2">
                  Name
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th 
                onClick={() => onSortChange('createdAt')}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2">
                  Created
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-3"></div>
                    <p className="text-gray-600 font-medium">Loading users...</p>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-gray-600 font-semibold">No users found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={user.avatar || FALLBACK_AVATAR}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_AVATAR;
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {truncate(user.name, 30)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span title={user.email}>{truncate(user.email, 35)}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                      }`}></span>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      to={`/users/${user.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing <span className="font-semibold text-gray-900">{users.length}</span> of <span className="font-semibold text-gray-900">{total}</span> users
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <span className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}