import React, { useState } from 'react';
import MenuLateral from './MenuLateral';
import TablaEstudiantes from './TablaEstudiantes';
import TablaDocentes from './TablaDocentes'; // Asegúrate de crear este componente

const Dashboard = () => {
  const [tablaSeleccionada, setTablaSeleccionada] = useState('estudiantes');

  return (
    <div style={{ display: 'flex' }}>
      <MenuLateral setTablaSeleccionada={setTablaSeleccionada} />
      
      <div style={{ marginLeft: '220px', width: 'calc(100% - 220px)', padding: '20px' }}>
        {tablaSeleccionada === 'estudiantes' && <TablaEstudiantes />}
        {tablaSeleccionada === 'docentes' && <TablaDocentes />}
      </div>
    </div>
  );
};

export default Dashboard;