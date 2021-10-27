var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

elements = [];
var clickedObject;

var sceneObject;

var world = {
    gravity : -9.8,
    groundPos : c.height,
    offsetX: 0,
    offsetY: 0
}

var camera = {
    AOV : 0.1,
    x : c.width/2,
    y : c.height/2

}
function moveCamera(direction){
    if (direction == "right" || direction == "d") {
        camera.x += 10;
        world.offsetX -= 10;
        ctx.translate(-10, 0);
        elements.forEach(element => {
            //element.posX -= 10;
            element.draw();
        });
    
        
    }

    if (direction == "left" || direction == "a") {
        camera.x -= 10;
        world.offsetX += 10;
        ctx.translate(10, 0);
        elements.forEach(element => {
            //element.posX += 10;
            element.draw();
        });
    
        
    }
    
    if (direction == "upp" || direction == "w") {
        //world.groundPos += 10;
        camera.y -= 10;
        world.offsetY += 10;
        ctx.translate(0, +10);
        elements.forEach(element => {
            //element.posY += 10;
            element.draw();
        });
    
        
    }

    if (direction == "down" || direction == "s") {
        //world.groundPos -= 10;
        camera.y += 10;
        world.offsetY -= 10;
        ctx.translate(0, -10);
        elements.forEach(element => {
            //element.posY -= 10;
            element.draw();
        });
    
        
    }

}

document.addEventListener("keydown", event => {
    moveCamera(event.key);

  });

class scene {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.W = c.width;
        this.H = c.height;
        this.centerPosX;
        this.centerPosY;

        this.parallaxX = 0;
        this.parallaxY = 0;
        this.z = 3;
    }

    update(){
        this.centerPosX = this.posX + this.W/2;
        this.centerPosY = this.posY + this.H/2;
        this.parallaxX = this.centerPosX -camera.x;
        this.parallaxY = this.centerPosY -camera.y;

    }

    draw(){
        
        this.update();

        // BACK //
        ctx.beginPath();
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.lineWidth = "5";
        ctx.moveTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z -75 +this.H);
        ctx.lineTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z-75 +this.H);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it
        
        // TOP //
        ctx.beginPath();
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(0, 0);
        ctx.lineTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it

        // FLOOR //
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z-75 +this.H);
        ctx.lineTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z -75 +this.H);
        ctx.lineTo(c.width, c.height);
        ctx.lineTo(0, c.height );
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it
        
        // LEFT //
        ctx.beginPath();
        ctx.fillStyle = "rgb(240, 240, 240)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(0, 0);
        ctx.lineTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z -75 +this.H);
        ctx.lineTo(0, c.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it

        // R //
        ctx.beginPath();
        ctx.fillStyle = "rgb(240, 240, 240)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width, 0);
        ctx.lineTo(c.width, c.height);
        ctx.lineTo(c.width-100-this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z -75 +this.H);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it

        
    }
    drawSides(){
        this.update();

        // LEFT //
        ctx.beginPath();
        ctx.fillStyle = "rgb(240, 240, 240)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(0, 0);
        ctx.lineTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z -75 +this.H);
        ctx.lineTo(0, c.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it

        // R //
        ctx.beginPath();
        ctx.fillStyle = "rgb(240, 240, 240)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width, 0);
        ctx.lineTo(c.width, c.height);
        ctx.lineTo(c.width-100-this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z -75 +this.H);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it
    }

    drawFG(){
        this.update();

        // TOP //
        ctx.beginPath();
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(0, 0);
        ctx.lineTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z +75);
        ctx.lineTo(c.width, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it

        // FLOOR //
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.strokeStyle = "rgb(230, 230, 230)"; // Purple path
        ctx.moveTo(100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z-75 +this.H);
        ctx.lineTo(c.width -100 -this.parallaxX*camera.AOV*this.z, -this.parallaxY*camera.AOV*this.z -75 +this.H);
        ctx.lineTo(c.width, c.height);
        ctx.lineTo(0, c.height );
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw it

    }

}

class box3D {
    constructor() {
        this.typ;
        this.scale = 1;
        this.offsetX = 20;
        this.offsetY = 10;
        this.posX = 0;
        this.posY = c.height - 100 -this.offsetY;
        this.W = 100;
        this.H = 100;
        this.centerPosX;
        this.centerPosY;

        this.material = "copper";
        this.materialWeight = 8.940;
        this.weight = this.W * this.H / 10000 * this.materialWeight;
        this.speedX = 0;
        this.speedY = 0;
        this.isMoving = false;
        this.maxSpeed;
        this.parallaxX = 0;
        this.parallaxY = 0;
        this.shadowParallaxY = 0;
        this.z = 5;
    }

