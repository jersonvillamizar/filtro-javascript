export {client, clients_test}

class client{
    constructor(id, name, surname, number, email, birthdate, nacionality){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.number = number;
        this.email = email;
        this.birthdate = birthdate;
        this.nacionality = nacionality
        this.points = 0
    }
}

let clients = []

let client1 = new client(123, "Eduard", "Rodriguez", 313367, "eso@gmail.com", "2003-01-05", "colombian");
let client2 = new client(456, "Andres", "Holguin", 809865, "eso1@gmail.com", "2000-10-20", "colombian");
let client3 = new client(789, "Ines", "Esario", 987654, "eso2@gmail.com", "2000-09-08", "colombian");
let client4 = new client(159, "Monica", "Galindo", 321654, "eso3@gmail.com", "1995-12-10", "colombian");
let client5 = new client(753, "Alan", "Brito", 951357, "eso4@gmail.com", "2004-04-25", "colombian");

let clients_test = [client1, client2, client3, client4, client5]

window.addEventListener("load", ()=>{
    try {
        let _client = JSON.parse(localStorage.getItem("Cgs_clients"))
        if(!_client){
            localStorage.setItem("Cgs_clients", JSON.stringify(clients_test))
        }
        load_ls()
        show_clients(clients)
        order(0,"id")
        document.getElementById("data_new_client").innerHTML += `${select_country}`
    } catch (e) {
        console.log(e);
    }
})

function write_ls(){
    localStorage.setItem("Cgs_clients", JSON.stringify(clients))
}

function load_ls(){
    clients = JSON.parse(localStorage.getItem("Cgs_clients"))
}

function show_clients(clients_array){
    let contain = document.getElementById("show_clients")
    contain.innerHTML = ""
    for (let x = 0; x < clients_array.length; x++) {
        contain.innerHTML += `
        <div class="contain_client" data-id="${x}">
            <h5>${clients_array[x].id}</h5>
            <h5>${clients_array[x].name}</h5>
            <h5>${clients_array[x].surname}</h5>
            <h5>${clients_array[x].email}</h5>
            <h5>${clients_array[x].nacionality}</h5>
            <h5>${clients_array[x].birthdate}</h5>
            <h5>${clients_array[x].number}</h5>
            <button onclick="delete_client(this)"><img src="../assets/images/trash.svg"></button>
            <button onclick="modify_client(this)" data-bs-toggle="modal" data-bs-target="#modal_modify_client"><img src="../assets/images/arrow-repeat.svg"></button>
        </div>`
    }
    charge_points()
}

function charge_points(){
    let contain = document.querySelector("#container_points")
    contain.innerHTML = ""
    for (let x = 0; x < clients.length; x++) {
        contain.innerHTML += `
        <div class="info_cart">
            <p>${clients[x].id}</p>
            <p>${clients[x].name}</p>
            <p>${clients[x].points}</p>
        </div>`
    }
}

function modify_client(button){
    let index = button.parentElement.getAttribute("data-id")
    let option = document.querySelector("#option_change").value
    update_modal_modify(option, index)
    document.querySelector("#option_change").addEventListener("change", ()=>{
        option = document.querySelector("#option_change").value
        update_modal_modify(option, index)
    })
}

