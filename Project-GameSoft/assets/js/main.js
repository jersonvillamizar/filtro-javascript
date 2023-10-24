import { clients_test } from "./clients.js";
import { games_test } from "./game.js";

let clients = []
let games = []
let cart = []
let values = []
let user_buy = ""

window.addEventListener("load", ()=>{
    let _client = JSON.parse(localStorage.getItem("Cgs_clients"))
    let _game = JSON.parse(localStorage.getItem("Cgs_games"))
    if(!_client || !_game){
        localStorage.setItem("Cgs_clients", JSON.stringify(clients_test))
        localStorage.setItem("Cgs_games", JSON.stringify(games_test))
    }
    load_ls()
    show_games(games)
})

function write_ls(){
    localStorage.setItem("Cgs_clients", JSON.stringify(clients))
    localStorage.setItem("Cgs_games", JSON.stringify(games))
    localStorage.setItem("Cgs_cart", JSON.stringify(cart))
}

function load_ls(){
    clients = JSON.parse(localStorage.getItem("Cgs_clients"))
    games = JSON.parse(localStorage.getItem("Cgs_games"))
    cart = JSON.parse(localStorage.getItem("Cgs_cart"))
}

function show_games(games_array){
    let contain = document.getElementById("contain_games");
    for(let x = 0; x < games_array.length; x++){
        contain.innerHTML += `
            <div class="card">
                <img src="${games_array[x].photo}" alt="${games_array[x].name}">
                <div class="card_text">
                    <h2>${games_array[x].name}</h2>
                    <h3>${games_array[x].theme}</h3>
                    <h3>Precio: $${games_array[x].price}</h3>
                    <h3>Puntos de Fidelizacion: ${games_array[x].points}</h3>
                    <button onclick="modal_pay(false, ${x})" data-bs-toggle="modal" data-bs-target="#modal_pay">Comprar</button>
                    <button onclick="add_cart(${x})" data-bs-toggle="modal" data-bs-target="#modal_confirm">Agregar al Carrito</button>
                </div>
            </div>`
    }
    update_cart()
}

function add_cart(index_game){
    let modal = document.querySelector("#modal_confirm .modal-body")
    let game = games[index_game]
    modal.innerHTML=`
        <h5>Confirmas agregar ${game.name} al carrito?</h5>
        <h5>Puntos de Fidelizacion: ${game.points}</h5>
        <h5>Precio: $${game.price}</h5>`
    let button = document.querySelector("#modal_confirm .modal-footer button")
    button.setAttribute("onclick", `confirm_add_cart(${index_game})`)
}

function confirm_add_cart(index){
    cart.push(games[index])
    alert("Agregado al carrito con exito")
    document.getElementById("cls_confirm_modal").click();
    write_ls()
    update_cart()
}

function update_cart(){
    let contain = document.getElementById("counter_cart")
    contain.textContent = `${cart.length}`
}

function show_cart(){
    let modal = document.querySelector("#modal_cart #container_carts")
    let button = document.querySelector("#modal_cart .modal-footer button")
    let total = 0
    let total_cgs = 0
    let full_total = 0
    let i_special = 0
    if(cart.length == 0){
        modal.innerHTML = `<div><h3>No hay juegos en el carrito :(</h3></div>`
        button.classList.add("pay_none")
    }else{
        button.classList.remove("pay_none")
        modal.innerHTML = ""
        for (let x = 0; x < cart.length; x++) {
            let price = cart[x].price
            i_special += price * 0.04
            let price_iva = (price*0.16)+price
            modal.innerHTML += `
                <div class="contain_cart">
                    <button onclick="delete_of_cart(${x})"><img src="../assets/images/trash.svg"></button>
                    <p>${cart[x].name}</p>
                    <p>$${price}</p>
                    <p>$${price_iva}</p>
                    <p>$${price * 0.04}</p>
                    <p>${cart[x].points}</p>
                </div>`
            total += cart[x].price
            full_total += price_iva
            total_cgs += cart[x].points
        }
        modal.innerHTML += `<hr><div class="contain_cart">
                                <p></p>
                                <p>Total: </p>
                                <p>Subtotal</p>
                                <p>Total I.E.</p>
                                <p>Total Neto</p>
                                <p>Total CGS C.</p>
                            </div><div class="contain_cart">
                                <p></p>
                                <p></p>
                                <p>$${full_total}</p>
                                <p>$${i_special}</p>
                                <p>$${full_total + i_special}</p>
                                <p>$${total_cgs}</p>
                            </div>`
    }
    values = [full_total+i_special, total_cgs]
    console.log(values);
}

