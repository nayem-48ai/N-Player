// আপনার ৩৯টি গানের তালিকা
let All_song = [
   { name: "1. আমি তোমার মনের ভিতর..", path: "mp3/A/1.mp3", img: "img/1.jpg", singer: "বাংলা গান" },
   { name: "2. Dard | Hindi Full Lyrics", path: "mp3/A/2.mp3", img: "img/2.jpg", singer: "Hindi Songs" },
   { name: "3. Favorite | Full", path: "mp3/A/3.mp3", img: "img/3.jpg", singer: "Exclusive" },
   { name: "4. Older", path: "mp3/A/4.mp3", img: "img/4.jpg", singer: "Exclusive" },
   { name: "5. Kehta Hain Pal Pal", path: "mp3/A/5.mp3", img: "img/5.jpg", singer: "Hindi Song" },
   { name: "Lambiya Si Judaiyan", path: "mp3/A/6.mp3", img: "img/6.jpg", singer: "Hindi Songs" },
   { name: "6. Photo | Luka chupi", path: "mp3/A/7.mp3", img: "img/7.jpg", singer: "Hindi Song" },
   { name: "8. Maan Mera", path: "mp3/A/8.mp3", img: "img/8.jpg", singer: "Hindi Song" },
   { name: "9. Aja Ve Mahiya", path: "mp3/A/9.mp3", img: "img/9.jpg", singer: "Hindi Song" },
   { name: "10. Pal Pal Dil Ke Paas", path: "mp3/A/10.mp3", img: "img/10.jpg", singer: "Hindi Song" },
   { name: "11. Shub | You and Me", path: "mp3/B/11.mp3", img: "img/11.jpg", singer: "Hindi Song" },
   { name: "12. Dhinak Dhin Tana", path: "mp3/B/12.mp3", img: "img/12.jpg", singer: "Hindi Song" },
   { name: "13. Tu Mile, Dil Khile", path: "mp3/B/13.mp3", img: "img/13.jpg", singer: "Hindi Song" },
   { name: "14. Zara Zara Mehekta Hain", path: "mp3/B/14.mp3", img: "img/14.jpg", singer: "Hindi Song" },
   { name: "15. Bagal Wali | DJ", path: "mp3/B/15.mp3", img: "img/15.jpg", singer: "DJ" },
   { name: "16. Tohar Chara E Jawani | DJ", path: "mp3/B/16.mp3", img: "img/16.jpg", singer: "DJ | Remix" },
   { name: "17. Jhuk Jhuk Kare | DJ", path: "mp3/B/17.mp3", img: "img/17.jpg", singer: "DJ | Remix" },
   { name: "18. Unknown", path: "mp3/B/18.mp3", img: "img/18.jpg", singer: "Unknown" },
   { name: "19. Unknown", path: "mp3/B/19.mp3", img: "img/19.jpg", singer: "Favorite" },
   { name: "20. Kya Kya | Akshay | DJ", path: "mp3/B/20.mp3", img: "img/20.jpg", singer: "DJ | Remix" },
   { name: "21. Kur Kura Ra", path: "mp3/C/21.mp3", img: "img/21.jpg", singer: "DJ | Remix" },
   { name: "22. Lage Ura Dhura", path: "mp3/C/22.mp3", img: "img/22.jpg", singer: "DJ | Remix" },
   { name: "23. Unknown", path: "mp3/C/23.mp3", img: "img/23.jpg", singer: "Unknown" },
   { name: "24. Industry | DJ", path: "mp3/C/24.mp3", img: "img/24.jpg", singer: "Remix" },
   { name: "25. Unknown", path: "mp3/C/25.mp3", img: "img/25.jpg", singer: "Remix | DJ" },
   { name: "26. Middle Of The Night", path: "mp3/C/26.mp3", img: "img/26.jpg", singer: "Remix" },
   { name: "27. Moron o Jodi Ase", path: "mp3/C/27.mp3", img: "img/27.jpg", singer: "Remix | DJ" },
   { name: "28. Na Ja Na Ja", path: "mp3/C/28.mp3", img: "img/28.jpg", singer: "Remix" },
   { name: "29. Pagal Banaibe | Bhojpuri", path: "mp3/C/29.mp3", img: "img/29.jpg", singer: "Remix | DJ" },
   { name: "30. Palang Sawanke", path: "mp3/C/30.mp3", img: "img/30.jpg", singer: "Bhojpuri" },
   { name: "31. Mujhse Shaadi Karogi | Remix", path: "mp3/D/31.mp3", img: "img/31.jpg", singer: "Remix | DJ" },
   { name: "32. Unknown", path: "mp3/D/32.mp3", img: "img/32.jpg", singer: "Unknown" },
   { name: "33. Unknown", path: "mp3/D/33.mp3", img: "img/33.jpg", singer: "Bhojpuri" },
   { name: "34. Sundale Sundale", path: "mp3/D/34.mp3", img: "img/34.jpg", singer: "Bhojpuri | DJ" },
   { name: "35. চায়ের কাপে তোমার যত রাগ", path: "mp3/D/35.mp3", img: "img/35.jpg", singer: "Bangla | Album" },
   { name: "36. Top Tकर", path: "mp3/D/36.mp3", img: "img/36.jpg", singer: "Hindi | Badshah" },
   { name: "37. দাদা আমার যেমন তেমন", path: "mp3/D/37.mp3", img: "img/37.jpg", singer: "DJ | Remix" },
   { name: "38. বরিশালের লঞ্চ", path: "mp3/D/38.mp3", img: "img/38.jpg", singer: "DJ | নার্গিস" },
   { name: "39. রাগ করোনা মনের মানুষ", path: "mp3/D/39.mp3", img: "img/39.jpg", singer: "DJ | Remix" }
];


// গানের তালিকা HTML এ যুক্ত করার জন্য
const tracksContainer = document.querySelector('.tracks');

for (let i = 0; i < All_song.length; i++) {
  // অডিও ট্যাগ ছাড়া শুধু গানের তথ্য দেখানো হচ্ছে
  let Html = `
    <div class="song" data-index="${i}">
      <div class="img">
        <img src="${All_song[i].img}" alt="${All_song[i].name}">
      </div>
      <div class="song_info">
         <p id="title">${All_song[i].name}</p>
         <p>${All_song[i].singer}</p>
      </div>
    </div>`;

  tracksContainer.insertAdjacentHTML("beforeend", Html);
}
