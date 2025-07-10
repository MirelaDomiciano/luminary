import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import SeriesPage from './pages/SeriesPage'
import RecommendationsPage from './pages/RecommendationsPage'
import ReviewsPage from './pages/ReviewsPage'
import CreateContentPage from './pages/CreateContentPage'
import ContentDetailsPage from './pages/ContentDetailsPage'
import EditContentPage from './pages/EditContentPage'
import AuthGuard from './components/AuthGuard'
import PublicRoute from './components/PublicRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      } />
      <Route path="/home" element={
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      } />
      <Route path="/signup" element={
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      } />
      <Route path="/signin" element={
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      } />
      <Route path="/recommendations" element={
        <AuthGuard>
          <RecommendationsPage />
        </AuthGuard>
      } />
      <Route path="/my-list" element={
        <AuthGuard>
          <RecommendationsPage />
        </AuthGuard>
      } />
      <Route path="/movies" element={
        <AuthGuard>
          <MoviesPage />
        </AuthGuard>
      } />
      <Route path="/series" element={
        <AuthGuard>
          <SeriesPage />
        </AuthGuard>
      } />
      <Route path="/reviews" element={
        <AuthGuard>
          <ReviewsPage />
        </AuthGuard>
      } />
      <Route path="/create-content" element={
        <AuthGuard>
          <CreateContentPage />
        </AuthGuard>
      } />
      <Route path="/content/:id" element={
        <AuthGuard>
          <ContentDetailsPage />
        </AuthGuard>
      } />
      <Route path="/edit-content/:id" element={
        <AuthGuard>
          <EditContentPage />
        </AuthGuard>
      } />
    </Routes>
  )
}

export default App
