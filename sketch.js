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
var rope,honey,ground;
var honey_con;
var honey_con_2;
var honey_con_3;
var rope3;

var bg_img;
var honey;
var bear;

var button,button2,button3;
var beary;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var blower;

function preload()
{
  bg_img = loadImage('background.png');
  honey = loadImage('jar.png');
  beary = loadImage('still.png');



  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  eat = loadAnimation("still.png" , "eating.png","happy.png");
  sad = loadAnimation("still.png","sad.png");



  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cutbtn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);
 
   blower = createImg('blower1.png');
   blower.position(260,370);
   blower.size(120,120);
   blower.mouseClicked(airblow);

   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});


  mute_btn = createImg('mutebtn.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);

  eat.frameDelay = 20;

  beary = createSprite(200,620,100,100);
  beary.scale = 1;

  
  beary.addAnimation('eating',eat);
  beary.addAnimation('crying',sad);
  



  honey = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,honey);

  honey_con = new Link(rope,honey);
  honey_con_2 = new Link(rope2,honey);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(honey!=null){
    image(honey,honey.position.x,honey.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(honey,beary)==true)
  {
    World.remove(engine.world,honey);
    honey = null;
    beary.changeAnimation('eating');
    eating_sound.play();
  }

  if(honey!=null && honey.position.y>=650)
  {
    beary.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    honey=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  honey_con.dettach();
  honey_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  honey_con_2.dettach();
  honey_con_2 = null;
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


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow(){
  Matter.Body.applyForce(honey,{x:0,y:0},{x:0,y:-0.03});
air.play();
}