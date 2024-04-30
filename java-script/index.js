import { agregarAlDoc,obtenerObjeto} from './funciones.js';
import {agregarAMisPeliculas, buscador, mostrarEnPantalla, mostrarMisRankings} from './manejoEventos.js'
import { nombreUsuarioActual } from './varGlobales.js';
import { crearTodasLasInstacias } from './instancias.js';
import {iniciarSesionUsuario} from './login.js'
//-----------------------INSTANCIAS-----------------------//
crearTodasLasInstacias();

//---------------------------------main()------------------------------------------------------//
//---------------------------------LOGING-----------------------------------------------------//
iniciarSesionUsuario().then(() => {
    agregarAlDoc();
}).catch(() => {
    console.error('El inicio de sesión falló');
});


//--------------------EVENTOS------------------------//
//1.) Buscar
let inputCliente = document.getElementById("lupita");
inputCliente.onsubmit = function (event) {
  event.preventDefault(); // Para evitar el comportamiento determinado --> (Cargar la pagina)
  buscador();
};

//3.) ACCEDER A LOS ITEMS DE LA NAV-BAR
//INICIO
let itemInicio = document.querySelector('.nav-link[href="inicio"]');
itemInicio.onclick = function (event) {
  event.preventDefault();
  agregarAlDoc();
}
//MIS PELICULAS
let itemMisPeliculas = document.querySelector('.nav-link[href="mis-peliculas"]');
itemMisPeliculas.onclick = function (event) {
  event.preventDefault();
  mostrarMisPeliculas();
}
function mostrarMisPeliculas() { //mover a manejo de eventos
  let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
  let usuarioActual = usuariosGuardados.find((usuario) => usuario.nombre === nombreUsuarioActual); 
  let peliculasLikeadas = usuarioActual.likes.map(titulo => obtenerObjeto(titulo)); // Recuperar los objetos de película correspondientes a partir de los títulos
  mostrarEnPantalla(peliculasLikeadas); // Mostrar las películas likeadas en la pantalla
}

//WATCHLIST
let itmeWatchlist = document.querySelector('.nav-link[href="watchlist"]');
itmeWatchlist.onclick = function (event) {
  event.preventDefault();
  let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
  let usuarioActual = usuariosGuardados.find((usuario) => usuario.nombre === nombreUsuarioActual); 
  let peliculasEnWatchlist = usuarioActual.watchlist.map(titulo => obtenerObjeto(titulo)); // Recuperar los objetos de película correspondientes a partir de los títulos
  mostrarEnPantalla(peliculasEnWatchlist);
}

//RANKINGS
let itemRankings = document.querySelector('.nav-link[href="mis-rankings"]');
itemRankings.onclick = function(event){
  event.preventDefault();
  console.log("Rankings")
  mostrarMisRankings()
}
