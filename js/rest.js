let form = document.getElementById("formulario");
let tablaInfo = document.getElementById("tabla-info");

const url =  'https://6671f1bee083e62ee43da268.mockapi.io/user';

form.addEventListener("submit", agregarUsuario);
async function agregarUsuario(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let nombreInput = formData.get('name');
    let emailInput = formData.get('email');

    let dataToSend = {
        name: nombreInput,
        email: emailInput
    };

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        if(response.ok){
            location.reload() // Si se ingresa un nuevo usuario la pagina se recarga.
        }
        else if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

      
    } catch (error) {
        console.error('Error during the API call:', error);
    }
}

cargarTabla();
function cargarTabla(){
    fetch(url) 
    .then(res => res.json())
    .then(json => {
        for(let i = 0; i < json.length; i++){
            tablaInfo.innerHTML += 
                `<tr id="${json[i].id}">
                <td class='tabla-nombre' id='tabla-nombre-${json[i].id}'>${json[i].name}</td>
                <td class='tabla-email' id='tabla-email-${json[i].id}'>${json[i].email}</td> 
                <td class='tabla-option-btn'><button class='tabla-eliminar-btn' type='button'>Eliminar</button></td>
                <td class='tabla-option-btn'>
                <button class='tabla-editar-btn'>Editar</button>
                <div class='container-tabla-editar hidden'> 
                    <form id='form-editar-${json[i].id}' >
                        <label for='tabla-editar-nombre-${json[i].id}'>Nombre:</label>
                        <input id='tabla-editar-nombre-${json[i].id}' class='tabla-editar-nombre' type='text'>
                        <label for='tabla-editar-email-${json[i].id}'>Email:</label>
                        <input id='tabla-editar-email-${json[i].id}' class='tabla-editar-email' type='text'>
                        <button class='tabla-submit-btn' type='submit'>Guardar</button>
                    </form>
                </div>
                </td>
                </tr>`;
        }       
    })
.then(() => {
    let eliminarBtns = document.querySelectorAll(".tabla-eliminar-btn");
    let editarNombreInputs = document.querySelectorAll(".tabla-editar-nombre");
    let editarEmailInputs = document.querySelectorAll(".tabla-editar-email");

    console.log(editarEmailInputs.values)
    eliminarBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            eliminar(btn.parentElement.parentElement.id);
        });
    });
    document.querySelectorAll(".tabla-editar-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
        
            btn.nextElementSibling.classList.remove("hidden");
            btn.classList.add("hidden");
            //reemplaza los valores en el html y server, selecciona cada form y extrae los datos
            document.querySelectorAll("form[id^='form-editar-']").forEach(form => {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    let id = this.id.replace('form-editar-', '');
                    let nombreInput = document.querySelector(`#tabla-editar-nombre-${id}`).value;
                    let emailInput = document.querySelector(`#tabla-editar-email-${id}`).value;
                    editar(id, nombreInput, emailInput);
                });
            });
        });
})
})
.catch(e => console.log(e));
}




async function eliminar(id) {
    try {
        const response = await fetch(`https://6671f1bee083e62ee43da268.mockapi.io/user/${id}`, {
            method: 'DELETE', 
        });
        
        // Eliminarlo del HTML
        const elementoARemover = document.getElementById(id);
        if (elementoARemover) {
            elementoARemover.remove();
        }

    } catch (error) {
        console.error(error); 
    }
}
async function editar(id, nombreInput, emailInput) {
    let tablaNombreTd = document.getElementById(`tabla-nombre-${id}`);
    let tablaEmailTd = document.getElementById(`tabla-email-${id}`);

    let datos = {
        "name": nombreInput,
        "email": emailInput,
        "id": id
    };
    console.log(datos);
    try {
        const response = await fetch(`https://6671f1bee083e62ee43da268.mockapi.io/user/${id}`, {
            "method": 'PUT',
            "headers": {
                "Content-Type": "application/json" 
            },
            "body": JSON.stringify(datos)
        });
        if (response.ok) {
            tablaNombreTd.innerHTML = nombreInput;
            tablaEmailTd.innerHTML = emailInput;

        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
}

