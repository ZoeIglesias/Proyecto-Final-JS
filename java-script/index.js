import { agregarAlDoc} from './funciones.js';
import {agregarAMisPeliculas, buscador, mostrarEnPantalla, agregarAWatchlist} from './manejoEventos.js'
//import Pelicula from './pelicula.js';
import { crearObjetoPelicula } from './funciones.js';
import { arrayMisPeliculas, arrayPeliculas, arrayWatchlist } from './varGlobales.js';

//-----------------------INSTANCIAS-----------------------//
//crearObjetoPelicula(Titulo, Imagen, [Genero/s], Director, Duracion)

crearObjetoPelicula(
  "About Time",
  "../html-css/imagenes/about-time-2.jpg",
  ["Romance", "Drama"],
  "Richard Curtis",
  123
);
crearObjetoPelicula(
  "La La Land",
  "../html-css/imagenes/la-la-land.jpg",
  ["Musical", "Romance"],
  "Damien Chzelle",
  127
);
crearObjetoPelicula(
  "Inception",
  "../html-css/imagenes/inception-portada.jpg",
  ["Accion", "Ciencia Ficcion"],
  "Christopher Nolan",
  148
);
crearObjetoPelicula(
  "The Truman Show",
  "../html-css/imagenes/trumanShow-portada.jpg",
  ["Drama", "Comedia"],
  "Peter Weir",
  103
);
crearObjetoPelicula(
  "El Padrino",
  "../html-css/imagenes/el-padrino.jpg",
  ["Drama", "Crimen"],
  "Francis Ford Coppola",
  175
);
crearObjetoPelicula(
  "The Holdovers",
  "../html-css/imagenes/the-holdovers-2.jpg",
  ["Comedia", "Drama", "Enseñanza"],
  "Alexander Payne",
  130
);
crearObjetoPelicula(
  "Spider-Man: Across The Spider Verse",
  "../html-css/imagenes/spider-across.jpg",
  ["Animacion", "Aventura"],
  "Joaquim Dos Santos",
  140
);
crearObjetoPelicula(
  "La Sociedad De La Nieve",
  "../html-css/imagenes/la-sociedad-de-la-nieve.jpg",
  ["Supervivencia", "Drama"],
  "J.A. Bayona",
  144
);
crearObjetoPelicula(
  "The Eras Tour",
  "../html-css/imagenes/the-eras.jpg",
  ["Documental", "Musical"],
  "Sam Wrench",
  168
);
crearObjetoPelicula(
  "Oppenheimer",
  "../html-css/imagenes/oppenheimer-3.jpg",
  ["Drama", "Suspenso"],
  "Christopher Nolan",
  180
);

//---------------------------------main()------------------------------------------------------//
agregarAlDoc();

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
  //mostrarEnPantalla(arrayPeliculas);//FUNCIONA MAL --> ARREGLAR
  //console.log("APRETO INICIO");
  //console.log(arrayMisPeliculas)
  agregarAlDoc();
}
//MIS PELICULAS
let itemMisPeliculas = document.querySelector('.nav-link[href="mis-peliculas"]');
itemMisPeliculas.onclick = function (event) {
  event.preventDefault();
  mostrarEnPantalla(arrayMisPeliculas);
}

//WATCHLIST
let itmeWatchlist = document.querySelector('.nav-link[href="watchlist"]');
itmeWatchlist.onclick = function (event) {
  event.preventDefault();
  mostrarEnPantalla(arrayWatchlist);
}
