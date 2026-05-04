import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Modulos = ({ course_iduuid, lecciones = [], onLeccionCreada }) => {
const labelStyle = "block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide";
  const inputStyleClass = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200";
  const sectionCard = "bg-white p-6 rounded-2xl border border-slate-100 shadow-sm";

  const [formData, setFormData] = useState({
    title: '',
    content_url: '',
    body_text: '',
    content_type: 'video',
    extra_content: {
      videos_explicativos: ['', ''],
      infografias: ['', ''],
      conceptos_clave: ['', '', '', '', '']
    }
  });

  // 1. ESTA FUNCIÓN FALTABA: Maneja cambios en inputs de texto simples
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (file, type) => {
    if (!file || !course_iduuid) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${course_iduuid}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('course-content')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error subiendo:", uploadError.message);
      return;
    }

    const { data } = supabase.storage.from('course-content').getPublicUrl(filePath);

    if (type === 'video') {
      setFormData(prev => ({ ...prev, content_url: data.publicUrl }));
    } else {
      const newInfografias = [...formData.extra_content.infografias];
      newInfografias[0] = data.publicUrl;
      setFormData(prev => ({
        ...prev,
        extra_content: { ...prev.extra_content, infografias: newInfografias }
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('lessons')
      .insert([{
        course_id: course_iduuid,
        title: formData.title,
        content_url: formData.content_url,
        body_text: formData.body_text,
        content_type: 'video',
        order_index: lecciones.length + 1,
        key_concepts: {
          videos: formData.extra_content.videos_explicativos,
          infografias: formData.extra_content.infografias,
          conceptos: formData.extra_content.conceptos_clave
        }
      }])
      .select();

    if (error) {
      alert("Error: " + error.message);
    } else if (data && onLeccionCreada) {
      onLeccionCreada(data[0]);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-8">
          <h2 className="text-white text-2xl font-bold tracking-tight">Configuración del Módulo</h2>
        </div>

        <form onSubmit={handleSave} className="p-8 bg-slate-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IZQUIERDA */}
            <div className="space-y-6">
              <div className={sectionCard}>
                <div className="mb-4">
                  <label className={labelStyle}>Título</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputStyleClass} />
                </div>

                <div className="mb-4">
                  <label className={labelStyle}>Video (Subir MP4)</label>
                  <input type="file" accept="video/mp4" onChange={(e) => handleFileUpload(e.target.files[0], 'video')} className={inputStyleClass} />
                  <input type="text" name="content_url" value={formData.content_url} placeholder="O pega URL aquí..." onChange={handleChange} className={`${inputStyleClass} mt-2`} />
                </div>

                <div>
                  <label className={labelStyle}>Lectura</label>
                  <textarea name="body_text" value={formData.body_text} onChange={handleChange} className={`${inputStyleClass} h-40 resize-none`}></textarea>
                </div>
              </div>
            </div>

            {/* DERECHA */}
            <div className="space-y-6">
              <div className="bg-blue-600 p-6 rounded-2xl shadow-lg">
                <label className="block text-xs font-bold text-blue-100 uppercase mb-4">Material PDF/Word</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e.target.files[0], 'documento')} className="w-full p-2 bg-blue-700/30 border border-blue-400/30 rounded-xl text-white text-sm mb-4" />
                
                <input 
                  type="text" 
                  placeholder="Video extra URL" 
                  value={formData.extra_content.videos_explicativos[1]} 
                  onChange={(e) => {
                    const newVideos = [...formData.extra_content.videos_explicativos];
                    newVideos[1] = e.target.value;
                    setFormData({...formData, extra_content: {...formData.extra_content, videos_explicativos: newVideos}});
                  }}
                  className="w-full p-3 bg-blue-700/30 border border-blue-400/30 rounded-xl text-white placeholder-blue-200 outline-none" 
                />
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-4">5 Conceptos Clave</label>
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center bg-slate-800 rounded-xl border border-slate-700">
                      <span className="pl-4 pr-2 text-slate-500 text-xs">{i + 1}</span>
                      <input
                        type="text"
                        value={formData.extra_content.conceptos_clave[i]}
                        onChange={(e) => {
                          const newConcepts = [...formData.extra_content.conceptos_clave];
                          newConcepts[i] = e.target.value;
                          setFormData({ ...formData, extra_content: { ...formData.extra_content, conceptos_clave: newConcepts } });
                        }}
                        className="w-full p-3 bg-transparent text-slate-200 text-sm outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end gap-6">
            <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all">
              Guardar Lección
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modulos;