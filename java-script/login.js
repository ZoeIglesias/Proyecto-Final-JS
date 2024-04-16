import { agregarAlDoc, obtenerObjeto } from "./funciones.js";

export function iniciarSesionUsuario(){

    document.getElementById("container-principal").style.display = "none"; 
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


}


function validarDatosUsuario(event){
    event.preventDefault();

    const usuario = document.getElementById('userName').value; //sin.value no funciona --> Toma lo que ingreso el usuario
    console.log(usuario)
    if(usuario === ''){
        alert("Por favor, ingrese un nombre de usuario válido");
        return;
    }

    let usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuarioLogueado);
    if((!usuarioLogueado) || (usuario !== usuarioLogueado.nombre)){
        let crear = prompt("El usuario ingresado no existe, desea crear uno \nS/N?");

        if(crear.toLowerCase() === "s"){
            alert("Se ha creado un nuevo usuario\n Nombre: "+ usuario);

            const nuevoUsuario = {
                nombre: usuario,
                likes: []
            };

            localStorage.setItem("usuario",JSON.stringify(nuevoUsuario));
        }else{return;}
    }else{
        alert("BIENVENIDO/A DE VUELTA "+usuarioLogueado.nombre);
        if(usuarioLogueado.likes !== null){
            actualizarEstadoDeObjetos(usuarioLogueado);
        }
    }

    document.getElementById("formulario").style.display = "none";

    agregarAlDoc();


}

function actualizarEstadoDeObjetos(usuario){
    let arrayLikes = usuario.likes;  //array que guarda el id (titulo) de las peliculas

    arrayLikes.forEach(pelId => {
        let objetoPelicula = obtenerObjeto(pelId);
        if(objetoPelicula){
            objetoPelicula.like = true;
        }
    });
}