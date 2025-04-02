package com.universidad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "estudiante")
@PrimaryKeyJoinColumn(name = "id") // Para la herencia con Persona
public class Estudiante extends Persona {

    @Column(name = "numero_inscripcion", nullable = false, unique = true)
    private String numeroInscripcion;
}
