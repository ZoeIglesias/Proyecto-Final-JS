import Pelicula from "./pelicula.js";
import { arrayPeliculas } from './varGlobales.js';
//-----------------------------FUNCIONES---------------------------------------//
//-----------------LOGICA PARA AGREGAR LAS PELIS AL DOC HTML------------------//
export function agregarAlDoc() {
  let moviesContainer = document.getElementById("espacio-peliculas");
  let cantidadColumnas = 0;

  moviesContainer.innerHTML = "";
  arrayPeliculas.forEach((pelicula) => {
    if (cantidadColumnas == 4) {
      //Permite que solo se muestren 4 peliculas por fila
      agregarFila(moviesContainer); // Si ya hay cuatro pelis --> Se agrega una fila
    }

    let columna = document.createElement("div");
    columna.classList.add("col-md-3");

    let infoPelicula = crearEsqueleto(pelicula);

    columna.innerHTML = infoPelicula;

    moviesContainer.appendChild(columna);
    
    cantidadColumnas++;
    return moviesContainer;
  });
}

export function crearEsqueleto(pelicula) {
  let i = 0;
  let generosAMostrar = "";
  for (i = 0; i < 2; i++) {
    generosAMostrar += pelicula.generos[i];

    if (i == 0) {
      //Si es el primer genero
      generosAMostrar += " | ";
    }
  }

  let informacion = `
          <div class="pelicula" id="${pelicula.titulo}">
              <div class= "secuencia">
                <h3 class="titulo-pelicula">${pelicula.titulo}</h3>
                <p>Direccion: ${pelicula.director}</p>
                <p>Duracion: ${pelicula.duracion} min</p>
                <button class="btn-like" id="likeMovie">
                <i class="fa-solid fa-heart"></i>
                </button>
              </div>
              <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="img-fluid">
              <p class="genero-pelicula">${generosAMostrar}</p>
          </div>
      `;
  return informacion;
}

export function agregarFila(divContenedor) {
  let fila = document.createElement("div");
  fila.classList.add("row");
  divContenedor.appendChild(fila);

}

export function agregarPelicula(pelicula) {
  /*let pelicula = crearObjetoPelicula(titulo, imagen, genero);*/
  arrayPeliculas.push(pelicula);
}

export function crearObjetoPelicula(titulo,imagen,genero,director,duracion){
  let nuevaPelicula = new Pelicula(titulo, imagen, genero, director, duracion);
  agregarPelicula(nuevaPelicula);
  return nuevaPelicula;
}

export function obtenerObjeto(id) {
    let objeto;
  
    objeto = arrayPeliculas.find((pelicula) => {
      return pelicula.titulo === id;
    });
  
    return objeto;
  }