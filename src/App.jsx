import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MenuLateral from './Components/MenuLateral';
import TablaEstudiantes from './Components/TablaEstudiantes';
import FormEstudiante from './Components/FormEstudiante';
import TablaDocentes from './Components/TablaDocentes';
import FormDocente from './Components/FormDocente';
import TablaMaterias from './Components/TablaMateria';
import FormMateria from './Components/FormMateria';

function MainContent() {
  const location = useLocation();
  
  // Determina si estamos en la sección de estudiantes o docentes
  const isEstudiantesSection = location.pathname.startsWith('/estudiantes');
  const isDocentesSection = location.pathname.startsWith('/docentes');
  const isMateriasSection = location.pathname.startsWith('/materias');

  return (
    <div style={{ display: 'flex' }}>
      <MenuLateral 
        currentSection={isEstudiantesSection ? 'estudiantes' : 'docentes'} 
      />
      
      <div style={{ flex: 1, padding: '20px', marginLeft: '220px' }}>
        <Routes>
          {/* Rutas de Estudiantes */}
          <Route path="/estudiantes" element={<TablaEstudiantes />} />
          <Route path="/estudiantes/nuevo" element={<FormEstudiante />} />
          <Route path="/estudiantes/editar/:id" element={<FormEstudiante />} />
          <Route path="/estudiantes/ver/:id" element={<FormEstudiante modo="ver" />} />

          {/* Rutas de Docentes */}
          <Route path="/docentes" element={<TablaDocentes />} />
          <Route path="/docentes/nuevo" element={<FormDocente />} />
          <Route path="/docentes/editar/:id" element={<FormDocente />} />
          <Route path="/docentes/ver/:id" element={<FormDocente modo="ver" />} />

          {/* Ruta por defecto */}
          <Route path="/materias" element={<TablaMaterias/>} />
          <Route path='/materias/nuevo' element={<FormMateria/>}/>
          <Route path='/materias/editar/:id' element={<FormMateria/>}/>
          <Route path='/materias/ver/:id' element={<FormMateria/>}/>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;