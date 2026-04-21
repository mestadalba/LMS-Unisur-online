// components/Layout.jsx
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-white text-slate-800 font-sans">
      {/* Sidebar al estilo Claude/GPT */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 font-bold text-xl tracking-tight">TAE AI</div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="/dashboard" className="block p-2 hover:bg-slate-200 rounded-lg transition">🔍 Explorar</a>
          <a href="/courses" className="block p-2 hover:bg-slate-200 rounded-lg transition">📚 Mis Cursos</a>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-600 transition">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 md:hidden border-b">
          <span className="font-bold">TAE AI</span>
          {/* Aquí iría un menú hamburguesa para mobile */}
        </header>
        <section className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}