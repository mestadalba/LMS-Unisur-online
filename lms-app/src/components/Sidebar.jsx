// Sidebar.jsx
const Sidebar = ({ isOpen, lecciones, setSubtemaActivo }) => {
  return (
    <aside style={{
      width: isOpen ? '280px' : '0',
      transition: '0.3s',
      backgroundColor: '#0f172a', // Color oscuro original
      color: 'white',
      height: '100%',
      overflowY: 'auto',
      borderRight: '1px solid #1e293b'
    }}>
      <div style={{ padding: '20px', display: isOpen ? 'block' : 'none' }}>
        <h2 style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold', marginBottom: '20px' }}>
          Navegación Docente
        </h2>
        
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', marginBottom: '10px' }}>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>MÓDULO I. FUNDAMENTOS</p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {lecciones.length > 0 ? (
            lecciones.map((lec) => (
              <li 
                key={lec.id}
                onClick={() => setSubtemaActivo(lec)}
                style={{
                  padding: '12px',
                  fontSize: '13px',
                  borderBottom: '1px solid #1e293b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ color: '#3b82f6', marginRight: '10px', fontWeight: 'bold' }}>
                  {lec.order_index}
                </span>
                {lec.title}
              </li>
            ))
          ) : (
            <li style={{ padding: '10px', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
              • Haz clic en "Comenzar" para generar los subtemas...
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};