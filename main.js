song="";

leftWristX=0
leftWristY=0

rightWristX=0
rightWristY=0
function setup()
{
 canvas=createCanvas(500,400);
 canvas.center();

 video = createCapture(VIDEO);
video.size(500,400);
 video.hide();

 poseNet=ml5.poseNet( video,modelLoaded);
 poseNet.on("pose",gotPose);
}

function draw()
{
    image(video,0,0,500,400);

      fill('red');
      stroke('red');

      circle(leftWristX,leftWristY,20);
      InNumberleftWristY=Number(leftWristY);
      remove_decimals = floor(InNumberleftWristY);
      volume = remove_decimals/400;
      song.setVolume(volume);

      document.getElementById("volume").innerHTML="Volume :" + volume;


      circle(rightWristX,rightWristY,20);

      if (rightWristY>0 && rightWristY<100)
      {
        song.rate(0.5)
        document.getElementById("speed").innerHTML="Speed :0.5x";
      }

      else if(rightWristX>100 && rightWristY<200)
      {
        song.rate(1.0)
        document.getElementById("speed").innerHTML="Speed :1.0x";
      }

      else if (rightWristY>200 && rightWristY<300)
      {
        song.rate(1.5)
        document.getElementById("speed").innerHTML="Speed :1.5x";
      }

      else if (rightWristY>300 && rightWristY<400)
      {
        song.rate(2.0)
        document.getElementById("speed").innerHTML="Speed :2.0x";
      }

    }

function preload()
{
   song=loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("poseNet is Loaded");
}

function gotPose(result)
{
  if(result.length>0)
{
  console.log(result);
  leftWristX=result[0].pose.leftWrist.x;
  leftWristY=result[0].pose.leftWrist.y;
  console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

  rightWristX=result[0].pose.rightWrist.x;
  rightWristY=result[0].pose.rightWrist.y;
  console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
}
}

