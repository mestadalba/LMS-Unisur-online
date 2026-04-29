import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
 const [openModulo, setOpenModulo] = useState(false); // Inicia cerrado
  const temario = [
    "1.1 Concepto de emoción: bases biológicas y psicológicas",
    "1.2 Diferencia entre emoción, sentimiento y estado de ánimo",
    "1.3 Evolución histórica de la Inteligencia Emocional",
    "1.4 Modelo de habilidades de Salovey y Mayer",
    "1.5 Modelo de competencias de Daniel Goleman",
    "1.6 Neurociencia de las emociones"
  ];

  // Estilo para el contenedor lateral (se oculta a la izquierda)
const sidebarStyle = {
  width: '280px',
  height: 'calc(100vh - 64px)', // Resta la altura aproximada de la Navbar
  backgroundColor: '#1e293b',
  color: 'white',
  position: 'absolute',
  top: '0', // Inicia justo donde termina la Navbar en el contenedor flex
  left: isOpen ? '0' : '-280px',
  transition: 'left 0.3s ease',
  zIndex: 1000,
  padding: '20px',
  boxSizing: 'border-box',
  boxShadow: isOpen ? '5px 0 15px rgba(0,0,0,0.2)' : 'none'
};

  return (
    <aside style={sidebarStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>
          Navegación Docente
        </h2>
        {/* Botón para cerrar en móvil */}
        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px', display: window.innerWidth < 768 ? 'block' : 'none' }}>
          ✕
        </button>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={() => setOpenModulo(!openModulo)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#334155',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textAlign: 'left'
          }}
        >
          <span style={{ fontSize: '13px' }}>MÓDULO I. FUNDAMENTOS</span>
          <span>{openModulo ? '▼' : '▶'}</span>
        </button>

        {openModulo && (
          <ul style={{ listStyle: 'none', padding: '10px 0 0 10px', margin: 0 }}>
            {temario.map((tema, index) => (
              <li key={index} style={{
                fontSize: '13px',
                color: '#cbd5e1',
                padding: '10px 0',
                borderBottom: '1px solid #334155',
                cursor: 'pointer'
              }}>
                {tema}
              </li>
            ))}
            <li style={{ color: '#fbbf24', fontWeight: 'bold', paddingTop: '15px', cursor: 'pointer', fontSize: '13px' }}>
              ✨ GLOSARIO
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;