package com.universidad.service.impl;

import com.universidad.dto.DocenteDTO;
import com.universidad.model.Docente;
import com.universidad.repository.DocenteRepository;
import com.universidad.service.IDocenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocenteServiceImpl implements IDocenteService {

    private final DocenteRepository docenteRepository;

    @Autowired
    public DocenteServiceImpl(DocenteRepository docenteRepository) {
        this.docenteRepository = docenteRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocenteDTO> obtenerTodosLosDocentes() {
        return docenteRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DocenteDTO obtenerDocentePorId(Long id) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado con id: " + id));
        return convertToDTO(docente);
    }

    @Override
    @Transactional
    public DocenteDTO crearDocente(DocenteDTO docenteDTO) {
        if (docenteRepository.existsByEmail(docenteDTO.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        if (docenteRepository.existsByNroEmpleado(docenteDTO.getNroEmpleado())) {
            throw new RuntimeException("El número de empleado ya está registrado");
        }

        Docente docente = convertToEntity(docenteDTO);
        Docente docenteGuardado = docenteRepository.save(docente);
        return convertToDTO(docenteGuardado);
    }

    @Override
    @Transactional
    public DocenteDTO actualizarDocente(Long id, DocenteDTO docenteDTO) {
        Docente docenteExistente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado con id: " + id));

        if (!docenteExistente.getEmail().equals(docenteDTO.getEmail()) &&
                docenteRepository.existsByEmail(docenteDTO.getEmail())) {
            throw new RuntimeException("El nuevo email ya está registrado");
        }

        if (!docenteExistente.getNroEmpleado().equals(docenteDTO.getNroEmpleado()) &&
                docenteRepository.existsByNroEmpleado(docenteDTO.getNroEmpleado())) {
            throw new RuntimeException("El nuevo número de empleado ya está registrado");
        }

        docenteExistente.setNombre(docenteDTO.getNombre());
        docenteExistente.setApellido(docenteDTO.getApellido());
        docenteExistente.setEmail(docenteDTO.getEmail());
        docenteExistente.setFechaNacimiento(docenteDTO.getFechaNacimiento());
        docenteExistente.setNroEmpleado(docenteDTO.getNroEmpleado());
        docenteExistente.setDepartamento(docenteDTO.getDepartamento());

        Docente docenteActualizado = docenteRepository.save(docenteExistente);
        return convertToDTO(docenteActualizado);
    }

    @Override
    @Transactional
    public void eliminarDocente(Long id) {
        if (!docenteRepository.existsById(id)) {
            throw new RuntimeException("Docente no encontrado con id: " + id);
        }
        docenteRepository.deleteById(id);
    }

    private DocenteDTO convertToDTO(Docente docente) {
        return DocenteDTO.builder()
                .id(docente.getId())
                .nombre(docente.getNombre())
                .apellido(docente.getApellido())
                .email(docente.getEmail())
                .fechaNacimiento(docente.getFechaNacimiento())
                .nroEmpleado(docente.getNroEmpleado())
                .departamento(docente.getDepartamento())
                .build();
    }

    private Docente convertToEntity(DocenteDTO docenteDTO) {
        return Docente.builder()
                .id(docenteDTO.getId())
                .nombre(docenteDTO.getNombre())
                .apellido(docenteDTO.getApellido())
                .email(docenteDTO.getEmail())
                .fechaNacimiento(docenteDTO.getFechaNacimiento())
                .nroEmpleado(docenteDTO.getNroEmpleado())
                .departamento(docenteDTO.getDepartamento())
                .build();
    }
}
