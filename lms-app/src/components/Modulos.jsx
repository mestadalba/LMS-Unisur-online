import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Modulos = ({ onLeccionCreada }) => {
// Clases reutilizables para mantener consistencia
  const labelStyle = "block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide";
  const inputStyle = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200";
  const sectionCard = "bg-white p-6 rounded-2xl border border-slate-100 shadow-sm";

  const [formData, setFormData] = useState({
    title: '',
    content_url: '', // Video principal (Introducción)
    body_text: '',    // Texto/Lectura de bases
    content_type: 'video',
    estimated_duration: '',
    // Usaremos este objeto para mapear al campo JSONB 'key_concepts'
    extra_content: {
      videos_explicativos: ['', '', ''],
      infografias: ['', ''],
      conceptos_clave: ['', '', '', '', '']
    }
  });
  // Dentro de Modulos.jsx
  const handleSave = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('lessons')
      .insert([{
        course_id: id_del_curso,
        title: formData.title,
        content_url: formData.content_url, // Intro Video
        body_text: formData.body_text,     // Lectura
        content_type: 'multi-modular',
        order_index: lecciones.length + 1,
        // Guardamos todo lo extra en el campo JSONB
        key_concepts: {
          videos: formData.extra_content.videos_explicativos,
          infografias: formData.extra_content.infografias,
          conceptos: formData.extra_content.conceptos_clave
        }
      }]);

    if (!error) {
      onLeccionCreada(data[0]);
    }
  };
  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Encabezado del Formulario */}
        <div className="bg-slate-900 p-8">
          <h2 className="text-white text-2xl font-bold tracking-tight">Configuración del Módulo</h2>
          <p className="text-slate-400 text-sm mt-1">Ingresa el contenido multimedia y pedagógico de la lección.</p>
        </div>

        <form className="p-8 bg-slate-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            
            {/* COLUMNA IZQUIERDA: Contenido Principal */}
            <div className="space-y-6">
              <div className={sectionCard}>
                <div className="mb-4">
                  <label className={labelStyle}>Título de la Lección</label>
                  <input type="text" placeholder="Ej. 1.1 Concepto de emoción" className={inputStyle} />
                </div>

                <div className="mb-4">
                  <label className={labelStyle}>Introducción (Video URL)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      🎬
                    </div>
                    <input type="text" placeholder="https://youtube.com/..." className={`${inputStyle} pl-10`} />
                  </div>
                </div>

                <div>
                  <label className={labelStyle}>Texto de Definición (Lectura)</label>
                  <textarea 
                    placeholder="Escribe aquí las bases biológicas y psicológicas..." 
                    className={`${inputStyle} h-40 resize-none`}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Material y Conceptos */}
            <div className="space-y-6">
              
              {/* Material Complementario */}
              <div className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-200">
                <label className="block text-xs font-bold text-blue-100 uppercase mb-4">Material Complementario</label>
                <div className="space-y-3">
                  <input type="text" placeholder="Video explicativo 1" className="w-full p-3 bg-blue-700/30 border border-blue-400/30 rounded-xl text-white placeholder-blue-200 outline-none focus:bg-blue-700/50 transition-all" />
                  <input type="text" placeholder="Video explicativo 2" className="w-full p-3 bg-blue-700/30 border border-blue-400/30 rounded-xl text-white placeholder-blue-200 outline-none focus:bg-blue-700/50 transition-all" />
                  <input type="text" placeholder="URL Infografía" className="w-full p-3 bg-blue-700/30 border border-blue-400/30 rounded-xl text-white placeholder-blue-200 outline-none focus:bg-blue-700/50 transition-all" />
                </div>
              </div>

              {/* 5 Conceptos Clave */}
              <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-4">5 Conceptos Clave (Mínimo)</label>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-blue-500 transition-colors">
                      <span className="pl-4 pr-2 text-slate-500 font-mono text-xs">{i}</span>
                      <input 
                        type="text" 
                        placeholder={`Concepto clave ${i}`} 
                        className="w-full p-3 bg-transparent text-slate-200 text-sm outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end items-center gap-6">
            <button type="button" className="text-slate-400 font-bold hover:text-slate-600 transition-colors">
              Descartar
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all"
            >
              Guardar Lección
            </button>
          </div>
        </form>
      </div>
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