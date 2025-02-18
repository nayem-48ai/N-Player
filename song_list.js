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
   },
   {
      "name": "15. Unknown",
      "path": "mp3/15.mp3",
      "img": "img/15.jpg",
      "singer": "Unknown"
  },
   {
  "name": "16. Unknown",
  "path": "mp3/16.mp3",
  "img": "img/16.jpg",
  "singer": "Unknown"
},
{
  "name": "17. Unknown",
  "path": "mp3/17.mp3",
  "img": "img/17.jpg",
  "singer": "Unknown"
},
{
  "name": "18. Unknown",
  "path": "mp3/18.mp3",
  "img": "img/18.jpg",
  "singer": "Unknown"
},
{
  "name": "19. Unknown",
  "path": "mp3/19.mp3",
  "img": "img/19.jpg",
  "singer": "Unknown"
},
{
  "name": "20. Unknown",
  "path": "mp3/20.mp3",
  "img": "img/20.jpg",
  "singer": "Unknown"
},
{
  "name": "21. Unknown",
  "path": "mp3/21.mp3",
  "img": "img/21.jpg",
  "singer": "Unknown"
},
{
  "name": "22. Unknown",
  "path": "mp3/22.mp3",
  "img": "img/22.jpg",
  "singer": "Unknown"
},
{
  "name": "23. Unknown",
  "path": "mp3/23.mp3",
  "img": "img/23.jpg",
  "singer": "Unknown"
},
{
  "name": "24. Unknown",
  "path": "mp3/24.mp3",
  "img": "img/24.jpg",
  "singer": "Unknown"
},
{
  "name": "25. Unknown",
  "path": "mp3/25.mp3",
  "img": "img/25.jpg",
  "singer": "Unknown"
},
{
  "name": "26. Unknown",
  "path": "mp3/26.mp3",
  "img": "img/26.jpg",
  "singer": "Unknown"
},
{
  "name": "27. Unknown",
  "path": "mp3/27.mp3",
  "img": "img/27.jpg",
  "singer": "Unknown"
},
{
  "name": "28. Unknown",
  "path": "mp3/28.mp3",
  "img": "img/28.jpg",
  "singer": "Unknown"
},
{
  "name": "29. Unknown",
  "path": "mp3/29.mp3",
  "img": "img/29.jpg",
  "singer": "Unknown"
},
{
  "name": "30. Unknown",
  "path": "mp3/30.mp3",
  "img": "img/30.jpg",
  "singer": "Unknown"
},
{
  "name": "31. Unknown",
  "path": "mp3/31.mp3",
  "img": "img/31.jpg",
  "singer": "Unknown"
},
{
  "name": "32. Unknown",
  "path": "mp3/32.mp3",
  "img": "img/32.jpg",
  "singer": "Unknown"
},
{
  "name": "33. Unknown",
  "path": "mp3/33.mp3",
  "img": "img/33.jpg",
  "singer": "Unknown"
},
{
  "name": "34. Unknown",
  "path": "mp3/34.mp3",
  "img": "img/34.jpg",
  "singer": "Unknown"
},
{
  "name": "35. Unknown",
  "path": "mp3/35.mp3",
  "img": "img/35.jpg",
  "singer": "Unknown"
},
{
  "name": "36. Unknown",
  "path": "mp3/36.mp3",
  "img": "img/36.jpg",
  "singer": "Unknown"
},
{
  "name": "37. Unknown",
  "path": "mp3/37.mp3",
  "img": "img/37.jpg",
  "singer": "Unknown"
},
{
  "name": "38. Unknown",
  "path": "mp3/38.mp3",
  "img": "img/38.jpg",
  "singer": "Unknown"
},
{
  "name": "39. Unknown",
  "path": "mp3/39.mp3",
  "img": "img/39.jpg",
  "singer": "Unknown"
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