    draw(){
        
        this.centerPosX = this.posX + this.W/2;
        this.centerPosY = this.posY + this.H/2;
        this.parallaxX = this.centerPosX -camera.x;
        this.parallaxY = this.centerPosY -camera.y;

        this.shadowParallaxY = c.height -this.offsetY -camera.y;

        // SHADOW //
        ctx.fillStyle = "rgb(200, 200, 200)";
        ctx.beginPath();
        ctx.moveTo(this.posX, c.height-this.offsetY);
        ctx.lineTo(this.posX + this.W, c.height -this.offsetY);
        ctx.lineTo(this.posX + this.W -this.parallaxX*camera.AOV -this.z, c.height -this.offsetY -this.shadowParallaxY*camera.AOV);
        ctx.lineTo(this.posX -this.parallaxX*camera.AOV +this.z, c.height -this.offsetY -this.shadowParallaxY*camera.AOV);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "red";
        ctx.fillRect(this.posX, this.posY, this.W, this.H);
        // Y //
        if (this.centerPosY > camera.y) {
            ctx.fillStyle = "rgb(240, 100 , 100)";
            ctx.beginPath();
            ctx.moveTo(this.posX, this.posY );
            ctx.lineTo(this.posX + this.W, this.posY);
            ctx.lineTo(this.posX + this.W -this.parallaxX*camera.AOV, this.posY -this.parallaxY*camera.AOV);
            ctx.lineTo(this.posX -this.parallaxX*camera.AOV, this.posY -this.parallaxY*camera.AOV);
            
            ctx.closePath();
            ctx.fill();
        }
        // BOTTOM //
        if (this.centerPosY < camera.y) {
            ctx.fillStyle = "rgb(160, 0 , 0)";
            ctx.beginPath();
            ctx.moveTo(this.posX, this.posY + this.H);
            ctx.lineTo(this.posX + this.W, this.posY + this.H);
            ctx.lineTo(this.posX + this.W -this.parallaxX*camera.AOV, this.posY + this.H -this.parallaxY*camera.AOV);
            ctx.lineTo(this.posX -this.parallaxX*camera.AOV, this.posY + this.H -this.parallaxY*camera.AOV);
            
            ctx.closePath();
            ctx.fill();
        }
        // X //
        if (this.centerPosX > camera.x) {
            ctx.fillStyle = "rgb(200, 0 , 0)";
            ctx.beginPath();
            ctx.moveTo(this.posX, this.posY);
            ctx.lineTo(this.posX -this.parallaxX*camera.AOV, this.posY -this.parallaxY*camera.AOV);
            ctx.lineTo(this.posX -this.parallaxX*camera.AOV, this.posY + this.H -this.parallaxY*camera.AOV);
            ctx.lineTo(this.posX, this.posY + this.H);
            ctx.closePath();
            ctx.fill();
            //ctx.fillRect(this.posX, this.posY, -this.parallaxX*0.1, this.H);
        }
        if (this.centerPosX < camera.x) {
            ctx.fillStyle = "rgb(200, 0 , 0)";
            ctx.beginPath();
            ctx.moveTo(this.posX + this.W, this.posY);
            ctx.lineTo(this.posX + this.W -this.parallaxX*camera.AOV, this.posY -this.parallaxY*camera.AOV);
            ctx.lineTo(this.posX + this.W -this.parallaxX*camera.AOV, this.posY + this.H -this.parallaxY*camera.AOV);
            ctx.lineTo(this.posX + this.W, this.posY + this.H);
            ctx.closePath();
            ctx.fill();
        }

        



        if(this.type != "static"){
            this.update();

        }
        
    }



    updatePos(){
        if(mousePosX - this.W/2 > 0 && mousePosX + this.W/2 < c.width){
            this.posX = mousePosX - this.W/2;

        }
        
        if(mousePosY - this.H/2 > 0 && mousePosY + this.H/2 < world.groundPos){
            this.posY = mousePosY - this.H/2;

        }
        this.posX = mousePosX - this.W/2;
        this.posY = mousePosY - this.H/2;

        if( this.posY > world.groundPos - this.H){
            this.posY = world.groundPos - this.H -this.offsetY;
        }
        if( this.posY < 0){
            this.posY = 0;
        }
        if( this.posX > c.width - this.W -this.offsetX){
            this.posX = c.width - this.W -this.offsetX;
        }
        if( this.posX < 0 +this.offsetX){
            this.posX = 0 +this.offsetX;
        }

    }
    update(){
        
        for (let i = 0; i < elements.length; i++) {
            var cur = elements[i];
            if (this.posX + this.W > cur.posX && this.posX < cur.posX + cur.W && this.posY + this.H > cur.posY && this.posY < cur.posY + cur.H && cur != this) {
                console.log("COLLISION!");

                /*
                if(cur.posX > this.posX){
                    cur.posX = this.posX + cur.W;
                }*/
            }
        }


        if(this.isMoving == true){
            this.updatePos();
        }
        else{
            if( this.posY < world.groundPos - this.H){
                this.posY -= world.gravity * this.weight;
            }

            if( this.posY > world.groundPos - this.H -this.offsetY){
                this.posY = world.groundPos - this.H -this.offsetY;
            }
            

            if(this.speedX != 0 || this.speedY != 0){
                //console.log("HEJ");
                this.posX += this.speedX;
    
                if( this.posX > c.width - this.W){
                    this.speedX = -this.speedX;
                }
    
                if( this.posX < 0){
                    this.speedX = -this.speedX;
                }
    
            }


        }
        ctx.onclick = function(){console.log("HEJ");};

        


    }

