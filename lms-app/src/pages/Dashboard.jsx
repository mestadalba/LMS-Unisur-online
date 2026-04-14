import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    // Consultamos la tabla 'courses' que creamos en el paso anterior
    const { data, error } = await supabase
      .from('courses')
      .select('*');

    if (error) {
      console.error('Error al cargar cursos:', error);
    } else {
      setCourses(data);
    }
    setLoading(false);
  };

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mis Cursos - LMS Unisur</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {courses.length === 0 ? (
          <p>No hay cursos disponibles todavía.</p>
        ) : (
          courses.map(course => (
            <div key={course.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={course.image_url || 'https://via.placeholder.com/150'} 
                alt={course.title} 
                style={{ width: '100%', borderRadius: '4px' }}
              />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Ver curso
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;