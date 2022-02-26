status1="";
object=[];
function preload(){

}
function draw(){
image(video, 0, 0, 450, 450);
if(status1==true){
    objectDetector.detect(video, gotResults);
    for(i=0;i<object.length;i++){
    percentage=floor(object[i].confidence*100);
    r=random(255);
    g=random(255);
    b=random(255);
    fill(r, g, b);
    text(object[i].label+","+percentage+"%", object[i].x, object[i].y);
    noFill();
    stroke(r, g, b);
    rect(object[i].x, object[i].y, object[i].width, object[i].height);
    if(check==object[i].label){
    synth=window.speechSynthesis();
    utterThis=new SpeechSynthesisUtterance(check+"Found");
    synth.speak(utterThis);
    video.stop();
    objectDetector.detect(gotResults);
    document.getElementById("status").innerHTML="Status: Object Found";
    }
    else{
        document.getElementById("status").innerHTML="Status: Object Not Found";
        synth=window.speechSynthesis();
        utterThis=new SpeechSynthesisUtterance(check+"Not Found");
        synth.speak(utterThis);
    }
    }
}
}
function setup(){
canvas=createCanvas(450, 450);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects....";
    check=document.getElementById("input").value;
}
function modelloaded(){
    console.log("Your model is successfully loaded");
    status1=true;
}
function gotResults(error, results){
    if(error){
        console.log("Error");
    }
    else{
        console.log(results);
        object=results;
    }
}