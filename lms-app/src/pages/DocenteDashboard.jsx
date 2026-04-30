import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProfile } from '../hooks/useProfile';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // 1. Importa el componente

const DocenteDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useProfile();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [subtemaActivo, setSubtemaActivo] = useState(null);
  const [lecciones, setLecciones] = useState([]); // Los temas que aparecerán en el Sidebar
  const [subtemaActivo, setSubtemaActivo] = useState(null);

  const estructuraModulo1 = {
  "1.1": { tipo: "video", etiqueta: "Concepto de emoción", duracion: "1-2 min" },
  "1.2": { tipo: "texto", etiqueta: "Definición de conceptos", duracion: "2 cuartillas mín." },
  "1.3": { tipo: "video", etiqueta: "Evolución histórica", duracion: "1-3 min" },
  "1.4": { tipo: "infografia", etiqueta: "Modelo de habilidades", duracion: "1 cuartilla min" },
  "1.5": { tipo: "infografia", etiqueta: "Modelo de competencias", duracion: "1 cuartilla min" },
  "1.6": { tipo: "video", etiqueta: "Neurociencia", duracion: "1-3 min" },
  "glosario": { tipo: "conceptos", etiqueta: "Glosario", duracion: "Mínimo 5 conceptos" }
};
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* 1. Navbar siempre arriba */}
      <Navbar profile={profile} />

      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {/* 2. Botón de Control (Icono Hamburguesa) posicionado arriba a la izquierda del contenido */}
        <button 
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            left: sidebarOpen ? '290px' : '10px', // Se mueve con el sidebar
            top: '10px',
            zIndex: 1100,
            background: '#1e293b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            transition: 'left 0.3s ease',
            fontSize: '18px'
          }}
        >
          {sidebarOpen ? '❮' : '☰'}
        </button>

        {/* 3. Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* 4. Contenido Principal */}
        <main style={{ 
          flex: 1, 
          padding: '40px', 
          backgroundColor: '#f8fafc', 
          overflowY: 'auto',
          transition: 'margin-left 0.3s ease',
          marginLeft: sidebarOpen ? '0' : '0' // Puedes ajustar si quieres que el sidebar empuje el contenido
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Panel de Docente</h1>
            
            <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
               <h2 style={{ color: '#64748b' }}>Cursos Activos</h2>
               <p style={{ marginTop: '20px', color: '#94a3b8' }}>Selecciona un tema del menú izquierdo para comenzar.</p>
               {subtemaActivo ? (
    <EditorContenido subtemaId={subtemaActivo} />
  ) : (
    <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
      <p className="text-slate-400">Elige un tema del Módulo 1 para empezar a cargar el contenido sugerido.</p>
    </div>
  )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default DocenteDashboard;