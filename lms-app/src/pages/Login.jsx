import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData?.user) {
      // 1. Intentamos obtener el rol desde la tabla profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.warn("No se pudo leer la tabla profiles, usando metadata:", profileError.message);
        // Fallback: Si falla la tabla, intentamos usar los metadatos
        const metaRole = authData.user.user_metadata.role;
        dirigirPorRol(metaRole);
      } else {
        dirigirPorRol(profile.role);
      }
    }
  } catch (error) {
    alert("Error de acceso: " + error.message);
  } finally {
    setLoading(false);
  }
};

// Función auxiliar para no repetir código
const dirigirPorRol = (role) => {
  console.log("Navegando como:", role);
  const cleanRole = role?.toLowerCase().trim();

  if (cleanRole === 'admin') {
    navigate('/dashboard');
  } else if (cleanRole === 'docente') {
    navigate('/docentedashboard');
  } else {
    navigate('/alumnosdashboard');
  }
};

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <img src='/logotipo.png' alt='TAE' />
      <h2>TAE | LMS</h2>
      <h3>Iniciar sesiòn</h3>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', margin:'10px', padding: '10px', backgroundColor: '#2D2D3A', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
        >
          {loading ? 'Entrando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;