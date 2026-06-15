let playBtn = document.querySelectorAll(".play-btn");
let music = document.querySelector("audio");
let playIcon = document.querySelector(".play-icon");
let forward = document.querySelector(".forward");
let backForward = document.querySelector(".back-forward");
let currentMusic = 0;
let currentIcon = null;
let volumeCard = document.querySelector('.volume-card')
let volume = document.querySelector('.volume')
let volumeHandler = document.querySelector('.volume-handler i')
let processBar = document.querySelector('.process-bar')
let currentTime = document.querySelector('.current-time')
let currentTimer = document.querySelector('.currentTime')
let timerMain = document.querySelector('.timerMain')
let currentClicked = 0;
let musicName = document.querySelector('.music-name')
let artist = document.querySelector('.artist')

volume.style.width = '100%'
volumeCard.addEventListener('click',function(event){
  let v = event.offsetX
  music.volume = v / 100
  volume.style.width = `${v}px`
})
currentTime.style.width = "0%"

processBar.addEventListener('click', function(e){
  console.log(formatTime(currentClicked))
  if(music.currentTime !== 0){
    currentTime.style.width = `${e.offsetX}px`
    if(music.currentTime <= music.duration){
      let width = processBar.offsetWidth
      currentClicked = e.offsetX
      let prog =  currentClicked / width
      currentTime.style.width = `${prog * 100}%`
      music.currentTime = prog * music.duration
    }
  }
  
})

function formatTime(time){
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2,"0")}`
}

setInterval(() => {
  if(!isNaN(music.duration)){
      let musicCurrentTime = formatTime(music.currentTime);
      let musicTime = formatTime(music.duration);
    currentTimer.textContent = musicCurrentTime
    timerMain.textContent = musicTime
    currentTime.style.width = `${music.currentTime / music.duration * 100}%`
  }
}, 50);

function playMusic(item, i) {
  
  let musicSelected = item.dataset.src;
  let iconMusic = item.querySelector("i");
  item.addEventListener("click", function () {
    playBtn.forEach((btn) => {
      btn.querySelector("i").className = "fa fa-play";
    });
    currentIcon = iconMusic
    
    if (music.getAttribute("src") !== musicSelected) {
      let article = item.parentElement.parentElement.parentElement
      musicName.innerHTML = article.querySelector('p.title-music').innerHTML
      artist.innerHTML = article.querySelector('p.artist-music').innerHTML
      music.src = musicSelected;
      currentMusic = i
      music.play();
      iconMusic.className = "fa fa-pause";
      playIcon.className = "fa fa-pause play-icon";

    } else {
      playOrPauseMusic(iconMusic);
    }

  });
}
function forwardMusic() {
    playBtn.forEach((btn) => {
      btn.querySelector("i").className = "fa fa-play";
    });
  if(music.paused){
    music.pause()
  }else{
    if (currentMusic < playBtn.length - 1) {
      currentMusic++
      music.src = playBtn[currentMusic].dataset.src;
      parentElem()
      playBtn[currentMusic].querySelector('i').className = "fa fa-pause";
      music.play();
    } else {
      currentMusic = 0;
      music.src = playBtn[currentMusic].dataset.src;
      parentElem()
      playBtn[currentMusic].querySelector('i').className = "fa fa-pause";
      music.play();
    }
  }
}

function backForwardMusic() {
    playBtn.forEach((btn) => {
      btn.querySelector("i").className = "fa fa-play";
    });
  if(music.paused){
    music.pause()
  }else{
      if (currentMusic !== 0) {
        
    currentMusic--;
    music.src = playBtn[currentMusic].dataset.src;
    parentElem()
    playBtn[currentMusic].querySelector('i').className = "fa fa-pause";
    console.log(music.src)
    music.play();
  } else {
    currentMusic = playBtn.length - 1;
    console.log(currentMusic);
    music.src = playBtn[currentMusic].dataset.src;
    parentElem()
    music.currentTime = 0
    currentTime.style.width = "0%"
    playBtn[currentMusic].querySelector('i').className = "fa fa-pause";
    music.play();
  }
  }
}

function playOrPauseMusic(iconMusic) {
      playBtn.forEach((btn) => {
      btn.querySelector("i").className = "fa fa-play";
    });
  if(currentIcon.className === "fa fa-play" && music.paused){
     playIcon.className = "fa fa-play play-icon";
  }
  if (music.paused) {
    music.play();
    iconMusic.className = "fa fa-pause";
    playIcon.className = "fa fa-pause play-icon";
    currentIcon.className = "fa fa-pause";
  } else {
    music.pause();
    iconMusic.className = "fa fa-play";
    playIcon.className = "fa fa-play play-icon";
    currentIcon.className = 'fa fa-play'
  }
}


function volumeHandle(e){
  if(volumeHandler.className === 'fa fa-volume-up'){
    volumeHandler.className = 'fa fa-volume-mute'
    volume.style.width = '0'
    music.volume = 0
  }else{
    volumeHandler.className = 'fa fa-volume-up'
    volume.style.width = '100%'
    music.volume = 1
  }
}
function parentElem (){
      let article = playBtn[currentMusic].parentElement.parentElement.parentElement
      musicName.innerHTML = article.querySelector('p.title-music').innerHTML
      artist.innerHTML = article.querySelector('p.artist-music').innerHTML
}

volumeHandler.addEventListener('click', volumeHandle)
playBtn.forEach(playMusic);
playIcon.addEventListener("click", playOrPauseMusic);
forward.addEventListener("click", forwardMusic);
backForward.addEventListener("click", backForwardMusic);
