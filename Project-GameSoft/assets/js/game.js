export {game, games_test}

class game{
    constructor(id, name, photo, theme, price, points){
        this.id = id;
        this.name = name;
        this.photo = photo
        this.theme = theme;
        this.price = price;
        this.points = points
    }
}

let games = []

let game1 = new game(1, "fortnite", "https://store-images.s-microsoft.com/image/apps.9582.70702278257994163.a9af653c-54d0-4c47-a1f0-bd2f08fe0fd1.3ea1af1a-95a6-4543-be33-94c112ed5dc3", "BattleRoyale", 50000, 2)
let game2 = new game(2, "minecraft", "https://m.media-amazon.com/images/M/MV5BYWIzYjUzMGUtZjJlNy00MWVlLWJjNGEtODU1OWFiOWIwOTFjXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg", "aventura", 85000, 3)
let game3 = new game(3, "outlast", "https://m.media-amazon.com/images/M/MV5BN2YwZGI5NjQtYWUwYS00OTcwLWJiODAtZDBkYjU2MTlmMzhlXkEyXkFqcGdeQXVyMTE2MTc3MzU1._V1_.jpg", "terror", 25000, 1)
let game4 = new game(4, "lol", "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S2_1200x1600-aadefb3e74e59e34155e5805aa3a54d6", "ciencia Ficcion", 100000, 4)
let game5 = new game(5, "final fantasy XVI", "https://m.media-amazon.com/images/M/MV5BOTE4NmVjMWItMWQzMy00MDQ5LTk3ZWMtNTRhNDllNjdiMDA1XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg", "fantasia", 125000, 5)

let games_test = [game1, game2, game3, game4, game5]

window.addEventListener("load", ()=>{
    try {
        let _game = JSON.parse(localStorage.getItem("Cgs_games"))
        if(!_game){
            localStorage.setItem("Cgs_games", JSON.stringify(games_test))
        }
        load_ls()
        order(0,"id")
        show_games(games)
    } catch (e) {
        console.log(e);
    }
})

function write_ls(){
    localStorage.setItem("Cgs_games", JSON.stringify(games))
}

function load_ls(){
    games = JSON.parse(localStorage.getItem("Cgs_games"))
}

function show_games(games_array){
    let contain = document.getElementById("show_current_games")
    contain.innerHTML = ""
    for (let x = 0; x < games_array.length; x++) {
        contain.innerHTML += `
        <div class="contain_game" data-id="${x}">
            <h5>${games_array[x].id}</h5>
            <h5>${games_array[x].name}</h5>
            <h5>${games_array[x].theme}</h5>
            <h5>${games_array[x].price}</h5>
            <h5>${games_array[x].points}</h5>
            <button onclick="delete_game(this)"><img src="../assets/images/trash.svg"></button>
        </div>`
    }
}

function add_game(){
    let inputs = document.querySelectorAll("#data_new_game input")
    let select = document.querySelector("#data_new_game select").value
    let validation = true
    let points = inputs[2].getAttribute("data-id")
    if(inputs[0].value.trim() == "" || inputs[2].value.trim() == "" ){
        validation = false
    }
    if(!validation){
        alert("Completa todos los campos")
    }else{
        let img = document.querySelector("#img_new_game img")
        let url = img.getAttribute("src")
        let new_game = new game(parseInt(games.length+1), inputs[0].value.trim(), url, select, parseInt(inputs[2].value.trim()), parseInt(points))
        games.push(new_game)
        write_ls()
        alert("El juego ha sido creado correctamente")
        show_games(games)
        document.getElementById("cls_mod_new_gm").click();
        inputs.forEach((input)=>{ input.value = "" })
    }
}

function order(index, parameter){
    let inputs = document.querySelectorAll(".table_games button")
    for (let x = 0; x < 5; x++) {
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
    show_games(games)
}

function ordering(parameter, up){
    if(up){
        if (parameter === "id" || parameter === "price" || parameter === "points") {
            games.sort((a, b) => b[parameter] - a[parameter]);
        }else{
            games.sort((a, b) => b[parameter].localeCompare(a[parameter]));
        }
    }else{
        if (parameter === "id" || parameter === "price" || parameter === "points") {
            games.sort((a, b) => a[parameter] - b[parameter]);
        }else{
            games.sort((a, b) => a[parameter].localeCompare(b[parameter]));
        }
    }
}

function img_new_game(input){
    let url = input.value
    let img = document.querySelector("#img_new_game img")
    if (url.trim() == ""){
        img.setAttribute("src", "https://thypix.com/wp-content/uploads/2021/10/grey-mobile-wallpaper-background-thypix-98-350x700.jpg")
    }else{
        img.setAttribute("src", url)
    }
}

function calculate_points(input){
    let h5 = document.querySelector("#data_new_game h5")
    let price = input.value
    let points = parseInt(price / 25000)
    h5.textContent = `El juego tendrá ${points} puntos de Fidelizacion`
    input.setAttribute("data-id", points)
}

function delete_game(button){
    let index = button.parentElement.getAttribute("data-id")
    if(confirm("Seguro de eliminar el Videojuego?")){
        games.splice(index, 1)
        write_ls()
        show_games(games)
        alert("Cliente eliminado exitosamente")
    }
}

function search(){
    let select = document.getElementById("select_search").value
    let input = document.getElementById("text_search").value.toLowerCase();
    if(input.trim()==""){
        show_games(games)
    }else{
        let games_search = games.filter(game => {
            return game[select].toString().toLowerCase().includes(input);
        });
        show_games(games_search)
    }
}

window.add_game = add_game
window.img_new_game = img_new_game
window.calculate_points = calculate_points
window.delete_game = delete_game
window.order = order
window.search = search