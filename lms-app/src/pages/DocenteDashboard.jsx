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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ... useEffect para fetchLecciones ...
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
        <Sidebar 
          isOpen={sidebarOpen} 
          lecciones={lecciones} 
          setSubtemaActivo={setSubtemaActivo} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        <main style={{ flex: 1, overflowY: 'auto', padding: '0px 20px' }}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden', width: 'auto' }}>
            
           {/* Contenedor Principal Ajustado */}
<main style={{ 
  flex: 1, 
  backgroundColor: '#f8fafc', 
  overflowY: 'auto',
  transition: 'margin-left 0.3s ease', // Suaviza el movimiento cuando el sidebar abre/cierra
  marginLeft: sidebarOpen ? '0' : '60px' // Deja espacio para la hamburguesa cuando el sidebar está cerrado
}}>
  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
    
    {/* Cabecera: Título y Botón de Acción */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '30px',
      marginTop: sidebarOpen ? '0' : '20px' // Baja un poco el contenido si el sidebar está cerrado para no chocar con el botón
    }}>
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Mis Módulos y Lecciones
        </h1>
        <p className="text-slate-500 mt-1">Gestiona el contenido de tus cursos activos.</p>
      </div>

      <button 
        onClick={() => {
          setMostrarFormulario(!mostrarFormulario);
          setSubtemaActivo(null); // <--- ESTO OCULTA EL EDITOR AL CAMBIAR AL FORMULARIO
        }}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
      >
        {mostrarFormulario ? 'Ver Mis Módulos' : '+ Crear Nuevo Módulo'}
      </button>
    </div>

    {/* Grid de Lecciones Estilo Card (image_2dac3d.png) */}
    {mostrarFormulario ? (
      <Modulos onLeccionCreada={(nueva) => {
        const nuevasLecciones = [...lecciones, nueva].sort((a, b) => a.order_index - b.order_index);
        setLecciones(nuevasLecciones);
        setMostrarFormulario(false);
      }} />
    ) : (
      <div style={{ 
        display: 'contents', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 2fr))', 
        gap: '15px' 
      }}>
        {lecciones.length > 0 ? (
          lecciones.map((lec) => (
            <div 
              key={lec.id} 
              onClick={() => setSubtemaActivo(lec)}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between items-start">
                <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
                  Lección {lec.order_index}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                
              <h3 className="text-xl font-bold text-slate-800 mt-4 leading-tight">
                {lec.title}
              </h3>
              </div>
              
              
              <div className="mt-6 flex items-center text-slate-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Contenido multimedia
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <p className="text-slate-500 font-medium">No hay lecciones en la base de datos.</p>
            <button 
              onClick={() => setMostrarFormulario(true)} 
              className="text-blue-600 font-bold mt-2 hover:underline"
            >
              Crea la primera ahora mismo
            </button>
          </div>
        )}
      </div>
    )}

    {/* Espacio para el Editor */}
    {subtemaActivo && (
      <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center mb-6">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="mx-4 text-slate-400 text-sm font-bold uppercase tracking-widest">Editando Contenido</span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <EditorContenido leccion={subtemaActivo} />
      </div>
    )}
  </div>
</main>
          </div>
        </main>
      </div>
    </div>
  );
};
export default DocenteDashboard;