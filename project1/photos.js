function initialize () {
    pictures = [document.getElementById('pic1'),document.getElementById('pic2'),document.getElementById('pic3'),document.getElementById('pic4'),document.getElementById('pic5')]
    play = false;
    timeOuts = [];
    firstTime = 0;
    courtTop = court.getBoundingClientRect().top;
    courtBottom = court.getBoundingClientRect().bottom;
    courtLeft = court.getBoundingClientRect().left;
    courtRight = court.getBoundingClientRect().right;
    console.log(court.getBoundingClientRect().top,court.getBoundingClientRect().bottom,court.getBoundingClientRect().left,court.getBoundingClientRect().right);
}

function resumeAction(){
    if(!play){
        play = true;
        for(var i=0;i<pictures.length;i++){
            var xprev =0;
            var yprev =0;
            callMotion(pictures[i],xprev,yprev,0);
        }
    }
    else if(play){
        //clearTimeout(my_time1);
        for (var i=0; i<timeOuts.length; i++) {
            clearTimeout(timeOuts[i]);
        }
        play=false;
    }  
}

function findCollision(picture){
    for(var i=0;i<pictures.length;i++){
        if(pictures[i]!=picture){
            var picture2 = pictures[i];
            var y1=picture.getBoundingClientRect().top;
            var x1=picture.getBoundingClientRect().left;
            var p1=picture.getBoundingClientRect().top+picture.clientHeight;
            var q1=picture.getBoundingClientRect().left+picture.clientWidth;
            var y2=picture2.getBoundingClientRect().top;
            var x2=picture2.getBoundingClientRect().left;
            var p2=picture2.getBoundingClientRect().top+picture2.clientHeight;
            var q2=picture2.getBoundingClientRect().left+picture2.clientWidth;
            if(q1-1 == x2-1 || q2-1 == x1-1 || q1-1 == x2 || q1 == x2-1 || q2-1 == x1 || q2 == x1-1) {
                if((y2<p1 && y2>y1) || (y1<p2 && y1>y2)){
                    return true;
                }
            }
            else if(p1-1 == y2-1 || p2-1 == y1-1 || p1-1 == y2 || p1 == y2-1 || p2-1 == y1 || p2 == y1-1){
                if((x2<q1 && x2>x1) || (x1<q2 && x1>x2)){
                    return true;
                }
            }
        }
    }
    return false;    
}

function callMotion(picture,xprev,yprev,firstTime){
            step = 1;
            var y=picture.getBoundingClientRect().top;
            var x=picture.getBoundingClientRect().left;
            var p=picture.getBoundingClientRect().top+picture.clientHeight;
            var q=picture.getBoundingClientRect().left+picture.clientWidth;
            if(firstTime == 0){
                movePictureRightDown(step,picture,xprev,yprev);
                firstTime++;
            }
            console.log('p',p,'q',q,'y',y,'x',x,'courtright',courtRight,'courtbottom',courtBottom,'courtleft',courtLeft,'courttop',courtTop);
            if(x>=courtLeft && q<courtRight && y<courtTop && p<courtBottom){
                if(x>xprev)
                    movePictureRightDown(step,picture,xprev,yprev);
                else
                    movePictureLeftDown(step,picture,xprev,yprev);    
            }
            else if(x<=courtLeft && q<courtRight && y>courtTop && p<courtBottom){
                if(y>yprev)
                    movePictureRightDown(step,picture,xprev,yprev);
                else
                    movePictureRightUp(step,picture,xprev,yprev);    
            }
            else if(x>courtLeft && q<courtRight && y>courtTop && p>=courtBottom){
                if(x>xprev)
                    movePictureRightUp(step,picture,xprev,yprev);
                else
                    movePictureLeftUp(step,picture,xprev,yprev);    
            }
            else if(x>courtLeft && y>courtTop && p<courtBottom && q>=courtRight){
                if(y>yprev)
                    movePictureLeftDown(step,picture,xprev,yprev);
                else
                    movePictureLeftUp(step,picture,xprev,yprev);
            }
}

