package com.universidad.repository;

import com.universidad.model.Docente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocenteRepository extends JpaRepository<Docente, Long> {
    Optional<Docente> findByNroEmpleado(String nroEmpleado);
    boolean existsByEmail(String email);
    boolean existsByNroEmpleado(String nroEmpleado);
}
