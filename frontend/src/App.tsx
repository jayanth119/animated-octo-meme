import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useSocket } from './hooks/useSocket';

// Lazy load pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import SmoothScroll from './components/SmoothScroll';

function App() {
  const { isAuthenticated } = useAuthStore();
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('notification', (data: any) => {
        toast.success(data.message, {
          duration: 5000,
          position: 'top-right',
        });
        // Dispatch global custom event for real-time list synchronization
        window.dispatchEvent(new CustomEvent('socket-notification', { detail: data }));
      });
    }
  }, [socket]);

  return (
    <SmoothScroll>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SmoothScroll>
  );
}

export default App;
