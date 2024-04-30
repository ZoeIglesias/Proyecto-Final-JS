import { arrayPeliculas, nombreUsuarioActual} from './varGlobales.js';
import {obtenerObjeto, crearEsqueletoSimplificado, agregarFila, agregarAlDoc} from './funciones.js'
import { obtenerUsuarios,actualizarStorage,obtenerUsuarioActual } from './login.js';
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

    let moviesContainer = document.getElementById("espacio-peliculas");
    moviesContainer.innerHTML = ""; // Para borrar las peliculas del incio, sino se sobreescriben

    if(arrayObtenidoPeliculas.length === 0){
      Swal.fire({
      title: 'AUN NO HAY PELÍCULAS PARA MOSTRAR 😢',
      confirmButtonText: 'VOLVER AL INICIO',
      //background: 'rgba(255, 255, 0, 0.5)',
      icon: 'warning',
      iconColor: 'black',
      customClass: {
      confirmButton: 'btn-volver-inicio'
      }
      }).then((result) => {
      if (result.isConfirmed) {
      agregarAlDoc();
      }
      });
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
    return pelicula.generos.map(g => g.toLowerCase()).includes(genero);
  });

  return peliculasFiltradas;

}
// 2.) AGREGAR A LISTA --> MIS PELICULAS
export function agregarAMisPeliculas(boton) {
  let usuarioActual = obtenerUsuarioActual(); 
  let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
  
  let objetoPelicula = obtenerObjeto(peliculaAsociada.id); //Obtengo el OBJETO

  objetoPelicula.meGusta();


  if (objetoPelicula.like) { //Verifico si el 'click' fue like o dislike
    boton.classList.add("corazon-activo");
    if ((objetoPelicula != null) && !(usuarioActual.likes.includes(objetoPelicula.titulo))) {
      usuarioActual.likes.push(objetoPelicula.titulo); // guardo solo el título de la película (ID)
      //localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados)); // Actualizo la lista de usuarios guardados en el almacenamiento local
      actualizarStorage(usuarioActual);
    }
  } else {
    boton.classList.remove("corazon-activo");
    let indice = usuarioActual.likes.findIndex((titulo) => titulo === objetoPelicula.titulo);//En el suaurio guardo los ID (titulo) de las peliculas
    usuarioActual.likes.splice(indice, 1);
    //localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados)); 
    actualizarStorage(usuarioActual);
    
  }
  
}

