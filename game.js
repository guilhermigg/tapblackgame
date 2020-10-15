var score = 0;
var sound = 1;
var timer = null;

// Generate a random number
function random(){
    return (Math.floor(Math.random() * 16)).toString()
}

// When click
function clicked(id){
    var color = document.getElementById(id).style.backgroundColor

    if(color=='black'){
        var audio = new Audio("click.mp3");
        if(sound) audio.play();

        let randomId = random()
        while(document.getElementById(randomId).style.backgroundColor=='black'){
            randomId = random()
        }

        document.getElementById(randomId).style.backgroundColor = 'black'
        document.getElementById(id).style.backgroundColor = 'white'

        // Update Score
        score+=1
        document.getElementById('score').innerHTML = score;
    }else{
        lost()
    }
}

function lost(){
    document.getElementById('header-ingame').style.display = 'none';
    document.getElementById('header').style.display = 'block'

    deleteButtons()
    scoreController()
}

function scoreController(){
    var highest = localStorage.getItem('free-highscore')

    if(timer){
        highest = localStorage.getItem('time-highscore')
    }

    localStorage.setItem('lastscore', score);
    document.getElementById('lastscore').innerHTML = 'Last Score: '+score;
    console.log(highest)

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

    if(timer){
        clearInterval(timer)
        document.getElementById('timer').innerHTML = ''
    }

    score = 0
}

// Start the game
function start(gamemode){
    createButtons();

    if(gamemode == 'timed'){
        startTimer()
    }

    document.getElementById('header-ingame').style.display = 'block';
    document.getElementById('header').style.display = 'none'
    document.getElementById('score').innerHTML = 0;

    var randomNumbers = [];

    while(randomNumbers.length<3){
        var id = random();
        if(randomNumbers.indexOf(id)<0){
            randomNumbers.push(id.toString())
        }
    }

    randomNumbers.forEach((number)=>{
        document.getElementById(number).style = 'background-color: black'
    })
}

function startTimer(){
    var time = 10

    document.getElementById('timer').innerHTML = 10

    timer = setInterval(()=>{
        time-=1
        document.getElementById('timer').innerHTML = time

        if(time<=0){
            lost()
        }
    }, 1000)
}