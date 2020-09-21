var startPosX, startPosY, endPosX, endPosY, playerX = 0, playerY=0;
var grid = [], visited = [], stack=[], nodes=[], nodesInRange = [], acceptableNodes = [], possibleSpaceBetween = [], spaceBetween = [], pathX = [], pathY = [], finalPath = [];
var canvas = document.getElementById('demo');
var ctx = canvas.getContext('2d');
var size = 25, square = 8;
var currentX , currentY,  pathXIndex = 0, pathYIndex = 0, pathIndex = 0;
var noNodeAcceptable = false;
var movestep = 10;
var pathStopped = false, playerPlay = "", path, check, startTimer = false;
var waitForInput = false;
var sec = 0, secHolder = 0;
var min = 0;
var time = min+":"+secHolder+""+sec;
var imgsize = 500;


function drawGrid(x,y,w,l) {
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(x,y, w, l);
};
function drawPlayerPath(x,y,w,l) {
    ctx.fillStyle = "rgb(128,0,128)";
    ctx.fillRect(x, y, square, square);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(x,y, square, square);
    console.log("Path moved to position on grid["+x+"]["+y+"].");
    }; 

function drawBotPath() {
    if((pathX[pathXIndex]+","+pathY[pathYIndex]) !== (endPosX+","+endPosY)){
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(pathX[pathXIndex]*10,pathY[pathYIndex]*10, square, square);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(pathX[pathXIndex]*10,pathY[pathYIndex]*10, square, square);
    console.log("Path moved to position on grid["+pathX[pathXIndex]+"]["+pathY[pathYIndex]+"].");
    pathXIndex++;
    pathYIndex++;
   }
    else if((pathX[pathXIndex]+","+pathY[pathYIndex]) === (endPosX+","+endPosY)){
        clearInterval(path);
        clearInterval(check);
        pathStopped = true;
        drawEndSquare(endPosX*10,endPosY*10,square,square);
        var x = document.createElement("IMG");
    x.setAttribute("src", "benderdancing.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
}
};
function drawMaze() {
    function go(){
    if(pathXIndex<=pathX.length && pathYIndex <= pathY.length ){
    ctx.fillStyle = "rgb(100,25,245)";
    ctx.fillRect(pathX[pathXIndex]*10,pathY[pathYIndex]*10, square, square);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(pathX[pathXIndex]*10,pathY[pathYIndex]*10, square, square);
    console.log("Path moved to position on grid["+pathX[pathXIndex]+"]["+pathY[pathYIndex]+"].");
    pathXIndex++;
    pathYIndex++;
   }
    else if((pathXIndex>=pathX.length && pathYIndex >= pathY.length) || pathX[pathXIndex]===undefined && pathY[pathYIndex] === undefined){
        clearInterval(check);
        drawStartSquare(startPosX*10,startPosY*10,square,square);
        pathStopped = true;
        pathXIndex = 0
        pathYIndex = 0;
        drawEndSquare(endPosX*10,endPosY*10,square,square);
        alert("Welcome to the Maze. Press the B key for the maze to solve itself or the P key if you want to solve it.");
        // checkKeyPress();
    }
    }
    check = setInterval(go, 5);
};
function drawStartSquare(x,y,w,l){
    ctx.fillStyle = "rgb(102,255,102)";
    ctx.fillRect(x,y, w, l);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(x,y, w, l);
};

function drawEndSquare(x,y,w,l){
    ctx.fillStyle = "rgb(204,255,255)";
    ctx.fillRect(x,y, w, l);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(x,y, w, l);
};
function makeGrid(){
    for(var x = 0;x<size;x++){
        grid[x] = [];
  for(var y = 0; y<size;y++){
            if(x%2 != 0 && y%2 != 0){
                grid[x][y]=0;
                console.log("Node created on grid["+x+"]["+y+"].");
            }
            else if(x%2 == 0 || y%2==0){
                grid[x][y] = 1;
                console.log("Space created on grid["+x+"]["+y+"].");
            }
     }
    }
    for(y = 0;y<size;y++){
    for(x=0;x<size;x++){
         drawGrid(x*10,y*10,square,square);
    }
}
    var index = 0;
      for(var x = 0; x<size;x++){
          for(var y = 0; y<size;y++){
              if(grid[x][y]==0){
                  nodes[index] = x+","+y;
                  index++;
              }
          }
      }  
};

function startPos(){
    var selected = Math.floor(Math.random()*nodes.length);
    for(var x = 0; x<size;x++){
          for(var y = 0; y<size;y++){
              if((x+","+y)===nodes[selected]){
                  startPosX = x;
                  startPosY = y;
              }
          }
      }  
      console.log("Starting position is on grid["+startPosX+"]["+startPosY+"].");
      visited[0] = startPosX+","+startPosY;
      stack[0] = startPosX+","+startPosY;
      pathX[pathXIndex] = startPosX;
      pathXIndex++;
      pathY[pathYIndex] = startPosY;
      pathYIndex++;
    //   drawStartSquare(startPosX*10,startPosY*10,square,square);
      currentX = startPosX, currentY = startPosY;
};

function findNearbyNodes(){
    var possibleNodes = [], posSB = [];
    var pnIndex = 0, posSBIndex = 0;
    var lookForX=0, lookForY=0;
    if(currentX-2>0){
        posSB[posSBIndex] = "currentX-2";
        posSBIndex++;
        possibleNodes[pnIndex] = (currentX-2)+","+currentY;
        console.log("Node found at "+possibleNodes[pnIndex]);
        pnIndex++;
    }
    if(currentX+2<size){
        posSB[posSBIndex] = "currentX+2";
        posSBIndex++;
        possibleNodes[pnIndex] = (currentX+2)+","+currentY;
        console.log("Node found at "+possibleNodes[pnIndex]);
        pnIndex++;
    }
    if(currentY-2>0){
        posSB[posSBIndex] = "currentY-2";
        posSBIndex++;
        possibleNodes[pnIndex] = (currentX)+","+(currentY-2);
        console.log("Node found at "+possibleNodes[pnIndex]);
        pnIndex++;
    }
    if(currentY+2<size){
        posSB[posSBIndex] = "currentY+2";
        posSBIndex++;
        possibleNodes[pnIndex] = (currentX)+","+(currentY+2);
        console.log("Node found at "+possibleNodes[pnIndex]);
        pnIndex++;
    }
    nodesInRange = possibleNodes;
    possibleSpaceBetween = posSB;  
};

function areNodesAcceptable(){
    var isNodeAcceptable = true;
    var index = 0;
    var goodNodes = [], goodSB = [];
    for(var b =0; b<nodesInRange.length;b++){
        for(var a = 0;a<visited.length;a++){
             if(visited[a]===nodesInRange[b]){
             isNodeAcceptable = false;
             }
        }
        if(isNodeAcceptable){
            console.log(nodesInRange[b]+" is a acceptable node.");
            goodNodes[index] = nodesInRange[b];
            goodSB[index] = possibleSpaceBetween[b]; 
            index++;
        }
        else if(!isNodeAcceptable){
            isNodeAcceptable = true;
        }
    }
    if(goodNodes.length>0){
    noNodeAcceptable = false;    
    acceptableNodes = goodNodes;
    spaceBetween = goodSB;
    }
    else if(!goodNodes.length>0){
        console.log("No acceptable nodes.");
        noNodeAcceptable = true;
    }
};

function chooseNodes(){
    var sbX, sbY;
    var selected = Math.floor(Math.random()*acceptableNodes.length);
    console.log(acceptableNodes[selected]+" was chosen");
    if(spaceBetween[selected]==="currentX-2"){
            sbX = currentX-1;
            sbY = currentY;
        }
        else if(spaceBetween[selected]=== "currentX+2" ){
            sbX = currentX+1;
            sbY = currentY;
        }
        else if(spaceBetween[selected]=== "currentY-2" ){
            sbX = currentX;
            sbY = currentY-1;
        }
        else if(spaceBetween[selected]=== "currentY+2" ){
            sbX = currentX;
            sbY = currentY+1;
        }
    
    for(var x = 0; x<size;x++){
          for(var y = 0; y<size;y++){
              if((x+","+y)===acceptableNodes[selected]){
                  currentX = x;
                  currentY = y;
              }
          }
      }  
      console.log("Moved to position on grid["+currentX+"]["+currentY+"]."); 
      var wasSpotted = false;
      for(var a = 0; a<visited.length;a++){
          if(visited[a]===(currentX+","+currentY)){
              wasSpotted = true;
          }
      }
      if(!wasSpotted){
      visited.push(currentX+","+currentY);
      stack.push(currentX+","+currentY);
 //   _________________________________
      pathX[pathXIndex] = sbX;
      pathXIndex++;
      pathY[pathYIndex] = sbY;
      pathYIndex++;
//  ______________________________________
      pathX[pathXIndex] = currentX;
      pathXIndex++;
      pathY[pathYIndex] = currentY;
      pathYIndex++;
    //   _________________________________
     finalPath[pathIndex] = sbX+","+sbY;
      pathIndex++;
       finalPath[pathIndex] = currentX+","+currentY;
      pathIndex++;
     }
};
function stackNode(x,y){
  var goodOp1 = true, goodOp2 = true, goodOp3 = true, goodOp4 = true;
    if(x-2>0){
      for(var a  = 0;a<visited.length;a++){
            if(visited[a]===(x-2+","+y)){
                goodOp1 = false;
            }
        }
    }
    if(x+2<size){
        for(var a  = 0;a<visited.length;a++){
            if(visited[a]===(x+2+","+y)){
                goodOp2 = false;
            }
        }
    } 
    if(y-2>0){
       for(var a  = 0;a<visited.length;a++){
            if(visited[a]===(x+","+y-2)){
                goodOp3 = false;
            }
        }
    }
    if(y+2<size){
        for(var a  = 0;a<visited.length;a++){
            if(visited[a]===(x+","+y+2)){
                goodOp4 = false;
            }
        }
    }
    if(goodOp1||goodOp2||goodOp3||goodOp4){
        return true;
    }
    else if(!goodOp1&&!goodOp2&&!goodOp3&&!goodOp4){
        return false;
    }  
};

function generateMaze(){
    while(stack.length!=0){
     if(stack.length==0){
         break;
     }
     else if(stack.length!=0){
         findNearbyNodes();
    areNodesAcceptable();
    if(!noNodeAcceptable){
    // setTimeout(chooseNodes(), 1000);
    chooseNodes();
    }
    else if (noNodeAcceptable){
        currentX = -1, currentY=-1;
        stack.pop();
       var noNodeFound = false;
        while((currentX ==-1 && currentY == -1) || stack.length!=0){  
      if(stack.length==0){
          break;
      }
      else if(currentX == -1 && currentY == -1){
           if(stack.length!=0){
        for(var x = 0; x<size;x++){
          for(var y = 0; y<size;y++){
              if((x+","+y)===stack[stack.length-1]){
                  if(stackNode(x,y)){
                  noNodeFound = false;   
                  currentX = x;
                  currentY = y;
                  }
                  else if(!stackNode(x,y)){
                     noNodeFound = true;
                  }
              }
          }
      } 
      if(noNodeFound){
          stack.pop();
      } 
       }
       else if(stack.length==0){
           break;
       } 
    }
    else if(currentX != -1 && currentY != -1){
        break;
    }
        }
     console.log("Moved to position on grid["+currentX+"]["+currentY+"].");
    }
     console.log("Current visited = "+visited.length);
     }   
    }  
    var leftOrRight;
    var upOrDown;
    var midNum = Math.floor(size/2 - 1);
    if(startPosX<=midNum){
        leftOrRight = "right";
    }
    else if (startPosX>=midNum){
        leftOrRight = "left";
    }
    if(startPosY<=midNum){
        upOrDown = "down";
    }
    else if(startPosY>= midNum){
        upOrDown = "up";
    }
    var lowerNums = [], largerNums = [], lowerNumIndex=0, largerNumIndex=0;
    for(var a = 0; a<size;a++){
        if(a%2!=0){
            if(a<(midNum+1)){
                lowerNums[lowerNumIndex] = a;
                lowerNumIndex++;
            }
            else if(a>(midNum+1)){
                largerNums[largerNumIndex] = a;
                largerNumIndex++;
            }
        }
    }
    var chosenX = -1, chosenY = -1, selected = 0;
    while(chosenX == -1 && chosenY == -1){
    if(leftOrRight=="left"){
        selected = Math.floor(Math.random()*lowerNums.length);
        if(lowerNums[selected] != startPosX){
            chosenX = lowerNums[selected];
            if(upOrDown=="up"){
                selected = Math.floor(Math.random()*lowerNums.length);
                if(lowerNums[selected] != startPosY){
                    chosenY = lowerNums[selected];
                }
            }
            else if(upOrDown=="down"){
                selected = Math.floor(Math.random()*largerNums.length);
                if(largerNums[selected] != startPosY){
                    chosenY = largerNums[selected];
                }
            }
        }
    }
    else if(leftOrRight=="right"){
        selected = Math.floor(Math.random()*largerNums.length);
        if(largerNums[selected] != startPosX){
            chosenX = largerNums[selected];
            if(upOrDown=="up"){
                selected = Math.floor(Math.random()*lowerNums.length);
                if(lowerNums[selected] != startPosY){
                    chosenY = lowerNums[selected];
                }
            }
            else if(upOrDown=="down"){
                selected = Math.floor(Math.random()*largerNums.length);
                if(largerNums[selected] != startPosY){
                    chosenY = largerNums[selected];
                }
            }
        }
    }
    }
    endPosX = chosenX;
    endPosY = chosenY;
    // drawEndSquare(endPosX*10,endPosY*10,square,square);
    console.log("Maze complete.");
    pathXIndex = 0;
    pathYIndex = 0;
};

function run(){
    makeGrid();
    startPos();
    generateMaze();
    drawMaze();
}         
run();

document.addEventListener('keydown', 
// setTimeout(
    function(event) {
   if(playerPlay!=="bot"){
       
    switch (event.keyCode) {
        case 37:
            if(playerPlay==="player" && startTimer===true){
                console.log("Checking left.");
                var xy = (playerX-1)+","+playerY;
            for(var a = 0;a<finalPath.length;a++){
                    if(finalPath[a] === xy || finalPath[a] == xy){
                        console.log("Moving left.");
                        drawPlayerPath((playerX-1)*10,playerY*10,square,square);
                        playerX = playerX-1;
                        if(playerX === endPosX && playerY === endPosY){
                            startTimer = false;
                            clearInterval(interval);
                            var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
                        }
                        break;
                    }
            }
            }
            else if((playerX === endPosX && playerY === endPosY)){
    clearInterval(interval);
    var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
}
            break;
        case 38:
           if(playerPlay==="player" && startTimer===true){
               console.log("Checking up.");
               var xy = playerX+","+(playerY-1);
        for(var a = 0;a<finalPath.length;a++){
                    if(finalPath[a] === xy  || finalPath[a] == xy){
                        console.log("Moving up.");
                        drawPlayerPath(playerX*10,(playerY-1)*10,square,square);
                        playerY = playerY-1;
                        if(playerX === endPosX && playerY === endPosY){
                            startTimer = false;
                            clearInterval(interval);
                            var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);}
                        break;
                    }
            } 
            }
            else if((playerX === endPosX && playerY === endPosY)){
    clearInterval(interval);
    var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
}
            break;
        case 39:
            if(playerPlay==="player" && startTimer===true){
                console.log("Checking right.");
    var xy = (playerX+1)+","+playerY;
            for(var a = 0;a<finalPath.length;a++){
                    if(finalPath[a] === xy || finalPath[a] == xy){
                        console.log("Moving right.");
                        drawPlayerPath((playerX+1)*10,playerY*10,square,square);
                        playerX = playerX+1;
                        if(playerX === endPosX && playerY === endPosY){
                            startTimer = false;
                            clearInterval(interval);
                            var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
                        }
                        break;
                    }
            }
            }
            else if((playerX === endPosX && playerY === endPosY)){
    clearInterval(interval);
    var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
}
            break;
        case 40:
            if(playerPlay==="player" && startTimer===true){ 
                console.log("Checking down.");
                var xy = playerX+","+(playerY+1);
            for(var a = 0;a<finalPath.length;a++){
                    if(finalPath[a] === xy || finalPath[a] == xy){
                        console.log("Moving down.");
                        drawPlayerPath(playerX*10,(playerY+1)*10,square,square);
                        playerY = playerY+1;
                        if(playerX === endPosX && playerY === endPosY){
                            startTimer = false;
                            clearInterval(interval);
                            var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
                    }
                        break;
                    }
            }
            }
            else if((playerX === endPosX && playerY === endPosY)){
    clearInterval(interval);
    var x = document.createElement("IMG");
    x.setAttribute("src", "ssjohncena.gif");
    x.setAttribute("width", imgsize);
    x.setAttribute("width", imgsize);
    document.body.appendChild(x);
}
            break;
        case 66:
        if(playerPlay!=="bot"){
        playerPlay = "bot";
        alert("You pressed b.");
        path = setInterval(drawBotPath, 050);
        }
        break; 
        case 80:
         if(playerPlay!=="player" && playerPlay !== "bot"){
         playerPlay = "player";
       alert("You pressed p. Use the arrow keys to move.");
       playerX = startPosX;
       playerY = startPosY;
       drawPlayerPath(playerX*10,playerY*10,square,square);
       startTimer = true;
       timer();
        }
        break; 
   }
   }
});
var interval;
function timer(){
    if(startTimer===true){
 interval = setInterval(function(){
    if(sec===10){
        sec = 0;
        secHolder++;
        time =  min+":"+secHolder+""+sec;;
    }
    if(secHolder===6){
        secHolder = 0;
        min++;
        time =  min+":"+secHolder+""+sec;
    }
    document.getElementById('output').innerHTML = time;
    sec++;
    time = min+":"+secHolder+""+sec;
},1000);
    }
}
