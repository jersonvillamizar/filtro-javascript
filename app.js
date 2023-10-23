import Cliente from "./cliente.js";
import ClienteProvider from "./clienteProvider.js";
import Juego from "./juego.js";
import JuegoProvider from "./juegoProvider.js";
import { alerta, comprarJuego } from "./funciones_export.js";

const $ = (selector) => document.getElementById(selector);

const cliente_id = $("cliente_id");
const cliente_nombre = $("cliente_nombre");
const cliente_apellido = $("cliente_apellido");
const cliente_telefono = $("cliente_telefono");
const cliente_correo = $("cliente_correo");
const cliente_fecha = $("cliente_fecha");
const cliente_nacionalidad = $("cliente_nacionalidad");

const juego_id = $("juego_id");
const juego_nombre = $("juego_nombre");
const juego_tematica = $("juego_tematica");
const juego_valor = $("juego_valor");
const juego_puntos = $("juego_puntos");
const juego_url = $("juego_url");

const clienteProvider = new ClienteProvider();
const juegoProvider = new JuegoProvider();

const clientes_formulario = $("clientes_formulario");
const juegos_formulario = $("juegos_formulario");


const formulario_modificar = $("formulario_modificar");
const buscador = $("buscador");
const buscador_juegos = $("buscador_juegos");



const boton_home = $("boton_home");
const boton_listar = $("boton_listar");
const boton_listar_juegos = $("boton_listar_juegos");
const boton_crear = $("boton_crear");
const boton_crear_juegos = $("boton_crear_juegos");
const boton_comprar_juegos = $("boton_comprar_juegos");

const pagina_inicio = $("pagina_inicio");
const ingresar_clientes = $("ingresar_clientes");
const listado = $("listado");
const ingresar_juegos = $("ingresar_juegos");
const listado_juegos = $("listado_juegos");
const compra_juego = $("compra_juego");

const cliente_id_compra = $("cliente_id_compra");
const juego_id_compra = $("juego_id_compra");
const compra_formulario = $("compra_formulario");

clientes_formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    guardar_cliente();
})

juegos_formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    guardar_juego();
})

compra_formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const resumen_compra = comprarJuego(
        cliente_id_compra.value,
        juego_id_compra.value,
        clienteProvider.clientes,
        juegoProvider.juegos
        )

    alerta(resumen_compra, 3);
})

function guardar_cliente() {
    const cliente = new Cliente(
        cliente_id.value,
        cliente_nombre.value,
        cliente_apellido.value,
        cliente_telefono.value,
        cliente_correo.value,
        cliente_fecha.value,
        cliente_nacionalidad.value
    ); 
    clienteProvider.registrarCliente(cliente);
    console.log(clienteProvider.clientes);
}

function guardar_juego() {
    const juego = new Juego(
        juego_id.value,
        juego_nombre.value,
        juego_tematica.value,
        juego_valor.value,
        juego_puntos.value,
        juego_url.value
    ); 
    juegoProvider.registrarJuego(juego);
}

boton_listar.addEventListener("click", () => {
    listar_clientes();
    pagina_inicio.style.display = "none";
    ingresar_clientes.style.display = "none";
    listado.style.display = "flex";
    ingresar_juegos.style.display = "none";
    listado_juegos.style.display = "none";
    compra_juego.style.display = "none";
})

boton_listar_juegos.addEventListener("click", () => {
    listar_juegos();
    pagina_inicio.style.display = "none";
    ingresar_clientes.style.display = "none";
    listado.style.display = "none";
    ingresar_juegos.style.display = "none";
    listado_juegos.style.display = "flex";
    compra_juego.style.display = "none";
})

boton_crear.addEventListener("click", () => {
    pagina_inicio.style.display = "none";
    ingresar_clientes.style.display = "flex";
    listado.style.display = "none";
    ingresar_juegos.style.display = "none";
    listado_juegos.style.display = "none";
    compra_juego.style.display = "none";
})

boton_crear_juegos.addEventListener("click", () => {
    pagina_inicio.style.display = "none";
    ingresar_clientes.style.display = "none";
    listado.style.display = "none";
    ingresar_juegos.style.display = "flex";
    listado_juegos.style.display = "none";
    compra_juego.style.display = "none";
})

boton_home.addEventListener("click", () => {
    pagina_inicio.style.display = "flex";
    ingresar_clientes.style.display = "none";
    listado.style.display = "none";
    ingresar_juegos.style.display = "none";
    listado_juegos.style.display = "none";
    compra_juego.style.display = "none";
})

