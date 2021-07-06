// Game Constants and Variables

let input = {x: 0, y:0};
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 3;
let lastpainttime = 0;
let score = 0;
let snakeArr = [
    {x: 13, y: 15}
];

 food = {x : 6, y: 7};


// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    } 
    lastpainttime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // For collision
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }    
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}

function gameEngine(){

    // Part 1 Update Snake and Food 

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        input = {x: 0, y: 0};
        alert("Game Over. Press Any Key to Start The Game");
        snakeArr = [{x: 13, y: 15}];
        musicSoundSound.play();
        score = 0;
    }

    // If food is MediaElementAudioSourceNode, then update the score and put anothewr food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        speed += 2;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HighScoreBox.innerHTML = "HighScore: " + hiscoreval;
        }
        Scorebox.innerHTML = "Score: "  +score;
        snakeArr.unshift({x: snakeArr[0].x + input.x, y: snakeArr[0].y + input.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};    
    }
    snakeArr[0].x += input.x;
    snakeArr[0].y += input.y; 



    // Part 2 - Display Snake and Food  

    board.innerHTML = "";

    // Display the Snake

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake'); 
        }
        board.appendChild(snakeElement);
    });

    // Display the Food 
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}



// Main Logic Starts
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    HighScoreBox.innerHTML = "HighScore: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    input = {x: 0, y: 1};
    moveSound.play();
    switch(e.key) {
        case "ArrowUp": 
            console.log("ArrowUp");
            input.x = 0;
            input.y = -1;
            break;
        
        case "ArrowDown": 
            console.log("ArrowDown");
            input.x = 0;
            input.y = 1;
            break;

        case "ArrowLeft": 
            console.log("ArrowLeft");
            input.x = -1;
            input.y = 0;
            break;

        case "ArrowRight": 
            console.log("ArrowRight");
            input.x = 1;
            input.y = 0;
            break;
        
        default:
            break;
    }
})