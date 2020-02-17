window.addEventListener("DOMContentLoaded", chess_board);


function chess_board(){
    let stop = 8;
    let output = "";
    let board = document.getElementById("Chessboard");
    for(i = 0; i <= stop; i++){
        if(i % 2 == 1){
            output += "█ █ █ █\n";
        }
        else{
            output += " █ █ █ █\n";
        }
    }
    board.textContent = output;
}