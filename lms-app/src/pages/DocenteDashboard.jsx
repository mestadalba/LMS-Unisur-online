import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProfile } from '../hooks/useProfile';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // 1. Importa el componente
import EditorContenido from '../components/EditorContenido';
import Modulos from '../components/Modulos';

// DocenteDashboard.jsx
const DocenteDashboard = () => {
  const [lecciones, setLecciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [subtemaActivo, setSubtemaActivo] = useState(null);

  // ... useEffect para fetchLecciones ...

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar lecciones={lecciones} setSubtemaActivo={setSubtemaActivo} />

        // En el return de DocenteDashboard.jsx
<main style={{ flex: 1, padding: '40px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
  <div style={{ maxWidth: '900px', margin: '0 auto' }}>
    
    {/* Encabezado limpio */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Mis Módulos y Lecciones</h1>
      <button 
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
      >
        {mostrarFormulario ? 'Ver Dashboard' : '+ Nuevo Módulo'}
      </button>
    </div>

    {/* Zona de contenido principal */}
    {mostrarFormulario ? (
      <Modulos onLeccionCreada={manejarNuevaLeccion} />
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {lecciones.map((lec) => (
          <div key={lec.id} style={cardStyle} onClick={() => setSubtemaActivo(lec)}>
            <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>{lec.order_index}</div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '10px' }}>{lec.title}</div>
          </div>
        ))}
      </div>
    )}
  </div>
</main>
      </div>
    </div>
  );
};
export default DocenteDashboard;