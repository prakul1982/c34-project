var dog1,dog11, happyDog, database, foodS, foodStock;

function preload()
{
  dog1 = loadAnimation("dog.png")

happyDog = loadAnimation("happydog.png");


}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog11 = createSprite(200,200,20,20);
  dog11.addAnimation("dog1",dog1);
dog11.addAnimation("happyDog",happyDog);
  dog11.scale = 0.2;

  foodStock=database.ref('food');

  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog11.changeAnimation("happyDog",happyDog);

  }
  drawSprites();
  stroke("black")
  textSize(19)
  text ("food  remaning :"+foodS,180,100);
text ("note : press up arrow key to feed the dog",105,20);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if (x<=0){
    x=0;
  } 
  else{
      x=x-1
    }
  
  database.ref('/').update({
    food:x
  })
}