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

  // Función para que el docente agregue un nuevo punto al menú lateral
  const agregarNuevoTema = async () => {
    const nuevoOrden = (lecciones.length + 1).toString();
    const { data, error } = await supabase
      .from('lessons')
      .insert([{ 
        title: "Nuevo Tema Editable", 
        order_index: nuevoOrden,
        course_id: cursoActualId 
      }])
      .select();

    if (!error) setLecciones([...lecciones, data[0]]);
  };
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
        <main style={{ flex: 1, padding: '40px' }}>
        <button onClick={agregarNuevoTema}>+ Agregar Punto al Temario</button>
        
        {subtemaActivo && (
          <div className="editor">
            <h3>Editando Título del Menú:</h3>
            <input 
              value={subtemaActivo.title} 
              onChange={(e) => actualizarTituloEnBaseDeDatos(e.target.value)} 
            />
            {/* Aquí abajo iría el Editor de Contenido (Video/Texto) que ya hicimos */}
          </div>
        )}
      </main>
      </div>
    </div>
  );
};
export default DocenteDashboard;