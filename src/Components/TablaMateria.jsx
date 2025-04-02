import React, { useEffect, useState } from 'react';
import { materiaService } from '../Services/api';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TablaMaterias = () => {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarMaterias = async () => {
            try {
                const response = await materiaService.getAll();
                setMaterias(Array.isArray(response?.data) ? response.data : []);
            } catch (err) {
                setError(err.message);
                setMaterias([]);
            } finally {
                setLoading(false);
            }
        };
        cargarMaterias();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar esta materia?')) {
            try {
                await materiaService.delete(id);
                const { data } = await materiaService.getAll();
                setMaterias(data);
            } catch (error) {
                setError('Error al eliminar materia');
            }
        }
    };

    const handleVer = (id) => {
        navigate(`/materias/ver/${id}`);
    };

    const handleEditar = (id) => {
        navigate(`/materias/editar/${id}`);
    };

    if (loading) return <div style={styles.loading}>Cargando materias...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.titulo}>Materias</h2>
                <button 
                    style={styles.btnAgregar}
                    onClick={() => navigate('/materias/nuevo')}
                >
                    <FaPlus style={{ marginRight: '8px' }} /> Agregar Materia
                </button>
            </div>

            <table style={styles.tabla}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Nombre</th>
                        <th style={styles.th}>Código</th>
                        <th style={styles.th}>Créditos</th>
                        <th style={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.length > 0 ? (
                        materias.map(materia => (
                            <tr key={materia.id} style={styles.tr}>
                                <td style={styles.td}>{materia.id}</td>
                                <td style={styles.td}>{materia.nombreMateria}</td>
                                <td style={styles.td}>{materia.codigoUnico}</td>
                                <td style={styles.td}>{materia.creditos}</td>
                                <td style={styles.tdAcciones}>
                                    <button 
                                        style={styles.btnVer}
                                        onClick={() => handleVer(materia.id)}
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        style={styles.btnEditar}
                                        onClick={() => handleEditar(materia.id)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        style={styles.btnEliminar}
                                        onClick={() => handleEliminar(materia.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                No hay materias registradas
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
        padding: '50px',
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
export default TablaMaterias;