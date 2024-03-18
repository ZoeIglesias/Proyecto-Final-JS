//-----------------CLASE PELICULA-----------------//
class Pelicula {
  constructor(titulo, imagen, generos, director, duracion) {
    this.titulo = titulo;
    this.imagen = imagen;
    this.generos = generos;
    this.director = director;
    this.duracion = duracion; //en minutos
    this.puntaje = null;
    this.vista = false;
  }

  marcarComoVista() {
    this.vista = true;
  }

  puntuar(puntaje) {
    this.puntaje = puntaje;
  }
}
//ARRAY DE PELICULAS  --> Compuesto por OBJETOS
let peliculas = [];
//-----------------------INSTANCIAS-----------------------//
//crearObjetoPelicula(Titulo, Imagen, [Genero/s], Director, Duracion)

crearObjetoPelicula("About Time", "../html-css/imagenes/about-time-2.jpg", ["Romance","Drama",],"Richard Curtis", 123);
crearObjetoPelicula("La La Land", "../html-css/imagenes/la-la-land.jpg", ["Musical","Romance",], "Damien Chzelle", 127);
crearObjetoPelicula("Inception", "../html-css/imagenes/inception-portada.jpg", ["Accion","Ciencia Ficcion",], "Christopher Nolan", 148);
crearObjetoPelicula("The Truman Show", "../html-css/imagenes/trumanShow-portada.jpg", ["Drama", "Comedia"], "Peter Weir", 103);
crearObjetoPelicula("El Padrino", "../html-css/imagenes/el-padrino.jpg", ["Drama", "Crimen"], "Francis Ford Coppola", 175);
crearObjetoPelicula("The Holdovers", "../html-css/imagenes/the-holdovers-2.jpg", ["Comedia","Drama", "Enseñanza"], "Alexander Payne", 130);
crearObjetoPelicula("Spider-Man: Across The Spider Verse","../html-css/imagenes/spider-across.jpg",["Animacion", "Aventura"], "Joaquim Dos Santos", 140);
crearObjetoPelicula("La Sociedad De La Nieve", "../html-css/imagenes/la-sociedad-de-la-nieve.jpg", ["Supervivencia", "Drama"],"J.A. Bayona", 144);






//---------------------------------main()------------------------------------------------------//
agregarAlDoc();

//-------------------FUNCIONES-----------------------//
//-----LOGICA PARA AGREGAR LAS PELIS AL DOC HTML------//
function agregarAlDoc() {
  let moviesContainer = document.getElementById("movies-container");
  let cantidadColunas = 0;

  peliculas.forEach((pelicula) => {
    if (cantidadColunas == 4) {
      //Permite que solo se muestren 4 peliculas por fila
      agregarFila(moviesContainer); // Si ya hay cuatro pelis --> Se agrega una fila
    }

    let columna = document.createElement("div");
    columna.classList.add("col-md-3");

    let infoPelicula = crearEsqueleto(pelicula);

    columna.innerHTML = infoPelicula;

    moviesContainer.appendChild(columna);

    cantidadColunas++;
  });
}

function crearEsqueleto(pelicula) {
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
        <div class="pelicula">
            <div class= "secuencia">
              <h3 class="titulo-pelicula">${pelicula.titulo}</h3>
              <p>Direccion: ${pelicula.director}</p>
              <p>Duracion: ${pelicula.duracion}</p>
            </div>
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="img-fluid">
            <p class="genero-pelicula">${generosAMostrar}</p>
        </div>
    `;
  return informacion;
}

function agregarFila(divContenedor) {
  let fila = document.createElement("div");
  fila.classList.add("row");
  divContenedor.appendChild(fila);

  cantidadColunas = 0;
}

function agregarPelicula(pelicula) {
  /*let pelicula = crearObjetoPelicula(titulo, imagen, genero);*/
  peliculas.push(pelicula);
}

function crearObjetoPelicula(titulo, imagen, genero,director,duracion) {
  let nuevaPelicula = new Pelicula(titulo, imagen, genero,director,duracion);
  agregarPelicula(nuevaPelicula);
  return nuevaPelicula;
}
