//-----------------CLASE PELICULA-----------------//
export default class Pelicula {
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