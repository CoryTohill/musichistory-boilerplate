"use strict";


/************************************************************
                      DELETE BUTTONS
*************************************************************/

var $songListDiv = $(".songList");

$songListDiv.click(deleteButtonsBehavior);

function deleteButtonsBehavior (event) {
  if (event.target.className === "delete") {
    event.target.parentNode.remove();
  }
}


//MORE BUTTON

$songListDiv.click(moreButtonBehavior);



/************************************************************
          ADD MORE SONGS IN JSON VIA MORE BUTTON
*************************************************************/

function moreButtonBehavior (event) {
  if (event.target.id === "moreButton") {
    event.target.remove();
    $.ajax({url: "moreSongs.json"}).done(manipulateSongInfo);
  }
}




/************************************************************
                INSERT SONG DATA VIA JSON FILE
*************************************************************/

var songElement = document.getElementById("songElement");
var deleteButtonHTML = `<button type="button" class="delete">Delete</button>`;
var moreButtonHTML = `<button type="button" id="moreButton">More</button>`;

$.ajax({url: "songs.json"}).done(manipulateSongInfo);

function manipulateSongInfo (data) {
  var HTMLBuilder = "";
  console.log("data", data.songs);
  var songsData = data;

  for(var i = 0; i < songsData.songs.length; i++) {
    HTMLBuilder += `<div>`
               +  `<li>${songsData.songs[i].title}</li>`
               +  `<li>${songsData.songs[i].artist}</li>`
               +  `<li>${songsData.songs[i].album}</li>`
               +  `<li>${songsData.songs[i].genre}</li>`
               +  deleteButtonHTML
               +  `</div>`;
  }

  songElement.innerHTML += HTMLBuilder + moreButtonHTML;

  // moreButtonBehavior();

}





/************************************************************
                      ADD SONGS INPUTS
*************************************************************/

var inputInfo = document.getElementsByClassName("inputInfo");
var addButton = document.getElementById("addButton");

addButton.addEventListener("click", addSong)

function addSong (){
  moreButton.parentNode.removeChild(moreButton);
  var holder = `<div>`;

  for(var i = 0; i < inputInfo.length; i ++) {
    holder += `<li>${inputInfo[i].value}</li>`;
  }
  holder += `${deleteButtonHTML}</div>`;
  songElement.innerHTML += holder + moreButtonHTML;

  // moreButtonBehavior();
  // deleteButtonsBehavior();
  holder = "";
}



/************************************************************
                    HIDE/SHOW ELEMENTS
*************************************************************/

var listMusicLink = document.getElementById("listMusicLink");
var addMusicLink = document.getElementById("addMusicLink");
var listMusic = document.getElementById("listMusic");
var addMusic = document.getElementById("addMusic");


listMusicLink.addEventListener("click", showListMusic);
addMusicLink.addEventListener("click", showAddMusic);

function showListMusic () {
  addMusic.classList.remove("visible");
  addMusic.classList.add("hidden");

  listMusic.classList.remove("hidden");
  listMusic.classList.add("visible");
}

function showAddMusic (){
  listMusic.classList.remove("visible");
  listMusic.classList.add("hidden");

  addMusic.classList.remove("hidden");
  addMusic.classList.add("visible");
}
