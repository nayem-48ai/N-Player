document.addEventListener('DOMContentLoaded', () => {
    // === DOM এলিমেন্ট সিলেকশন ===
    const mainAudio = document.getElementById('main_audio');
    
    // Player UI
    const songImg = document.querySelector('.song_img');
    const currentTrackName = document.getElementById('current_track_name');
    const currentSingerName = document.getElementById('current_singer_name');
    const playPauseBtn = document.getElementById('play_pause_btn');
    const forwardBtn = document.getElementById('forward_btn');
    const backwardBtn = document.getElementById('backward_btn');
    const slider = document.getElementById('slider');
    const currentDurationEl = document.getElementById('current_duration');
    const totalDurationEl = document.getElementById('total_duration');
    
    // ছোট প্লেয়ার UI
    const smallPlayer = document.querySelector('.small_music_player');
    const smallAlbumArt = document.querySelector('.playing_img');
    const smallSongName = document.getElementById('song_name');
    const smallArtistName = document.getElementById('artist_name');
    const waveAnimation = document.querySelector('.wave_animation');

    // নতুন UI এলিমেন্ট
    const navBtns = document.querySelectorAll('.nav-btn');
    const mainTabs = document.querySelectorAll('.main-tab');
    const upPlayerNewBtn = document.getElementById('up_player_new');
    const menuBtn = document.getElementById('menu-btn');
    const sidenav = document.getElementById('sidenav');
    const sidenavOverlay = document.getElementById('sidenav-overlay');
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    
    // গানের তালিকা ও সার্চ
    const searchInput = document.getElementById('search-input');
    const allSongsListContainer = document.getElementById('all-songs-list');
    const favoritesListContainer = document.getElementById('favorites-list');
    const listTabBtns = document.querySelectorAll('.list-tab-btn');
    const trackLists = document.querySelectorAll('.track-list');

    // === স্টেট ভ্যারিয়েবল ===
    let currentIndex = 0;
    let isPlaying = false;
    let favorites = JSON.parse(localStorage.getItem('nplayer_favorites')) || [];
    let currentQueue = []; // বর্তমানে কোন তালিকা থেকে গান বাজছে

    // === ফাংশন ===

    function loadSong(index) {
        if (typeof All_song === 'undefined' || !All_song[index]) return;
        currentIndex = index;
        const song = All_song[index];
        mainAudio.src = song.path;
        currentTrackName.textContent = song.name;
        currentSingerName.textContent = song.singer;
        smallSongName.textContent = song.name;
        smallArtistName.textContent = song.singer;
        songImg.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
        smallAlbumArt.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
        updateSongListHighlight();
    }

    function playSong() { isPlaying = true; mainAudio.play(); playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; songImg.classList.add('playing'); waveAnimation.classList.add('playing'); smallPlayer.classList.add('active'); }
    function pauseSong() { isPlaying = false; mainAudio.pause(); playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; songImg.classList.remove('playing'); waveAnimation.classList.remove('playing'); }
    
    function togglePlayPause() {
        if (!mainAudio.src || mainAudio.src === window.location.href) {
            setQueue('all'); // ডিফল্ট কিউ
            loadSong(0);
        }
        isPlaying ? pauseSong() : playSong();
    }

    // নতুন: কিউ সেট করার ফাংশন
    function setQueue(type, songsArray) {
        if (type === 'all') {
            currentQueue = songsArray || All_song.map((_, index) => index);
        } else if (type === 'favorites') {
            currentQueue = [...favorites];
        }
    }

    function nextSong() {
        if(currentQueue.length === 0) return;
        const currentPositionInQueue = currentQueue.indexOf(currentIndex);
        const nextPosition = (currentPositionInQueue + 1) % currentQueue.length;
        const nextSongIndex = currentQueue[nextPosition];
        loadSong(nextSongIndex);
        playSong();
    }

    function prevSong() {
        if(currentQueue.length === 0) return;
        const currentPositionInQueue = currentQueue.indexOf(currentIndex);
        const prevPosition = (currentPositionInQueue - 1 + currentQueue.length) % currentQueue.length;
        const prevSongIndex = currentQueue[prevPosition];
        loadSong(prevSongIndex);
        playSong();
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        if (duration) { slider.value = (currentTime / duration) * 100; totalDurationEl.textContent = formatTime(duration); }
        currentDurationEl.textContent = formatTime(currentTime);
    }
    const formatTime = (time) => isNaN(time) ? "00:00" : `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, '0')}`;
    
    function updateSongListHighlight() {
        document.querySelectorAll('.song').forEach(songEl => {
            songEl.classList.toggle('playing', parseInt(songEl.dataset.index) === currentIndex);
        });
    }

    // গানের তালিকা রেন্ডার করা (সার্চ এবং ফেভারিট সহ)
    function renderLists(searchTerm = '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        
        // সব গানের তালিকা
        const filteredSongs = All_song.filter(song => 
            song.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            song.singer.toLowerCase().includes(lowerCaseSearchTerm)
        );
        allSongsListContainer.innerHTML = filteredSongs.map(song => createSongListItemHTML(song)).join('') || '<p class="empty-list-message">No songs found.</p>';
        
        // ফেভারিট তালিকা (যোগ করার ক্রম অনুযায়ী)
        const favoriteSongs = favorites.map(index => All_song[index]);
        favoritesListContainer.innerHTML = favoriteSongs.map(song => createSongListItemHTML(song)).join('') || '<p class="empty-list-message">No favorite songs added yet.</p>';
    }

    function createSongListItemHTML(song) {
        const index = All_song.indexOf(song);
        const isFavorited = favorites.includes(index);
        return `
            <div class="song" data-index="${index}">
                <div class="img"><img src="${song.img}" alt="${song.name}"></div>
                <div class="song_info">
                    <p id="title">${song.name}</p>
                    <p>${song.singer}</p>
                </div>
                <div class="action-icons">
                    <i class="fav-btn ${isFavorited ? 'fas' : 'far'} fa-heart" data-index="${index}"></i>
                </div>
            </div>`;
    }
    
    function toggleFavorite(index) {
        const favIndex = favorites.indexOf(index);
        if (favIndex > -1) {
            favorites.splice(favIndex, 1);
        } else {
            favorites.push(index); // শেষে যোগ করা হয়, তাই ক্রম ঠিক থাকে
        }
        localStorage.setItem('nplayer_favorites', JSON.stringify(favorites));
        renderLists(searchInput.value);
    }

    // === ইভেন্ট লিসেনার ===
    playPauseBtn.addEventListener('click', togglePlayPause);
    forwardBtn.addEventListener('click', nextSong);
    backwardBtn.addEventListener('click', prevSong);
    mainAudio.addEventListener('timeupdate', updateProgress);
    mainAudio.addEventListener('ended', nextSong);
    slider.addEventListener('input', () => { if(mainAudio.duration) { mainAudio.currentTime = (slider.value / 100) * mainAudio.duration; } });

    // তালিকা থেকে গান প্লে করা এবং ফেভারিট করা
    document.querySelector('.tracks-container').addEventListener('click', (e) => {
        const songElement = e.target.closest('.song');
        const favBtn = e.target.closest('.fav-btn');

        if (favBtn) {
            e.stopPropagation();
            const index = parseInt(favBtn.dataset.index);
            toggleFavorite(index);
            return;
        }
        
        if (songElement) {
            const clickedIndex = parseInt(songElement.dataset.index);
            const listId = songElement.parentElement.id;
            
            // কোন তালিকা থেকে গান চালানো হচ্ছে তার উপর ভিত্তি করে কিউ সেট করা
            if (listId === 'all-songs-list') {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredSongIndexes = All_song
                    .map((song, index) => ({song, index}))
                    .filter(({song}) => song.name.toLowerCase().includes(searchTerm) || song.singer.toLowerCase().includes(searchTerm))
                    .map(({index}) => index);
                setQueue('all', filteredSongIndexes);
            } else if (listId === 'favorites-list') {
                setQueue('favorites');
            }
            
            loadSong(clickedIndex);
            playSong();
        }
    });

    // নতুন UI এর ইভেন্ট লিসেনার
    const switchTab = (tabId) => {
        mainTabs.forEach(t => t.classList.toggle('active', t.id === tabId));
        navBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
        // Player ট্যাবে থাকলে ছোট প্লেয়ার হাইড করা
        smallPlayer.style.display = tabId === 'player-tab' ? 'none' : 'flex';
    };
    navBtns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    upPlayerNewBtn.addEventListener('click', () => switchTab('player-tab'));
    
    listTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            listTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            trackLists.forEach(list => list.classList.toggle('active', list.id === `${btn.dataset.tab}-list`));
        });
    });

    const openSidenav = () => { sidenav.classList.add('open'); sidenavOverlay.classList.add('active'); };
    const closeSidenav = () => { sidenav.classList.remove('open'); sidenavOverlay.classList.remove('active'); };
    const openModal = (modal) => modal.classList.add('active');
    const closeModal = (modal) => modal.classList.remove('active');
    
    menuBtn.addEventListener('click', openSidenav);
    sidenavOverlay.addEventListener('click', closeSidenav);
    aboutBtn.addEventListener('click', () => { openModal(document.getElementById('about-modal')); closeSidenav(); });
    document.querySelector('#about-modal .close-modal-btn').addEventListener('click', () => closeModal(document.getElementById('about-modal')));
    
    searchInput.addEventListener('input', (e) => renderLists(e.target.value));

    // === প্রাথমিক শুরু ===
    function initializeApp() {
        if (typeof All_song !== 'undefined' && All_song.length > 0) {
            renderLists();
            loadSong(0);
            setQueue('all'); // ডিফল্ট কিউ সেট করা
            smallPlayer.style.display = 'none'; // শুরুতে প্লেয়ার ট্যাবে থাকায় হাইড করা
        } else {
            console.error("Song list (All_song) is not available. Please check song_list.js");
            currentTrackName.textContent = "Error: Song list not found";
        }
    }
    
    initializeApp();
});