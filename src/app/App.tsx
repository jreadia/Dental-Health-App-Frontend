import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/user/UploadPage";
import ResultPage from "./pages/user/ResultPage";
import { LoginPage } from "./pages/user/LoginPage";
import { SignupPage } from "./pages/user/SignupPage";
import { SuccessPage } from "./pages/user/SuccessPage";
import { LoadingPage } from "./pages/user/LoadingPage";
import { Homepage } from "./pages/user/Homepage";
import AdminPage from "./pages/admin/AdminPage";
import { AdminUserScans } from "./pages/admin/AdminUserScans";
import { AdminLoginScreen } from "./pages/admin/AdminLoginScreen";



function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/homepage" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        
        <Route path="/homepage" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
        
        <Route path="/upload" element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        } />
        
        <Route path="/results" element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        } />

        <Route path="/admin-login" element={<AdminLoginScreen />} />
        
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminPage />
          </ProtectedRoute>
        } />

        <Route path="/admin/users/:userId/scans" element={
          <ProtectedRoute adminOnly>
            <AdminUserScans />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}