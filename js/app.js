let playBtn;
let music = document.querySelector("audio");
let playIcon = document.querySelector(".play-icon");
let forward = document.querySelector(".forward");
let backForward = document.querySelector(".back-forward");
let currentMusic = 0;
let currentIcon = null;
let volumeCard = document.querySelector(".volume-card");
let volume = document.querySelector(".volume");
let volumeHandler = document.querySelector(".volume-handler i");
let processBar = document.querySelector(".process-bar");
let currentTime = document.querySelector(".current-time");
let currentTimer = document.querySelector(".currentTime");
let timerMain = document.querySelector(".timerMain");
let currentClicked = 0;
let musicName = document.querySelector(".music-name");
let artist = document.querySelector(".artist");
let musicCard;
let bookmarkBtn;
let bookmarked = null;
let musicsContainer = document.querySelector(".musics-container");

// bookmarkBtn.forEach(function(item){
//   item.addEventListener('click',function(){
//   bookmarked = item.parentElement.previousElementSibling.querySelector('.play-btn')
//   console.log(bookmarked.dataset.src)
//   })
// })

let musics = [
  {
    id: 1,
    title: "Midnight Echoes",
    artistMusic: "Luna Sky",
    src: "./assets/audios/1.mp3",
    cover: "./assets/images/1.jpg",
  },
  {
    id: 2,
    title: "Waves of Tomorrow",
    artistMusic: "Silver Horizon",
    src: "./assets/audios/2.mp3",
    cover: "./assets/images/2.jpg",
  },
  {
    id: 3,
    title: "Burning Ashes",
    artistMusic: "Scarlet Valley",
    src: "./assets/audios/3.mp3",
    cover: "./assets/images/3.jpg",
  },
  {
    id: 4,
    title: "Neon Dreams",
    artistMusic: "Electric Shadow",
    src: "./assets/audios/4.mp3",
    cover: "./assets/images/4.jpg",
  },
  {
    id: 5,
    title: "Whispers of Wind",
    artistMusic: "Aurelia Night",
    src: "./assets/audios/5.mp3",
    cover: "./assets/images/5.png",
  },
  {
    id: 6,
    title: "Chasing Sunset",
    artistMusic: "Golden Fantasy",
    src: "./assets/audios/6.mp3",
    cover: "./assets/images/6.jpg",
  },
];

function renderMusics() {
  musics.forEach(function (item) {
    musicsContainer.insertAdjacentHTML(
      "beforeend",
      `
        <article class="music-card">
          <header>
            <img src="${item.cover}" alt="cover" />

            <div class="play-music">
              <button class="play-btn" data-src="${item.src}">
                <i class="fa fa-play"></i>
              </button>
            </div>
            <div class="bookmark">
              <button class="bookmark-btn">
                <i class="fa-regular fa-bookmark"></i>
              </button>
            </div>
          </header>

          <main>
            <p class="title-music">${item.title}</p>
            <p class="artist-music">${item.artistMusic}</p>
          </main>
        </article>
      `,
    );
  });

  playBtn = document.querySelectorAll(".play-btn");
  bookmarkBtn = document.querySelectorAll(".bookmark-btn");
  musicCard = document.querySelectorAll(".music-card");

  playBtn.forEach(playMusic);
}

volume.style.width = "100%";
volumeCard.addEventListener("click", function (event) {
  let v = event.offsetX;
  music.volume = v / 100;
  volume.style.width = `${v}px`;
});
currentTime.style.width = "0%";

processBar.addEventListener("click", function (e) {
  console.log(formatTime(currentClicked));
  if (music.currentTime !== 0) {
    currentTime.style.width = `${e.offsetX}px`;
    if (music.currentTime <= music.duration) {
      let width = processBar.offsetWidth;
      currentClicked = e.offsetX;
      let prog = currentClicked / width;
      currentTime.style.width = `${prog * 100}%`;
      music.currentTime = prog * music.duration;
    }
  }
});

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

setInterval(() => {
  if (!isNaN(music.duration)) {
    let musicCurrentTime = formatTime(music.currentTime);
    let musicTime = formatTime(music.duration);
    currentTimer.textContent = musicCurrentTime;
    timerMain.textContent = musicTime;
    currentTime.style.width = `${(music.currentTime / music.duration) * 100}%`;
  }
}, 50);

