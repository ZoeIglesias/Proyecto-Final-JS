//ARRAY DE PELICULAS  --> Compuesto por OBJETOS
let peliculas = [
  {titulo: "La La Land", imagen: "../html-css/imagenes/la-la-land.jpg", genero: "Musical"},

];


//-----LOGICA PARA AGREGAR LAS PELIS AL DOC HTML------------------//
let moviesContainer = document.getElementById("movies-container");


peliculas.forEach((pelicula) => {

  let columna = document.createElement("div");
  columna.classList.add("col-md-3");

  let infoPelicula = crearEsqueleto(pelicula);

  columna.innerHTML = infoPelicula;

  moviesContainer.appendChild(columna);

  console.log(cantidadColunas);
});

//---------------------FUNCIONES-----------------------//
function crearEsqueleto(pelicula) {
  let informacion = `
        <div class="pelicula">
            <h3>${pelicula.titulo}</h3>
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="img-fluid">
            <p>${pelicula.genero}
        </div>
    `;
  return informacion;
}
