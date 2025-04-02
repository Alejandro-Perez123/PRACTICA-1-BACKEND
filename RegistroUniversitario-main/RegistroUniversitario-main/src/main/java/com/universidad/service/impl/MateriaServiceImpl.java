package com.universidad.service.impl;

import com.universidad.dto.MateriaDTO;
import com.universidad.model.Materia;
import com.universidad.repository.MateriaRepository;
import com.universidad.service.IMateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MateriaServiceImpl implements IMateriaService {

    private final MateriaRepository materiaRepository;

    @Autowired
    public MateriaServiceImpl(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MateriaDTO> obtenerTodasLasMaterias() {
        return materiaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MateriaDTO obtenerMateriaPorId(Long id) {
        Materia materia = materiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada con id: " + id));
        return convertToDTO(materia);
    }

    @Override
    @Transactional
    public MateriaDTO crearMateria(MateriaDTO materiaDTO) {
        if (materiaRepository.existsByCodigoUnico(materiaDTO.getCodigoUnico())) {
            throw new RuntimeException("El código único ya está registrado");
        }

        Materia materia = convertToEntity(materiaDTO);
        Materia materiaGuardada = materiaRepository.save(materia);
        return convertToDTO(materiaGuardada);
    }

    @Override
    @Transactional
    public MateriaDTO actualizarMateria(Long id, MateriaDTO materiaDTO) {
        Materia materiaExistente = materiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada con id: " + id));

        if (!materiaExistente.getCodigoUnico().equals(materiaDTO.getCodigoUnico()) &&
                materiaRepository.existsByCodigoUnico(materiaDTO.getCodigoUnico())) {
            throw new RuntimeException("El nuevo código único ya está registrado");
        }

        materiaExistente.setNombreMateria(materiaDTO.getNombreMateria());
        materiaExistente.setCodigoUnico(materiaDTO.getCodigoUnico());
        materiaExistente.setCreditos(materiaDTO.getCreditos());

        Materia materiaActualizada = materiaRepository.save(materiaExistente);
        return convertToDTO(materiaActualizada);
    }

    @Override
    @Transactional
    public void eliminarMateria(Long id) {
        if (!materiaRepository.existsById(id)) {
            throw new RuntimeException("Materia no encontrada con id: " + id);
        }
        materiaRepository.deleteById(id);
    }

    private MateriaDTO convertToDTO(Materia materia) {
        return MateriaDTO.builder()
                .id(materia.getId())
                .nombreMateria(materia.getNombreMateria())
                .codigoUnico(materia.getCodigoUnico())
                .creditos(materia.getCreditos())
                .build();
    }

    private Materia convertToEntity(MateriaDTO materiaDTO) {
        return Materia.builder()
                .id(materiaDTO.getId())
                .nombreMateria(materiaDTO.getNombreMateria())
                .codigoUnico(materiaDTO.getCodigoUnico())
                .creditos(materiaDTO.getCreditos())
                .build();
    }
}
