import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { docenteService } from '../Services/api';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';

const FormDocente = ({ modo = 'crear' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [docente, setDocente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
        nroEmpleado: '',
        departamento: ''
    });
    const [loading, setLoading] = useState(!!id);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            const cargarDocente = async () => {
                try {
                    const { data } = await docenteService.getById(id);
                    setDocente({
                        nombre: data.nombre ?? '',
                        apellido: data.apellido ?? '',
                        email: data.email ?? '',
                        fechaNacimiento: data.fechaNacimiento?.split('T')[0] ?? '',
                        nroEmpleado: data.nroEmpleado ?? '',
                        departamento: data.departamento ?? ''
                    });
                } catch (error) {
                    setError(`Error al cargar docente: ${error.response?.data?.message || error.message}`);
                } finally {
                    setLoading(false);
                }
            };
            cargarDocente();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDocente(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (modo === 'ver') return;
        setLoading(true);
        try {
            if (!docente.nombre || !docente.apellido || !docente.email || !docente.fechaNacimiento || !docente.nroEmpleado) {
                throw new Error('Todos los campos requeridos deben ser completados');
            }
            const docenteData = { ...docente, nombre: docente.nombre.trim(), apellido: docente.apellido.trim() };

            if (modo === 'editar' && id) {
                await docenteService.update(id, docenteData);
            } else {
                await docenteService.create(docenteData);
            }
            navigate('/docentes');
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Error al guardar docente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.btnVolver} onClick={() => navigate('/docentes')}>
                    <FaArrowLeft /> Volver
                </button>
                <h2 style={styles.titulo}>{modo === 'ver' ? 'Ver Docente' : id ? 'Editar Docente' : 'Nuevo Docente'}</h2>
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Nombre:</label>
                    <input type="text" name="nombre" value={docente.nombre} onChange={handleChange} style={styles.input} required disabled={modo === 'ver'} />
                    <label style={styles.label}>Apellido:</label>
                    <input type="text" name="apellido" value={docente.apellido} onChange={handleChange} style={styles.input} required disabled={modo === 'ver'} />
                    <label style={styles.label}>Email:</label>
                    <input type="email" name="email" value={docente.email} onChange={handleChange} style={styles.input} required disabled={modo === 'ver'} />
                    <label style={styles.label}>Fecha Nacimiento:</label>
                    <input type="date" name="fechaNacimiento" value={docente.fechaNacimiento} onChange={handleChange} style={styles.input} required disabled={modo === 'ver'} />
                    <label style={styles.label}>Número de Empleado:</label>
                    <input type="text" name="nroEmpleado" value={docente.nroEmpleado} onChange={handleChange} style={styles.input} required disabled={modo === 'ver'} />
                    <label style={styles.label}>Departamento:</label>
                    <input type="text" name="departamento" value={docente.departamento} onChange={handleChange} style={styles.input} disabled={modo === 'ver'} />
                </div>
                <div style={styles.buttonGroup}>
                    {modo !== 'ver' && <button type="submit" style={styles.btnGuardar} disabled={loading}><FaSave /> {loading ? 'Guardando...' : 'Guardar'}</button>}
                    <button type="button" style={styles.btnCancelar} onClick={() => navigate('/docentes')}><FaTimes /> Cancelar</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: { padding: '20px', backgroundColor: 'white', minHeight: '100vh' },
    header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' },
    titulo: { color: '#333', margin: 0 },
    form: { maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' },
    input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', backgroundColor: '#fff' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    btnGuardar: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' },
    btnCancelar: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' },
    btnVolver: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' },
    error: { padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '20px' }
};

export default FormDocente;
