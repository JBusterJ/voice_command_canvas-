x = 0;
y = 0;

screen_width = (0.9 * window.innerWidth);
screen_height = (0.75 * window.innerHeight);

draw_apple = "";

speak_data = "";

to_number = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function(event) {

    console.log(event);

    content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

    to_number = Number(content);

    console.log(to_number);

    if(Number.isInteger(to_number)){
        draw_apple = "set";
    } else if (content == "million"){
        draw_apple = "set";
        to_number = 1000000;
    } else {
        speak_data = "Unable to convert speech to number. Please try again."
        speak();
    }
}

function preload(){
    apple = loadImage("https://i.ibb.co/pdPzdkq/appleviewpng.png");
}

function setup() {
    canvas = createCanvas(screen_width, screen_height);
}

function draw() {
    if (draw_apple == "set") {
        document.getElementById("status").innerHTML = to_number + " Apples drawn";
        for (i = 0; i < to_number; i++){
            x = Math.floor(Math.random() * (screen_width-20));
            y = Math.floor(Math.random() * (screen_height-20));
            image(apple, x, y, 40, 40);
        }
        draw_apple = "";
    }
}

function speak() {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
