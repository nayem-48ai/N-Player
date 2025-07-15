// DOM Elements
const mainAudio = document.getElementById('main_audio');
const tracksList = document.querySelector('.tracks');

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

// 1. Load a song
function loadSong(index) {
    const song = All_song[index];
    
    // Update audio source
    mainAudio.src = song.path;
    
    // Update UI
    currentTrackName.textContent = song.name;
    currentSingerName.textContent = song.singer;
    smallSongName.textContent = song.name;
    smallArtistName.textContent = song.singer;
    largeAlbumArt.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
    smallAlbumArt.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
    
    // Highlight the current song in the list
    updateSongListHighlight();
    
    // Reset slider and duration
    slider.value = 0;
    currentDurationEl.textContent = "00:00";
    totalDurationEl.textContent = "00:00";
}

// 2. Play song
function playSong() {
    isPlaying = true;
    mainAudio.play();
    
    // Update UI for playing state
    playPauseBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    waveAnimation.classList.add('playing');
    largeAlbumArt.classList.add('playing');
    smallPlayer.style.transform = 'translateY(0)';
}

// 3. Pause song
function pauseSong() {
    isPlaying = false;
    mainAudio.pause();

    // Update UI for paused state
    playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    waveAnimation.classList.remove('playing');
    largeAlbumArt.classList.remove('playing');
}

// 4. Toggle Play/Pause
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// 5. Next Song
function nextSong() {
    currentIndex = (currentIndex + 1) % All_song.length;
    loadSong(currentIndex);
    playSong();
}

// 6. Previous Song
function prevSong() {
    currentIndex = (currentIndex - 1 + All_song.length) % All_song.length;
    loadSong(currentIndex);
    playSong();
}

// 7. Update Progress Bar & Time
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    
    if (duration) {
        // Update slider
        const progressPercent = (currentTime / duration) * 100;
        slider.value = progressPercent;
        
        // Update time display
        // Total duration
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if(totalSec < 10) totalSec = `0${totalSec}`;
        totalDurationEl.textContent = `${totalMin}:${totalSec}`;
        
        // Current time
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10) currentSec = `0${currentSec}`;
        currentDurationEl.textContent = `${currentMin}:${currentSec}`;
    }
}

// 8. Set Progress Bar on click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = mainAudio.duration;
    
    if(duration) {
      mainAudio.currentTime = (clickX / width) * duration;
    }
}

// 9. Highlight active song in the list
function updateSongListHighlight() {
    const allSongElements = document.querySelectorAll('.song');
    allSongElements.forEach((songEl, index) => {
        if (index === currentIndex) {
            songEl.classList.add('playing');
        } else {
            songEl.classList.remove('playing');
        }
    });
}

// --- EVENT LISTENERS ---

// Play/Pause button
playPauseBtn.addEventListener('click', togglePlayPause);

// Next/Prev buttons
forwardBtn.addEventListener('click', nextSong);
backwardBtn.addEventListener('click', prevSong);

// Time/Song update
mainAudio.addEventListener('timeupdate', updateProgress);
mainAudio.addEventListener('ended', nextSong);

// Slider
slider.addEventListener('input', (e) => {
    if(mainAudio.duration) {
      mainAudio.currentTime = (e.target.value / 100) * mainAudio.duration;
    }
});


// Player visibility
upPlayerBtn.addEventListener('click', () => popupPlayer.style.transform = 'translateY(0)');
downPlayerBtn.addEventListener('click', () => popupPlayer.style.transform = 'translateY(100%)');

// Click on a song in the list to play
tracksList.addEventListener('click', (e) => {
    const songElement = e.target.closest('.song');
    if (songElement) {
        const clickedIndex = parseInt(songElement.dataset.index);
        if (clickedIndex === currentIndex && isPlaying) {
             pauseSong();
        } else {
             currentIndex = clickedIndex;
             loadSong(currentIndex);
             playSong();
        }
    }
});

// Initial Load (first song in the list)
window.addEventListener('load', () => {
    loadSong(currentIndex);
});
