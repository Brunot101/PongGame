var canvas;
var tela;

canvas = document.getElementById("Tela");
console.log(canvas);
tela = canvas.getContext("2d");

var player1_X = 0, player1_Y = 309;
var player2_X = 1004, player2_Y = 309;
var player1_larg = 20, player1_alt = 150
var player2_larg = 20, player2_alt = 150

var player1_up = false;
var player1_down = false;
var player2_up = false;
var player2_down = false;

var ball_vel_x = 10;
var ball_vel_y = 0;
var ball_x = 512;
var ball_y = 384;
var ball_larg = 15;
var ball_alt = 15;

var velocity = 10;

document.addEventListener("keydown", function(a){ // Setando o que acontece ao pressionar os botões. Player 2 teclas: Seta pra cima e seta para baixo. Player um W e S
    
    if(a.keyCode == '38'){
        player2_up = true;
    }
    if(a.keyCode == '40'){
        player2_down = true;
    }
    if(a.keyCode == '87'){
        player1_up = true;
    }
    if(a.keyCode == '83'){
        player1_down = true;
    }
})
document.addEventListener("keyup", function(a){ // Setando o que acontece ao liberar os botões.
    
    if(a.keyCode == '38'){
        player2_up = false;
    }
    if(a.keyCode == '40'){
        player2_down = false;
    }
    if(a.keyCode == '87'){
        player1_up = false;
    }
    if(a.keyCode == '83'){
        player1_down = false;
    }
})


function inicialize(){

    tela.clearRect(0, 0, canvas.width, canvas.height);
    tela.fillStyle = "#000000";
    tela.fillRect(0, 0, canvas.width, canvas.height);
    tela.fillStyle = "#00FFFF";
    tela.fillRect(player1_X, player1_Y, player1_larg, player1_alt);
    tela.fillStyle = "#FFF000";
    tela.fillRect(player2_X, player2_Y, player2_larg, player2_alt);
    tela.fillStyle = "#F00000";
    tela.fillRect(512, 0, 5, 768);

    
    if(player1_down == true && player1_Y < 618){
        player1_Y += velocity;
    }
    if(player1_up == true && player1_Y > 0){
        player1_Y -= velocity;
    }
    if(player2_down == true && player2_Y < 618){
        player2_Y += velocity;
    }
    if(player2_up == true && player2_Y > 0){
        player2_Y -= velocity;
    }


    tela.fillStyle = "#EEEEEE"
    tela.fillRect(ball_x, ball_y, 15, 15);
    ball_x += ball_vel_x;
    ball_y += ball_vel_y;

    // Determinando a colisão pra barra do player 2
    if((ball_x + ball_larg >= player2_X) && ball_y + ball_alt <= player2_Y + player2_alt && ball_y + ball_alt >= player2_Y ){
        ball_vel_x = -ball_vel_x;

    }
    // Determinando a colisão pra barra do player 1
    if((ball_x + ball_larg <= player1_larg+player1_X) && ball_y + ball_alt <= player1_Y + player1_alt && ball_y + ball_alt >= player1_Y  ){
        ball_vel_x = -ball_vel_x;
        ball_vel_y = Math.floor(Math.random()*10);

    }
    // Gol no player 2
    if(ball_x + ball_larg >= canvas.width){
        ball_vel_x = 10;
        ball_vel_y = Math.floor(Math.random()*10);
        ball_x = 512;
        ball_y = 384;
    }
    // Gol no player 1
    if(ball_x + ball_larg <= 0){
        ball_vel_x = 10;
        ball_vel_y = Math.floor(Math.random()*10);
        ball_x = 512;
        ball_y = 384;
    }
    // Colisão com as paredes superiores
    if(ball_y + ball_larg >= canvas.height){
        ball_vel_y = -ball_vel_y;
    }
    if(ball_y + ball_larg <= 0){
        ball_vel_y = -ball_vel_y;
    }
    
    
}




setInterval(inicialize,1000/60); //Rodar o jogo em 60 fps