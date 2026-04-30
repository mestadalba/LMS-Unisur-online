const DocenteDashboard = () => {
  // 1. Definir el estado (esto evita el ReferenceError)
  const [lecciones, setLecciones] = useState([]); 
  const [subtemaActivo, setSubtemaActivo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 2. Cargar los datos de Supabase para que la lista no esté vacía
  useEffect(() => {
    const obtenerDatos = async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (data) setLecciones(data);
      if (error) console.error("Error al cargar lecciones:", error);
    };
    obtenerDatos();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* 3. ENVIAR 'lecciones' al Sidebar como prop */}
        <Sidebar 
          isOpen={sidebarOpen} 
          lecciones={lecciones} 
          setSubtemaActivo={setSubtemaActivo} 
          toggleSidebar={toggleSidebar}
        />
        
        <main style={{ flex: 1, padding: '20px' }}>
          {subtemaActivo ? (
            <EditorContenido leccion={subtemaActivo} />
          ) : (
            <div className="text-center mt-20 text-gray-400">
              Selecciona un tema para comenzar a editar
            </div>
          )}
        </main>
      </div>
    </div>
  );
};