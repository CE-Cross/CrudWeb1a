//Dirección del Endpoint generado en Retool
const API_URL = "https://retoolapi.dev/QWWp0Z/Integrantes";

//Funcion que llama a la API y realiza una solicitud GET. Obtiene Un JSON
async function ObtenerRegistros(){
    //Hacemos Get a la API y obtenemos su respuesta (response)
    const respuesta = await fetch(API_URL);

    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json();//Esto ya es un JSON

    //Esto es asombroso
    //Llamamos MostrarRegistros y le enviamos el JSON
    MostrarRegistro(data);
}

//Función para generar las filas de la tabla
//Datos representa al JSON
function MostrarRegistro(datos){
    //Se llama al elemento tbody dentro de la tabla con el id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos innerHTML
    tabla.innerHTML = "";//Vaciamos el contenido de la tabla
    //Por cada persona en el arreglo web
    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td> 
            <td>${persona.nombre}</td> 
            <td>${persona.Apellido}</td> 
            <td>${persona.Correo}</td> 
            <td>
                <button>Editar</button>
                <button>Eliminar</button>
            </td>
        </tr>
        `;
    });
}

ObtenerRegistros();