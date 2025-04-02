import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { estudianteService } from '../Services/api';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';

const FormEstudiante = ({ modo = 'editar' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [estudiante, setEstudiante] = useState({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',  // Nombre estándar (camelCase)
        numeroInscripcion: '' // Nombre estándar (camelCase)
    });
    const [loading, setLoading] = useState(!!id);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const cargarEstudiante = async () => {
                try {
                    const { data } = await estudianteService.getById(id);
                    setEstudiante({
                        nombre: data.nombre || '',
                        apellido: data.apellido || '',
                        email: data.email || '',
                        fechaNacimiento: data.fechaNacimiento?.split('T')[0] || '',
                        numeroInscripcion: data.numeroInscripcion || ''
                    });
                } catch (error) {
                    setError('Error al cargar estudiante');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            cargarEstudiante();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEstudiante(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (modo === 'ver') return;
        
        setLoading(true);
        try {
            const estudianteData = {
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                email: estudiante.email,
                fechaNacimiento: estudiante.fechaNacimiento,
                numeroInscripcion: estudiante.numeroInscripcion
            };

            if (id) {
                await estudianteService.update(id, estudianteData);
            } else {
                await estudianteService.create(estudianteData);
            }
            navigate('/estudiantes');
        } catch (error) {
            setError(error.response?.data?.message || 'Error al guardar estudiante');
            console.error('Error detallado:', error.response || error);
        } finally {
            setLoading(false);
        }
    };

    // ... (resto del componente permanece igual hasta el return)

    return (
        <div style={styles.container}>
            {/* ... (header permanece igual) ... */}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    {/* Campos del formulario */}
                    <label style={styles.label}>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={estudiante.nombre}
                        onChange={handleChange}
                        style={styles.input}
                        required
                        disabled={modo === 'ver'}
                    />
                    
                    <label style={styles.label}>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={estudiante.apellido}
                        onChange={handleChange}
                        style={styles.input}
                        required
                        disabled={modo === 'ver'}
                    />
                    
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={estudiante.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                        disabled={modo === 'ver'}
                    />
                    
                    <label style={styles.label}>Fecha Nacimiento:</label>
                    <input
                        type="date"
                        name="fechaNacimiento"
                        value={estudiante.fechaNacimiento}
                        onChange={handleChange}
                        style={styles.input}
                        required
                        disabled={modo === 'ver'}
                    />
                    
                    <label style={styles.label}>Número Inscripción:</label>
                    <input
                        type="text"
                        name="numeroInscripcion"
                        value={estudiante.numeroInscripcion}
                        onChange={handleChange}
                        style={styles.input}
                        required
                        disabled={modo === 'ver'}
                    />
                </div>
                
                {/* Botones permanecen igual */}
                <div style={styles.buttonGroup}>
                    {modo !== 'ver' && (
                        <button type="submit" style={styles.btnGuardar} disabled={loading}>
                            <FaSave /> {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                    )}
                    <button
                        type="button"
                        style={styles.btnCancelar}
                        onClick={() => navigate('/estudiantes')}
                    >
                        <FaTimes /> Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

// Los estilos permanecen igual
const styles = {
    container: {
        marginLeft: '220px',
        padding: '20px',
        backgroundColor: 'white',
        minHeight: '100vh'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '20px'
    },
    titulo: {
        color: '#333',
        margin: 0
    },
    form: {
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: '#fff'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        marginTop: '20px'
    },
    btnGuardar: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px'
    },
    btnCancelar: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px'
    },
    btnVolver: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px'
    },
    loading: {
        marginLeft: '220px',
        padding: '20px',
        color: '#333',
        textAlign: 'center'
    },
    error: {
        marginLeft: '220px',
        padding: '20px',
        color: 'red',
        textAlign: 'center'
    }
};

export default FormEstudiante;