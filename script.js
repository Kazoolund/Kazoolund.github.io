

window.addEventListener("DOMContentLoaded", (e) => {
    let button = document.getElementById("MakeChessboard");
    button.addEventListener("click", make_board);
});

function make_board(){
    let size = document.getElementById("ChessboardSize");
    chess_board(size.value);
}


function chess_board(stop){
    let output = "";
    let board = document.getElementById("Chessboard");
    for(i = 0; i < stop; i++){
        for(j = 0; j < stop; j++){
            if((j + i) % 2 == 1){
                output += "█";
            }
            else{
                output += " ";
            }
        }
        output += "\n";
    }
    board.textContent = output;
}