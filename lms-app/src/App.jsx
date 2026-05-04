import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse';
import Profile from './pages/Profile';
import DocenteDashboard from './pages/DocenteDashboard';
import AlumnosDashboard from "./pages/AlumnosDashboard";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Definimos la función para buscar el rol real en la tabla de la BD
    const fetchUserRole = async (userId) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();

        if (data && !error) {
          console.log("✅ Rol recuperado de la BD:", data.role);
          setUserRole(data.role);
        } else {
          console.error("❌ Error al obtener rol de la tabla profiles:", error);
          setUserRole('alumno'); // Fallback por seguridad
        }
      } catch (err) {
        setUserRole('alumno');
      } finally {
        setLoading(false);
      }
    };

    // 1. Verificación inicial de sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.id); // Llamamos a la BD
      } else {
        setLoading(false);
      }
    });

    // 2. Escucha de cambios (Login / Logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.id); // Llamamos a la BD al cambiar estado
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Bloqueo de renderizado mientras cargamos sesión y rol
  if (loading) return <p className="p-10 text-center">Iniciando sistema...</p>;

  return (
    <Router>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute userRole={userRole} allowedRoles={['alumno', 'docente']} />}>
          <Route path="/docentedashboard" element={<DocenteDashboard />} />
          <Route path="/create-course" element={<CreateCourse />} />
        </Route>

        <Route element={<ProtectedRoute userRole={userRole} allowedRoles={['alumno', 'admin']} />}>
          <Route path="/alumnosdashboard" element={<AlumnosDashboard />} /> 
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* REDIRECCIÓN RAÍZ INTELIGENTE */}
        <Route
          path="/"
          element={
            !session ? (
              <Navigate to="/login" replace />
            ) : (
              userRole === 'admin' ? <Navigate to="/dashboard" replace /> :
              userRole === 'docente' ? <Navigate to="/docentedashboard" replace /> :
              <Navigate to="/alumnosdashboard" replace />
            )
          }
        />

        {/* Catch-all de seguridad */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;