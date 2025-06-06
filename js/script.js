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
                <button onclick ="EliminarPersona(${persona.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

ObtenerRegistros();



//Proceso para agregar registros
const modal = document.getElementById("mdAgregar");
const button = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btnCerrarModal");
button.addEventListener("click", ()=> {
    modal.showModal();//Abre el modal cuando a btnAgregar se le hace click 
});
btnCerrar.addEventListener("click", ()=>{
    modal.close(); // Cerrar el modal
})

//Agregar nuevo registro desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e =>{    
    e.preventDefault();//Evita que los datos se envien por defecto
    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtEmail").value.trim();

    //Validar los datos
    if(!nombre || !Apellido || !Correo){
        alert("Complete todos los campos");
        return;//Evita que el codigo se siga ejecutando
    }

    //Llama a la API para enviar los datos
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, Apellido, Correo})
    });
    if(respuesta.ok){
        //Mensaje de Confitmación
        alert("El registro fue agregado correctamente")
        
        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();
        //Cerrar el modal (dialog)
        modal.close();
        //Recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al guardar")
    }
    
});

//Función para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Está seguro de eliminar el registro?");

    //Validamos si el usuario eligio "Aceptar"
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }); // llamada al endpoint
         //Recargar la tabla para actualizar la vista
        ObtenerRegistros();
    }
   
    
}