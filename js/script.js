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
                <button onclick ="AbrirModalEditar('${persona.id}', '${persona.nombre}', '${persona.Apellido}', '${persona.Correo}')">Editar</button>
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

/*Funcionalidad para editar registros*/
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");
btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerrar Modal de Editar
});
function AbrirModalEditar(id, nombre, apellido, correo){
    //Agregamos los valores a los input antes de abrir el modal
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;
    //Modal se abre después de agregar los valores a los input
    modalEditar.showModal();

}

document.getElementById("frmEditar").addEventListener("submit", async e =>{    
    e.preventDefault();//Evita que el formulario se envie de golpe
    
    //Capturamos los valores nuevos del formulario
    const id = document.getElementById("txtIdEditar").value;
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const Apellido = document.getElementById("txtApellidoEditar").value.trim();
    const Correo = document.getElementById("txtEmailEditar").value.trim();

    //Validación de los campos
    if(!id || !nombre || !Apellido || !Correo){
        alert("Complete todos los campos");
        return;//Evita que el codigo se siga ejecutando
    }

    //Llama a la API para enviar los datos
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({Correo, nombre, Apellido})
    }); // llamada al endpoint
  
    if(respuesta.ok){
        //Mensaje de Confitmación
        alert("El registro fue actualizado correctamente")
        
        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();
        //Cerrar el modal (dialog)
        modalEditar.close();
        //Recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al actualizar")
    }
});