    rotate(){
        
    }
}

var mousePosX;
var mousePosY;

function getMousePos(c, evt) {
    var rect = c.getBoundingClientRect();

    mousePosX = evt.clientX - rect.x - world.offsetX;
    mousePosY = evt.clientY - rect.y - world.offsetY;

    return {
      x: mousePosX,
      y: mousePosY
    };
}

c.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(c, evt);
    mousePosX = mousePos.x;
    mousePosY = mousePos.y;

}, false);

c.addEventListener('click', function(evt) {
    var mousePos = getMousePos(c, evt);

    var x = mousePos.x;
    var y = mousePos.y;

    //console.clear();
    console.log("CLICKED POSITION");
    console.log("[X: " + x + "] [Y: " + y + "]");

    // Collision detection between clicked offset and element.
    elements.forEach(function(element) {
        if (y > element.posY && y < element.posY + element.H && x > element.posX && x < element.posX + element.W) {
            //console.clear();
            console.log("ELEMENT POSITION");
            console.log("[ElemX: " + element.posX + "-"+ (element.posX+element.W) + "] [ElemY: " + element.posY + "-" + (element.posY+element.H) + "]");

            clickedObject = element;

            if(clickedObject.isMoving == true){
                clickedObject.isMoving = false;
                clickedObject = null;
            }
            else{
                clickedObject.isMoving = true;

            }
            
            console.log('clicked an element');
            console.log(clickedObject);
            
        }
        
    });

}, false);


class physics{

    constructor() {
        this.velocity = -5;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.posX = 0;
        this.posY = 100;
        this.W = 100;
        this.H = 100;

        this.speedX = 0;
        this.speedY = 0;
        this.isMoving = false;
        this.maxSpeed;
        
    }

    draw(){
        ctx.fillStyle = "blue";
        ctx.fillRect(0 + this.posX, 0 + this.posY, this.W, this.H);

        this.update();
    }
    update(){
        for (let i = 0; i < 100; i++) {
            this.posY -= this.velocity * 0.01; 
            
        }
        
        if( this.posY >= c.height - this.H){

            this.posY = c.height - this.H;
        }
    }

}


function start() {
    // START //
    sceneObject = new scene();
    elements.push(new box3D());
    //elements.push(new box3D());

    elements[0].posX = c.width/2 - elements[0].W/2;
    //elements[1].posX = 350;
    //elements[1].posY = c.height - elements[1].H;
    //var box3D_01 = new box3D();
    

}

function update() {
    ctx.clearRect(-world.offsetX, -world.offsetY, c.width, c.height);
    
    sceneObject.draw();

    elements.forEach(element => {
        element.draw();
    });

    if(world.offsetY < -240 || world.offsetY > 200){
        sceneObject.drawFG();

    }

    if(world.offsetX < -450 || world.offsetX > 450){
        sceneObject.drawSides();

    }
    
    coordinateSystem();

    cnsole();
    setTimeout(update, 20);
    
}

function cnsole(){
    let info = document.getElementById("info");

    info.innerHTML = "cube.X: " + elements[0].centerPosX + " cube.Y: " + elements[0].centerPosY + "<br>";
    info.innerHTML += "parallaxX: " + elements[0].parallaxX + " parallaxY: " + elements[0].parallaxY +"<br>";
    info.innerHTML += "camera.X: " + camera.x + " camera.Y: " + camera.y +"<br>";
    info.innerHTML += "World.Offset.X: " + world.offsetX + " World.Offset.Y: " + world.offsetY +"<br>";

}

function coordinateSystem(){
    ctx.beginPath();
    ctx.strokeStyle = "rgb(220, 220, 220)"; // Purple path
    ctx.lineWidth = "5";
    ctx.moveTo(0, 0);
    ctx.lineTo(c.width, 0);
    ctx.lineTo(c.width, c.height);
    ctx.lineTo(0, c.height);
    ctx.closePath();
    ctx.stroke(); // Draw it


}


start();
update();