function playMusic(item, i) {
  let musicSelected = item.dataset.src;
  let iconMusic = item.querySelector("i");
  item.addEventListener("click", function () {
    playBtn.forEach((btn) => {
      btn.querySelector("i").className = "fa fa-play";
    });
    musicCard.forEach((card) => {
      card.classList.remove("active");
    });

    currentIcon = iconMusic;

    if (music.getAttribute("src") !== musicSelected) {
      let article = item.parentElement.parentElement.parentElement;
      article.classList.add("active");
      musicName.innerHTML = article.querySelector("p.title-music").innerHTML;
      artist.innerHTML = article.querySelector("p.artist-music").innerHTML;
      music.src = musicSelected;
      currentMusic = i;
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
  musicCard.forEach((card) => {
    card.classList.remove("active");
  });
  if (music.paused) {
    music.pause();
  } else {
    if (currentMusic < playBtn.length - 1) {
      currentMusic++;
      music.src = playBtn[currentMusic].dataset.src;
      parentElem();
      playBtn[currentMusic].querySelector("i").className = "fa fa-pause";
      musicCard[currentMusic].classList.add("active");
      music.play();
    } else {
      currentMusic = 0;
      music.src = playBtn[currentMusic].dataset.src;
      parentElem();
      playBtn[currentMusic].querySelector("i").className = "fa fa-pause";
      musicCard[currentMusic].classList.add("active");
      music.play();
    }
  }
}

function backForwardMusic() {
  playBtn.forEach((btn) => {
    btn.querySelector("i").className = "fa fa-play";
  });

  musicCard.forEach((card) => {
    card.classList.remove("active");
  });
  if (music.paused) {
    music.pause();
  } else {
    if (currentMusic !== 0) {
      currentMusic--;
      music.src = playBtn[currentMusic].dataset.src;
      parentElem();
      playBtn[currentMusic].querySelector("i").className = "fa fa-pause";
      musicCard[currentMusic].classList.add("active");
      console.log(music.src);
      music.play();
    } else {
      currentMusic = playBtn.length - 1;
      console.log(currentMusic);
      music.src = playBtn[currentMusic].dataset.src;
      parentElem();
      music.currentTime = 0;
      currentTime.style.width = "0%";
      playBtn[currentMusic].querySelector("i").className = "fa fa-pause";
      musicCard[currentMusic].classList.add("active");
      music.play();
    }
  }
}

function playOrPauseMusic(iconMusic) {
  if (
    music.currentTime === 0 &&
    playIcon.className === "fa fa-play play-icon"
  ) {
    music.src = playBtn[currentMusic].dataset.src;
    currentIcon = playBtn[currentMusic].querySelector("i");
    currentIcon.className = "fa fa-pause";
    musicCard[currentMusic].classList.add("active");
  } else {
    currentIcon = playBtn[currentMusic].querySelector("i");
    currentIcon.className = "fa fa-play";
    musicCard[currentMusic].classList.remove("active");
  }
  if (music.paused) {
    music.play();
    iconMusic.className = "fa fa-pause";
    playIcon.className = "fa fa-pause play-icon";
    currentIcon.className = "fa fa-pause";
    musicCard[currentMusic].classList.add("active");
  } else {
    music.pause();
    iconMusic.className = "fa fa-play";
    playIcon.className = "fa fa-play play-icon";
    currentIcon.className = "fa fa-play";
    musicCard[currentMusic].classList.remove("active");
  }
}

function volumeHandle(e) {
  if (volumeHandler.className === "fa fa-volume-up") {
    volumeHandler.className = "fa fa-volume-mute";
    volume.style.width = "0";
    music.volume = 0;
  } else {
    volumeHandler.className = "fa fa-volume-up";
    volume.style.width = "100%";
    music.volume = 1;
  }
}
function parentElem() {
  let article = playBtn[currentMusic].parentElement.parentElement.parentElement;
  musicName.innerHTML = article.querySelector("p.title-music").innerHTML;
  artist.innerHTML = article.querySelector("p.artist-music").innerHTML;
}

renderMusics();
volumeHandler.addEventListener("click", volumeHandle);
playIcon.addEventListener("click", function () {
  playOrPauseMusic(playBtn[currentMusic].querySelector("i"));
});
forward.addEventListener("click", forwardMusic);
backForward.addEventListener("click", backForwardMusic);
