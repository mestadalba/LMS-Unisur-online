// UBICACIÓN: Al final de DocenteDashboard.jsx

const EditorContenido = ({ subtemaId }) => {
  const config = estructuraModulo1[subtemaId]; // Lee la configuración que pegamos arriba

  if (!config) return <div className="p-10 text-center">Selecciona un tema para editar.</div>;

const guardarContenido = async (datosDelFormulario) => {
  // 1. Obtener el usuario actual
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Insertar en la tabla 'lessons' vinculándolo al curso actual
  const { data, error } = await supabase
    .from('lessons') 
    .insert([
      {
        course_id: idDelCursoActual, // El ID del curso que el docente está editando
        title: config.etiqueta,
        content_type: config.tipo, // 'video', 'texto', o 'infografia'
        body_text: datosDelFormulario.texto, // Para las 2 cuartillas
        content_url: datosDelFormulario.url, // Para los videos de 1-3 min
        order_index: parseFloat(subtemaId) // Usa 1.1, 1.2 para el orden
      }
    ]);

  if (error) {
    alert("Error al guardar: " + error.message);
  } else {
    alert("¡Contenido del Módulo 1 guardado correctamente!");
  }
};

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-slate-800">Cargar: {config.etiqueta}</h2>
      <span className="text-sm text-blue-600 font-medium">Requisito técnico: {config.duracion}</span>
      
      <div className="mt-6">
        {config.tipo === 'video' && (
          <input type="text" placeholder="Pega el enlace de video aquí..." className="w-full p-3 border rounded-lg" />
        )}
        {config.tipo === 'texto' && (
          <textarea placeholder="Escribe el contenido (2 cuartillas)..." className="w-full p-3 border rounded-lg h-64" />
        )}
        {/* ... resto de los inputs ... */}
      </div>
      
      <button className="mt-4 bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors">
        Guardar Avance
      </button>
    </div>
  );
};