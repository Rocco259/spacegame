var spaceShip, spaceShipImg1, spaceShipImg2, spaceShipImg3, spaceShipImg4;
var star, starImg, starGroup;
var bullet, bulletImg, bulletGroup;
var meteor, meteorImg, meteorGroup;
var score = 0;

function preload(){
  bg= loadImage("space.jpg");

  //Star
  starImg = loadImage("star.png");

  //Spaceship
  spaceShipImg1 = loadImage("spacecraft1.png");
  spaceShipImg2 = loadImage("spacecraft2.png");
  spaceShipImg3 = loadImage("spacecraft3.png");
  spaceShipImg4 = loadImage("spacecraft4.png");

  //Bullet
  bulletImg = loadImage("bullet.png");

  //Meteor
  meteorImg = loadImage("meteor.png");
}

function setup() {
  createCanvas(800, 800);

  spaceShip = createSprite(370, 750);
  spaceShip.addImage("default", spaceShipImg1);
  spaceShip.scale = 0.2;

  bulletGroup = createGroup();
  starGroup = createGroup();
  meteorGroup = createGroup();
}

function draw() {
  background(bg);

  if(keyDown("right")){
    spaceShip.x += 4;
    spaceShip.addImage(spaceShipImg3);
  }

  if(keyDown("left")){
    spaceShip.x -= 4;
  }
  
  if(keyDown(32)){
  shoot();
  }

  console.log(score);
  fill("white");
  strokeWeight(4);
  text("Score: "+ score, 700, 100);
spawnMeteor();
spawnStar();
starHit();
meteorHit();
meteorDestroy();

  drawSprites();
}

function spawnMeteor(){
  if(frameCount%90 === 0){
    meteor = createSprite(30, -30);
    meteor.addImage(meteorImg);
    meteor.x = Math.round(random(100, 700));
    meteor.scale = 0.2;
    meteor.velocityY = 3;
    meteorGroup.add(meteor);
  }
}

function spawnStar(){
  if(frameCount%160 === 0){
    star = createSprite(Math.round(random(100, 700)), -50);
    star.addImage(starImg);
    star.velocityY = 4;
    star.scale = 0.5;
    starGroup.add(star);
  }

}


function starHit(){
  if(spaceShip.isTouching(starGroup)){
    starGroup.destroyEach();
    score = score + 5;
  }

}

function meteorDestroy(){
  if(bulletGroup.isTouching(meteorGroup)){
    meteorGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score + 5;
  }
}

//All the meteors dissapear when only one is hitting the ship
function meteorHit(){
  if(spaceShip.isTouching(meteorGroup)){
    spaceShip.destroy();
    meteorGroup.destroyEach();
    meteorGroup.velocityY = 0;
    fill("white");
    strokeWeight(4); 
    text("You Lose", 400, 400);
  }
}

function shoot(){
  bullet = createSprite(spaceShip.x, spaceShip.y - 100);
  bullet.addImage(bulletImg);
  bullet.scale = 0.2;
  //bullet.visible = false;
  bulletGroup.add(bullet);
  bullet.x = spaceShip.x;
  bulletGroup.setVelocityEach(0,-3);
}