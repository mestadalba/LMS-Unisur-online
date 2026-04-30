import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProfile } from '../hooks/useProfile';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // 1. Importa el componente

const DocenteDashboard = () => {
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

  return (
    <div style={{ display: 'flex' }}>
      {/* El Sidebar ahora muestra lo que está en el estado 'lecciones' */}
      <Sidebar 
        lecciones={lecciones} 
        setSubtemaActivo={setSubtemaActivo} 
      />

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
  );
};
export default DocenteDashboard;