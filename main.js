// DOM Elements
const mainAudio = document.getElementById('main_audio');
const tracksList = document.querySelector('.tracks');
const loader = document.querySelector('.loader');

// Player UI Elements
const popupPlayer = document.querySelector('.popup_music_player');
const smallPlayer = document.querySelector('.small_music_player');
const downPlayerBtn = document.getElementById('down_player');
const upPlayerBtn = document.getElementById('up_player');

// Song Info UI
const largeAlbumArt = popupPlayer.querySelector('.song_img');
const smallAlbumArt = smallPlayer.querySelector('.playing_img');
const currentTrackName = document.getElementById('current_track_name');
const currentSingerName = document.getElementById('current_singer_name');
const smallSongName = document.getElementById('song_name');
const smallArtistName = document.getElementById('artist_name');

// Controls UI
const playPauseBtn = document.getElementById('play_pause_btn');
const forwardBtn = document.getElementById('forward_btn');
const backwardBtn = document.getElementById('backward_btn');
const slider = document.getElementById('slider');
const currentDurationEl = document.getElementById('current_duration');
const totalDurationEl = document.getElementById('total_duration');
const waveAnimation = document.querySelector('.wave_animation');

// State
let currentIndex = 0;
let isPlaying = false;

// --- FUNCTIONS ---

function showLoader() { loader.classList.add('show'); }
function hideLoader() { loader.classList.remove('show'); }

function loadSong(index) {
    showLoader(); // গান লোড করার শুরুতে লোডার দেখাও
    const song = All_song[index];
    mainAudio.src = song.path;
    currentTrackName.textContent = song.name;
    currentSingerName.textContent = song.singer;
    smallSongName.textContent = song.name;
    smallArtistName.textContent = song.singer;
    largeAlbumArt.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
    smallAlbumArt.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
    updateSongListHighlight();
    slider.value = 0;
    currentDurationEl.textContent = "00:00";
    totalDurationEl.textContent = "00:00";
}

function playSong() {
    isPlaying = true;
    mainAudio.play();
    playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
    waveAnimation.classList.add('playing');
    largeAlbumArt.classList.add('playing');
    smallPlayer.style.transform = 'translateY(0)';
}

function pauseSong() {
    isPlaying = false;
    mainAudio.pause();
    playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
    waveAnimation.classList.remove('playing');
    largeAlbumArt.classList.remove('playing');
}

function togglePlayPause() { (isPlaying) ? pauseSong() : playSong(); }

function nextSong() {
    currentIndex = (currentIndex + 1) % All_song.length;
    loadSong(currentIndex);
}

function prevSong() {
    currentIndex = (currentIndex - 1 + All_song.length) % All_song.length;
    loadSong(currentIndex);
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        slider.value = progressPercent;
        
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) totalSec = `0${totalSec}`;
        totalDurationEl.textContent = `${totalMin}:${totalSec}`;
        
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) currentSec = `0${currentSec}`;
        currentDurationEl.textContent = `${currentMin}:${currentSec}`;
    }
}

// *** গান ফরওয়ার্ড করার সমাধান ***
function setProgress(e) {
    const seekTime = (mainAudio.duration / 100) * e.target.value;
    mainAudio.currentTime = seekTime;
}

function updateSongListHighlight() {
    const allSongElements = document.querySelectorAll('.song');
    allSongElements.forEach((songEl, index) => {
        songEl.classList.toggle('playing', index === currentIndex);
    });
}

// --- EVENT LISTENERS ---

playPauseBtn.addEventListener('click', togglePlayPause);
forwardBtn.addEventListener('click', nextSong);
backwardBtn.addEventListener('click', prevSong);
mainAudio.addEventListener('timeupdate', updateProgress);
mainAudio.addEventListener('ended', nextSong);

// *** গান লোড হওয়ার এবং প্লে করার নতুন যুক্তি ***
mainAudio.addEventListener('canplay', () => {
    hideLoader(); // গান প্লে করার জন্য প্রস্তুত, তাই লোডার হাইড করো
    playSong();   // এবং গান প্লে করো
});

slider.addEventListener('change', setProgress); // 'input' এর পরিবর্তে 'change'

upPlayerBtn.addEventListener('click', () => popupPlayer.style.transform = 'translateY(0)');
downPlayerBtn.addEventListener('click', () => popupPlayer.style.transform = 'translateY(100%)');

tracksList.addEventListener('click', (e) => {
    const songElement = e.target.closest('.song');
    if (songElement) {
        const clickedIndex = parseInt(songElement.dataset.index);
        if (clickedIndex === currentIndex && isPlaying) {
             pauseSong();
        } else {
             currentIndex = clickedIndex;
             loadSong(currentIndex);
        }
    }
});

window.addEventListener('load', () => {
    // পেজ লোড হলে প্রথম গানটি প্লেয়ারে লোড করে রাখো, কিন্তু প্লে করো না।
    const song = All_song[currentIndex];
    mainAudio.src = song.path;
    currentTrackName.textContent = song.name;
    currentSingerName.textContent = song.singer;
    smallSongName.textContent = song.name;
    smallArtistName.textContent = song.singer;
    largeAlbumArt.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
    smallAlbumArt.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
    updateSongListHighlight();
});
