import { agregarAlDoc,obtenerObjeto} from './funciones.js';
import {agregarAMisPeliculas, buscador, mostrarEnPantalla} from './manejoEventos.js'
import { arrayMisPeliculas, arrayWatchlist } from './varGlobales.js';
import { crearTodasLasInstacias } from './instancias.js';
import {iniciarSesionUsuario} from './login.js'
//-----------------------INSTANCIAS-----------------------//
crearTodasLasInstacias();

//---------------------------------main()------------------------------------------------------//
//---------------------------------LOGING-----------------------------------------------------//
iniciarSesionUsuario();


//--------------------EVENTOS------------------------//
//1.) Buscar
let inputCliente = document.getElementById("lupita");
inputCliente.onsubmit = function (event) {
  event.preventDefault(); // Para evitar el comportamiento determinado --> (Cargar la pagina)
  buscador();
};

/*/2.) Likear
let botonesLike = document.querySelectorAll(".btn-like");
botonesLike.forEach((boton) => {
  boton.onclick = function (event) {
    event.preventDefault();
    boton.classList.toggle("liked");
    agregarAMisPeliculas(boton);
  };
});*/

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
  let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  let peliculasLikeadas = usuarioGuardado.likes.map(titulo => obtenerObjeto(titulo)); // Recuperar los objetos de película correspondientes a partir de los títulos

  mostrarEnPantalla(peliculasLikeadas); // Mostrar las películas likeadas en la pantalla
  
}

//WATCHLIST
let itmeWatchlist = document.querySelector('.nav-link[href="watchlist"]');
itmeWatchlist.onclick = function (event) {
  event.preventDefault();
  let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  let peliculasEnWatchlist = usuarioGuardado.watchlist.map(titulo => obtenerObjeto(titulo)); // Recuperar los objetos de película correspondientes a partir de los títulos
  console.log(peliculasEnWatchlist)
  mostrarEnPantalla(peliculasEnWatchlist);
}

//RANKINGS
let itemRankings = document.querySelector('.nav-link[href="mis-rankings"]');
itemRankings.onclick = function(event){
  event.preventDefault();
  mostrarMisRankings()
}
