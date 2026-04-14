import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return alert("No se encontró el perfil del docente");

    const { error } = await supabase
      .from('courses')
      .insert([
        { 
          title, 
          description, 
          image_url: imageUrl, 
          instructor_id: profile.id 
        }
      ]);

    if (error) {
      alert("Error al crear curso: " + error.message);
    } else {
      alert("¡Curso publicado con éxito!");
      navigate('/dashboard'); // Regresa al dashboard para ver el nuevo curso
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <button onClick={() => navigate('/dashboard')}>⬅ Volver</button>
      <h2>Panel de Instructor: Crear Curso</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Título del curso (ej: React Básico)" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <textarea 
          placeholder="Descripción del curso" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px', height: '100px' }}
        />
        <input 
          type="text" 
          placeholder="URL de la imagen de portada" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Publicar Curso ahora
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;