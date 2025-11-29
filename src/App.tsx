import React, { Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CssBaseline, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LoadingSkeleton from './components/LoadingSkeleton'

const UsersPage = lazy(() => import('./pages/Users'))
const UserDetailsPage = lazy(() => import('./pages/UserDetails'))
const AnalyticsPage = lazy(() => import('./pages/Analytics'))

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar className="flex justify-between">
          <div className="flex items-center gap-4">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography component={Link} to="/" className="no-underline text-white">Dashboard</Typography>
            <Link to="/users" className="ml-4 text-white no-underline">Users</Link>
            <Link to="/analytics" className="ml-4 text-white no-underline">Analytics</Link>
          </div>

        </Toolbar>
      </AppBar>
      <main className="p-4">
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
