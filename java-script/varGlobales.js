//ARRAY DE PELICULAS  --> Compuesto por OBJETOS
export let arrayMisPeliculas = []; // Definir como variable global
export let arrayPeliculas = [];
export let arrayWatchlist = [];
export let nombreUsuarioActual = "ninguno";

export function setNombreUsuarioActual(nuevoNombre) {//sino me daba un error y tomaba el nombre como un const
    nombreUsuarioActual = nuevoNombre; 
}