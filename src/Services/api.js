import axios from 'axios';

// api.js - Configuración mejorada
const apiClient = axios.create({
    baseURL: 'http://localhost:8085/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
});
  
// Interceptor para errores
apiClient.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        console.error('Error en la respuesta:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
      } else {
        console.error('Error al configurar la petición:', error.message);
      }
      return Promise.reject(error);
    }
);

// Servicio de Estudiantes
export const estudianteService = {
  getAll: () => apiClient.get('/estudiantes'),
  getById: (id) => apiClient.get(`/estudiantes/${id}`),
  create: (estudiante) => apiClient.post('/estudiantes', estudiante),
  update: (id, estudiante) => apiClient.put(`/estudiantes/${id}`, estudiante),
  delete: (id) => apiClient.delete(`/estudiantes/${id}`)
};

// Servicio de Docentes
export const docenteService = {
  getAll: () => apiClient.get('/docentes'),
  getById: (id) => apiClient.get(`/docentes/${id}`),
  create: (docente) => apiClient.post('/docentes', docente),
  update: (id, docente) => apiClient.put(`/docentes/${id}`, docente),
  delete: (id) => apiClient.delete(`/docentes/${id}`)
};

// Servicio de Materias
export const materiaService = {
  getAll: () => apiClient.get('/materias'),
  getById: (id) => apiClient.get(`/materias/${id}`),
  create: (materia) => apiClient.post('/materias', materia),
  update: (id, materia) => apiClient.put(`/materias/${id}`, materia),
  delete: (id) => apiClient.delete(`/materias/${id}`)
};

// Opcional: Exportar el cliente para usos especiales
export default apiClient;
