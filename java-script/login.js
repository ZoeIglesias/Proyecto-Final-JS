import { agregarAlDoc, obtenerObjeto } from "./funciones.js";
import { setNombreUsuarioActual} from "./varGlobales.js";
export function iniciarSesionUsuario(){

    console.log(localStorage.length);
    mostarDatosDelStorage();
   //borrarDatosDelStorage();
    //FORMULARIO
    let pagina = document.getElementById("seccion-inicio");
    let contenedorFormulario = document.createElement('div');

    pagina.innerHTML = "";
    let formulario = 
    `
        <form id="formulario">
            <div class="row g-3 align-items-center formulario-inicio">
                <!--Usuario-->
                <div class="col-auto">
                    <label for="userName" class="form-label">Nombre de Usuario</label>
                    <input type="text" class="form-control" id="userName">
                </div>
            </div>
            <button type="submit" class="btn btn-primary texto btn-inicio">Iniciar Sesion</button>
        </form>
    `;

    contenedorFormulario.innerHTML = formulario;

    pagina.appendChild(contenedorFormulario);

    let elementoFormulario = document.getElementById("formulario");

    elementoFormulario.addEventListener('submit', validarDatosUsuario);

    document.querySelector('.user-container').classList.add('hidden');


}


function validarDatosUsuario(event){
    event.preventDefault();

    const usuarioNombre = document.getElementById('userName').value; //sin.value no funciona --> Toma lo que ingreso el usuario
    console.log(usuarioNombre);

    if(usuarioNombre === ''){
        alert("Por favor, ingrese un nombre de usuario válido");
        return;
    }

    let usuariosExistentes = obtenerUsuarios();
    console.log("Usuarios existente -->"+usuariosExistentes);
    let usuarioLogueado = usuariosExistentes.find(usuario => usuario.nombre === usuarioNombre);//busco el usuario entre todos los existentes

    console.log("Usuario encontrado -->"+usuarioLogueado);

    if(!usuarioLogueado){ //si es nulo, es decir no existe lo creo
        let confrimarCreacion = prompt("El usuario ingresado no existe, desea crear uno \nS/N?");

        if(confrimarCreacion.toLowerCase() === "s"){
            alert("Se ha creado un nuevo usuario\n Nuevo Usuario: "+ usuarioNombre);

            usuarioLogueado = {
                nombre: usuarioNombre,
                likes: [],
                watchlist: []
            };

            usuariosExistentes.push(usuarioLogueado); //lo agrego a los usuarios existentes
            
            actualizarStorage(usuarioLogueado); //actualizo el storage
           
        }else{return;}
    }else{
        alert("BIENVENIDO/A DE VUELTA "+usuarioLogueado.nombre);
        if((usuarioLogueado.likes !== null) || (usuarioLogueado.watchlist !== null)){
            actualizarEstadoDeObjetos(usuarioLogueado);
        }
    }

   setNombreUsuarioActual(usuarioLogueado.nombre);
    document.getElementById("formulario").style.display = "none";

    document.querySelector('.user-container').classList.remove('hidden');
    agregarAlDoc();


}

function actualizarEstadoDeObjetos(usuario){
    let arrayLikes = usuario.likes;  //array que guarda el id (titulo) de las peliculas
    let arrayWatchlist = usuario.watchlist;

    actualizarEstadoDePeliculasLikeadas(arrayLikes);
    actualizarEstadoDeWatchlist(arrayWatchlist);

}

export function obtenerUsuarios(){
    let usuarios = localStorage.getItem("usuarios");
    
    if(!usuarios){
        usuarios = [];
    }else{
        console.log("Usuarios del storage-->"+usuarios);
        usuarios = JSON.parse(usuarios);
    }
    console.log("Usuarios del storage-->"+usuarios.length);
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
function actualizarStorage(usuario){
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
function borrarDatosDelStorage(){
    localStorage.clear()
    console.log("Se borraron todos los datos del storage");
    
}

function mostarDatosDelStorage(){
    for(let i =0; i < localStorage.length;i++){
      let clave = localStorage.key(i);
      console.log("Clave: "+ clave+", Valor: "+ localStorage.getItem(clave))
    }
    
}