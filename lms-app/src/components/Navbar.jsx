import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ profile }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div style={{
      background: '#111',
      color: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
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
    </div>
  );
}