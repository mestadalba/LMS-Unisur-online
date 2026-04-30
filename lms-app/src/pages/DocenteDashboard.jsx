// DocenteDashboard.jsx
const DocenteDashboard = () => {
  const [lecciones, setLecciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [subtemaActivo, setSubtemaActivo] = useState(null);

  // ... useEffect para fetchLecciones ...

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar lecciones={lecciones} setSubtemaActivo={setSubtemaActivo} />

        <main style={{ flex: 1, padding: '40px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <h1 className="text-2xl font-bold">Mis Módulos y Lecciones</h1>
              <button 
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {mostrarFormulario ? 'Ver Mis Módulos' : '+ Crear Nuevo Módulo/Lección'}
              </button>
            </div>

            {mostrarFormulario ? (
              <Modulos onLeccionCreada={(nueva) => {
                setLecciones([...lecciones, nueva]);
                setMostrarFormulario(false);
              }} />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {lecciones.length > 0 ? (
                  lecciones.map((lec) => (
                    <div 
                      key={lec.id} 
                      onClick={() => setSubtemaActivo(lec)}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <span className="text-blue-500 font-bold text-sm">{lec.order_index}</span>
                      <h3 className="text-lg font-semibold text-slate-800 mt-2">{lec.title}</h3>
                      <p className="text-gray-400 text-xs mt-4">Haz clic para editar contenido multimedia</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">No hay lecciones en la base de datos.</p>
                    <button onClick={() => setMostrarFormulario(true)} className="text-blue-500 font-medium mt-2">
                      Crea la primera ahora mismo
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Si hay un subtema seleccionado, mostramos el editor de contenido (videos/texto) abajo */}
            {subtemaActivo && (
              <div className="mt-10 pt-10 border-t">
                <EditorContenido leccion={subtemaActivo} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};