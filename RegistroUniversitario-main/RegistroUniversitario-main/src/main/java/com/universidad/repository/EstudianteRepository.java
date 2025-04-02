package com.universidad.repository;

import com.universidad.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    // Método para buscar por número de inscripción
    Optional<Estudiante> findByNumeroInscripcion(String numeroInscripcion);

    // Método para verificar si existe un email (heredado de Persona)
    boolean existsByEmail(String email);

    // Método para verificar si existe un número de inscripción
    boolean existsByNumeroInscripcion(String numeroInscripcion);

    // Puedes agregar más métodos personalizados según necesites
    // Ejemplo: List<Estudiante> findByFechaNacimientoAfter(LocalDate fecha);
}