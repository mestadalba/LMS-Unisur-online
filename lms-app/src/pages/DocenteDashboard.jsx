import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProfile } from '../hooks/useProfile';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // 1. Importa el componente
import EditorContenido from '../components/EditorContenido';


const DocenteDashboard = () => {
  const [lecciones, setLecciones] = useState([]); // Importante: inicializar con []
  const [subtemaActivo, setSubtemaActivo] = useState(null);

  // Función para "activar" el Módulo I en la base de datos si no existe
  const crearEstructuraModulo1 = async () => {
    const temasParaInsertar = [
      { order_index: "1.1", title: "Concepto de emoción", content_type: "video" },
      { order_index: "1.2", title: "Diferencia entre emoción y sentimiento", content_type: "texto" },
      { order_index: "1.3", title: "Evolución histórica", content_type: "video" }
    ];

    const { data, error } = await supabase
      .from('lessons')
      .insert(temasParaInsertar.map(t => ({ ...t, course_id: idDelCurso })))
      .select();

    if (data) setLecciones(data);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar 
        lecciones={lecciones} 
        setSubtemaActivo={setSubtemaActivo} 
      />
      <main style={{ flex: 1, padding: '20px' }}>
        {lecciones.length === 0 && (
          <button onClick={crearEstructuraModulo1} style={estiloBotonVerde}>
            Comenzar a editar Módulo I
          </button>
        )}
        {subtemaActivo && <EditorContenido leccion={subtemaActivo} />}
      </main>
    </div>
  );
};
export default DocenteDashboard;