// 3.) AGREGAR A LISTA --> WATCHLIST
export function agregarAWatchlist(boton){
  let usuarioActual = obtenerUsuarioActual(); 
  let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
  
  let objetoPelicula = obtenerObjeto(peliculaAsociada.id); //Obtengo el OBJETO

  objetoPelicula.manejarWatchlist();
  console.log(objetoPelicula.enWatchlist)
  if(objetoPelicula.enWatchlist){
    boton.classList.add("enWatchlist");
   
    if ((objetoPelicula != null) && !(usuarioActual.watchlist.includes(objetoPelicula.titulo))) {
      usuarioActual.watchlist.push(objetoPelicula.titulo);
      //localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      actualizarStorage(usuarioActual);
    }
  }else{
    boton.classList.remove("enWatchlist");
    let indice = usuarioActual.watchlist.findIndex((titulo) => titulo === objetoPelicula.titulo);
    usuarioActual.watchlist.splice(indice, 1);
    //localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));//TODO --> ARMAR FUNCION
    actualizarStorage(usuarioActual);
  }

}
// 4.) Rankear pelicula
export function rankearPelicula(boton) {
  let usuarioActual = obtenerUsuarioActual(); 

  let peliculaAsociada = boton.closest(".pelicula"); //Quiero el CONTEINER que tiene toda la info de la peli
  let objetoPelicula = obtenerObjeto(peliculaAsociada.id); //Obtengo el OBJETO
  let ranking = boton.id; //me devuelve (Ej: "ranking-1"; "rankign-2"; etc)
  let stars = obtenerRankingNumerico(ranking);
 
  // Elimina cualquier puntaje existente para la película
  usuarioActual.puntajes = usuarioActual.puntajes.filter(puntaje => puntaje.titulo !== objetoPelicula.titulo);

  if (objetoPelicula.puntaje === stars) {
    // Si el puntaje actual es igual al puntaje seleccionado, desmarcar las estrellas
    objetoPelicula.puntuar(0);   
  } else {
    objetoPelicula.puntuar(stars);
    console.log(objetoPelicula.titulo);
    usuarioActual.puntajes.push({titulo: objetoPelicula.titulo, puntaje: stars});
  }
   
  console.log(objetoPelicula.puntaje);
  let starButtons = peliculaAsociada.querySelectorAll(".btn-stars");
  
  starButtons.forEach((button, index) => {
    if (index < objetoPelicula.puntaje) {
      button.classList.add("puntuada");
    } else {
      button.classList.remove("puntuada");
    }
  });
   console.log(usuarioActual.puntajes);
  actualizarStorage(usuarioActual);
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

export function mostrarMisRankings(){

  let unaEstrella = obtenerArraySegunPuntaje(1)
  let dosEstrellas = obtenerArraySegunPuntaje(2)
  let tresEstrellas = obtenerArraySegunPuntaje(3)
  let cuatroEstrellas = obtenerArraySegunPuntaje(4)
  let cincoEstrellas = obtenerArraySegunPuntaje(5)
  

  let peliculasAgrupadas = [unaEstrella,dosEstrellas,tresEstrellas,cuatroEstrellas,cincoEstrellas];

  if (peliculasAgrupadas.every(arr => arr.length === 0)) {
    Swal.fire({
      title: 'AUN NO HAY PELÍCULAS PARA MOSTRAR 😢',
      confirmButtonText: 'VOLVER AL INICIO',
      //background: 'rgba(255, 255, 0, 0.5)',
      icon: 'warning',
      iconColor: 'black',
      customClass: {
        confirmButton: 'btn-volver-inicio'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        agregarAlDoc();
      }
    });
    //return;
  }
  
  let moviesContainer = document.getElementById("espacio-peliculas");
  moviesContainer.innerHTML = ""; // Para borrar las peliculas del incio, sino se sobreescriben

   //unaEstrella = [{},{},{}]
  

   for (let i=0; i<peliculasAgrupadas.length; i++){
    if(peliculasAgrupadas[i].length > 0){
      let tituloPuntaje = document.createElement("h2");
      if( i == 0 ){
        tituloPuntaje.textContent = `Películas con ${i+1} estrella`;//Si es 1 estrella
        tituloPuntaje.innerHTML += `<i class="fa-solid fa-star"></i>`;
      }else{
        tituloPuntaje.textContent = `Películas con ${i+1} estrellas`;
        tituloPuntaje.innerHTML += `<i class="fa-solid fa-star"></i>`.repeat(i+1);
      }
      moviesContainer.appendChild(tituloPuntaje);
      let arrayDeObjetosPelicuas = peliculasAgrupadas[i].map(titulo => obtenerObjeto(titulo));
      console.log("MUESTRO");
      mostrarGrupoEnPantalla(arrayDeObjetosPelicuas);
    
    }
  }
  
}
export function mostrarGrupoEnPantalla(arrayObtenidoPeliculas) {
  let moviesContainer = document.getElementById("espacio-peliculas");

  let fila = document.createElement("div");
  fila.classList.add("row");
  moviesContainer.appendChild(fila);

  arrayObtenidoPeliculas.forEach((pelicula) => {
    console.log(pelicula);
    let columna = document.createElement("div");
    columna.classList.add("col-md-3");

    let infoPelicula = crearEsqueletoSimplificado(pelicula); //para que no se vean los botones

    columna.innerHTML = infoPelicula;

    fila.appendChild(columna);
  });
}
function obtenerArraySegunPuntaje(puntaje){
  let usuarioActual = obtenerUsuarioActual(); 
  let array;

  switch(puntaje){
    case 1:
      array = usuarioActual.puntajes.filter((p) => p.puntaje == 1);
      array = array.map(objeto => objeto.titulo);
      return array;
    case 2:
      array = usuarioActual.puntajes.filter((p) => p.puntaje == 2);
      array = array.map(objeto => objeto.titulo);
      return array;
    case 3:
      array = usuarioActual.puntajes.filter((p) => p.puntaje == 3);
      array = array.map(objeto => objeto.titulo);
      return array;
    case 4:
      array = usuarioActual.puntajes.filter((p) => p.puntaje == 4);
      array = array.map(objeto => objeto.titulo);
      return array;
    case 5:
      array = usuarioActual.puntajes.filter((p) => p.puntaje == 5);
      array = array.map(objeto => objeto.titulo);
      return array;
  }
}

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