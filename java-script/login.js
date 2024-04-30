import { agregarAlDoc, obtenerObjeto } from "./funciones.js";
import { setNombreUsuarioActual, nombreUsuarioActual} from "./varGlobales.js";

export function iniciarSesionUsuario() {
    return new Promise((resolve, reject) => {
        console.log(localStorage.length);
        //borrarDatosDelStorage();

        Swal.fire({
            title: 'Iniciar sesión',//titulo del POP-UP
            html: `
                <input type="text" id="login" class="swal2-input" placeholder="Nombre de usuario"> 
            `, 
            confirmButtonText: 'Iniciar sesión',
    
            preConfirm: () => { 
                const login = Swal.getPopup().querySelector('#login').value//obtengo el valor del input mediante el id del input
                if (!login) {
                    Swal.showValidationMessage(`Por favor, ingrese un nombre de usuario válido`)
                }
                return { login: login }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const usuarioNombre = result.value.login;
                validarDatosUsuario(usuarioNombre);
                resolve();
            } else {
                reject();
            }
        });
    });
}
function validarDatosUsuario(usuarioNombre) {

    let usuariosExistentes = obtenerUsuarios();
    let usuarioLogueado = usuariosExistentes.find(usuario => usuario.nombre === usuarioNombre);//busco el usuario entre todos los existentes


    if(!usuarioLogueado){ //si es nulo, es decir no existe lo creo
        Swal.fire({
            title: 'El usuario ingresado no existe, desea crear uno?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Creado',
                    html: `Se ha creado un nuevo usuario\n <br>Nombre nuevo usuario: <b>${usuarioNombre}</b></br>`,
                    icon: 'success'
                });

                usuarioLogueado = {
                    nombre: usuarioNombre,
                    likes: [],
                    watchlist: [],
                    puntajes:[]
                };

                usuariosExistentes.push(usuarioLogueado); //lo agrego a los usuarios existentes
                
                actualizarStorage(usuarioLogueado); //actualizo el storage

                setNombreUsuarioActual(usuarioLogueado.nombre);
                document.querySelector('.user-container').classList.remove('hidden');
                agregarAlDoc();
            }else{
                iniciarSesionUsuario();
            }
        });
    }else{
        Swal.fire('Bienvenido/a de vuelta', usuarioLogueado.nombre, 'success');
        usuarioLogueado.puntajes.forEach(puntaje => 
            console.log("Puntajes del usuario:\n PELICULA:"+puntaje.titulo+" PUNTAJE:"+puntaje.puntaje));

        if((usuarioLogueado.likes !== null) || (usuarioLogueado.watchlist !== null) || (usuarioLogueado.puntajes !== null)){
            actualizarEstadoDeObjetos(usuarioLogueado);
        }
    }

    setNombreUsuarioActual(usuarioLogueado.nombre);
    document.querySelector('.user-container').classList.remove('hidden');
    //agregarAlDoc();
}
function actualizarEstadoDeObjetos(usuario){
    let arrayLikes = usuario.likes;  //array que guarda el id (titulo) de las peliculas
    let arrayWatchlist = usuario.watchlist;
    let arrayPuntajes = usuario.puntajes;

    actualizarEstadoDePeliculasLikeadas(arrayLikes);
    actualizarEstadoDeWatchlist(arrayWatchlist);
    actualizarEstadoDePuntajes(arrayPuntajes);

}

function actualizarEstadoDePuntajes(arrayPuntajes){
    console.log("Puntajes del storage:"+arrayPuntajes);

    if(arrayPuntajes === null) return;
    arrayPuntajes.forEach(puntaje => {
        let objetoPelicula = obtenerObjeto(puntaje.titulo);
        if(objetoPelicula){
            objetoPelicula.puntaje = puntaje.puntaje;
        }
    });

}

export function obtenerUsuarios(){
    let usuarios = localStorage.getItem("usuarios");
    
    if(!usuarios){
        usuarios = [];
    }else{
        usuarios = JSON.parse(usuarios);
    }
    return usuarios;
}


//ACTUALIZACION DE VARIABLES
function actualizarEstadoDeWatchlist(arrayWatchlist){
    
    if(arrayWatchlist === null) return;
    
    arrayWatchlist.forEach(peliId => {
        let objetoPelicula = obtenerObjeto(peliId);
        if(objetoPelicula){
            objetoPelicula.enWatchlist = true;
        }
    });
    
}
function actualizarEstadoDePeliculasLikeadas(arrayLikes){
    if(arrayLikes === null) return;
    arrayLikes.forEach(pelId => {
        let objetoPelicula = obtenerObjeto(pelId);
        if(objetoPelicula){
            objetoPelicula.like = true;
        }
    });
}


//MANEJO DEL STORAGE

export function actualizarStorage(usuario){
    let usuarios = obtenerUsuarios();
    let indice = usuarios.findIndex(u => u.nombre === usuario.nombre);
    
    if(indice !== -1){
        usuarios[indice] = usuario;
    }else{
        usuarios.push(usuario);
    }
    
    let usuariosJSON = JSON.stringify(usuarios);
    localStorage.setItem("usuarios", usuariosJSON);
}

export function obtenerUsuarioActual(){
    let usuarios = obtenerUsuarios();
    let usuarioActual = usuarios.find(u => u.nombre === nombreUsuarioActual);
    return usuarioActual;
}
function borrarDatosDelStorage(){
    localStorage.clear()    
}

function mostarDatosDelStorage(){
    for(let i =0; i < localStorage.length;i++){
      let clave = localStorage.key(i);
      console.log("Clave: "+ clave+", Valor: "+ localStorage.getItem(clave))
    }
    
}