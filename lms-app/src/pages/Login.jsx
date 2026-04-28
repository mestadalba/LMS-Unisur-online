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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data?.user) {
      const userRole = data.user.user_metadata.role;

      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'docente') {
        navigate('/docente-dashboard');
      } else {
        navigate('/dashboard'); // Para alumnos/externos
      }
    }
    setLoading(false);
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