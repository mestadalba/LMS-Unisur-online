import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse'; // Asegúrate de que este archivo exista

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchar cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas Protegidas */}
        <Route 
          path="/dashboard" 
          element={session ? <Dashboard /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/create-course" 
          element={session ? <CreateCourse /> : <Navigate to="/login" />} 
        />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;