const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble2,bubble_img;
var blower;

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
  gameOver_img=loadImage('gameover.png');
  balloon_img=loadImage('balloon.png')
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
gameOver_img.visible=false;

   var fruit_options = {
    restitution: 0.10
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(285,470,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;

  bubble2 = createSprite(50,600,20,20);
  bubble2.addImage(bubble_img);
  bubble2.scale = 0.1;
  
  //bunny sprite
  blink.frameDelay = 15;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(6,{x:230,y:330});
  rope2 = new Rope(5,{x:50,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);

  //button2.Clicked(drop);
  
  //button2.mousePress(drop);
  
 // button2.mouseClick(drop);

 button2.mouseClicked(drop2);

 star = createSprite(300,350);
 star.addImage(star_img);
star.scale=0.03;

blower = createImg('balloon.png');
blower.position(5,100);
blower.size(100,100);
blower.mouseClicked(airBlow);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,80)==true)
  {
   remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    //bunny.change('eating');

    bunny.changeAnimation('eating');

    //bunny.changeAnimation();

    //bunny.Animation('eating');
  }
  
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }
     
  if(collide(fruit,bubble2,40) == true)
  {
    engine.world.gravity.y = -1;
    bubble2.position.x = fruit.position.x;
    bubble2.position.y = fruit.position.y;
  }
if (collide(fruit,star,30)===true){
 gameOver_img.visible=true;
remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('crying');
  
}
  drawSprites();

}

function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function drop()
{
  rope.break();
  con.dettach();
  con = null; 
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
}
