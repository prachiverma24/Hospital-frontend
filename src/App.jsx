import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import Loader from './components/Loader'
import NavBar from './components/NavBar'
import { useAuth } from './hooks/useAuth'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Search = lazy(() => import('./pages/Search'))
const Book = lazy(() => import('./pages/Book'))
const Appointments = lazy(() => import('./pages/Appointments'))
const Profile = lazy(() => import('./pages/Profile'))
const Records = lazy(() => import('./pages/Records'))

function Protected({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: (
      <Protected>
        <div className="app-layout">
          <NavBar />
          <main className="app-content">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </Protected>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'search', element: <Search /> },
      { path: 'book', element: <Book /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'profile', element: <Profile /> },
      { path: 'records', element: <Records /> }
    ]
  }
])

// Small component to display nested routes under protected layout


export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
