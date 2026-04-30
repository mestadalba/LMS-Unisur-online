import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProfile } from '../hooks/useProfile';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // 1. Importa el componente
import EditorContenido from '../components/EditorContenido';
import Modulos from '../components/Modulos';

const DocenteDashboard = () => {
  const [lecciones, setLecciones] = useState([]); // Importante: inicializar con []
  const [subtemaActivo, setSubtemaActivo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Cargar lecciones al inicio
  useEffect(() => {
    fetchLecciones();
  }, []);
  
 const fetchLecciones = async () => {
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setLecciones(data);
  };

  // Esta función se activará cuando Modulos cree una lección
  const manejarNuevaLeccion = (nuevaLeccion) => {
    setLecciones((prev) => [...prev, nuevaLeccion]);
  };

 return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* El Sidebar ahora recibe la lista que se actualiza sola */}
        <Sidebar 
          isOpen={sidebarOpen} 
          lecciones={lecciones} 
          setSubtemaActivo={setSubtemaActivo} 
        />

        <main style={{ flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* 1. USAMOS EL COMPONENTE MODULOS AQUÍ ABAJO */}
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                Configuración de Estructura
              </h2>
              <Modulos onLeccionCreada={manejarNuevaLeccion} />
            </section>
 
            <hr style={{ margin: '40px 0', borderColor: '#e2e8f0' }} />

            {/* 2. EDITOR DE CONTENIDO (Video/Texto) */}
            <section>
              {subtemaActivo ? (
                <EditorContenido leccion={subtemaActivo} />
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
                  <p style={{ color: '#94a3b8' }}>
                    Selecciona un tema en el menú izquierdo para cargar su contenido multimedia.
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );  
};
export default DocenteDashboard;