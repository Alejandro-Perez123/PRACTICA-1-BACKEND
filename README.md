# PRACTICA-1-BACKEND

1. Crear la base de datos en postgres
*-- Crear la base de datos
CREATE DATABASE universidad;

-- Conectarse a la base de datos
\c universidad;

-- Crear tabla persona (clase padre)
CREATE TABLE persona (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

-- Crear tabla estudiante (hereda de persona)
CREATE TABLE estudiante (
    id INTEGER PRIMARY KEY REFERENCES persona(id) ON DELETE CASCADE,
    numero_inscripcion VARCHAR(20) UNIQUE NOT NULL
);

-- Crear tabla docente (hereda de persona)
CREATE TABLE docente (
    id INTEGER PRIMARY KEY REFERENCES persona(id) ON DELETE CASCADE,
    nro_empleado VARCHAR(20) UNIQUE NOT NULL,
    departamento VARCHAR(100) NOT NULL
);

-- Crear tabla materia
CREATE TABLE materia (
    id SERIAL PRIMARY KEY,
    nombre_materia VARCHAR(100) NOT NULL,
    codigo_unico VARCHAR(20) UNIQUE NOT NULL,
    creditos INTEGER NOT NULL
);

-- Tabla intermedia para relación muchos a muchos entre estudiante y materia
CREATE TABLE estudiante_materia (
    estudiante_id INTEGER REFERENCES estudiante(id) ON DELETE CASCADE,
    materia_id INTEGER REFERENCES materia(id) ON DELETE CASCADE,
    PRIMARY KEY (estudiante_id, materia_id)
);
2. Descargar el proyecto spring boot y ejecutarlo
3.  Descargar el proyecto de React en la rama master y ejecutar el siguiente comando 
npm install
