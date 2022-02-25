var canvas;
var tela;

canvas = document.getElementById("Tela");
console.log(canvas);
tela = canvas.getContext("2d");

var player1_X = 0, player1_Y = 150;
var player1_larg = 20, player1_alt = 85

var player2_X = 1004, player2_Y = 150;
var player2_larg = 20, player2_alt = 85

var player3_X = 0, player3_Y = 500
var player3_larg = 20, player3_alt = 85

var player4_X = 1004, player4_Y = 500;
var player4_larg = 20, player4_alt = 85



var player1_up = false;
var player1_down = false;
var player2_up = false;
var player2_down = false;
var player3_up = false;
var player3_down = false;
var player4_up = false;
var player4_down = false;

var ball_vel_x = 0;
var ball_vel_y = 0;
var ball_x = 512;
var ball_y = 384;
var ball_larg = 15;
var ball_alt = 15;

setTimeout(function(){
    ball_vel_x = 10
    ball_vel_y = 0
},2000)
var pont_player1 = 0
var pont_player2 = 0
var flag1_3 = false
var flag2_4 = false


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
    if(a.keyCode == '83' ){
        player1_down = true;
    }
    if(a.keyCode == '82'){
        player3_up = true;
    }
    if(a.keyCode == '70'){
        player3_down = true;
    }
    if(a.keyCode == '79'){
        player4_up = true;
    }
    if(a.keyCode == '76'){
        player4_down = true;
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
    if(a.keyCode == '82'){
        player3_up = false;
    }
    if(a.keyCode == '70'){
        player3_down = false;
    }
    if(a.keyCode == '79'){
        player4_up = false;
    }
    if(a.keyCode == '76'){
        player4_down = false;
    }
})


function inicialize(){

    tela.clearRect(0, 0, canvas.width, canvas.height);
    tela.fillStyle = "#000000";                          
    tela.fillRect(0, 0, canvas.width, canvas.height);
    tela.fillStyle = "#00FFFF";
    tela.fillRect(player1_X, player1_Y, player1_larg, player1_alt);
    tela.fillRect(player3_X, player3_Y, player3_larg, player3_alt)
    tela.fillStyle = "#FFF000";
    tela.fillRect(player2_X, player2_Y, player2_larg, player2_alt);
    tela.fillRect(player4_X, player4_Y, player4_larg, player4_alt);
    tela.fillStyle = "#F00000"; 
    tela.fillRect(517, 0, 5, 768);
    tela.fillStyle = "#00FFFF";
    tela.fillText("SCORE: " + pont_player1, 10, 10)
    tela.fillStyle = "#FFF000";
    tela.fillText("SCORE: " + pont_player2, 965, 10)
    
    
    
    
    console.log(pont_player1)
    console.log(pont_player2)
    console.log(player1_Y)
    
    if(player1_down == true && player1_Y +player1_alt < 768 && player1_Y +player1_alt< player3_Y && flag1_3 == false){
        player1_Y += velocity;
    }
    if(player1_up == true && player1_Y > 0){
        player1_Y -= velocity;
    }
    if(player3_down == true && player3_Y +player3_alt < 768){
        player3_Y += velocity;
    }
    if(player3_up == true && player3_Y > 0 && player3_Y > player1_Y + player1_alt && flag1_3 == false){
        player3_Y -= velocity;
    }
    if(player2_down == true && player2_Y + player2_alt < 768 && flag2_4 == false){
        player2_Y += velocity;
    }
    if(player2_up == true && player2_Y > 0){
        player2_Y -= velocity;
    }
    if(player4_down == true && player4_Y + player4_alt < 768){
        player4_Y += velocity;
    }
    if(player4_up == true && player4_Y > 0 && flag2_4 == false){
        player4_Y -= velocity;
    }


    tela.fillStyle = "#EEEEEE"
    tela.fillRect(ball_x, ball_y, 15, 15);
    ball_x += ball_vel_x;
    ball_y += ball_vel_y;

    // Determinando a colisão pra barra do player 2
    if((ball_x + ball_larg >= player2_X) && ball_y + ball_alt <= player2_Y + player2_alt && ball_y + ball_alt >= player2_Y ||((ball_x + ball_larg >= player4_X) && ball_y + ball_alt <= player4_Y + player4_alt && ball_y + ball_alt >= player4_Y)){
        ball_vel_x = -ball_vel_x;

    }
    // Determinando a colisão pra barra do player 1 e 3
    if((ball_x  <= player1_larg+player1_X) && ball_y + ball_alt <= player1_Y + player1_alt && ball_y + ball_alt >=  player1_Y || ((ball_x  <= player3_larg+player3_X) && ball_y + ball_alt <= player3_Y + player3_alt && ball_y + ball_alt >= player3_Y)){
        ball_vel_x = -ball_vel_x;
        ball_vel_y = Math.floor(Math.random()*10);

    }
    // Gol no player 2
    if(ball_x + ball_larg >= canvas.width){
        ball_x = 512;
        ball_y = 384;
        ball_vel_x = 0
        ball_vel_y = 0
        pont_player1 += 1
        setTimeout(function(){
            ball_vel_x = 10;
            ball_vel_y = Math.floor(Math.random()*10);
        },2000)
    }
    // Gol no player 1
    if(ball_x <= 0){
        
        ball_x = 512;
        ball_y = 384;
        ball_vel_x = 0
        ball_vel_y = 0
        pont_player2 += 1
        setTimeout(function(){
            ball_vel_x = -10;
            ball_vel_y = Math.floor(Math.random()*10);
        },2000)
        
        
    }
    // Colisão com as paredes superiores
    if(ball_y + ball_larg >= canvas.height){
        ball_vel_y = -ball_vel_y;
    }
    if(ball_y + ball_larg <= 0){
        ball_vel_y = -ball_vel_y;
    }
    //Empurrando jogador do mesmo time player 1 e 3
    if(player1_Y +player1_alt >= player3_Y){
        flag1_3 = true
        player1_up = true
        player3_down = true
        
        setTimeout(function(){
            player1_up = false
            player3_down = false
            flag1_3 = false
        },150)
        
        
        
    }

    //Empurrando jogador do mesmo time player 2 e 4
    if(player2_Y +player2_alt >= player4_Y){
        flag2_4 = true
        player2_up = true
        player4_down = true
        
        setTimeout(function(){
            player2_up = false
            player4_down = false
            flag2_4 = false
        },150)
        
        
        
    }
    
    
}


setInterval(inicialize,1000/60); //Rodar o jogo em 60 fps