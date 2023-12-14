CREATE DATABASE sideProject;

USE sideProject;

CREATE TABLE
    `usuario`(
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `usuario` TEXT NOT NULL,
        `password` TEXT NOT NULL,
        `fechaRegistro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `rol` TEXT NOT NULL,
        `genero` TEXT NOT NULL,
        `estado` BOOLEAN NOT NULL,
        `telefono` TEXT NOT NULL,
        `correo` TEXT NOT NULL,
        `ciudad` TEXT NOT NULL
    );

CREATE TABLE
    enfoque(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(60) NOT NULL
    );

CREATE TABLE
    `cv`(
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `foto` TEXT NOT NULL,
        `nombre` VARCHAR(70) NOT NULL,
        `idEnfoque` INT NOT NULL,
        `palabrasClave` JSON NOT NULL,
        `acercaDeMi` TEXT NOT NULL,
        `skills` JSON NOT NULL,
        `idUsuario` INT NOT NULL,
        `idioma` TEXT NOT NULL,
        `nivelIdioma` TEXT NOT NULL,
        `estado` BOOLEAN NOT NULL,
        `accesoEditar` BOOLEAN NOT NULL,
        `github` TEXT NOT NULL,
        `linkedin` TEXT NOT NULL,
        CONSTRAINT `cv_idusuario_foreign` FOREIGN KEY(`idUsuario`) REFERENCES `usuario`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT `cv_idEnfoque_foreign` FOREIGN KEY(`idEnfoque`) REFERENCES `enfoque`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    `experiencia`(
        `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `cargo` VARCHAR(150) NOT NULL,
        `empresa` VARCHAR(80) NOT NULL,
        `descripcionLogros` VARCHAR(300) NOT NULL,
        `fecha` DATE NOT NULL,
        `idCv` INT NOT NULL,
        CONSTRAINT `experiencia_idcv_foreign` FOREIGN KEY(`idCv`) REFERENCES `cv`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    `educacion`(
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `titulo` TEXT NOT NULL,
        `institucion` TEXT NOT NULL,
        `fecha` TEXT NOT NULL,
        `tipo` VARCHAR(40) NOT NULL,
        `idCv` INT NOT NULL,
        CONSTRAINT `educacion_idcv_foreign` FOREIGN KEY(`idCv`) REFERENCES `cv`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    `softSkills`(
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `compentencia` TEXT NOT NULL,
        `idCv` INT NOT NULL,
        CONSTRAINT `softskills_idcv_foreign` FOREIGN KEY(`idCv`) REFERENCES `cv`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    contacto(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(60) NOT NULL,
        telefono VARCHAR(13) NOT NULL,
        empresa VARCHAR(60) NOT NULL,
        correo VARCHAR(80) NOT NULL,
        descripcion VARCHAR(300) NOT NULL
    );

INSERT INTO
    usuario (
        usuario,
        password,
        rol,
        genero,
        estado,
        telefono,
        correo,
        ciudad
    )
VALUES (
        'usuario1',
        'password1',
        'usuario',
        'masculino',
        true,
        '3123456789',
        'usuario1@example.com',
        'Floridablanca'
    ), (
        'usuario2',
        'password2',
        'usuario',
        'femenino',
        true,
        '3102345678',
        'usuario2@example.com',
        'Bucaramanga'
    ), (
        'villafrades',
        '123',
        'admin',
        'masculino',
        true,
        '3238884307',
        'villafrades@gmail.com',
        'Bucaramanga'
    ),
    (
        'felipe',
        '123',
        'usuario',
        'masculino',
        true,
        '3123456789',
        'usuario1@example.com',
        'Floridablanca'
    ), (
        'juan',
        '123',
        'usuario',
        'femenino',
        true,
        '3102345678',
        'usuario2@example.com',
        'Bucaramanga'
    ), (
        'pedro',
        '123',
        'usuario',
        'masculino',
        true,
        '3238884307',
        'villafrades@gmail.com',
        'Bucaramanga'
    );

INSERT INTO enfoque (nombre)
VALUES ("Desarrollador Full-stack"), ("Desarrollador Backend");

INSERT INTO
    cv (
        foto,
        nombre,
        idEnfoque,
        palabrasClave,
        acercaDeMi,
        skills,
        idUsuario,
        idioma,
        nivelIdioma,
        estado,
        accesoEditar,
        github,
        linkedin
    )
VALUES (
        'https://example.com/foto.jpg',
        'Juan Pérez García',
        2,
        JSON_ARRAY('clave1', 'clave2', 'clave3'),
        'Soy un desarrollador de software con 5 años de experiencia. Estoy interesado en trabajar en proyectos de desarrollo web y móvil.',
        JSON_ARRAY(
            'habilidad1',
            'nivel1',
            'habilidad2'
        ),
        1,
        'Español',
        'Nativo',
        true,
        true,
        'https://github.com/juanperezgarcia',
        'https://linkedin.com/in/juanperezgarcia'
    ),
    (
        'https://example.com/foto.jpg',
        'Felipe Guzman',
        2,
        JSON_ARRAY('clave1', 'clave2', 'clave3'),
        'Soy un desarrollador de software con 5 años de experiencia. Estoy interesado en trabajar en proyectos de desarrollo web y móvil.',
        JSON_ARRAY(
            'habilidad1',
            'nivel1',
            'habilidad2'
        ),
        4,
        'Español',
        'Nativo',
        true,
        true,
        'https://github.com/juanperezgarcia',
        'https://linkedin.com/in/juanperezgarcia'
    ),
    (
        'https://example.com/foto.jpg',
        'Carmelo García',
        2,
        JSON_ARRAY('clave1', 'clave2', 'clave3'),
        'Soy un desarrollador de software con 5 años de experiencia. Estoy interesado en trabajar en proyectos de desarrollo web y móvil.',
        JSON_ARRAY(
            'habilidad1',
            'nivel1',
            'habilidad2'
        ),
        2,
        'Español',
        'Nativo',
        true,
        true,
        'https://github.com/juanperezgarcia',
        'https://linkedin.com/in/juanperezgarcia'
    ),
    (
        'https://example.com/foto.jpg',
        'Juan mantilla',
        2,
        JSON_ARRAY('clave1', 'clave2', 'clave3'),
        'Soy un desarrollador de software con 5 años de experiencia. Estoy interesado en trabajar en proyectos de desarrollo web y móvil.',
        JSON_ARRAY(
            'habilidad1',
            'nivel1',
            'habilidad2'
        ),
        5,
        'Español',
        'Nativo',
        true,
        true,
        'https://github.com/juanperezgarcia',
        'https://linkedin.com/in/juanperezgarcia'
    ),
    (
        'https://example.com/foto.jpg',
        'Pedro Matajira',
        2,
        JSON_ARRAY('clave1', 'clave2', 'clave3'),
        'Soy un desarrollador de software con 5 años de experiencia. Estoy interesado en trabajar en proyectos de desarrollo web y móvil.',
        JSON_ARRAY(
            'habilidad1',
            'nivel1',
            'habilidad2'
        ),
        6,
        'Español',
        'Nativo',
        false,
        true,
        'https://github.com/juanperezgarcia',
        'https://linkedin.com/in/juanperezgarcia'
    );

INSERT INTO
    experiencia (
        cargo,
        empresa,
        descripcionLogros,
        fecha,
        idCv
    )
VALUES (
        'Desarrollador Web',
        'Empresa X',
        'Desarrollé la página web de la empresa, utilizando HTML, CSS y JavaScript.',
        '2023-01-01',
        3
    ),
    (
        'Desarrollador Web',
        'Empresa X',
        'Desarrollé la página web de la empresa, utilizando HTML, CSS y JavaScript.',
        '2023-01-01',
        2
    ),
    (
        'Desarrollador Web',
        'Empresa X',
        'Desarrollé la página web de la empresa, utilizando HTML, CSS y JavaScript.',
        '2023-01-01',
        4
    ),
    (
        'Desarrollador Web',
        'Empresa X',
        'Desarrollé la página web de la empresa, utilizando HTML, CSS y JavaScript.',
        '2023-01-01',
        4
    ),
    (
        'Desarrollador Web',
        'Empresa X',
        'Desarrollé la página web de la empresa, utilizando HTML, CSS y JavaScript.',
        '2023-01-01',
        5
    );

INSERT INTO
    experiencia (
        cargo,
        empresa,
        descripcionLogros,
        fecha,
        idCv
    )
VALUES (
        'Diseñador Gráfico',
        'Empresa Y',
        'Diseñé el logo y la identidad visual de la empresa.',
        '2022-02-02',
        1
    ),
    (
        'Diseñador Gráfico',
        'Empresa Y',
        'Diseñé el logo y la identidad visual de la empresa.',
        '2022-02-02',
        5
    ),
    (
        'Diseñador Gráfico',
        'Empresa Y',
        'Diseñé el logo y la identidad visual de la empresa.',
        '2022-02-02',
        2
    );

INSERT INTO
    educacion (
        titulo,
        institucion,
        fecha,
        tipo,
        idCv
    )
VALUES (
        'Licenciatura en Informática',
        'Universidad X',
        '2023-01-01',
        "Bachillerato",
        1
    ), (
        'Diplomado en Diseño Gráfico',
        'Instituto Y',
        '1022-02-02',
        "Bachillerato",
        2
    ),
    (
        'Licenciatura en Informática',
        'Universidad X',
        '2023-01-01',
        "Bachillerato",
        4
    ), (
        'Diplomado en Diseño Gráfico',
        'Instituto Y',
        '1022-02-02',
        "Bachillerato",
        1
    ),
    (
        'Licenciatura en Informática',
        'Universidad X',
        '2023-01-01',
        "Bachillerato",
        3
    ), (
        'Diplomado en Diseño Gráfico',
        'Instituto Y',
        '1022-02-02',
        "Bachillerato",
        2
    );

INSERT INTO
    softSkills (compentencia, idCv)
VALUES ('Comunicación', 1),
 ('Trabajo en equipo', 2),
 ('Comunicación', 2),
 ('Trabajo en equipo', 3),
 ('Comunicación', 4),
 ('Trabajo en equipo', 1);

