import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar, lecciones, setSubtemaActivo }) => {
  const [openModulo, setOpenModulo] = useState(true);

  const sidebarContainerStyle = {
    position: 'relative', // Para posicionar el botón de apertura respecto a este contenedor
    height: 'calc(100vh - 70px)',
    backgroundColor: '#1e293b',
    width: isOpen ? '280px' : '0',
    minWidth: isOpen ? '280px' : '0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 50,
  };

  const menuContentStyle = {
    width: '280px',
    padding: '20px',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.2s',
  };

  // Estilo para el botón cuando el menú está CERRADO (image_2e59a4.png)
  const floatingBtnStyle = {
    position: 'absolute',
    left: '20px',
    top: '20px',
    backgroundColor: '#1e293b',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '20px',
    display: isOpen ? 'none' : 'block', // Solo se ve si está cerrado
  };

  return (
    <div style={sidebarContainerStyle}>
      {/* Botón Hamburguesa cuando está CERRADO */}
      <button onClick={toggleSidebar} style={floatingBtnStyle}>
        ☰
      </button>

      {/* Contenido del Sidebar cuando está ABIERTO */}
      <div style={menuContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>NAVEGACIÓN DOCENTE</span>
          <button 
            onClick={toggleSidebar} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}
          >
            ✕
          </button>
        </div>

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
            marginBottom: '10px'
          }}
        >
          <span style={{ fontSize: '13px' }}>MÓDULO I. FUNDAMENTOS</span>
          <span>{openModulo ? '▼' : '▶'}</span>
        </button>

        {openModulo && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {lecciones.map((lec) => (
              <li 
                key={lec.id}
                onClick={() => setSubtemaActivo(lec)}
                style={{
                  padding: '15px 10px',
                  cursor: 'pointer',
                  color: '#cbd5e1',
                  borderBottom: '1px solid #334155',
                  fontSize: '13px',
                  textAlign: 'center'
                }}
              >
                {lec.order_index} {lec.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botón de flecha lateral que se ve en image_2e887d.png */}
      {isOpen && (
        <button 
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            right: '-40px',
            top: '20px',
            backgroundColor: '#1e293b',
            color: 'white',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            padding: '10px',
            cursor: 'pointer'
          }}
        >
          ❮
        </button>
      )}
    </div>
  );
};

export default Sidebar;