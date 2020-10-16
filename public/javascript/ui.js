const gameDiv = document.getElementById('game');

function loadScore(){
    var freehigh = localStorage.getItem('free-highscore')
    var timehigh = localStorage.getItem('time-highscore')

    var last = localStorage.getItem('lastscore')

    if(!freehigh) freehigh=0
    if(!timehigh) timehigh=0
    if(!last) last=0

    console.log(freehigh, timehigh)

    document.getElementById('free-highscore').innerHTML = '<b>Highest Score (Free Mode):</b> '+freehigh;
    document.getElementById('time-highscore').innerHTML = '<b>Highest Score (Timed Mode):</b> '+timehigh;

    document.getElementById('lastscore').innerHTML = '<b>Last Score:</b> '+last;

}

function changeUI(mode){
    if(mode=='game'){
        document.getElementById('header-ingame').style.display = 'block';
        document.getElementById('main-menu').style.display = 'none'
        document.getElementById('score').innerHTML = 0;
        document.getElementById('timer').innerHTML = '';
    }else if(mode=='main'){
        deleteButtons()

        document.getElementById('header-ingame').style.display = 'none';
        document.getElementById('main-menu').style.display = 'block'
    }
}

// Create elements
function createButtons(){
    for(x=0;x<16;x++){
        var button = document.createElement('button');
        button.className = 'grid-item';
        button.id = x;

        button.onmousedown = function(){
            clicked(this.id)
        }

        gameDiv.appendChild(button)
    }
}

function deleteButtons(){
    while(gameDiv.lastElementChild) {
        gameDiv.removeChild(gameDiv.lastElementChild);
    }
}

function changeSoundState(action){
    if(action == 'mute'){
        sound = 0
        document.getElementById('sound').src = 'public/muted.png'
        document.getElementById('sound').onclick = function(){
            changeSoundState('unmute')
        }
    }else{
        sound = 1
        document.getElementById('sound').src = 'public/sound.png'
        document.getElementById('sound').onclick = function(){
            changeSoundState('mute')
        }
    }
}

loadScore()