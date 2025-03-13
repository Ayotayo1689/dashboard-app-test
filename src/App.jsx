import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { ThemeProvider } from "./components/theme-provider"
import LoadingSpinner from "./components/LoadingSpinner"
import ProtectedRoute from "./components/ProtectedRoute"

// Lazy load pages for code splitting
const Login = lazy(() => import("./pages/Login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const NotFound = lazy(() => import("./pages/NotFound"))

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App

