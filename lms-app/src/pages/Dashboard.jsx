import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProfile } from '../hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [fetchingCourses, setFetchingCourses] = useState(true);
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();

  // Lógica para detectar si es administrador
  const isInstructor = profile?.role?.toLowerCase().includes('admin') || 
                       profile?.role?.toLowerCase().includes('administración');

  useEffect(() => {
    fetchCourses();
  }, []);

const fetchCourses = async () => {
  setFetchingCourses(true);
  
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      profiles!instructor_id (
        full_name
      )
    `);

  if (error) {
    console.error("Error cargando cursos:", error);
  } else {
    setCourses(data);
  }
  setFetchingCourses(false);
};

  if (profileLoading || fetchingCourses) return <p>Cargando información...</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Catálogo de Cursos</h1>
        {isInstructor && (
          <button 
            onClick={() => navigate('/create-course')}
            style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            + Crear Nuevo Curso
          </button>
        )}
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {courses.length === 0 ? (
          <p>No hay cursos disponibles todavía.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <img 
                src={course.image_url || 'https://via.placeholder.com/300x150?text=Curso+LMS'} 
                alt={course.title} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{course.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', height: '40px', overflow: 'hidden' }}>{course.description}</p>
                
                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>
                    Docente: <strong>{course.profiles?.full_name || 'Sin asignar'}</strong>
                  </span>
                  <button 
                    style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    Ver Curso
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;