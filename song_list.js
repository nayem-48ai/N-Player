//song list
let All_song = [
   {
     name: "1. আমি তোমার মনের ভিতর..",
     path: "mp3/1.mp3",
     img: "img/1.jpg",
     singer: "বাংলা গান"
   },
   {
     name: "2. Dard|Hindi Full Lyrics",
     path: "mp3/2.mp3",
     img: "img/2.jpg",
     singer: "Hindi Songs"
   },
   {
     name: "3. Favorite|Full",
     path: "mp3/3.mp3",
     img: "img/3.jpg",
     singer: "Exclusive"
   },
   {
     name: "4. Older",
     path: "mp3/4.mp3",
     img: "img/4.jpg",
     singer: "Exclusive"
   },
   {
     name: "5. Kyh tah hain pal pal",
     path: "mp3/5.mp3",
     img: "img/5.jpg",
     singer: "Hindi Song"
   },
   {
    name: "Lambiya Si Jusaiyan",
    path: "mp3/6.mp3",
    img: "img/1.jpg",
    singer: "Hindi Songs"
   },
   {
     name: "6. Photo| Luka chupi",
     path: "mp3/7.mp3",
     img: "img/7.jpg",
     singer: "Hindi Song"
   },
   {
     name: "8. Maan mera",
     path: "mp3/8.mp3",
     img: "img/8.jpg",
     singer: "Hindi Song"
   },
   {
     name: "9. Aja ve mahiya",
     path: "mp3/9.mp3",
     img: "img/9.jpg",
     singer: "Hindi Song"
   },
   {
     name: "10. Pal Pal Dil K Pas",
     path: "mp3/10.mp3",
     img: "img/10.jpg",
     singer: "Hindi Song"
   },
   {
     name: "11. Shub|You and Me",
     path: "mp3/11.mp3",
     img: "img/11.jpg",
     singer: "Hindi Song"
   },
   {
     name: "12. Dhinak Dhin Tana",
     path: "mp3/12.mp3",
     img: "img/12.jpg",
     singer: "Hindi Song"
   },
   {
     name: "13. Tu mile , dil khile",
     path: "mp3/13.mp3",
     img: "img/13.jpg",
     singer: "Hindi Song"
   },
   {
     name: "14. Zara Zara , mehek ta hain",
     path: "mp3/14.mp3",
     img: "img/14.jpg",
     singer: "Hindi Song"
   }
];
/*you can add more song & images from you computer*/


/*tracks*/
let tracks = document.querySelector('.tracks');

//creating a list or generating Html
for (let i = 0; i < All_song.length; i++) {

  let Html = ` <div class="song">
      <div class="img">
      <img src="${All_song[i].img}"/>
      </div>
      <div class="more">
      <audio src="${All_song[i].path}" id="music"></audio>
      <div class="song_info">
         <p id="title">${All_song[i].name}</p>
         <p>${All_song[i].singer}</p>
      </div>
      <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
      </div>
    </div>`;

  tracks.insertAdjacentHTML("beforeend", Html);
};


/*This is for only entertainment purpose*/