function update_modal_modify(option, index){
    let contain = document.querySelector("#modify")
    contain.innerHTML=`
        <p>Modificando a: ${clients[index].name}</p>
        <label for="">Ingrese la nueva informacion: </label>`
    if (option == "nacionality"){
        contain.innerHTML += `${select_country}`
    }else if (option == "id" || option == "number"){
        contain.innerHTML += `<input type="number" oninput="limit_digits(this)">`
    }else if (option == "birthdate"){
        contain.innerHTML += `<input type="date">`
    }else{
        contain.innerHTML += `<input type="text">`
    }
    contain.innerHTML += `<button id="save_changes">Guardar</button>`
    contain.querySelector("#save_changes").addEventListener("click", ()=>{
        let input = contain.querySelector("input")
        if(option == "nacionality"){
            let select = contain.querySelector("select")
            clients[index].nacionality = select.value
            alert("Cambio realizado correctamente")
            write_ls()
            show_clients(clients)
            document.getElementById("cls_mod_mod_cl").click();
            document.getElementById("text_search").value = "";
        }else if (option == "id"){
            let validation = true
            for (let x = 0; x < clients.length; x++) {
                if (input.value.trim() == clients[x].id) {
                    validation = false
                }
            }
            if(validation){
                clients[index].id = input.value.trim()
                successful_modify(input)
            }else{
                alert("Ya existe esa ID, verifica")
            }
        }else if(option == "birthdate"){
            let validation = validation_age(input)
            if(validation){
                clients[index].birthdate = input.value.trim()
                successful_modify(input)
            }else{
                alert("No eres mayor de edad, verifica")
            }
        }else if(option == "email"){
            let validation = validation_email(input)
            if(validation){
                clients[index].email = input.value.trim()
                successful_modify(input)
            }else{
                alert("Ingresa un correo valido")
            }
            
        }else{
            if(input.value.trim() == ""){
                alert("Ingresa un dato valido")
            }else if (option == "name"){
                clients[index].name = input.value.trim()
            }else if (option == "surname"){
                clients[index].surname = input.value.trim()
            }else if (option == "number"){
                clients[index].number = input.value.trim()
            }
            successful_modify(input)
        }
    })
}

function successful_modify(input){
    alert("Cambio realizado correctamente")
    input.value = ""
    write_ls()
    show_clients(clients)
    document.getElementById("cls_mod_mod_cl").click();
    document.getElementById("text_search").value = "";
}

function limit_digits(input) {
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
}

function add_client(){
    let inputs = document.querySelectorAll("#data_new_client input")
    let select = document.querySelector("#data_new_client select").value
    let validation_all = true
    let validation_id = true
    let validation_em = true
    let validation_ag = true
    inputs.forEach((input) =>{
        if(input.value.trim() == ""){
            validation_all = false
        }
    })
    if(!validation_all){
        alert("Completa toda la informacion")
    }
    for (let x = 0; x < clients.length; x++) {
        if (inputs[0].value.trim() == clients[x].id) {
            validation_id = false
        }
    }
    if(!validation_id){
        alert("El ID ingresado ya existe, valida")
    }
    if(!validation_email(inputs[4])){
        validation_em = false
        alert("Ingresa un correo valido")
    }
    if(!validation_age(inputs[5])){
        validation_ag = false
        alert("Debes ser mayor de edad, valida la fecha")
    }
    if(validation_all && validation_id && validation_em && validation_ag){
        let new_client = new client(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value, select)
        alert("Cliente creado correctamente")
        clients.push(new_client)
        write_ls()
        show_clients(clients)
        inputs.forEach((input) =>{
            input.value = ""
        })
        document.getElementById("cls_mod_new_cl").click()
    }   
}

function delete_client(button){
    let index = button.parentElement.getAttribute("data-id")
    if(confirm("Seguro de eliminar el cliente?")){
        clients.splice(index, 1)
        write_ls()
        show_clients(clients)
        alert("Cliente eliminado exitosamente")
    }
}

function validation_age(input){
    let birthdate = new Date(input.value);
    let current_date = new Date();
    let age = current_date.getFullYear() - birthdate.getFullYear()
    let month = current_date.getMonth() - birthdate.getMonth()
    if(month < 0 || (month === 0 && current_date.getDate() < birthdate.getDate())){
        age--;
    }
    if(age >= 18){
        return true
    }else{
        return false
    }
}

function validation_email(input){
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(input.value)) {
        return true
    } else {
        return false
    }
}

function order(index, parameter){
    let inputs = document.querySelectorAll(".table_clients button")
    for (let x = 0; x < 7; x++) {
        let input = inputs[x]
        let img = input.querySelector("img")
        if(x != index && img.classList.contains("selected")){
            img.classList.remove("selected")
            img.classList.remove("up")
        }   
    }
    let img = inputs[index].querySelector("img")
    img.classList.add("selected")
    if(img.classList.contains("up")){
        ordering(parameter,false)
        img.classList.toggle("up")
        img.setAttribute("src", "../assets/images/arrow-down.svg")
    }else{
        ordering(parameter, true)
        img.classList.toggle("up")
        img.setAttribute("src", "../assets/images/arrow-up.svg")
    }
    show_clients(clients)
}

