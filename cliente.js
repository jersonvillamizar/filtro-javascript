class Cliente {
    identificacion
    nombre
    apellido
    telefono
    correo
    fecha_nacimiento
    nacionalidad

    constructor (identificacion, nombre, apellido, telefono, correo, fecha_nacimiento, nacionalidad, puntos = 0, juegos = 0) {
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.fecha_nacimiento = fecha_nacimiento;
        this.nacionalidad = nacionalidad;
        this.puntos = puntos;
        this.juegos = juegos;
    }
}

export default Cliente;
