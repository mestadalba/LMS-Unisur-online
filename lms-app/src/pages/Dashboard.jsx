import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProfile } from '../hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [fetchingCourses, setFetchingCourses] = useState(true);
  const [activeTab, setActiveTab] = useState('tae'); // 'tae' o 'cursos'
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Para el loader del botón
  const [answer, setAnswer] = useState("");              // Para guardar la respuesta de la IA

  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();

  const isInstructor = profile?.role === 'admin';
  const isAlumno = profile?.role === 'alumno'; // Usuario 1
  const isExterno = profile?.role === 'externo'; // Usuario 3

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setAnswer("");

    try {
      // VALIDACIÓN: Forzamos el envío de un JSON limpio
      const { data, error } = await supabase.functions.invoke('tae-search', {
        body: JSON.stringify({ query: searchQuery.trim(), context: courses }), // Enviamos como string para evitar errores de parseo
        headers: { "Content-Type": "application/json" }
      });

      if (error) throw error;

      if (data?.error) {
        setAnswer(`Google respondió: ${data.error}`);
      } else {
        setAnswer(data.answer);
      }

    } catch (err) {
      console.error("Error detallado:", err);
      // Aquí validamos si el error es de red o de la función
      setAnswer("Error al conectar con la IA. Por favor, revisa la consola para más detalles.");
    } finally {
      setIsSearching(false);
    }
  };

  const fetchCourses = async () => {
    setFetchingCourses(true);
    const { data, error } = await supabase
      .from('courses')
      .select(`*, profiles!instructor_id (full_name)`);
    if (!error) setCourses(data);
    setFetchingCourses(false);
  };

  if (profileLoading || fetchingCourses) {
    return <div className="loading-screen">Cargando ecosistema TAE...</div>;
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <Navbar profile={profile} />

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

        {/* SELECTOR DE MODO (TABS) - Estilo Minimalista */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
          <button
            onClick={() => setActiveTab('tae')}
            style={activeTab === 'tae' ? styles.tabActive : styles.tabInactive}
          >
            TAE
          </button>
          <button
            onClick={() => setActiveTab('cursos')}
            style={activeTab === 'cursos' ? styles.tabActive : styles.tabInactive}
          >
            Cursos y Materiales
          </button>
        </div>

        {/* CONTENIDO DINÁMICO */}
        {activeTab === 'tae' ? (
          /* VISTA TIPO CHATGPT / GEMINI */
          <section style={styles.fadeAnim}>
            <div style={{ textAlign: 'center', marginTop: '10vh' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2rem' }}>
                ¿Qué deseas investigar hoy?
              </h2>
              <div style={styles.searchContainer}>
                <textarea
                  placeholder="Pregunta sobre temas fiscales, busca videos o consulta la biblioteca..."
                  style={styles.textArea}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                 <button 
  onClick={handleSearch} // <--- Vinculamos la función aquí
  disabled={isSearching}
>
  {isSearching ? 'Consultando...' : 'Consultar TAE'}
</button>
                </div>
                {/* ESTE BLOQUE MUESTRA LA RESPUESTA EN PANTALLA  */}
                
                {answer && (
                  <div style={{ 
                    marginTop: '2rem', 
                    padding: '2rem', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '16px',
                    border: '1px solid #eee',
                    textAlign: 'left',
                    lineHeight: '1.6'
                  }}>
                    <strong style={{ display: 'block', marginBottom: '10px' }}>TAE Inteligencia:</strong>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>
                  </div>
                )}
              </div>
              <p style={{ color: '#888', fontSize: '0.8rem', mt: '1rem' }}>
                Buscador federado: Interno • Biblioteca Virtual • IA Web
              </p>
            </div>
          </section>
        ) : (
          /* VISTA DE CURSOS (LMS) */
          <section style={styles.fadeAnim}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2>Catálogo para {profile?.role}</h2>
              {isInstructor && (
                <button onClick={() => navigate('/create-course')} style={styles.btnSuccess}>
                  + Cargar Nuevo Contenido
                </button>
              )}
            </div>

            <div style={styles.grid}>
              {courses.map((course) => (
                <div key={course.id} style={styles.card}>
                  <img src={course.image_url || 'https://via.placeholder.com/300x150'} alt="" style={styles.cardImg} />
                  <div style={{ padding: '1.2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                    <p style={styles.cardDesc}>{course.description}</p>
                    <div style={styles.cardFooter}>
                      <span style={{ fontSize: '0.75rem', color: '#999' }}>{course.profiles?.full_name}</span>
                      <button
                        onClick={() => navigate(`/course/${course.id}`)}
                        style={isExterno ? styles.btnOutline : styles.btnSmall}
                      >
                        {isExterno ? 'Previsualizar' : 'Entrar'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// ESTILOS PARA LOOK MINIMALISTA
const styles = {
  tabActive: {
    background: 'none',
    // En lugar de 'border: none', definimos cada lado
    borderTop: '2px solid transparent',
    borderLeft: '2px solid transparent',
    borderRight: '2px solid transparent',
    borderBottom: '2px solid #000', // El borde que sí queremos ver
    paddingBottom: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1.1rem'
  },
  tabInactive: {
    background: 'none',
    // Usamos exactamente las mismas propiedades, pero todas transparentes
    borderTop: '2px solid transparent',
    borderLeft: '2px solid transparent',
    borderRight: '2px solid transparent',
    borderBottom: '2px solid transparent', // Aquí lo "ocultamos" con transparencia
    color: '#aaa',
    paddingBottom: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem'
  },
  searchContainer: {
    border: '1px solid #e0e0e0', borderRadius: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden',
    backgroundColor: '#fff', textAlign: 'left'
  },
  textArea: {
    width: '100%', border: 'none', padding: '20px 24px 0',
    fontSize: '1.1rem', outline: 'none', resize: 'none', height: '100px'
  },
  btnPrimary: {
    backgroundColor: '#000', color: '#fff', border: 'none',
    padding: '10px 24px', borderRadius: '12px', cursor: 'pointer'
  },
  btnSuccess: {
    backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0',
    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500'
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px'
  },
  card: {
    borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden',
    transition: 'transform 0.2s', backgroundColor: '#fff'
  },
  cardImg: { width: '100%', height: '140px', objectFit: 'cover' },
  cardDesc: { color: '#666', fontSize: '0.9rem', height: '40px', overflow: 'hidden', marginBottom: '1rem' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f9f9f9', paddingTop: '1rem' },
  btnSmall: { backgroundColor: '#000', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
  btnOutline: { background: 'none', border: '1px solid #000', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
  fadeAnim: { animation: 'fadeIn 0.5s ease' }
};

export default Dashboard;