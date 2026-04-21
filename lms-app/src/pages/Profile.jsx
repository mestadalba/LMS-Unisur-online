import { useProfile } from '../hooks/useProfile';

export default function Profile() {
  const { profile, loading } = useProfile();

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Perfil</h2>

      <p><strong>Nombre:</strong> {profile?.full_name}</p>
      <p><strong>Rol:</strong> {profile?.role}</p>
    </div>
  );
}