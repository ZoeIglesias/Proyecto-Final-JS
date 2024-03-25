import { arrayPeliculas, arrayMisPeliculas} from './varGlobales.js';
import {obtenerObjeto, crearEsqueleto, agregarFila} from './funciones.js'
//---------------FUNCIONALIDADES--------------------//

// 1.) BUSCAR
export function buscador() {
    let valorInput = document.getElementById("buscador-id").value; //sin .value no funciona --> Toma lo que ingreso el usuaurio
  
    valorInput = valorInput.toLowerCase();
  
    let arrayObtenido;
  
    arrayObtenido = buscarSegunNombre(valorInput);
  
    if (arrayObtenido.length <= 0) {
      arrayObtenido = buscarSegunDirector(valorInput);
    }

    if (arrayObtenido.length <= 0) {
      arrayObtenido = filtrarPorGenero(valorInput);
      console.log("filtro por genero")
    }

    console.log(arrayObtenido);
  
    mostrarEnPantalla(arrayObtenido);
}
  
  
export function buscarSegunNombre(tituloPelicula) {
    let pelicualsEncontradas = arrayPeliculas.filter((pelicula) => {
      return pelicula.titulo.toLowerCase() === tituloPelicula; //sin el return no funca
    });
  
    return pelicualsEncontradas;
}
  
export function buscarSegunDirector(director) {
    let pelicualsEncontradas = arrayPeliculas.filter((pelicula) => {
      return pelicula.director.toLowerCase() === director; //sin el return no funca
    });
  
    return pelicualsEncontradas;
}
  
export function mostrarEnPantalla(arrayObtenidoPeliculas) { //MOVER A FUNCIONES
  //TODO: //Funcion parecido a agregar al Doc --> Abstraer
    let moviesContainer = document.getElementById("espacio-peliculas");
    moviesContainer.innerHTML = ""; // Para borrar las peliculas del incio, sino se sobreescriben
    
    if(arrayObtenidoPeliculas.length === 0){
        let mensaje = document.createElement("h1");
        mensaje.classList.add("aviso");
        mensaje.textContent = "No hay películas para mostrar.";
        moviesContainer.appendChild(mensaje);
      }
    
    let cantidadColumnas = 0;
  
    arrayObtenidoPeliculas.forEach((pelicula) => {
      if (cantidadColumnas == 4) {
        //Permite que solo se muestren 4 peliculas por fila
        agregarFila(moviesContainer); // Si ya hay cuatro pelis --> Se agrega una fila
        cantidadColumnas = 0;
      }
  
      let columna = document.createElement("div");
      columna.classList.add("col-md-3");
  
      let infoPelicula = crearEsqueleto(pelicula);
  
      columna.innerHTML = infoPelicula;
  
      moviesContainer.appendChild(columna);
  
      cantidadColumnas++;
    });
}
  
// 2.) AGREGAR A LISTA --> MIS PELICULAS
export function agregarAMisPeliculas(boton) {
    let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
    //let idPelicula = peliculaAsociada.id;
  
    let objetoPelicula = obtenerObjeto(peliculaAsociada.id);
  
    if (!boton.classList.contains("liked")) {//Verifico si el 'click' fue like o dislike
      //si fue dislike, lo saco del array
  
      let indice = arrayMisPeliculas.findIndex(
        (p) => p.titulo === objetoPelicula.titulo
      );
  
      arrayMisPeliculas.splice(indice, 1);
    } else {
      if (objetoPelicula != null) {
        arrayMisPeliculas.push(objetoPelicula);
      } else {
        console.log("Error 404: No se ha encontrado el objeto");
      }
    }
  
    console.log(arrayMisPeliculas);
}

export function filtrarPorGenero(genero){

  let peliculasFiltradas = arrayPeliculas.filter( (pelicula) => {
    //return pelicula.generos.includes(genero)
    return pelicula.generos.map(g => g.toLowerCase()).includes(genero);
  });

  return peliculasFiltradas;

}
  