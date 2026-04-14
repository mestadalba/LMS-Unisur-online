import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// Nota: Puedes crear un componente Login similar al de Register
// import Login from './pages/Login'; 

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Revisar si hay una sesión activa al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchar cambios en el estado de autenticación (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Ruta pública: Registro */}
        <Route path="/register" element={<Register />} />
        
        {/* Ruta protegida: Solo si hay sesión va al Dashboard, si no al Register */}
        <Route 
          path="/dashboard" 
          element={session ? <Dashboard /> : <Navigate to="/register" />} 
        />

        {/* Ruta por defecto: Redirige al Dashboard (que a su vez checa sesión) */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;