import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ profile }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav style={{
      height: '70px',
      backgroundColor: '#000',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 1000,
      flexwrap: 'wrap',
      justifyContent: 'space-between'
    }}>
      <h3 style={{ margin: 0 }}> TAE | LMS</h3>

      <div style={{ display: 'flex', gap: '20px' }}>
        <span onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
          Perfil
        </span>

        {profile?.role === 'admin' && (
          <span onClick={() => navigate('/create-course')} style={{ cursor: 'pointer' }}>
            Cursos
          </span>
        )}

        <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Cerrar sesión
        </span>
      </div>
    </nav>
  );
}