function ordering(parameter, up){
    if(up){
        if (parameter === "id" || parameter === "number") {
            clients.sort((a, b) => b[parameter] - a[parameter]);
        }else if(parameter === "nacimiento"){
            clients.sort((a, b) => (b[parameter] < a[parameter]) ? -1 : (b[parameter] > a[parameter]) ? 1 : 0);
        }else{
            clients.sort((a, b) => b[parameter].localeCompare(a[parameter]));
        }
    }else{
        if (parameter === "id" || parameter === "number") {
            clients.sort((a, b) => a[parameter] - b[parameter]);
        }else if(parameter === "birthdate"){
            clients.sort((a, b) => (a[parameter] < b[parameter]) ? -1 : (a[parameter] > b[parameter]) ? 1 : 0);
        }else{
            clients.sort((a, b) => a[parameter].localeCompare(b[parameter]));
        }
    }
}

function search(){
    let select = document.getElementById("select_search").value
    let input = document.getElementById("text_search").value.toLowerCase();
    if(input.trim()==""){
        show_clients(clients)
    }else{
        let clients_search = clients.filter(client => {
            return client[select].toString().toLowerCase().includes(input);
        });
        show_clients(clients_search)
    }
}

window.modify_client = modify_client
window.add_client = add_client
window.delete_client = delete_client
window.limit_digits = limit_digits
window.order = order
window.search = search


