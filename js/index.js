let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const gameOverSound = new Audio('game over.mp3');
const musicSound = new Audio('music.mp3');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 8, y: 9};


//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
   //if you bump into yourself
   for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){ 
            return true;
        }
    }

    if(snake[0].x >= 18 || snake[0].x <=0 && snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
   

}

function gameEngine(){
    //Part 1: Updateing the Snake and his food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Is Fucking Over,Press any key to restart");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //If you have eaten th efood,and increase the score Regenerate the food again
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b= 16;

        food = {x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
    }
    //Moving The Snake
    for (let i = snakeArr.length - 2; i>=0; i--) {
      
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    //Part2: Render the snake and the food
    //Display tHE Snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumn = e.x;
        snakeElement.classList.add('snake')
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    })
    //Display The Food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumn = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}






//Main Logic Starts
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1; 
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;  
            break;

        case "ArrowLeft":
            console.log("ArrowLeft") 
            inputDir.x = -1;
            inputDir.y = 0; 
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;  
            break;
        
        default:
            break;
    }
});


//Videon Stop Time 1:08:32 All working fine