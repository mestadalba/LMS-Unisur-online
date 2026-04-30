// Sidebar.jsx

// 3. ASEGÚRATE de incluir { lecciones } entre las llaves de los parámetros
const Sidebar = ({ isOpen, lecciones, setSubtemaActivo }) => {
  const [openModulo, setOpenModulo] = useState(true);

  return (
    <aside style={{ display: isOpen ? 'block' : 'none' }}>
      <button onClick={() => setOpenModulo(!openModulo)}>
        MÓDULO I. FUNDAMENTOS
      </button>

      {openModulo && (
        <ul>
          {/* 4. Verifica que 'lecciones' exista antes de hacer el map */}
          {lecciones && lecciones.map((lec) => (
            <li 
              key={lec.id} 
              onClick={() => setSubtemaActivo(lec)}
              style={{ cursor: 'pointer' }}
            >
              {lec.order_index} {lec.title}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;