function movePictureRightDown(step,picture,xprev,yprev) {
        var y=picture.getBoundingClientRect().top;
        var x=picture.getBoundingClientRect().left;
        var p=picture.getBoundingClientRect().top+picture.clientHeight;
        var q=picture.getBoundingClientRect().left+picture.clientWidth;
                var checkCollision = findCollision(picture);
                if(checkCollision){
                    xprev = x;
                    yprev = y;
                    y = y-step;
                    x = x-step;
                    p = p-step;
                    q = q-step;
                    picture.style.top= y + "px"; 
                    picture.style.left= x + "px";
                    my_time=setTimeout(function() {
                        movePictureLeftUp(step,picture,xprev,yprev);
                    },5);                    
                }
                else{
                    xprev = x;
                    yprev = y;
                    y = y+step;
                    x = x+step;
                    p = p+step;
                    q = q+step;
                    picture.style.top= y + "px"; 
                    picture.style.left= x + "px";
                    if(p<courtBottom && q<courtRight){
                        my_time=setTimeout(function() {
                            movePictureRightDown(step,picture,xprev,yprev);
                        },5);
                        timeOuts.push(my_time);        
                    }
                    else{
                        callMotion(picture,xprev,yprev,1);
                    }
                }
}

function movePictureLeftDown(step,picture,xprev,yprev) {
    var y=picture.getBoundingClientRect().top;
    var x=picture.getBoundingClientRect().left;
    var p=picture.getBoundingClientRect().top+picture.clientHeight;
    var q=picture.getBoundingClientRect().left+picture.clientWidth;
    var checkCollision = findCollision(picture);
                if(checkCollision){
                    xprev = x;
                    yprev = y;
                    y = y-step;
                    x = x+step;
                    p = p-step;
                    q = q+step;
                    picture.style.top= y + "px"; 
                    picture.style.left= x + "px";
                    my_time=setTimeout(function() {
                        movePictureRightUp(step,picture,xprev,yprev);
                    },5);
                }
                else{
                    xprev = x;
                    yprev = y;
                    y = y+step;
                    x = x-step;
                    p = p+step;
                    q = q-step;
                    picture.style.top= y + "px"; 
                    picture.style.left= x + "px";
                    if(x>courtLeft && p<courtBottom){
                        my_time=setTimeout(function() {
                            movePictureLeftDown(step,picture,xprev,yprev);
                        },5);
                        timeOuts.push(my_time);   
                    }
                    else{
                        callMotion(picture,xprev,yprev,1);
                    }
                }
}

function movePictureRightUp(step,picture,xprev,yprev) {
    var y=picture.getBoundingClientRect().top;
    var x=picture.getBoundingClientRect().left;
    var p=picture.getBoundingClientRect().top+picture.clientHeight;
    var q=picture.getBoundingClientRect().left+picture.clientWidth;
    var checkCollision = findCollision(picture);
    if(checkCollision){
        xprev = x;
        yprev = y;
        y = y+step;
        x = x-step;
        p = p+step;
        q = q-step;
        picture.style.top= y + "px"; 
        picture.style.left= x + "px";
        my_time=setTimeout(function() {
            movePictureLeftDown(step,picture,xprev,yprev);
        },5);
    }
    else{
        xprev = x;
        yprev = y;
        y = y-step;
        x = x+step;
        p = p-step;
        q = q+step;
        picture.style.top= y + "px"; 
        picture.style.left= x + "px";
        if(q<courtRight && y>courtTop){
            my_time=setTimeout(function() {
                movePictureRightUp(step,picture,xprev,yprev);
            },5);
            timeOuts.push(my_time);    
        }    
        else{
            callMotion(picture,xprev,yprev,1);
        }
    }
}

function movePictureLeftUp(step,picture,xprev,yprev) {
    var y=picture.getBoundingClientRect().top;
    var x=picture.getBoundingClientRect().left;
    var p=picture.getBoundingClientRect().top+picture.clientHeight;
    var q=picture.getBoundingClientRect().left+picture.clientWidth;
    var checkCollision = findCollision(picture);
    if(checkCollision){
                    xprev = x;
                    yprev = y;
                    y = y+step;
                    x = x+step;
                    p = p+step;
                    q = q+step;
                    picture.style.top= y + "px"; 
                    picture.style.left= x + "px";
        my_time=setTimeout(function() {
            movePictureRightDown(step,picture,xprev,yprev);
        },5);
    }
    else{
        xprev = x;
        yprev = y;
        y = y-step;
        x = x-step;
        p = p-step;
        q = q-step;
        picture.style.top= y + "px"; 
        picture.style.left= x + "px";
        if(y>courtTop && x>courtLeft){
            my_time=setTimeout(function() {
                movePictureLeftUp(step,picture,xprev,yprev);
            },5);
            timeOuts.push(my_time); 
        }
        else{
            callMotion(picture,xprev,yprev,1);
        }
    }
}
