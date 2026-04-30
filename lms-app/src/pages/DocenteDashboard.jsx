// DocenteDashboard.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Sidebar from '../components/Sidebar';
import EditorContenido from '../components/EditorContenido';

const DocenteDashboard = () => {
  const [lecciones, setLecciones] = useState([]);
  const [subtemaActivo, setSubtemaActivo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 1. Cargar las lecciones existentes de Supabase al entrar
  useEffect(() => {
    const fetchLecciones = async () => {
      const { data } = await supabase
        .from('lessons')
        .select('*')
        .order('order_index', { ascending: true });
      if (data) setLecciones(data);
    };
    fetchLecciones();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* El Sidebar ahora recibe la lista dinámica 'lecciones' */}
        <Sidebar 
          isOpen={sidebarOpen} 
          lecciones={lecciones} 
          setSubtemaActivo={setSubtemaActivo} 
        />

        <main style={{ flex: 1, padding: '40px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
          {subtemaActivo ? (
            <EditorContenido 
              leccion={subtemaActivo} 
              onSave={() => {/* Función para refrescar la lista */}}
            />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <h1 className="text-2xl font-bold">Gestor de Módulos</h1>
              <p className="text-gray-500">Selecciona un punto del menú para editar título y contenido.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};