boton_comprar_juegos.addEventListener("click", () => {
    pagina_inicio.style.display = "none";
    ingresar_clientes.style.display = "none";
    listado.style.display = "none";
    ingresar_juegos.style.display = "none";
    listado_juegos.style.display = "none";
    compra_juego.style.display = "flex";
})

function listar_clientes() {
    $("grupo_listado").innerHTML = clienteProvider.listarClientes();
}

function listar_juegos() {
    $("grupo_listado_juegos").innerHTML = juegoProvider.listarjuegos();
}

window.rellenar = rellenar_formulario
function rellenar_formulario(codigo){
    const cliente_buscado = clienteProvider.obtenerCliente(codigo);

    $("modificar_id").value = cliente_buscado.identificacion;
    $("modificar_nombre").value = cliente_buscado.nombre;
    $("modificar_apellido").value = cliente_buscado.apellido;
    $("modificar_telefono").value = cliente_buscado.telefono;
    $("modificar_correo").value = cliente_buscado.correo;
    $("modificar_fecha").value = cliente_buscado.fecha_nacimiento;
    $("modificar_nacionalidad").value = cliente_buscado.nacionalidad;

    $("grupo_modificar").style.display = "block"
}

formulario_modificar.addEventListener("submit", (e) => {
    e.preventDefault();
    modificar_formulario();
})

function modificar_formulario(){
    if (confirm("Desea modificar el cliente?")){
        const codigo = $("modificar_id").value
        const cliente = new Cliente(
        codigo,
        $("modificar_nombre").value,
        $("modificar_apellido").value,
        $("modificar_telefono").value,
        $("modificar_correo").value,
        $("modificar_fecha").value,
        $("modificar_nacionalidad").value
        );
        clienteProvider.modificarCliente(codigo, cliente);
        alerta("Cliente modificado", 3);
        console.log(clienteProvider.clientes);
        listar_clientes();
    }
}

window.borrar = borrar_formulario;
window.borrar_juego = borrar_formulario_juego;

function borrar_formulario(codigo){
    if (confirm("Desea eliminar el cliente?")){
        clienteProvider.eliminarCliente(codigo);
        alerta("Cliente eliminado", 3);
        console.log(clienteProvider.clientes);
        listar_clientes();
    }
}

function borrar_formulario_juego(codigo){
    if (confirm("Desea eliminar el juego?")){
        juegoProvider.eliminarJuego(codigo);
        alerta("Juego eliminado", 3);
        console.log(clienteProvider.clientes);
        listar_juegos();
    }
}

buscador.addEventListener("input", () => {
    if (buscador.value == ""){
        listar_clientes();
        return
    }
    const listaFiltrada = clienteProvider.filtrarClientePor(buscador.value);
    $("grupo_listado").innerHTML = listaFiltrada;
})

buscador_juegos.addEventListener("input", () => {
    if (buscador_juegos.value == ""){
        listar_juegos();
        return
    }
    const listaFiltrada = juegoProvider.filtrarJuegoPor(buscador_juegos.value);
    $("grupo_listado_juegos").innerHTML = listaFiltrada;
})

function cerrar_pestana () {
    $("grupo_modificar").style.display = "none";
    $("modificar_id").value = "";
    $("modificar_nombre").value = "";
    $("modificar_apellido").value = "";
    $("modificar_telefono").value = "";
    $("modificar_correo").value = "";
    $("modificar_fecha").value = "";
    $("modificar_nacionalidad").value = "";
}

window.cerrar_pestana = cerrar_pestana

window.comprar = comprar_juego;

function comprar_juego(codigo){
    const nombre_juegos = [];
    const juego_buscado = juegoProvider.obtenerJuego(codigo);
    const juego = new Juego(
        juego_buscado.id_juego,
        juego_buscado.nombre_juego,
        juego_buscado.tematica_juego,
        juego_buscado.valor_juego,
        juego_buscado.puntos_juego,
        juego_buscado.url_juego
    );
    juegoProvider.modificarJuego(juego);
    alerta("Juego comprado", 3);
    console.log(clienteProvider.clientes);
    listar_juegos();
}

window.addEventListener("load" , () => {
    pagina_inicio.style.display = "flex";
    ingresar_clientes.style.display = "none";
    listado.style.display = "none";
    ingresar_juegos.style.display = "none";
    listado_juegos.style.display = "none";
})