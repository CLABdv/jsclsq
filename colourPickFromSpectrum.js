const can =  document.getElementById("colourPicker");
const ct = can.getContext("2d");

const can_2 = document.getElementById("colourRect");
const ctx_2 = can_2.getContext("2d");
var spectrumTR=null;
var spectrumBW=null;
var lastcol=[255,255,255];
var fillcol=null;
const can_3=document.getElementById("bwPicker");
const ctx_3=can_3.getContext("2d");
var list = document.querySelectorAll(".inp");

for (i=0; i<3; i+=1)    {
    list[i].value=255;
}

/*
255,0,0 ---> 255,255,0		0
255,255,0 ---> 0,255,0		1
0,255,0 ---> 0,255,255		2
0,255,255 ---> 0,0,255		3
0,0,255---> 255,0,255		4
255,0,255 ---> 255,0,0      5
*/
var picker = ct.createLinearGradient(0,0,can.width,0);
var count =2;
var rgb2 =[255,0,0];
for (let n=0; n<7; n+=1)   {  
    if (count == 2) {   
        var cMod=-1;
    }
    else if (count == 0)    {   
        var cMod=2;
    }
    count+=cMod;
    if (n%2 == 0)   {   
        var mod = 1;
    }
    else    {   
        var mod = -1;
    }
    picker.addColorStop(n/6,`rgb(${rgb2})`);
    rgb2[count]+=255*mod;
}
ct.fillStyle=picker;
ct.fillRect(0,0,can.width,can.height);

function gradient(filler){    
    bw=ctx_3.createLinearGradient(0,0,can_3.width,0);
    bw.addColorStop(1,"rgb(0,0,0)");
    bw.addColorStop(0,"rgb(255,255,255)");
    bw.addColorStop(.5,`rgb(${filler})`);
    ctx_3.fillStyle=bw;
    ctx_3.fillRect(0,0,can_3.width,can_3.height);
}
function getPos(e)  {   
    var body =  e.target.getBoundingClientRect();
    var x = e.clientX - body.left;
    var y = e.clientY - body.top;
    return [x,y];
}


function setBoxValue(listis)  {
    
    for (i=0; i<3; i+=1)    {
        rgb[i]=list[i].value=listis[i];
    }
    
    ctx_2.fillStyle=`rgb(${listis})`;
    ctx_2.fillRect(0,0,can_2.height,can_2.height);
    //sätt för att ändra see-through rutans färg (den som visar var man är på canvasen man ritar på).
    document.dispatchEvent(new KeyboardEvent("keydown",  {   
        "key":"t"
    }));
}
can.addEventListener("mousemove",function(e) {
    var xy=getPos(e);
    var sample =ct.getImageData(xy[0],xy[1],1,1);
    spectrumTR=[sample.data[0],sample.data[1],sample.data[2],sample.data[3]];
    setBoxValue(spectrumTR);
    gradient(spectrumTR);
})
can_3.addEventListener("mousemove",function(e)   {  
    var xy=getPos(e);
    var sample_bw=ctx_3.getImageData(xy[0],xy[1],1,1);
    spectrumBW = [sample_bw.data[0],sample_bw.data[1],sample_bw.data[2],sample_bw.data[3]];
    setBoxValue(spectrumBW)
})
can.addEventListener("mouseleave",function() {
    if (fillcol==null && rgbsetter == false)  {   
        setBoxValue(lastcol);
        bw=ctx_3.createLinearGradient(0,0,can_3.width,0);
        gradient(lastcol);
    }
    else    {   
        setBoxValue(fillcol);
        bw=ctx_3.createLinearGradient(0,0,can_3.width,0);
        gradient(lastcol);
    }

})
can_3.addEventListener("mouseleave",function() {
    if (fillcol !=null && rgbsetter == false) {   
        setBoxValue(fillcol);
        gradient(lastcol);
    }
    else    {  
        setBoxValue(lastcol);
        gradient(lastcol); 
    }


})
can.addEventListener("click",function()    { 
    lastcol=spectrumTR;
    fillcol=null;
    rgbsetter = false
})
can_3.addEventListener("click",function()   {
    fillcol=spectrumBW  
    setBoxValue(spectrumBW);
    rgbsetter = false
})