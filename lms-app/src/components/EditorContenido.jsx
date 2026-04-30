// UBICACIÓN: src/components/EditorContenido.jsx
import { supabase } from '../lib/supabaseClient';

const EditorContenido = ({ leccion }) => {
  // Verificamos que exista la lección seleccionada
  if (!leccion) return <div className="p-10 text-center">Selecciona un tema para editar.</div>;

  const guardarContenido = async (e) => {
    e.preventDefault();
    
    // Aquí capturamos los datos del formulario (puedes usar estados para esto)
    const formData = new FormData(e.target);
    const texto = formData.get('texto');
    const url = formData.get('url');

    const { error } = await supabase
      .from('lessons')
      .update({
        body_text: texto,
        content_url: url,
        // Al usar update, lo guardamos sobre el ID que ya existe
      })
      .eq('id', leccion.id);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("¡Contenido guardado correctamente!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-slate-800">Editando: {leccion.title}</h2>
      <span className="text-sm text-blue-600 font-medium">Orden: {leccion.order_index}</span>
      
      <form onSubmit={guardarContenido} className="mt-6">
        {/* Renderizado condicional basado en el tipo que el docente eligió al crear */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enlace de video (1-3 min):</label>
          <input 
            name="url"
            type="text" 
            defaultValue={leccion.content_url}
            placeholder="Pega el enlace aquí..." 
            className="w-full p-3 border rounded-lg" 
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Contenido de texto (2 cuartillas):</label>
          <textarea 
            name="texto"
            defaultValue={leccion.body_text}
            placeholder="Escribe el contenido aquí..." 
            className="w-full p-3 border rounded-lg h-64" 
          />
        </div>
        
        <button type="submit" className="mt-4 bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors">
          Guardar Avance
        </button>
      </form>
    </div>
  );
};

// ESTO ES LO QUE ARREGLA EL ERROR EN VERCEL
export default EditorContenido;