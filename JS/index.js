class Personaje {
    constructor(userName, userPower, userImg, userDato) {
        this.nombre = userName;
        this.poder = userPower;
        this.imagen = userImg;
        this.dato = userDato;
    }
}
const characters = [
    {
        userName: "Goku",
        userPower: 52000,
        userImg: "http://assets.stickpng.com/images/584e837f6a5ae41a83ddee3b.png",
        userDato: "Le encantan estas batallas, seguro sera entretenido",
    },

    {
        userName: "Vegeta",
        userPower: 50000,
        userImg: "https://www.pngmart.com/files/2/Vegeta-PNG-Photos.png",
        userDato: "Es muy orgulloso ten cuidado, no te dejara vencerlo",
    },

    {
        userName: "Gohan",
        userPower: 34000,
        userImg: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-a2e7-4b45-83ec-311e72e82900/ddmjuhn-d96f723c-2abf-4a03-ae6d-9f3c034a043c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg0ZGMxM2I3LWEyZTctNGI0NS04M2VjLTMxMWU3MmU4MjkwMFwvZGRtanVobi1kOTZmNzIzYy0yYWJmLTRhMDMtYWU2ZC05ZjNjMDM0YTA0M2MucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ld-YmuCCfORBh5jrPUvl5Cf11JMTAF_OLTimXsSvqIQ",
        userDato: "No lo hagas enojar, se dice que su poder puede superar al de su padre y a vegeta",
    }
]

let nombreUsuario;

document.getElementById('formularioUsuario').addEventListener('submit', manejadorFormularioUsiario);

function manejadorFormularioUsiario(e) {
    e.preventDefault();
    nombreUsuario = document.getElementById('user').value;

    let listadoPersonajes = document.getElementById('listaPersonajes');
    const personajes = JSON.parse(localStorage.getItem(nombreUsuario));

    personajes == null ? listadoPersonajes.innerHTML = "<h1>No hay personajes disponibles</h1>" : mostrarPersonajes(personajes);
    mostrarMenu();
}

function mostrarPersonajes(personajes) {
    let listadoPersonajes = document.getElementById('listaPersonajes');
    listadoPersonajes.innerHTML = "";

    personajes.forEach(personaje => {
        let li = document.createElement('li');
        li.innerHTML = `
        <h3 class="tituloPJ">Nombre: ${personaje.nombre}</h3>
        <img src="${personaje.imagen}" alt="${personaje.dato}">
        <p class="powerPj">Poder:  ${personaje.poder}</p>
        `
        const btnBorrar = crearBotonBorrar(personaje);
        li.appendChild(btnBorrar);
        listadoPersonajes.appendChild(li);
    });
}

function crearBotonBorrar(personaje) {
    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = "Borrar";
    btnBorrar.addEventListener('click', () => {
        borrarPersonaje(personaje);
    })
    return btnBorrar;
}

function mostrarMenu() {
    const opciones = document.getElementById('opciones');

    opciones.innerHTML =
        `
    <h2> Bienvenido ${nombreUsuario}, con este formulario podras crear personajes para almacenarlos </h2>

    <form id='formularioPersonaje'>
        <input type="text" id="userName" placeholder="Nombre del personaje">
        <input type="number" id="userPower" placeholder="Poder del personaje">
        <input type="text" id="userImg" placeholder="Link de la imagen">
        <input type="text" id="userDato" placeholder="Dato sobre el personaje">
        <button type="submit">Crear Personaje</button>
    </form>
    `
    document.getElementById('formularioPersonaje').addEventListener('submit', crearPersonaje);
}

function crearPersonaje(e) {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const userPower = document.getElementById('userPower').value;
    const userImg = document.getElementById('userImg').value;
    const userDato = document.getElementById('userDato').value;

    const personaje = new Personaje(userName, userPower, userImg, userDato);

    const personajesEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario))

    if (personajesEnLocalStorage == null) {
        localStorage.setItem(nombreUsuario, JSON.stringify([personaje]));
        mostrarPersonajes([personaje]);
    } else {
        personajesEnLocalStorage.push(personaje);
        localStorage.setItem(nombreUsuario, JSON.stringify(personajesEnLocalStorage));
        mostrarPersonajes(personajesEnLocalStorage)
    }
    e.target.reset();
    Swal.fire({
        title: 'Perfecto!',
        text: 'Tu personaje fue creado correctamente.',
        imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/SXU7HVDRJNDLJLDC5D755OYVU4.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Dragon Ball image',
    })
}

function borrarPersonaje(personaje) {
    const personajesEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));
    const newArray = personajesEnLocalStorage.filter(item => item.nombre != personaje.nombre);
    localStorage.setItem(nombreUsuario, JSON.stringify(newArray));
    mostrarPersonajes(newArray);
}

function personajeCard(characters) {

    const pjCard = document.getElementById("contCards");

    pjCard.innerHTML = "";

    characters.forEach(character => {
        const divPj = document.createElement("div");
        divPj.classList.add("pj");
        divPj.innerHTML = `
          <h3 class="tituloPJ">Nombre: ${character.userName}</h3>
          <img src="${character.userImg}" alt="${character.userDato}">
          <p class="powerPj">Poder:  ${character.userPower}</p>
          `;
        pjCard.append(divPj);
    })
}
personajeCard(characters);