function delete_of_cart(index){
    if(confirm("Confirma remover el juego del carrito?")){
        cart.splice(index, 1);
        update_cart()
        show_cart()
        write_ls()
    }
}

function modal_pay(if_cart, index){
    let contain = document.querySelector("#modal_pay .contain_clients")
    let contain_buy = document.querySelector("#modal_pay .detail_buy")
    let button = document.querySelector("#modal_pay .modal-footer button")
    button.setAttribute("onclick", `finish_buy(${if_cart})`)
    contain.innerHTML = ""
    for(let x = 0; x < clients.length; x++){
        contain.innerHTML += `
        <button class="b_client" onclick="select_client(${x}, ${if_cart}, ${index})">${clients[x].name}</button>`
    }
    if(if_cart){
        let price = 0
        console.log("dentro del carrito");
        contain_buy.innerHTML=""
        for (let x = 0; x < cart.length; x++) {
            price = cart[x].price
            price += (price*0.16) + (price*0.04)
            contain_buy.innerHTML += `
                <div class="contain_pay">
                    <p>$${cart[x].name}</p>
                    <p>$${price}</p>
                    <p>$${cart[x].points}</p>
                </div><hr>`
        }
        contain_buy.innerHTML += `<hr><div class="contain_pay">
                                <p>Total: </p>
                                <p>$${values[0]}</p>
                                <p>$${values[1]}</p>
                            </div>`
    }else{
        let price = games[index].price
        let total = (price*0.16) + (price*0.04) + price
        console.log("compra unitaria");
        contain_buy.innerHTML=""
        contain_buy.innerHTML += `
                <div class="contain_pay">
                    <p>$${games[index].name}</p>
                    <p>$${total}</p>
                    <p>$${games[index].points}</p>
                </div><hr>`
        values=[games[index].points]
    }
    console.log(values);
}

function select_client(index, type_buy, i_game){
    if(confirm(`Confirma seleccionar el cliente: ${clients[index].name}`)){
        user_buy = clients[index]
        let contain = document.querySelector("#modal_pay .contain_clients")
        contain.innerHTML = `<h4>Cliente seleccionado: ${user_buy.name}</h4>
        <button class="b_client" style="width:100%" onclick="change_client(${type_buy}, ${i_game})">Cambiar cliente</button>`
    }
}

function change_client(type_buy, i_game){
    user_buy = ""
    modal_pay(type_buy, i_game)
}

function finish_buy(type_buy){
    if(user_buy == ""){
        alert("Por favor elija a un cliente primero")
    }else{
        if(type_buy){
            if(confirm("Por favor confirma la compra")){
                let i = clients.indexOf(user_buy)
                clients[i].points += values[1]
                let contain_buy = document.querySelector("#modal_pay .detail_buy")
                contain_buy.innerHTML = ""
                alert(`Compra exitosa!, El cliente: ${user_buy.name} ahora tiene ${clients[i].points} CGS Coins!`)
                values = []
                cart = []
                user_buy = ""
                document.getElementById("cls_m_p_cart").click();
                update_cart()
                write_ls()
            }
        }else{
            if(confirm("Por favor confirma la compra")){
                let i = clients.indexOf(user_buy)
                clients[i].points += values[0]
                let contain_buy = document.querySelector("#modal_pay .detail_buy")
                contain_buy.innerHTML = ""
                alert(`Compra exitosa!, El cliente: ${user_buy.name} ahora tiene ${clients[i].points} CGS Coins!`)
                values = []
                document.getElementById("cls_m_p_cart").click();
                user_buy = ""
                update_cart()
                write_ls()
            }
        }
    }
}

window.add_cart = add_cart
window.confirm_add_cart = confirm_add_cart
window.show_cart = show_cart
window.delete_of_cart = delete_of_cart
window.modal_pay = modal_pay
window.select_client = select_client
window.change_client = change_client
window.finish_buy = finish_buy
