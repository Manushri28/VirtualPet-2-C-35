class MilkFood{
    constructor(){

        this.lastFed = 0;
        this.foodStock = 0;
        this.image = loadImage('milk.png');

    }
   
    getFoodStock(Food){
        this.foodStock = database.ref('Food');
        this.foodStock.on("value", function(data){
            Food = data.val();
            })
        }
    updateFoodStock(x){
            database.ref('/').update({
                Food: x
            })
    }

    display(){

      this.foodStock = 18;

      var x = 80, y = 70;

      imageMode(CENTER);
      image(this.image, -80, 140, 10, 10);
 
         if(this.foodStock!=0){
            for(var i=0; i < this.foodStock; i++){
                if(i%7==0){
                x = 80;
                y = y + 70;
                }
            image(this.image, x, y, 70, 70);
            x = x + 50;

          }

         }

    }

}