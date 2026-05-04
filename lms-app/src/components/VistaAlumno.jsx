import { useState } from 'react';

// 1. Declaración limpia del componente (Placeholder)
// Úsalo así solo si NO estás importando ChatIA de otro archivo
const ChatIA = ({ leccionId }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-400">
      <div className="text-4xl mb-3">🤖</div>
      <p className="font-medium">Próximamente: Chat para la lección</p>
      <code className="text-xs bg-slate-100 px-2 py-1 rounded mt-2">{leccionId || 'ID no disponible'}</code>
    </div>
  );
};

const VistaAlumno = ({ leccionActual }) => {
  const [tabActivo, setTabActivo] = useState('contenido');

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        <button 
          onClick={() => setTabActivo('contenido')}
          className={`pb-2 px-4 font-bold transition-all ${tabActivo === 'contenido' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Contenido
        </button>
        <button 
          onClick={() => setTabActivo('chat')}
          className={`pb-2 px-4 font-bold transition-all ${tabActivo === 'chat' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Asistente IA 🤖
        </button>
      </div>

      {/* Contenedor Principal */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
        {tabActivo === 'contenido' ? (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{leccionActual?.title}</h1>
            
            {leccionActual?.content_url && (
              <div className="aspect-video mb-6 rounded-2xl overflow-hidden bg-black">
                <video src={leccionActual.content_url} controls className="w-full h-full" />
              </div>
            )}

            <div className="prose prose-slate max-w-none text-slate-600">
              {leccionActual?.body_text}
            </div>
          </div>
        ) : (
          <div className="h-[500px]">
            {/* Aquí llamamos al componente declarado arriba */}
            <ChatIA leccionId={leccionActual?.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VistaAlumno;