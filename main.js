

song = "";
leftWristX = "";
leftWristY = "";
rightWristY = "";
rightWristX = "";
score_leftWrist = "";
score_rightWrist = "";



function preload ()
{
  song = loadSound("music.mp3");
}

function play ()
{
    song.play();
    song.setVolume(1);
    song.rate(0.5);
}

function setup ()
{
    canvas = createCanvas(500,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , got_results);
}

function got_results (results)
{
     console.log(results);
    if(results.length>0)
    score_leftWrist = results[0].pose.keypoints[9].score;
    score_rightWrist = results[0].pose.keypoints[10].score;
    leftWristX = results[0].pose.leftWrist.x;
    lefttWristY = results[0].pose.leftWrist.y;
    console.log("leftWristY" + leftWristY + "leftWristX" + leftWristX);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristY" + rightWristY + "rightWristX" + rightWristX);
}

function modelLoaded()
{
    console.log("modelLoaded");
}

function draw ()
{
    image(video, 0 ,0 , 500, 400);
 
    fill("#FF0000");
    stroke("#FF0000");

     if (score_rightWrist>0.2)
     {

     


    circle(rightWristX, rightWristY , 20);

    if (rightWristY>0 && rightWristY<=100)
    {
        document.getElementById("speedh4").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if (rightWristY>100 && rightWristY<=200)
    {
       document.getElementById("speedh4").innerHTML = "Speed = 1x";
       song.rate(1);
    }


    else if (rightWristY>200 && rightWristY<=300)
    {
        document.getElementById("speedh4").innerHTML = "Speed = 1.5x";
       song.rate(1.5);
    }

    else if (rightWristY>300 && rightWristY<=400)
    {
        document.getElementById("speedh4").innerHTML = "Speed = 2x";
       song.rate(2);
    }

    else if (rightWristY>400 && rightWristY<=500)
    {
        document.getElementById("speedh4").innerHTML = "Speed = 2.5x";
       song.rate(2.5);
    }

   }

   fill("#008000");
    stroke("#008000");

    if(score_leftWrist>0.2)
    {
        circle(leftWristX, leftWristY , 20);
        num = Number(leftWristY);
        remove_decimels = floor(num);
        volume = remove_decimels/500;
        document.getElementById("volumeh4").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }


}

