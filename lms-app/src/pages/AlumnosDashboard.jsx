import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import VistaAlumno from '../components/VistaAlumno';

const AlumnosDashboard = () => {
// 1. Agregamos los estados que el Sidebar necesita para no romperse
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lecciones, setLecciones] = useState([]); // Lista vacía inicial
  const [leccionActual, setLeccionActual] = useState({
    id: null,
    title: "Bienvenido al Curso",
    body_text: "Selecciona una lección del menú lateral para comenzar a aprender.",
    content_url: "" 
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Navbar />
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <Sidebar 
                isOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
                lecciones={lecciones} 
                setSubtemaActivo={setLeccionActual} 
                role="alumno"
            /> 

            <main className="flex-1 overflow-y-auto">
                <div className="p-8">

                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Panel de Estudiante</h1>
                    <p className="text-slate-500">Continúa donde lo dejaste</p>
                </header>

                <VistaAlumno leccionActual={leccionActual} />
                </div>
            </main>
            </div>
        </div>
  );
};

export default AlumnosDashboard;