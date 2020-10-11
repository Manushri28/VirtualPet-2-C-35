var dog, happyDog;
var foodS;
var database;
var fedTime, lastFed;
var feed, addFeed;
var milkBottle;

function preload()
{
  dogIMG = loadImage("dogImg1.png");
  dogHappyIMG = loadImage("dogImg.png");

}

function setup() {
  createCanvas(900, 400);
  
  database = firebase.database();
  
	dog = createSprite(700, 200, 10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  milkBottle = new MilkFood();

  addFeed = createButton("Add Milk Bottles");
  addFeed.position(650, 25);
  addFeed.mousePressed(addFoods);

  feed = createButton("Feed Bruno");
  feed.position(780, 25);
  feed.mousePressed(feedDog);

  fedTime = database.ref('hour');
  fedTime.on("value", function(data){
  lastFed = data.val();
  })

}


function draw() {  
  background(46, 139, 87);
  
  milkBottle.display();

  textSize(15);
  fill("white");
  
    if(lastFed>=12){
      text("Last Fed Bruno at : " + lastFed%10 + " PM", 250, 25)
    }
    else if(lastFed == 0){
      text("Last Fed Bruno at : 12 PM", 250, 40)
    }
    else {
      text("Last Fed Bruno at : " + lastFed + " AM", 250, 60)
    }   

  drawSprites();
  
}


function data(data){
  foodS = data.val();  
}

function addFoods(Food){
  Food++
  database.ref('/').update({
    Food: Food
  })
}

function feedDog(Food){
  dog.addImage(dogHappyIMG);

  milkBottle.getFoodStock(Food-1);
  database.ref('/').set({
    Food: milkBottle.getFoodStock(),
    // lastFed: hour()
  })
}

