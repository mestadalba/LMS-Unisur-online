// Sidebar.jsx
// Verifica que estas llaves { lecciones, ... } existan aquí:
const Sidebar = ({ isOpen, lecciones, setSubtemaActivo, toggleSidebar }) => {
  const [openModulo, setOpenModulo] = useState(true);

  return (
    <aside style={{
      left: isOpen ? '0' : '-280px',
      // ... resto de tus estilos
    }}>
      {/* ... cabecera ... */}

      {openModulo && (
        <ul style={{ listStyle: 'none', padding: '10px' }}>
          {/* 4. Ahora 'lecciones' ya está definido porque llega por props */}
          {lecciones && lecciones.map((lec) => (
            <li 
              key={lec.id}
              onClick={() => setSubtemaActivo(lec)}
              style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #334155' }}
            >
              {lec.order_index} {lec.title}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};