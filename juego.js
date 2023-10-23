class Juego {
    id_juego
    nombre_juego
    tematica_juego
    valor_juego
    puntos_juego
    fecha_nacimiento
    nacionalidad

    constructor (id_juego, nombre_juego, tematica_juego, valor_juego, puntos_juego, url_juego) {
        this.id_juego = id_juego;
        this.nombre_juego = nombre_juego;
        this.tematica_juego = tematica_juego;
        this.valor_juego = valor_juego;
        this.puntos_juego = puntos_juego;
        this.url_juego = url_juego;
    }
}

export default Juego;