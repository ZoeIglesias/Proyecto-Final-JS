import { arrayPeliculas, arrayMisPeliculas, arrayWatchlist} from './varGlobales.js';
import {obtenerObjeto, crearEsqueletoSimplificado, agregarFila, agregarAlDoc} from './funciones.js'
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
  
  
function buscarSegunNombre(tituloPelicula) {
    let pelicualsEncontradas = arrayPeliculas.filter((pelicula) => {
      return pelicula.titulo.toLowerCase() === tituloPelicula; //sin el return no funca
    });
  
    return pelicualsEncontradas;
}
  
function buscarSegunDirector(director) {
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
      let informacion = `
      <div class="avisoNoHayPelicula">
        <h1 class="aviso">NO HAY PELÍCULAS PARA MOSTRAR</h1>
        <button class ="btn-home" id="btn-voler-inicio">VOLVER AL INICIO
        <i class="fa-solid fa-house"></i>
        </button>
      </div>
  `;
        
    moviesContainer.innerHTML = informacion;
    // Agregar evento de clic al botón para volver al inicio
    let btnVolverInicio = document.getElementById("btn-voler-inicio");
    btnVolverInicio.onclick = function (event) {
      event.preventDefault();
      agregarAlDoc()
    }
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
  
      let infoPelicula = crearEsqueletoSimplificado(pelicula); //para que no se vean los botones
  
      columna.innerHTML = infoPelicula;
  
      moviesContainer.appendChild(columna);
  
      cantidadColumnas++;
    });
}

function filtrarPorGenero(genero){

  let peliculasFiltradas = arrayPeliculas.filter( (pelicula) => {
    //return pelicula.generos.includes(genero)
    return pelicula.generos.map(g => g.toLowerCase()).includes(genero);
  });

  return peliculasFiltradas;

}

// 2.) AGREGAR A LISTA --> MIS PELICULAS
export function agregarAMisPeliculas(boton) {
    let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
    
    let objetoPelicula = obtenerObjeto(peliculaAsociada.id); //Obtengo el OBJETO

    objetoPelicula.meGusta();


    if (objetoPelicula.like) { //Verifico si el 'click' fue like o dislike
      boton.classList.add("corazon-activo");
      if ((objetoPelicula != null) && !(arrayMisPeliculas.includes(objetoPelicula))) {
        arrayMisPeliculas.push(objetoPelicula);//la agrego a mi lista de peliculas
      } else {
        console.log("Error 404: No se ha encontrado el objeto");
      }

    } else {
      boton.classList.remove("corazon-activo");
      let indice = arrayMisPeliculas.findIndex( (p) => p.titulo === objetoPelicula.titulo);
  
      arrayMisPeliculas.splice(indice, 1);//la saco a mi lista de peliculas
      
    }
    
    console.log(objetoPelicula.like)
}

// 3.) AGREGAR A LISTA --> WATCHLIST
export function agregarAWatchlist(boton){
  let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
  
  let objetoPelicula = obtenerObjeto(peliculaAsociada.id); //Obtengo el OBJETO

  objetoPelicula.manejarWatchlist();
  console.log(objetoPelicula.enWatchlist)
  if(objetoPelicula.enWatchlist){
    boton.classList.add("enWatchlist");
   
    if((objetoPelicula != null) && !(arrayWatchlist.includes(objetoPelicula))){
      arrayWatchlist.push(objetoPelicula);
    }else{
      console.log("Error 404: No se ha encontrado el objeto");
    }

  }else{
    boton.classList.remove("enWatchlist");

    let indice = arrayWatchlist.findIndex( (p) => p.titulo === objetoPelicula.titulo);
  
    arrayWatchlist.splice(indice, 1);//la saco a mi lista de peliculas
  }

}

