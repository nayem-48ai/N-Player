document.addEventListener('DOMContentLoaded', () => {
    // === DOM এলিমেন্ট সিলেকশন ===
    const audioPlayer = document.getElementById('audio-player');
    const albumArt = document.getElementById('album-art');
    const songTitleElement = document.getElementById('song-title');
    const songArtistElement = document.getElementById('song-artist');
    const playBtn = document.getElementById('play-btn');
    const playBtnIcon = playBtn.querySelector('i');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    
    // ন্যাভিগেশন ও ট্যাব
    const navBtns = document.querySelectorAll('.nav-btn');
    const mainTabs = document.querySelectorAll('.main-tab');
    const listsTab = document.getElementById('lists-tab');
    
    // সাইডবার ও মোডাল
    const menuBtn = document.getElementById('menu-btn');
    const sidenav = document.getElementById('sidenav');
    const sidenavOverlay = document.getElementById('sidenav-overlay');
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const playlistModal = document.getElementById('playlist-modal');
    const modalPlaylistList = document.getElementById('modal-playlist-list');

    // গানের তালিকা ও সার্চ
    const searchInput = document.getElementById('search-input');
    const mainListView = document.getElementById('main-list-view');
    const playlistDetailView = document.getElementById('playlist-detail-view');
    const playlistDetailTitle = document.getElementById('playlist-detail-title');
    const playlistDetailList = document.getElementById('playlist-detail-list');
    const backToMainListBtn = document.getElementById('back-to-main-list-btn');
    
    // === স্টেট ভ্যারিয়েবল ===
    let currentSongIndex = 0;
    let isPlaying = false;
    let currentQueue = [];
    let originalQueue = [];
    let repeatState = 'all'; // 'all', 'one', 'off'
    let isShuffled = false;
    let songToAdd = null;
    let favorites = JSON.parse(localStorage.getItem('nplayer_favorites')) || [];
    let playlists = JSON.parse(localStorage.getItem('nplayer_playlists')) || [];

    // === কোর প্লেয়ার ফাংশন ===
    const loadSong = (index) => {
        currentSongIndex = index;
        const song = songs[index];
        songTitleElement.textContent = song.name;
        songArtistElement.textContent = song.artist;
        albumArt.src = song.cover || 'img/default-cover.png';
        audioPlayer.src = song.path;
        updatePlayingUI();
    };

    const playSong = () => { isPlaying=true; audioPlayer.play(); playBtnIcon.classList.replace('fa-play','fa-pause'); };
    const pauseSong = () => { isPlaying=false; audioPlayer.pause(); playBtnIcon.classList.replace('fa-pause','fa-play'); };

    const setQueue = (queue, startingIndex) => {
        if(queue.length === 0) return;
        originalQueue=[...queue];
        currentQueue = isShuffled ? shuffleArray([...originalQueue]) : [...originalQueue];
        const songToPlayIndex = startingIndex !== undefined ? startingIndex : currentQueue[0];
        // শাফেল করা হলে প্রথম গান হিসেবে বর্তমান গানটি সেট করা
        if (isShuffled && startingIndex !== undefined) {
            const currentSongPos = currentQueue.indexOf(startingIndex);
            if (currentSongPos > -1) {
                currentQueue.splice(currentSongPos, 1);
                currentQueue.unshift(startingIndex);
            }
        }
        loadSong(songToPlayIndex);
    };

    const prevSong = () => { if(currentQueue.length === 0) return; const i=currentQueue.indexOf(currentSongIndex); loadSong(currentQueue[(i-1+currentQueue.length)%currentQueue.length]); playSong(); };
    const nextSongLogic = () => {
        if(currentQueue.length === 0) return;
        const currentIndexInQueue = currentQueue.indexOf(currentSongIndex);
        if (repeatState === 'off' && currentIndexInQueue === currentQueue.length - 1) {
            pauseSong();
            return;
        }
        const nextIndexInQueue = (currentIndexInQueue + 1) % currentQueue.length;
        loadSong(currentQueue[nextIndexInQueue]);
        playSong();
    };
    
    // === UI রেন্ডারিং ও সার্চ ===
    function renderLists(searchTerm = '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        
        const filteredSongs = songs.map((s, i) => ({...s, originalIndex: i})).filter(s => 
            s.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            s.artist.toLowerCase().includes(lowerCaseSearchTerm) ||
            (s.album && s.album.toLowerCase().includes(lowerCaseSearchTerm))
        );

        document.getElementById('all-songs-list').innerHTML = filteredSongs.map(s => createSongListItemHTML(s, s.originalIndex)).join('') || '<li class="empty-list">No songs found.</li>';
        document.getElementById('favorites-list').innerHTML = favorites.length > 0 ? favorites.map(i => createSongListItemHTML(songs[i], i)).join('') : '<li class="empty-list">No favorites yet.</li>';
        document.getElementById('my-playlists-container').innerHTML = playlists.length > 0 ? playlists.map(p => createPlaylistItemHTML(p)).join('') : '<li class="empty-list">No playlists created.</li>';
        updatePlayingUI();
    }
    const createSongListItemHTML = (song, index) => { const isFav=favorites.includes(index); return `<li data-index="${index}"><div class="song-details"><div class="li-song-title">${song.name}</div><div class="li-song-artist">${song.artist}</div></div><div class="action-icons"><i class="fas fa-plus icon-btn add-to-playlist-btn" title="Add"></i><i class="${isFav?'fas':'far'} fa-heart icon-btn favorite-btn ${isFav?'favorited':''}" title="Favorite"></i></div></li>`; };
    const createPlaylistItemHTML = pl => `<li><div class="playlist-item" data-id="${pl.id}"><div class="playlist-info"><div class="li-song-title">${pl.name}</div><div class="song-count">${pl.songs.length} songs</div></div><i class="fas fa-chevron-right"></i></div></li>`;
    const updatePlayingUI = () => document.querySelectorAll('.song-list li').forEach(item => item.classList.toggle('playing', parseInt(item.dataset.index)===currentSongIndex && !item.classList.contains('empty-list')));
    
    // === নতুন ফাংশনালিটি ===
    const toggleAccordion = (header) => { const section = header.closest('.list-section'); const currentlyOpen = document.querySelector('.list-section.open'); if (currentlyOpen && currentlyOpen !== section) { currentlyOpen.classList.remove('open'); } section.classList.toggle('open'); };
    const showPlaylistDetailView = (playlistId) => { const pl = playlists.find(p => p.id == playlistId); if (!pl) return; playlistDetailTitle.textContent = pl.name; playlistDetailList.innerHTML = pl.songs.length > 0 ? pl.songs.map(i => createSongListItemHTML(songs[i], i)).join('') : '<li class="empty-list">This playlist is empty.</li>'; mainListView.classList.remove('active'); playlistDetailView.classList.add('active'); playlistDetailView.dataset.playlistId = playlistId; };
    const showMainListView = () => { playlistDetailView.classList.remove('active'); mainListView.classList.add('active'); };
    const toggleFavorite = (index) => { const i=favorites.indexOf(index); if(i>-1)favorites.splice(i,1); else favorites.push(index); localStorage.setItem('nplayer_favorites',JSON.stringify(favorites)); renderLists(searchInput.value); };
    const createPlaylist = () => { const name=prompt("Playlist Name:"); if(name&&name.trim()!==''){playlists.push({id:Date.now(),name:name.trim(),songs:[]});localStorage.setItem('nplayer_playlists',JSON.stringify(playlists));renderLists();} };
    const openModal = (modal) => modal.classList.add('active');
    const closeModal = (modal) => modal.classList.remove('active');
    const openPlaylistModal = (index) => { songToAdd=index; modalPlaylistList.innerHTML=playlists.length>0?playlists.map(p=>`<div class="playlist-item" data-id="${p.id}">${p.name}</div>`).join(''):'<p>Create a playlist first.</p>'; openModal(playlistModal); };
    const addSongToPlaylist = (playlistId) => { const pl=playlists.find(p=>p.id==playlistId); if(pl&&!pl.songs.includes(songToAdd)) {pl.songs.push(songToAdd);localStorage.setItem('nplayer_playlists',JSON.stringify(playlists));} closeModal(playlistModal); renderLists(); };
    const switchTab = (tabId) => { mainTabs.forEach(t=>t.classList.toggle('active',t.id===tabId)); navBtns.forEach(b=>b.classList.toggle('active',b.dataset.tab===tabId)); };
    
    // রিপিট ও শাফেল
    function handleRepeat() { if (repeatState === 'all') { repeatState = 'one'; repeatBtn.innerHTML = '<i class="fas fa-1"></i>'; repeatBtn.title = 'Repeat One'; } else if (repeatState === 'one') { repeatState = 'off'; repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>'; repeatBtn.classList.remove('active'); repeatBtn.title = 'Repeat Off'; } else { repeatState = 'all'; repeatBtn.classList.add('active'); repeatBtn.title = 'Repeat All'; } }
    function handleShuffle() { isShuffled = !isShuffled; shuffleBtn.classList.toggle('active', isShuffled); shuffleBtn.title = isShuffled ? 'Shuffle On' : 'Shuffle Off'; setQueue([...originalQueue], currentSongIndex); playSong(); }
    const shuffleArray = (array) => { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array; };

    // সাইডবার
    const openSidenav = () => { sidenav.classList.add('open'); sidenavOverlay.classList.add('active'); };
    const closeSidenav = () => { sidenav.classList.remove('open'); sidenavOverlay.classList.remove('active'); };

    // === ইভেন্ট লিসেনার ===
    playBtn.onclick = () => isPlaying ? pauseSong() : playSong();
    prevBtn.onclick = prevSong;
    nextBtn.onclick = nextSongLogic;
    repeatBtn.onclick = handleRepeat;
    shuffleBtn.onclick = handleShuffle;
    audioPlayer.onended = () => { repeatState === 'one' ? (audioPlayer.currentTime = 0, playSong()) : nextSongLogic(); };
    progressContainer.onclick = (e) => { const width = e.currentTarget.clientWidth; const clickX = e.offsetX; const duration = audioPlayer.duration; if(duration) audioPlayer.currentTime = (clickX / width) * duration; };
    audioPlayer.ontimeupdate = (e) => { const { duration, currentTime } = e.srcElement; if (duration) { progressBar.style.width = `${(currentTime / duration) * 100}%`; durationEl.textContent = `${Math.floor(duration/60)}:${Math.floor(duration%60).toString().padStart(2,'0')}`; } currentTimeEl.textContent = `${Math.floor(currentTime/60)}:${Math.floor(currentTime%60).toString().padStart(2,'0')}`; };
    
    menuBtn.onclick = openSidenav;
    sidenavOverlay.onclick = closeSidenav;
    aboutBtn.onclick = () => { openModal(aboutModal); closeSidenav(); };
    aboutModal.querySelector('.close-modal-btn').onclick = () => closeModal(aboutModal);
    
    navBtns.forEach(b => b.onclick=()=>switchTab(b.dataset.tab));
    searchInput.oninput = (e) => renderLists(e.target.value);
    
    listsTab.addEventListener('click', (e) => {
        const target = e.target;
        const songDetails = target.closest('.song-details');
        const favoriteBtn = target.closest('.favorite-btn');
        const addToPlaylistBtn = target.closest('.add-to-playlist-btn');
        const playlistItem = target.closest('.playlist-item');
        const listHeader = target.closest('.list-header');

        if(listHeader) { toggleAccordion(listHeader); return; }
        if(playlistItem && playlistItem.parentElement.parentElement.id === 'my-playlists-container') { showPlaylistDetailView(playlistItem.dataset.id); return; }

        const li = target.closest('li');
        if (!li || li.classList.contains('empty-list')) return;
        const songIndex = parseInt(li.dataset.index);

        if(songDetails) {
            const parentList = li.parentElement;
            let queue = [];
            if (parentList.id === 'all-songs-list') { const searchTerm = searchInput.value.toLowerCase(); queue = songs.map((s,i)=>({...s, i})).filter(s => s.name.toLowerCase().includes(searchTerm) || s.artist.toLowerCase().includes(searchTerm) || (s.album && s.album.toLowerCase().includes(searchTerm))).map(s => s.i); }
            else if (parentList.id === 'favorites-list') queue = [...favorites];
            else if (parentList.id === 'playlist-detail-list') { const plId = playlistDetailView.dataset.playlistId; const pl = playlists.find(p=>p.id==plId); if(pl) queue = [...pl.songs]; }
            setQueue(queue, songIndex); playSong(); switchTab('player-tab');
        }
        if(favoriteBtn) { toggleFavorite(songIndex); }
        if(addToPlaylistBtn) { openPlaylistModal(songIndex); }
    });

    backToMainListBtn.onclick = showMainListView;
    document.getElementById('create-playlist-btn').onclick = createPlaylist;
    playlistModal.querySelector('.close-modal-btn').onclick = () => closeModal(playlistModal);
    modalPlaylistList.onclick = (e) => { const item = e.target.closest('.playlist-item'); if(item) addSongToPlaylist(item.dataset.id); };

    // === শুরু এবং প্রাথমিক সেটআপ ===
    function initializeApp() {
        renderLists();
        setQueue(songs.map((_, i) => i), 0);
        pauseSong();
        document.getElementById('all-songs-section').classList.add('open');
        repeatBtn.classList.add('active');
    }
    
    initializeApp();
});
