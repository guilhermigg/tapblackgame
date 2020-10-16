var score = 0;
var sound = 1;
var timer = null;

// Generate a random number
function random(){
    return (Math.floor(Math.random() * 16)).toString()
}

// When click
function clicked(id){
    if(isBlack(id)){
        var audio = new Audio("public/click.mp3");
        if(sound) audio.play();

        var randomId = generateNewNumber()

        document.getElementById(randomId).style.backgroundColor = 'black'
        document.getElementById(id).style.backgroundColor = 'white'

        // Update Score
        score+=1
        document.getElementById('score').innerHTML = score;
    }else{
        lost()
    }
}

function isBlack(id){
    var color = document.getElementById(id).style.backgroundColor
    if(color == 'black') return true
    else return false
}

function generateNewNumber(){
    let randomId = random()
    while(document.getElementById(randomId).style.backgroundColor=='black'){
        randomId = random()
    }
    return randomId
}

function lost(){
    changeUI('main')
    scoreController()
}

function handleHighscore(){
    var highest = timer ? localStorage.getItem('time-highscore') : localStorage.getItem('free-highscore')

    if(parseInt(score) > parseInt(highest) || highest==null){
        if(!timer){
            console.log('freemode')
            document.getElementById('free-highscore').innerHTML = '<b>Highest Score (Free Mode):</b> '+score;
            localStorage.setItem('free-highscore', score);
        }else{
            console.log('timemode')
            document.getElementById('time-highscore').innerHTML = '<b>Highest Score (Timed Mode):</b> '+score;
            localStorage.setItem('time-highscore', score);
        }
    }
}

function scoreController(){
    localStorage.setItem('lastscore', score);
    document.getElementById('lastscore').innerHTML = 'Last Score: '+score;

    handleHighscore()

    if(timer){
        clearInterval(timer)
        document.getElementById('timer').innerHTML = ''
    }

    score = 0

    return true
}
function generateRandomNumbers(){
    var randomNumbers = [];

    while(randomNumbers.length<3){
        var id = random();
        if(randomNumbers.indexOf(id)<0){
            randomNumbers.push(id.toString())
        }
    }

    return randomNumbers
}

// Start the game
function start(gamemode){
    createButtons();

    if(gamemode == 'timed'){
        startTimer()
    }

    changeUI('game')
    randomNumbers = generateRandomNumbers()

    randomNumbers.forEach((number)=>{
        document.getElementById(number).style = 'background-color: black'
    })
}

function startTimer(){
    var time = 10
    document.getElementById('timer').innerHTML = 10

    timer = setInterval( ( ) => {
        time-=1
        document.getElementById('timer').innerHTML = time

        if(time<=0){
            lost()
        }
    }, 1000)
}