//4.) Rankear pelicula
export function rankearPelicula(boton){
  let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
  
  let objetoPelicula = obtenerObjeto(peliculaAsociada.id); //Obtengo el OBJETO

  let ranking = boton.id //me devuelve (Ej: "ranking-1"; "rankign-2"; etc)

  let stars = obtenerRankingNumerico(ranking);

  objetoPelicula.puntuar(stars);

  console.log(objetoPelicula.puntaje)
  let starButtons = peliculaAsociada.querySelectorAll(".btn-stars");
  
  starButtons.forEach((button, index) => { //itero sobre cada boton (estrellita) y su indice
      if (index < stars) { //Si el índice del botón es menor que el puntaje ==> la estrella debe ser marcada
          button.classList.add("puntuada"); 
      } else { //si no agreggo el else y vuvelo a puntuar quedan las otraas estrellas marcadas
          button.classList.remove("puntuada"); 
      }
  });

  

}

export function obtenerRankingNumerico(ranking){

  let star;
  switch(ranking){
    case "ranking-1": 
      star = 1;
      break;
    case "ranking-2":
      star = 2;
      break;
    case "ranking-3":
      star = 3;
      break;
    case "ranking-4":
      star = 4;
      break;
    case "ranking-5":
      star = 5;
      break;
    default:
      star = null;
  }
  return star;
}

/*export function mostrarMisRankings(){

  let moviesContainer = document.getElementById("espacio-peliculas");
  moviesContainer.innerHTML = ""; // Para borrar las peliculas del incio, sino se sobreescriben

  let peliculasPuntuadas = arrayPeliculas.filter((p) => p.puntuada)

  if(peliculasPuntuadas.length === 0){
    let informacion = `
    <div class="avisoNoHayPelicula">
      <h1 class="aviso">NO HAY PELÍCULAS PARA MOSTRAR</h1>
      <button class ="btn-home" id="btn-voler-inicio">VOLVER AL INICIO
      <i class="fa-solid fa-house"></i>
      </button>
    </div>
`;
      
  moviesContainer.innerHTML = informacion;
  // Agregar evento de clic al botón para volver al inicio
  let btnVolverInicio = document.getElementById("btn-voler-inicio");
  btnVolverInicio.onclick = function (event) {
    event.preventDefault();
    agregarAlDoc()
  }
  }

  //TODO: QUE SE MEUSTREN EN PANTALLA LAS PELIC CON LOS RANKINS
  let peliculaRankigUno = peliculasPuntuadas.filter((p) => p.puntaje == 1);
  let peliculaRankigDos = peliculasPuntuadas.filter((p) => p.puntaje == 2);
  let peliculaRankigTres = peliculasPuntuadas.filter((p) => p.puntaje == 3);
  let peliculaRankigCuatro = peliculasPuntuadas.filter((p) => p.puntaje == 4);
  let peliculaRankigCinco = peliculasPuntuadas.filter((p) => p.puntaje == 5);

  
}*/

/*function buscador(){
   //TODO: //Funcion parecido a agregar al Doc --> Abstraer
   let moviesContainer = document.getElementById("espacio-peliculas");
   moviesContainer.innerHTML = ""; // Para borrar las peliculas del incio, sino se sobreescriben

   if(arrayObtenidoPeliculas.length === 0){
     let informacion = `
     <div class="avisoNoHayPelicula">
       <h1 class="aviso">NO HAY PELÍCULAS PARA MOSTRAR</h1>
       <button class ="btn-home" id="btn-voler-inicio">VOLVER AL INICIO
       <i class="fa-solid fa-house"></i>
       </button>
     </div>
 `;
       
   moviesContainer.innerHTML = informacion;
   // Agregar evento de clic al botón para volver al inicio
   let btnVolverInicio = document.getElementById("btn-voler-inicio");
   btnVolverInicio.onclick = function (event) {
     event.preventDefault();
     agregarAlDoc()
   }
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
 
     let infoPelicula = crearEsqueletoSimplificado(pelicula); //para que no se vean los botones
 
     columna.innerHTML = infoPelicula;
 
     moviesContainer.appendChild(columna);
 
     cantidadColumnas++;
   });
}*/