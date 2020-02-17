function chess_board(){
    let stop = 8;
 
    for(i = 0; i <= stop; i++){
        if(i % 2 == 1){
            console.log("█ █ █ █\n");
        }
        else{
            console.log(" █ █ █ █\n");
        }
    }
}