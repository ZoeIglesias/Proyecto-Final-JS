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
      this.like = false;
      this.enWatchlist = false;
    }
  
    marcarComoVista() {
      this.vista = true;
    }
  
    puntuar(puntaje) {
      this.puntaje = puntaje;
    }

    meGusta(){ //para alternar el funcionamiento
      if(this.like){//si ya estaba 'likeada'
        this.like = false //--> dislike
      }else{
        this.like = true//--> sino la likea
      }
    }

    manejarWatchlist(){
      if(this.enWatchlist){
        this.enWatchlist = false;
      }else{
        this.enWatchlist = true;
      }
    }

    
  }