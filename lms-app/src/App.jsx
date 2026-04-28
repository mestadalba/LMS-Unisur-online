import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const DocenteDashboard = () => {
  const [cursos, setCursos] = useState([]);

  // Solo cargar cursos creados por este docente
  useEffect(() => {
    const fetchCursos = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('cursos')
        .select('*')
        .eq('instructor_id', user.id); // Asumiendo que guardas quién creó el curso
      setCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de Docente</h1>
      <button onClick={() => {/* Lógica para abrir modal de creación */}}>
        + Crear Nuevo Curso
      </button>

      <section style={{ marginTop: '2rem' }}>
        <h3>Mis Cursos</h3>
        <ul>
          {cursos.map(curso => (
            <li key={curso.id}>{curso.nombre_curso}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DocenteDashboard;