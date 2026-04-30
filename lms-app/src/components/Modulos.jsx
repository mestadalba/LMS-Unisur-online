import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Modulos = ({ onLeccionCreada }) => {
  const [titulo, setTitulo] = useState('');
  const [orden, setOrden] = useState('');
  const [cargando, setCargando] = useState(false);

  // Dentro de Modulos.jsx
// Dentro de Modulos.jsx
const handleCrear = async (e) => {
  e.preventDefault();
  
  // Limpiamos el objeto para enviar SOLO lo que la tabla 'lessons' acepta
  const nuevaLeccion = {
    title: titulo,
    order_index: parseFloat(orden), // Asegúrate de que sea número si la DB lo pide así
    // course_id: idDelCursoActual // COMENTA ESTO si marca error 400
  };

  const { data, error } = await supabase
    .from('lessons')
    .insert([nuevaLeccion])
    .select();

  if (error) {
    console.error("Detalle del error 400:", error);
    alert("Error de validación: Revisa que los nombres de las columnas coincidan.");
  } else if (data) {
    onLeccionCreada(data[0]);
    setTitulo('');
    setOrden('');
  }
};
  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <form onSubmit={handleCrear} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Orden (Ej: 1.1)</label>
          <input 
            type="text" 
            value={orden} 
            onChange={(e) => setOrden(e.target.value)}
            placeholder="1.1"
            style={inputStyle}
          />
        </div>

        <div style={{ flex: 3 }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Título del Subtema</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Concepto de emoción..."
            style={inputStyle}
          />
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          style={{
            backgroundColor: cargando ? '#94a3b8' : '#3b82f6',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            transition: 'background 0.3s'
          }}
        >
          {cargando ? 'Guardando...' : '+ Agregar al Menú'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  outline: 'none',
  fontSize: '14px'
};

export default Modulos;