package com.universidad.controller;

import com.universidad.dto.MateriaDTO;
import com.universidad.service.IMateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {

    private final IMateriaService materiaService;

    @Autowired
    public MateriaController(IMateriaService materiaService) {
        this.materiaService = materiaService;
    }

    @GetMapping
    public ResponseEntity<List<MateriaDTO>> obtenerTodasLasMaterias() {
        return ResponseEntity.ok(materiaService.obtenerTodasLasMaterias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MateriaDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(materiaService.obtenerMateriaPorId(id));
    }

    @PostMapping
    public ResponseEntity<MateriaDTO> crear(@RequestBody MateriaDTO materiaDTO) {
        return new ResponseEntity<>(materiaService.crearMateria(materiaDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MateriaDTO> actualizar(@PathVariable Long id, @RequestBody MateriaDTO materiaDTO) {
        return ResponseEntity.ok(materiaService.actualizarMateria(id, materiaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        materiaService.eliminarMateria(id);
        return ResponseEntity.noContent().build();
    }
}
