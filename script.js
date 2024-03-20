
    
    let contador = 0.1
    let vidas = 3;
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const f1 = document.querySelector('#nano')
    const enemyCarImg = document.querySelector('#enemy') 
    var punt = document.querySelector(".puntuacion")
    var high = document.querySelector(".highscore")
    var vida3 = document.querySelector(".vida3")
    var vida2 = document.querySelector(".vida2")
    var vida1 = document.querySelector(".vida1")
    
    canvas.width = 1900
    canvas.height = 480
    
    let x = canvas.width - 1800
    let y = canvas.height - 250
    
    let carY = 10
    let upPressed = false
    let downPressed = false
    let leftPressed = false
    let rightPressed = false
    let highscore = JSON.parse(localStorage.getItem("highscore"))

    const carHeight = 90
    const carWidth = 180
    
    let enemyX = canvas.width; 
    let enemyY = Math.random() * (canvas.height - carHeight); 
    let enemyX2 = canvas.width; 
    let enemyY2 = Math.random() * (canvas.height - carHeight); 
    let speed = 5
    let speed2 = 6
    
    function carDraw(){
        ctx.drawImage(f1, x, y, carWidth, carHeight)
    }
    
function carMovement(){
       
        if(upPressed && y > 0 ){
            y -= 10
        } else if(downPressed && y < canvas.height - carHeight){
            y += 10
        }
        if(leftPressed){
            x -= 10
        } else if(rightPressed){
            x +=10
        }
        if(y === canvas.height - carHeight || y === 0){
            x -= 15
        }
    }
    
    function cleanCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    
    function events(){
       window.addEventListener('keydown', (k)=>{
           switch (k.key){
               case 'ArrowUp':
                   upPressed = true;
                   break;
               case 'ArrowDown':
                   downPressed = true;
                   break;
               case 'ArrowLeft':
                   leftPressed = true
                   break;
               case 'ArrowRight':
                   rightPressed = true
                   break;
           }
       });
       window.addEventListener('keyup', (s)=>{
           switch (s.key){
               case 'ArrowUp':
                   upPressed = false
                   break;
               case 'ArrowDown':
                   downPressed = false
                   break;
               case 'ArrowLeft':
                   leftPressed = false
                   break;
               case 'ArrowRight':
                   rightPressed = false
                   break;
           }
       });
    }
    function isCollision(){
        if(vidas >= 0){
            vidas -= 1
        }
        switch(vidas){
            case 0:
            vida1.style.display = "none";
            break;
            case 1:
            vida2.style.display = "none";
            break;
            case 2:
            vida3.style.display = "none";
            break;
        }
        resetGame()

    }
    function resetGame(){
        if(vidas >0 ){
        x = canvas.width - 1800
         y = canvas.height - 250
         speed = 5
         speed2 = 6
          enemyX = canvas.width; 
          enemyX2 = canvas.width; 
          
      
        }
        else{
            document.location.reload()
        }
    }
    function checkCollisions() {
    if (y + carHeight > enemyY && y < enemyY + carHeight && x + carWidth > enemyX && x < enemyX + carWidth) {
        
        isCollision()
        
    }
    if (y + carHeight > enemyY2 && y < enemyY2 + carHeight && x + carWidth > enemyX2 && x < enemyX2 + carWidth) {
        isCollision()
        
    }
    if(x + carWidth < 0 ){
   
        isCollision()
          
        }
     if(x  > canvas.width ){
            isCollision()
         
            
         }
    
}
    function adjustEnemyPositions() {
 
    if ((enemyX < enemyX2 + carWidth) && (enemyX + carWidth > enemyX2)) {
   
        if (Math.abs(enemyY - enemyY2) < carHeight) {
           
            if (canvas.height - (enemyY2 + carHeight) > enemyY2) {
             
                enemyY2 = enemyY + carHeight + 20;
           
                if (enemyY2 + carHeight > canvas.height) {
                    enemyY2 = enemyY - carHeight - 20;
                }
            } else {
           
                enemyY2 = enemyY - carHeight - 20;
            
                if (enemyY2 < 0) {
                    enemyY2 = enemyY + carHeight + 20;
                }
            }
        }
    }
}




function drawEnemy(){
    if (enemyX + carWidth < 0) {
        enemyX = canvas.width;
        enemyY = Math.random() * (canvas.height - carHeight);
        adjustEnemyPositions(); 
    } else {
        enemyX -= speed + speed * contador;
    }

    ctx.drawImage(enemyCarImg, enemyX, enemyY, carWidth, carHeight);
}

function drawEnemy2(){
    if (enemyX2 + carWidth < 0) {
        enemyX2 = canvas.width;
        enemyY2 = Math.random() * (canvas.height - carHeight);
        adjustEnemyPositions(); 
    } else {
        enemyX2 -= speed2 +speed2*contador;
    }
    
    ctx.drawImage(enemyCarImg, enemyX2, enemyY2, carWidth, carHeight);
}
let puntuacion = 0;
function puntuaje(){
    puntuacion++
   

}

  

    function draw(){
        isAlive()
        cleanCanvas();
        carDraw();
        carMovement();
        drawEnemy(); 
        drawEnemy2();
        checkCollisions();
       
        contador += 0.001
        punt.textContent = `PUNTUACION: ${puntuacion}`
        if(puntuacion > highscore){
            highscore = puntuacion
            localStorage.setItem("highscore", JSON.stringify(highscore));
        }
        high.textContent = `HIGHSCORE: ${highscore}`
        window.requestAnimationFrame(draw);
        console.log(highscore)
    }
    

    setInterval(puntuaje, 1000)
    draw();
    events();
   
  