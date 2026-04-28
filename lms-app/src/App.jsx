import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse';
import Profile from './pages/Profile';
import DocenteDashboard from './pages/DocenteDashboard'; // Verifica que el archivo exista en esa ruta

// Componente para proteger rutas
function PrivateRoute({ session, children }) {
  return session ? children : <Navigate to="/login" />;
}

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Cargando app...</p>;

  return (
    <Router>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute session={session}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/docentedashboard" 
        element={
          <PrivateRoute session={session}>
            <DocenteDashboard />
          </PrivateRoute>
          } 
        />

        <Route
          path="/create-course"
          element={
            <PrivateRoute session={session}>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute session={session}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to={session ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;