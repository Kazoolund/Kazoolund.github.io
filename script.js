"use strict"

window.addEventListener("DOMContentLoaded", () => { 
    window.addEventListener("keydown", rotate_face);
    real_chess();
    start_chat();
});

function start_chat(){
    let myWebSocket = new WebSocket("ws://127.0.0.1:2345");
    myWebSocket.onmessage = function(event){
        console.log("Received message: " + event.data); 
        let P = document.createElement("p");
        P.textContent = event.data;
        let chatBox = document.getElementById("ChatBox");
        chatBox.appendChild(P);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    let inputField = document.getElementById("ChatInput");
    inputField.addEventListener("keydown", (event) =>{
        if(event.code == "Enter"){
            let chatMessage = inputField.value;
            myWebSocket.send(chatMessage);
            inputField.value = "";
        }
    })
}

let currentPiece = null;

let Pieces = {};

let keypresses = [];

function rotate_face(event) {
    keypresses.push(event.key)
    let face = null;
    if(keypresses.slice(-3).join("") == "pjw"){
        face = document.getElementById("pjw");
    }
    if(keypresses.slice(-4).join("") == "kurt"){
        face = document.getElementById("kurt");
    }
    if(keypresses.slice(-5).join("") == "kappa"){
        face = document.getElementById("kappa");
    }
    if(keypresses.slice(-4).join("") == "joyd"){
        face = document.getElementById("joyd");
    }
    if(keypresses.slice(-9).join("") == "alexander"){
        face = document.getElementById("alexander");
    }

    if(face != null){
        face.style.animation = "PJW 1.2s linear infinite";
    }
}

class Piece{
    constructor(icon) {
        this.name = "Piece";
        this.icon = "";
    }
}

function is_legal_move(position) {
    if(position.x < 0 || position.x > 7){
        return false;
    }
    if(position.y < 0 || position.y > 7){
        return false;
    }
    return true;
}

function show_moves(){
    let piece = Pieces[this.id];
    piece.startposition.removeEventListener("click", show_moves);
    currentPiece = piece;
    let moves = piece.possible_moves().filter(is_legal_move);
    Pieces[this.id] = null;
    let i = 0;
    for(i = 0; i < moves.length; i++){
        let move = moves[i];
        let div = get_cell(move);
        div.style.backgroundColor = "red";
        div.addEventListener("click", move_here);
    }
}

function move_here(){
    let position = id_to_position(this.id);
    currentPiece.move(position);
    let i = 0;
    let j = 0;
    for(i = 0; i <= 7; i++){
        for(j = 0; j <= 7; j++){
            let div = get_cell({x: j, y: i});
            div.removeEventListener("click", move_here);
            if ((i + j) % 2 == 1){
                div.style.backgroundColor = 'grey';
            }
            else{
                div.style.backgroundColor = 'white';
            }
        }
    }
    Pieces[position_to_id(position)] = currentPiece;

}

class King{
    constructor(){
        this.name = "King";
        this.icon = "♚";
        this.x = 4;
        this.y = 7;
        this.startposition = get_cell({x: 4, y: 7});
        let chessButton = document.getElementById("ChessButton");
        this.startposition.textContent = this.icon;
        this.startposition.addEventListener("click", show_moves);
    }
    
    move(position){
        this.x = position.x;
        this.y = position.y;
        this.startposition.textContent = "";
        this.startposition = get_cell(position);
        this.startposition.textContent = "♚";
        this.startposition.addEventListener("click", show_moves);
        return position;
    }
    possible_moves(){
        return [{x: this.x + 1, y: this.y},
                {x: this.x + 1, y: this.y + 1},
                {x: this.x + 1, y: this.y - 1},
                {x: this.x - 1, y: this.y},
                {x: this.x - 1, y: this.y + 1},
                {x: this.x - 1, y: this.y - 1},
                {x: this.x, y: this.y + 1},
                {x: this.x, y: this.y - 1}];
    }
}

function id_to_position(id_string){
    return {
        x: parseInt(id_string[5]),
        y: parseInt(id_string[7]),
    };
}

function position_to_id(position){
    return `cell-${position.x}-${position.y}`;
}

function real_chess(){

    let output = 0;
    let i;
    let j;
    let board = document.getElementById("Chessboard");
    board.innerHTML = "";
    for(i = 0; i <= 7; i++){
        let boardLine = document.createElement("div");
        for(j = 0; j <= 7; j++){
            let div = document.createElement("div");
            div.id = position_to_id({x: j, y: i});
            if ((i + j) % 2 == 1){
                div.style.backgroundColor = 'grey';
            }
            else{
                div.style.backgroundColor = 'white';
            }
            div.className = "cell";
            boardLine.appendChild(div);

        }
        
        boardLine.className = "boardLine";
        board.appendChild(boardLine);
    }
    Pieces[position_to_id({x: 4, y: 7})] = new King();
}

function move(position){}

function get_cell(position){
    return document.getElementById(position_to_id(position));
}

