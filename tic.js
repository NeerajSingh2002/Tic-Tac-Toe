const boxes= document.querySelectorAll(".box"); 
const gameinfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".gameButton");

let currentPlayer;
let   gameGrid;
const newGame=false;

const winingPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];





function initGame(){
    currentPlayer="X",
    gameGrid=["","","","","","","","",""];
    
    boxes.forEach((box,index)=>{
        box.innerText= "";
        boxes[index].style.pointerEvents='all';
        boxes[index].classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameinfo.innerText=`Current Player - ${currentPlayer}`;
  
   


}

initGame();
 
function checkOverGame(){
    let answer='';

    winingPosition.forEach((position) => {
 
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

             
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
        });

       
        if(answer !== "" ) {
            gameinfo.innerText = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return;
        }
    
        //NO Winner Found
        let fillCount = 0;
        gameGrid.forEach((box) => {
            if(box !== "" )
                fillCount++;
        });
    
        //board is Filled
        if(fillCount === 9) {
            gameinfo.innerText = "Game Tied  !";
            newGameBtn.classList.add("active");
        }
}

function swap(){
    if(currentPlayer=="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }

    // ui

    gameinfo.innerText=`Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index]==="")
        {
            // this change on UI
            boxes[index].innerHTML=currentPlayer;
            boxes[index].style.pointerEvents='none';

            // thi sis uys eto change in grid
            gameGrid[index]=currentPlayer;

            // for swaping

            swap();

            // for checking who win

            checkOverGame();
        }
    

}

boxes.forEach((box,index)=>{

    box.addEventListener('click',()=>{
        handleClick(index);
    })
});


newGameBtn.addEventListener('click',initGame);