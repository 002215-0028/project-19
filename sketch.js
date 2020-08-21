var backgroundImage, background1;
var player, playerRunning;
var ground, groundImage;
var banana, bananaImage;
var obstacle, obstacleImage;
var obstacleGroup, foodGroup;
var invisibleGround;
var score=0;
var gameover;

function preload() {
  backgroundImage=loadImage("jungle.jpg");
  playRunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
}


function setup() {
  createCanvas(400, 400);
  background1=createSprite(200, 200, 400, 400);
  background1.addImage(backgroundImage);
  background1.velocityX=-6;
  background1.x=background1.width/2;
  
  player=createSprite(100, 340, 400, 10);
  player.addAnimation("playerRunning", playRunning);
  player.scale=0.1;
  
  invisibleGround=createSprite(200, 375, 400, 10);
  invisibleGround.visible=false;
  

  
 score=0;
  
 foodGroup = new Group();
 obstaclesGroup = new Group();
  
}

function draw() {
  if(background1.x<0){
  background1.x=background1.width/2;
  }
  player.collide(invisibleGround);
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+2;
  }
  switch(score){
        case 10: player.scale=0.1;
                break;
        case 20: player.scale=0.15;
                break;
        case 30: player.scale=0.2;
                break;
        case 40: player.scale=0.25;
                break;
        default: break;
    }
  if(keyDown("space") ) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 1;
    spawnFood();
    spawnObstacle();
   if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.1;
   }

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 100 ,50);
}
function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(350,250,40,10);
    banana.y = random(200,350);    
    banana.addImage(bananaImage);
    banana.scale = 0.03;
    banana.velocityX = -6;
    banana.lifetime = 200;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}
function spawnObstacle() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);    
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}

