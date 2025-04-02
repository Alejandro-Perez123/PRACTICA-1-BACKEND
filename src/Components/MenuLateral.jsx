import React from 'react';
import { useNavigate } from 'react-router-dom';

function MenuLateral({ currentSection }) {
  const navigate = useNavigate();

  return (
    <div style={styles.menu}>
      <h3 style={styles.titulo}>Menú</h3>
      <ul style={styles.menuList}>
        {['estudiantes', 'docentes', 'materias'].map((section) => (
          <li key={section} style={styles.menuItem}>
            <button
              onClick={() => navigate(`/${section}`)}
              style={{
                ...styles.boton,
                ...(currentSection === section ? styles.botonActivo : {}),
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  menu: {
    width: '220px',
    height: '100vh',
    backgroundColor: '#000',
    padding: '20px',
    position: 'fixed',
    left: 0,
    top: 0,
    boxShadow: '0 0 15px #0ff',
  },
  titulo: {
    color: '#0ff',
    textAlign: 'center',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    marginBottom: '10px',
  },
  boton: {
    width: '100%',
    padding: '12px',
    color: '#0ff',
    border: '2px solid #0ff',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  botonActivo: {
    backgroundColor: '#0ff',
    color: '#000',
    boxShadow: '0 0 10px #0ff',
  },
};

export default MenuLateral;
