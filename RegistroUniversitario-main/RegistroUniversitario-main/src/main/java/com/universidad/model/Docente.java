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
@Table(name = "docente")
@PrimaryKeyJoinColumn(name = "id") // Para la herencia con Persona
public class Docente extends Persona {

    @Column(name = "nroempleado", nullable = false)
    private String nroEmpleado;

    @Column(name = "departamento", nullable = false)
    private String departamento;
}
