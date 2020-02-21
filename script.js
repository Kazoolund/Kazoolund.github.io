"use strict"

window.addEventListener("DOMContentLoaded", addEventListeners);


function addEventListeners(){
    let button = document.getElementById("MakeChessboard");
    button.addEventListener("click", make_board);
    let size = document.getElementById("ChessboardSize");
    size.addEventListener("change", make_board);
}


function make_board(){
    let size = document.getElementById("ChessboardSize");
    if (size.value == 8){
        real_chess(size.value);
    }
    else{
        chess_board(size.value);
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
    let cell = get_cell({x: 1, y: 2});
    cell.textContent = "♔";
}

function get_cell(position){
    return document.getElementById(position_to_id(position));
}

function chess_board(stop){
    let output = "";
    let i;
    let j;
    let board = document.getElementById("Chessboard");
    let pre = document.createElement("pre");
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
    pre.textContent = output;
    board.innerHTML = "";

    board.appendChild(pre);
    console.log("ey");
}