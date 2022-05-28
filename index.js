let pixelSize =document.getElementById("pxsize");
let currentPosition = {x:0, y:0};
let lastPosition ={x:0,y:0};
let imageData = null;
let rgb=[255,255,255];
let set = null;
const canvas=document.getElementById("canvas");
const ctx= canvas.getContext("2d");
let currentRound={height:NaN,width:NaN};
var paint = false;
document.addEventListener("keyup", function(e)   {
    if (e.key==" ")  {   
        paint = false;
    }
})

function setRGB([red,green,blue]){
    rgb=[red,green,blue];
    setBoxValue(rgb);
}


function getVal(){
    currentRound.width=pxsize.value*Math.round(cwidth.value/pxsize.value);
    currentRound.height=pxsize.value*Math.round(cheight.value/pxsize.value);
    if (currentRound.height>0){
        canvas.setAttribute("height",currentRound.height);
    }
    else{   
        canvas.setAttribute("height",pxsize.value);
    }
    if (currentRound.width>0){
        canvas.setAttribute("width",currentRound.width);
    }
    else{   
        canvas.setAttribute("width",pxsize.value);
    }
    document.getElementById("container").innerHTML="Width: "+canvas.width+" px, height: "+canvas.height+" px.";
}



function draw(){
    if (pixelSize.value != "" && pixelSize.value !=0)  {      
        cwidth.disabled=cheight.disabled=pxsize.disabled=ready.disabled=true;
        const height =document.getElementById("canvas").height;
        const width =document.getElementById("canvas").width;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle="rgb(255,255,255)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for (let n=0; n < width/pixelSize.value; n++){ 
            for (let i = 0; i<height/pixelSize.value; i++)  { 
                ctx.strokeRect(n*pixelSize.value, i*pixelSize.value, pixelSize.value, pixelSize.value);
            }
        }

        document.addEventListener("keydown", function movePos(Event)    {
            ctx.fillStyle=`rgba(${rgb},0.3)`;
            lastPosition.x =currentPosition.x;
            lastPosition.y =currentPosition.y;
            if (set !=true && imageData != null) {    
                ctx.putImageData(imageData,lastPosition.x,lastPosition.y);
            }
            set=null;
            if (Event.key=="w" || Event.key =="ArrowUp")  {
                currentPosition.y+=pixelSize.value*-1;
            }
            else if (Event.key=="s" || Event.key =="ArrowDown")  {   
                currentPosition.y+=1*pixelSize.value;
            }
            else if (Event.key=="a" || Event.key =="ArrowLeft")  {   
                currentPosition.x+=pixelSize.value*-1;
            }
            else if (Event.key=="d" || Event.key =="ArrowRight")  {   
                currentPosition.x+=1*pixelSize.value;
            }
            if (currentPosition.x <0 || currentPosition.x > canvas.width-pixelSize.value || currentPosition.y <0 || currentPosition.y>canvas.height-pixelSize.value)  {   
                currentPosition.x=lastPosition.x;
                currentPosition.y=lastPosition.y;
            }
            if (Event.key==" ") {   
                paint=true;
            }
            
            imageData = ctx.getImageData(currentPosition.x,currentPosition.y,pixelSize.value,pixelSize.value);
            ctx.fillRect(currentPosition.x,currentPosition.y,pixelSize.value,pixelSize.value);
            
            var pixelLoc = (pixelSize.value/2) * pixelSize.value*4 + (pixelSize.value/2) *4;
            var pixelData = [pixelLoc, pixelLoc+1, pixelLoc +2];
            if (imageData.data[pixelData[0]] < 70 && imageData.data[pixelData[1]] < 70 && imageData.data[pixelData[2]] < 70)    {   
                ctx.fillStyle="rgb(255,255,255)";
                ctx.fillRect(currentPosition.x+pixelSize.value/4,currentPosition.y+pixelSize.value/4,pixelSize.value/2,pixelSize.value/2);
            }
            else    {   
                ctx.fillStyle="rgb(0,0,0)";
                ctx.fillRect(currentPosition.x+pixelSize.value/4,currentPosition.y+pixelSize.value/4,pixelSize.value/2,pixelSize.value/2);
            }
            if (paint==true){    
                ctx.fillStyle=`rgb(${rgb})`;
                ctx.fillRect(currentPosition.x,currentPosition.y,pixelSize.value,pixelSize.value);
                set=true;
            }
            
        })
    }
    else    {   
        alert("Enter a pixelsize.");
    }
}