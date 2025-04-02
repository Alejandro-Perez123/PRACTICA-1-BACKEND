package com.universidad.service;

import com.universidad.dto.MateriaDTO;
import java.util.List;

public interface IMateriaService {
    List<MateriaDTO> obtenerTodasLasMaterias();
    MateriaDTO obtenerMateriaPorId(Long id);
    MateriaDTO crearMateria(MateriaDTO materiaDTO);
    MateriaDTO actualizarMateria(Long id, MateriaDTO materiaDTO);
    void eliminarMateria(Long id);
}
