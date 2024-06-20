let form = document.getElementById("formulario");
let tablaInfo = document.getElementById("tabla-info");
    
form.addEventListener("submit", api);
function api(event){
    event.preventDefault();
    let formData = new FormData(form);
    let inputName = formData.get('name');
    let inputEmail = formData.get('email');     
    console.log(inputName);
    console.log(inputEmail);

    
    let data = [
        {
            name: inputName,
            email: inputEmail
        }
    ]

        
        
        tablaInfo.innerHTML += 
                "<tr>" +
                "<td class='tabla-nombre'>" + data[0].name + "</td>" +
                "<td class='tabla-email'>" + data[0].email + "</td>" + 
                "</tr>";


    
    }
    

cargarTabla();
function cargarTabla(){
    const url =  'https://6671f1bee083e62ee43da268.mockapi.io/user';
    
    fetch(url) 
    .then(res => res.json())
    .then(json => {
        for(let i = 0; i < json.length; i++){
            tablaInfo.innerHTML += 
                "<tr>" +
                "<td class='tabla-nombre'>" + json[i].name + "</td>" +
                "<td class='tabla-email'>" + json[i].email + "</td>" + 
                "</tr>";
        }
    })
    .catch(e => console.log(e));

    
}