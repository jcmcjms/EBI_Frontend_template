import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

// Use lazy load for performance
const Login = lazy(() => import("./pages/auth/login.tsx"));
//const Dashboard = lazy(() => import(); Sample
function App() {
  return (
      <BrowserRouter>
        <Suspense fallback={
          <div className="flex h-screen items-center justify-center">
            //Change to spinner
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          // Wrap future protected routes in AuthGuard component
          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes></Suspense>
      </BrowserRouter>
  )
  }

export default App
