const FormularioNuevaLeccion = ({ onLeccionCreada }) => {
  const [titulo, setTitulo] = useState('');
  const [orden, setOrden] = useState(''); // Ejemplo: 1.1, 1.2

  const handleCrear = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('lessons')
      .insert([{ 
        title: titulo, 
        order_index: orden,
        course_id: idDelCursoActual // ID vinculado al curso que manejas
      }])
      .select();

    if (!error && data) {
      onLeccionCreada(data[0]); // Avisa al Dashboard que hay algo nuevo
      setTitulo(''); setOrden('');
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
// Sidebar.jsx
const Sidebar = ({ lecciones, setSubtemaActivo }) => {
  return (
    <aside className="bg-slate-900 text-white w-72">
      <div className="p-4">
        <h2 className="text-gray-400 text-xs uppercase">Navegación Docente</h2>
        
        {/* Este botón ahora solo es el encabezado del acordeón */}
        <div className="mt-4 p-2 bg-slate-800 rounded">
          MÓDULO I. FUNDAMENTOS
        </div>

        <ul className="mt-2">
          {lecciones.length > 0 ? (
            lecciones.map((lec) => (
              <li 
                key={lec.id} 
                onClick={() => setSubtemaActivo(lec)}
                className="p-2 hover:bg-slate-700 cursor-pointer text-sm border-b border-slate-800"
              >
                {lec.order_index} {lec.title}
              </li>
            ))
          ) : (
            <li className="p-2 text-xs text-gray-500 italic">
              Haz clic en "Comenzar" para generar los subtemas...
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;