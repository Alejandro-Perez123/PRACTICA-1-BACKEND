import React, { useState, useEffect } from 'react';
import { materiaService } from '../Services/api';
import { useNavigate, useParams } from 'react-router-dom';

const FormMateria = () => {
    const [materia, setMateria] = useState({
        nombreMateria: '',
        codigoUnico: '',
        creditos: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const cargarMateria = async () => {
                setLoading(true);
                try {
                    const response = await materiaService.getById(id);
                    setMateria(response.data);
                } catch (err) {
                    setError('Error al cargar la materia');
                } finally {
                    setLoading(false);
                }
            };
            cargarMateria();
        }
    }, [id]);

    const handleChange = (e) => {
        setMateria({ ...materia, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await materiaService.update(id, materia);
            } else {
                await materiaService.create(materia);
            }
            navigate('/materias');
        } catch (err) {
            setError('Error al guardar la materia');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>{id ? 'Editar Materia' : 'Registrar Materia'}</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Nombre de la Materia:</label>
                <input type="text" name="nombreMateria" value={materia.nombreMateria} onChange={handleChange} required style={styles.input} />

                <label style={styles.label}>Código Único:</label>
                <input type="text" name="codigoUnico" value={materia.codigoUnico} onChange={handleChange} required style={styles.input} />

                <label style={styles.label}>Créditos:</label>
                <input type="number" name="creditos" value={materia.creditos} onChange={handleChange} required style={styles.input} />

                <button type="submit" style={styles.btn} disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
            </form>
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '400px', margin: 'auto' },
    error: { color: 'red' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px' },
    label: { fontWeight: 'bold' },
    input: { padding: '8px', borderRadius: '5px', border: '1px solid #ccc' },
    btn: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default FormMateria;