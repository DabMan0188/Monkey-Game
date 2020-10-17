var PLAY = 1;
var END = 0;
var gameState = PLAY;

var survivalTime;

var monkey , monkey_running
var ground, invisibleGround, groundImage;

var banana ,bananaImage; 
var obstacle, obstacleImage;

var foodGroup, obstacleGroup

var score 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500)
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(400,350, 900, 10);
  ground.velocityX = -4
  ground.x = ground.width/2
  console.log(ground.x)
  
  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = true;
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;

  
  score = 0;
  survivalTime = 0;
  
}


function draw() {
  background("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100, 50)
  
  if(gameState === PLAY){
  
    if (ground.x < 60){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 314) {
        monkey.velocityY = -12;
    
  }
    
    monkey.velocityY = monkey.velocityY + 0.8

    monkey.collide(invisibleGround);

  }    
  
  spawnObstacle();
  spawnFood();
  drawSprites(); 
  
}

function spawnObstacle() {

  if (frameCount % 110 === 0) {
    var obstacle = createSprite(600,350,40,10);
    obstacle.y = Math.round(random(335,335));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
    obstacle.setCollider("rectangle",10,0,obstacle.width,obstacle.height);
    obstacle.debug = false;
    
     //assign lifetime to the variable
    obstacle.lifetime = 210;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    //obstacleGroup.add(obstacle);
  }
}

function spawnFood() {

  if (frameCount % 150 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(80,120));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 210;
    
    //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(food);
  }
}





