var scene,ground,monkey,obstacle,banana;
var bananaimg,obstacleimg,backimg,player_running;
var obstaclegroup,score,fruitgroup;

var PLAY ;
var END;
 var gameState = PLAY;

function preload(){
backimg=loadImage("jungle.png");
  bananaimg=loadImage("banana.png");
  obstacleimg=loadImage("stone.png");
player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

function setup() {
  createCanvas(400, 400);
  //background
  scene=createSprite(200,200,40,40);
  scene.addImage("scene",backimg);
  scene.scale=2;
  scene.velocityX=-2;
  scene.x=scene.width/2;
  
  //ground
  ground=createSprite(400,380,800,10);
  ground.velocityX=-6;
  ground.visible=false;
  
  //monkey
  monkey = createSprite(100, 350,15,15);
monkey.addAnimation("monkey",player_running);
monkey.scale=0.13;
  //groups
obstaclegroup= new Group();
  bananagroup = new Group();
  //score
  score=0;
   
}

function draw() {
  background(220);
  
  
  if( gameState===PLAY) {
  //make the monkey jump  
if (keyDown("space") && monkey.y>285) {
monkey.velocityY=-13;
  }
  //gravity
monkey.velocityY=monkey.velocityY+1; 
  //collide
monkey.collide(ground);
    
    
 //moving ground    
if (ground.x<0) {
 ground.x=ground.width/2;
    }  
    ground.velocityX=-6;
    //moving background
     if (scene.x<0) {
 scene.x=scene.width/2;
    }  
     scene.velocityX=-2;
  
  if(monkey.isTouching(bananagroup)){
    score= score+2;
    bananagroup.destroyEach();
     }
  
  
  switch(score){
    case 10: monkey.scale=0.15;
      break;
      case 20: monkey.scale=0.17;
      break;
      case 30: monkey.scale=0.19;
      break;
      case 40: monkey.scale=0.21;
      break;
      case 50: monkey.scale=0.24;
      break;
      default:break;
  }
     spawnbanana();
    spawnobstacle();
    
  if(obstaclegroup.isTouching(monkey)){
  playState=END;
  }
  }
  if(gameState===END){
  monkey.scale=0.12;
  scene.velocityX=0;
    obstaclegroup.destroyEach();
    bananagroup.destroyEach();

  }
  
  
  restart();
  drawSprites();
  text("score"+score, 300, 40);  
}

function spawnbanana() {
if (frameCount%80===0) {
 banana = createSprite(400, random(175,230),10,10);  
banana.addImage("banana",bananaimg);
banana.scale=0.05;

banana.velocityX=-6;
banana.lifetime=70;
bananagroup.add(banana);

  }
}

function spawnobstacle(){
  if (frameCount%300===0) {
 obstacle = createSprite(400,355,10,10);  
obstacle.addImage("Stone",obstacleimg);
obstacle.scale=0.12;

obstacle.velocityX=-6;
obstacle.lifetime=70;
obstaclegroup.add(obstacle);
  }
}
function restart(){
if(keyDown("r")){
     gameState=PLAY;
       }
}