import React, { useEffect, useState } from 'react';
import { docenteService } from '../Services/api';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TablaDocentes = () => {
    const [docentes, setDocentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDocentes = async () => {
            try {
                const response = await docenteService.getAll();
                setDocentes(Array.isArray(response?.data) ? response.data : []);
            } catch (err) {
                setError(err.message);
                setDocentes([]);
            } finally {
                setLoading(false);
            }
        };
        cargarDocentes();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este docente?')) {
            try {
                await docenteService.delete(id);
                const { data } = await docenteService.getAll();
                setDocentes(data);
            } catch (error) {
                setError('Error al eliminar docente');
            }
        }
    };

    const handleVer = (id) => {
        navigate(`/docentes/ver/${id}`);
    };

    const handleEditar = (id) => {
        navigate(`/docentes/editar/${id}`);
    };

    if (loading) return <div style={styles.loading}>Cargando docentes...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.titulo}>Docentes</h2>
                <button 
                    style={styles.btnAgregar}
                    onClick={() => navigate('/docentes/nuevo')}
                >
                    <FaPlus style={{ marginRight: '8px' }} /> Agregar Docente
                </button>
            </div>

            <table style={styles.tabla}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Apellido</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>departamento</th>
                        <th style={styles.th}>nroEmpleado</th>
                        <th style={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.length > 0 ? (
                        docentes.map(docente => (
                            <tr key={docente.id} style={styles.tr}>
                                <td style={styles.td}>{docente.id}</td>
                                <td style={styles.td}>{docente.nombre}</td>
                                <td style={styles.td}>{docente.apellido}</td>
                                <td style={styles.td}>{docente.email}</td>
                                <td style={styles.td}>{docente.departamento}</td>
                                <td style={styles.td}>{docente.nroEmpleado}</td>
                                <td style={styles.tdAcciones}>
                                    <button 
                                        style={styles.btnVer}
                                        onClick={() => handleVer(docente.id)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        style={styles.btnEditar}
                                        onClick={() => handleEditar(docente.id)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        style={styles.btnEliminar}
                                        onClick={() => handleEliminar(docente.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                No hay docentes registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
// Estilos (se mantienen igual)
const styles = {
    container: {
        marginLeft: '320px',
        padding: '20px',
        backgroundColor: 'white',
        minHeight: '100vh'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    titulo: {
        color: '#333',
        margin: 0
    },
    btnAgregar: {
        backgroundColor: '#000',
        color: '#00ffff',
        border: '2px solid #00ffff',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        transition: 'all 0.3s',
        boxShadow: '0 0 5px rgba(0, 255, 255, 0.3)'
    },
    tabla: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '2px solid #0ff',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
    },
    th: {
        backgroundColor: '#000',
        color: '#0ff',
        padding: '12px',
        border: '1px solid #0ff',
        textAlign: 'left'
    },
    td: {
        padding: '12px',
        border: '1px solid #ddd',
        color: '#333',
    },
    tdAcciones: {
        padding: '12px',
        border: '1px solid #ddd',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center'
    },
    tr: {
        ':nth-child(even)': {
            backgroundColor: '#f9f9f9'
        },
        ':hover': {
            backgroundColor: '#f0f0f0'
        }
    },
    btnVer: {
        background: 'none',
        border: '1px solid #00aaff',
        color: '#00aaff',
        borderRadius: '4px',
        padding: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s'
    },
    btnEditar: {
        background: 'none',
        border: '1px solid #ffaa00',
        color: '#ffaa00',
        borderRadius: '4px',
        padding: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s'
    },
    btnEliminar: {
        background: 'none',
        border: '1px solid #ff5555',
        color: '#ff5555',
        borderRadius: '4px',
        padding: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s'
    },
    loading: {
        marginLeft: '220px',
        padding: '20px',
        color: '#333'
    },
    error: {
        marginLeft: '220px',
        padding: '20px',
        color: 'red'
    }
};

export default TablaDocentes;