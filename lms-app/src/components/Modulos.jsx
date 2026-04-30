const Modulos = ({ onLeccionCreada }) => {
  const [titulo, setTitulo] = useState('');
  const [orden, setOrden] = useState(''); // Ejemplo: 1.1, 1.2

 // Dentro de Modulos.jsx
const handleCrear = async (e) => {
  e.preventDefault();
  
  const { data, error } = await supabase
    .from('lessons')
    .insert([{ 
      title: titulo, 
      order_index: orden,
      course_id: idDelCurso // Asegúrate de tener este ID
    }])
    .select();

  if (!error && data) {
    onLeccionCreada(data[0]); // <--- ESTO ACTUALIZA EL DASHBOARD Y EL SIDEBAR AL INSTANTE
    setTitulo('');
    setOrden('');
  }
};

  return (
    <form onSubmit={handleCrear} style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h3>Agregar Nuevo Punto al Módulo</h3>
      <input value={orden} onChange={e => setOrden(e.target.value)} placeholder="Ej: 1.1" />
      <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título del tema" />
      <button type="submit">Agregar al Menú</button>
    </form>
  );
};