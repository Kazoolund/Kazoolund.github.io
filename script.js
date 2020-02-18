"use strict"

window.addEventListener("DOMContentLoaded", addEventListeners);

let BalloonSize = 13;

function addEventListeners(){
    let button = document.getElementById("MakeChessboard");
    button.addEventListener("click", make_board);
    let size = document.getElementById("ChessboardSize");
    size.addEventListener("change", make_board);
    window.addEventListener("keydown", balloon);
}

function balloon(event){
    let Balloon = document.getElementById("Balloon");
    console.log("heY")
    if(event.key == "ArrowUp"){
        Balloon.style.fontSize = `${BalloonSize}px`;
        BalloonSize = Math.floor(BalloonSize * 1.1);
    }
    else if(event.key == "ArrowDown"){
        Balloon.style.fontSize = `${BalloonSize}px`;
        BalloonSize = Math.floor(BalloonSize * 0.9);
    }
    if(BalloonSize > 200){
        window.removeEventListener("keydown", balloon)
        Balloon.textContent = "Hej So!" //"💥";
    }
    
}

function make_board(){
    let size = document.getElementById("ChessboardSize");
    if (size == 8){
        fox_n_hound_game(size.value);
    }
    else{
        chess_board(size.value);
    }
}

function fox_n_hound_game(){
    let fox = document.getElementById("Fox");
    let hound = document.getElementById("Hound");
}


function chess_board(stop){
    let output = "";
    let i;
    let j;
    let board = document.getElementById("Chessboard");
    for(i = 0; i < stop; i++){
        for(j = 0; j < stop; j++){
            if((j + i) % 2 == 1){
                output += "██";
            }
            else{
                output += "  ";
            }
        }
        output += "\n";
    }
    board.textContent = output;
}