let imageIndex = 1;
showImages(imageIndex);

function addImage(n) {
  showImages(imageIndex += n);
}

function showImages(n) {
  let i;
  let images = document.getElementsByClassName("image");

  if (n > images.length) 
  {
    imageIndex = 1;
  }

  if (n < 1) 
  {
    imageIndex = images.length;
  }
  for (i = 0; i < images.length; i++) 
  {
    images[i].style.display = "none";  
  }
 
  images[imageIndex-1].style.display = "block";  
}





let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;

let wave = document.getElementById('wave');

const music_list = [
    {
        img : 'src/img/72-seasons-single_cover.jpeg',
        name : '72 seasons',
        artist : 'Metallica',
        music : 'src/audio/Metallica-72-Seasons.mp3'
    },
    {
        img : 'src/img/lux-aeterna_cover.jpeg',
        name : 'Lux Æterna',
        artist : 'Metallica',
        music : 'src/audio/Metallica-Lux-Aeterna.mp3'
    },
    {
        img : 'src/img/screaming-suicide-single_cover.jpeg',
        name : "<span id='one'>Screaming Suicide</span>",
        artist : 'Metallica',
        music : 'src/audio/Metallica-Screaming-Suicide.mp3'
    },
    {
        img : 'src/img/if-darkness-had-a-son-single_cover.jpeg',
        name : "<span id='two'>If Darkness Had a Son</span>",
        artist : 'Metallica',
        music : 'src/audio/Metallica-If-Darkness-Had-a-Son.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.innerHTML = "<img src=" + music_list[track_index].img + "/>";
    track_name.innerHTML = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<img class="pause"  src="src/icons/pause.svg"/> ';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<img class="play" src="src/icons/play.svg"/> ';
}
function nextTrack(){
    if(track_index < music_list.length - 1){
        track_index += 1;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