let select_country = `<select name="pais">
<option value="Afganistán">Afganistán</option>
<option value="Albania">Albania</option>
<option value="Alemania">Alemania</option>
<option value="Andorra">Andorra</option>
<option value="Angola">Angola</option>
<option value="Anguilla">Anguilla</option>
<option value="Antártida">Antártida</option>
<option value="Antigua y Barbuda">Antigua y Barbuda</option>
<option value="Antillas Holandesas">Antillas Holandesas</option>
<option value="Arabia Saudí">Arabia Saudí</option>
<option value="Argelia">Argelia</option>
<option value="Argentina">Argentina</option>
<option value="Armenia">Armenia</option>
<option value="Aruba">Aruba</option>
<option value="Australia">Australia</option>
<option value="Austria">Austria</option>
<option value="Azerbaiyán">Azerbaiyán</option>
<option value="Bahamas">Bahamas</option>
<option value="Bahrein">Bahrein</option>
<option value="Bangladesh">Bangladesh</option>
<option value="Barbados">Barbados</option>
<option value="Bélgica">Bélgica</option>
<option value="Belice">Belice</option>
<option value="Benin">Benin</option>
<option value="Bermudas">Bermudas</option>
<option value="Bielorrusia">Bielorrusia</option>
<option value="Birmania">Birmania</option>
<option value="Bolivia">Bolivia</option>
<option value="Bosnia y Herzegovina">Bosnia y Herzegovina</option>
<option value="Botswana">Botswana</option>
<option value="Brasil">Brasil</option>
<option value="Brunei">Brunei</option>
<option value="Bulgaria">Bulgaria</option>
<option value="Burkina Faso">Burkina Faso</option>
<option value="Burundi">Burundi</option>
<option value="Bután">Bután</option>
<option value="Cabo Verde">Cabo Verde</option>
<option value="Camboya">Camboya</option>
<option value="Camerún">Camerún</option>
<option value="Canadá">Canadá</option>
<option value="Chad">Chad</option>
<option value="Chile">Chile</option>
<option value="China">China</option>
<option value="Chipre">Chipre</option>
<option value="Ciudad del Vaticano">Ciudad del Vaticano</option>
<option value="Colombia" selected>Colombia</option>
<option value="Comores">Comores</option>
<option value="Congo">Congo</option>
<option value="República Democrática del Congo">República Democrática del Congo</option>
<option value="Corea">Corea</option>
<option value="Corea del Norte">Corea del Norte</option>
<option value="Costa de Marfíl">Costa de Marfíl</option>
<option value="Costa Rica">Costa Rica</option>
<option value="Croacia">Croacia</option>
<option value="Cuba">Cuba</option>
<option value="Dinamarca">Dinamarca</option>
<option value="Djibouti">Djibouti</option>
<option value="Dominica">Dominica</option>
<option value="Ecuador">Ecuador</option>
<option value="Egipto">Egipto</option>
<option value="El Salvador">El Salvador</option>
<option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos</option>
<option value="Eritrea">Eritrea</option>
<option value="Eslovenia">Eslovenia</option>
<option value="España">España</option>
<option value="Estados Unidos">Estados Unidos</option>
<option value="Estonia">Estonia</option>
<option value="Etiopía">Etiopía</option>
<option value="Fiji">Fiji</option>
<option value="Filipinas">Filipinas</option>
<option value="Finlandia">Finlandia</option>
<option value="Francia">Francia</option>
<option value="Gabón">Gabón</option>
<option value="Gambia">Gambia</option>
<option value="Georgia">Georgia</option>
<option value="Ghana">Ghana</option>
<option value="Gibraltar">Gibraltar</option>
<option value="Granada">Granada</option>
<option value="Grecia">Grecia</option>
<option value="Groenlandia">Groenlandia</option>
<option value="Guadalupe">Guadalupe</option>
<option value="Guam">Guam</option>
<option value="Guatemala">Guatemala</option>
<option value="Guayana">Guayana</option>
<option value="Guayana Francesa">Guayana Francesa</option>
<option value="Guinea">Guinea</option>
<option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
<option value="Guinea-Bissau">Guinea-Bissau</option>
<option value="Haití">Haití</option>
<option value="Honduras">Honduras</option>
<option value="Hungría">Hungría</option>
<option value="India">India</option>
<option value="Indonesia">Indonesia</option>
<option value="Irak">Irak</option>
<option value="Irán">Irán</option>
<option value="Irlanda">Irlanda</option>
<option value="Isla Bouvet">Isla Bouvet</option>
<option value="Isla de Christmas">Isla de Christmas</option>
<option value="Islandia">Islandia</option>
<option value="Islas Caimán">Islas Caimán</option>
<option value="Islas Cook">Islas Cook</option>
<option value="Islas de Cocos o Keeling">Islas de Cocos o Keeling</option>
<option value="Islas Faroe">Islas Faroe</option>
<option value="Islas Heard y McDonald">Islas Heard y McDonald</option>
<option value="Islas Malvinas">Islas Malvinas</option>
<option value="Islas Marianas del Norte">Islas Marianas del Norte</option>
<option value="Islas Marshall">Islas Marshall</option>
<option value="Islas menores de Estados Unidos">Islas menores de Estados Unidos</option>
<option value="Islas Palau">Islas Palau</option>
<option value="Islas Salomón">Islas Salomón</option>
<option value="Islas Svalbard y Jan Mayen">Islas Svalbard y Jan Mayen</option>
<option value="Islas Tokelau">Islas Tokelau</option>
<option value="Islas Turks y Caicos">Islas Turks y Caicos</option>
<option value="Islas Vírgenes (EEUU)">Islas Vírgenes (EEUU)</option>
<option value="Islas Vírgenes (Reino Unido)">Islas Vírgenes (Reino Unido)</option>
<option value="Islas Wallis y Futuna">Islas Wallis y Futuna</option>
<option value="Israel">Israel</option>
<option value="Italia">Italia</option>
<option value="Jamaica">Jamaica</option>
<option value="Japón">Japón</option>
<option value="Jordania">Jordania</option>
<option value="Kazajistán">Kazajistán</option>
<option value="Kenia">Kenia</option>
<option value="Kirguizistán">Kirguizistán</option>
<option value="Kiribati">Kiribati</option>
<option value="Kuwait">Kuwait</option>
<option value="Laos">Laos</option>
<option value="Lesotho">Lesotho</option>
<option value="Letonia">Letonia</option>
<option value="Líbano">Líbano</option>
<option value="Liberia">Liberia</option>
<option value="Libia">Libia</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Lituania">Lituania</option>
<option value="Luxemburgo">Luxemburgo</option>
<option value="Macedonia, Ex-República Yugoslava de">Macedonia, Ex-República Yugoslava de</option>
<option value="Madagascar">Madagascar</option>
<option value="Malasia">Malasia</option>
<option value="Malawi">Malawi</option>
<option value="Maldivas">Maldivas</option>
<option value="Malí">Malí</option>
<option value="Malta">Malta</option>
<option value="Marruecos">Marruecos</option>
<option value="Martinica">Martinica</option>
<option value="Mauricio">Mauricio</option>
<option value="Mauritania">Mauritania</option>
<option value="Mayotte">Mayotte</option>
<option value="México">México</option>
<option value="Micronesia">Micronesia</option>
<option value="Moldavia">Moldavia</option>
<option value="Mónaco">Mónaco</option>
<option value="Mongolia">Mongolia</option>
<option value="Montserrat">Montserrat</option>
<option value="Mozambique">Mozambique</option>
<option value="Namibia">Namibia</option>
<option value="Nauru">Nauru</option>
<option value="Nepal">Nepal</option>
<option value="Nicaragua">Nicaragua</option>
<option value="Níger">Níger</option>
<option value="Nigeria">Nigeria</option>
<option value="Niue">Niue</option>
<option value="Norfolk">Norfolk</option>
<option value="Noruega">Noruega</option>
<option value="Nueva Caledonia">Nueva Caledonia</option>
<option value="Nueva Zelanda">Nueva Zelanda</option>
<option value="Omán">Omán</option>
<option value="Países Bajos">Países Bajos</option>
<option value="Panamá">Panamá</option>
<option value="Papúa Nueva Guinea">Papúa Nueva Guinea</option>
<option value="Paquistán">Paquistán</option>
<option value="Paraguay">Paraguay</option>
<option value="Perú">Perú</option>
<option value="Pitcairn">Pitcairn</option>
<option value="Polinesia Francesa">Polinesia Francesa</option>
<option value="Polonia">Polonia</option>
<option value="Portugal">Portugal</option>
<option value="Puerto Rico">Puerto Rico</option>
<option value="Qatar">Qatar</option>
<option value="Reino Unido">Reino Unido</option>
<option value="República Centroafricana">República Centroafricana</option>
<option value="República Checa">República Checa</option>
<option value="República de Sudáfrica">República de Sudáfrica</option>
<option value="República Dominicana">República Dominicana</option>
<option value="República Eslovaca">República Eslovaca</option>
<option value="Reunión">Reunión</option>
<option value="Ruanda">Ruanda</option>
<option value="Rumania">Rumania</option>
<option value="Rusia">Rusia</option>
<option value="Sahara Occidental">Sahara Occidental</option>
<option value="Saint Kitts y Nevis">Saint Kitts y Nevis</option>
<option value="Samoa">Samoa</option>
<option value="Samoa Americana">Samoa Americana</option>
<option value="San Marino">San Marino</option>
<option value="San Vicente y Granadinas">San Vicente y Granadinas</option>
<option value="Santa Helena">Santa Helena</option>
<option value="Santa Lucía">Santa Lucía</option>
<option value="Santo Tomé y Príncipe">Santo Tomé y Príncipe</option>
<option value="Senegal">Senegal</option>
<option value="Seychelles">Seychelles</option>
<option value="Sierra Leona">Sierra Leona</option>
<option value="Singapur">Singapur</option>
<option value="Siria">Siria</option>
<option value="Somalia">Somalia</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="St Pierre y Miquelon">St Pierre y Miquelon</option>
<option value="Suazilandia">Suazilandia</option>
<option value="Sudán">Sudán</option>
<option value="Suecia">Suecia</option>
<option value="Suiza">Suiza</option>
<option value="Surinam">Surinam</option>
<option value="Tailandia">Tailandia</option>
<option value="Taiwán">Taiwán</option>
<option value="Tanzania">Tanzania</option>
<option value="Tayikistán">Tayikistán</option>
<option value="Territorios franceses del Sur">Territorios franceses del Sur</option>
<option value="Timor Oriental">Timor Oriental</option>
<option value="Togo">Togo</option>
<option value="Tonga">Tonga</option>
<option value="Trinidad y Tobago">Trinidad y Tobago</option>
<option value="Túnez">Túnez</option>
<option value="Turkmenistán">Turkmenistán</option>
<option value="Turquía">Turquía</option>
<option value="Tuvalu">Tuvalu</option>
<option value="Ucrania">Ucrania</option>
<option value="Uganda">Uganda</option>
<option value="Uruguay">Uruguay</option>
<option value="Uzbekistán">Uzbekistán</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietnam">Vietnam</option>
<option value="Yemen">Yemen</option>
<option value="Yugoslavia">Yugoslavia</option>
<option value="Zambia">Zambia</option>
<option value="Zimbabue">Zimbabue</option>
</select>`