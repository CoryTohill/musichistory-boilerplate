/************************************************************
                INSERT SONG DATA VIA JSON FILE
*************************************************************/
var myRequest = new XMLHttpRequest();

myRequest.open("GET", "songs.json");

myRequest.send();

myRequest.addEventListener("load", manipulateSongInfo);

var songElement = document.getElementById("songElement");

function manipulateSongInfo () {

  var HTMLHolder = "";
  var songsData = JSON.parse(this.responseText);

  for(i = 0; i < songsData.songs.length; i++) {
    HTMLHolder += `<div>`
               +  `<li>${songsData.songs[i].title}</li>`
               +  `<li>${songsData.songs[i].artist}</li>`
               +  `<li>${songsData.songs[i].album}</li>`
               +  `<li>${songsData.songs[i].genre}</li>`
               +  `<button type="button" class="delete">Delete</button>`
               +  `</div>`;
  };

  songElement.innerHTML = HTMLHolder;

  deleteButtons();
};

function deleteButtons () {
  var deleteButton = document.getElementsByClassName("delete");
  for (i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", deleteSong);
  }
  function deleteSong () {
    this.parentNode.parentNode.removeChild(this.parentNode);
  };
};


/************************************************************
                      ADD SONGS INPUTS
*************************************************************/

var inputInfo = document.getElementsByClassName("inputInfo");
var addButton = document.getElementById("addButton");

addButton.addEventListener("click", addSong)

function addSong (){
  var holder = `<div>`;

  for(i = 0; i < inputInfo.length; i ++) {
    holder += `<li>${inputInfo[i].value}</li>`;
  };
  holder += `<button type="button" class="delete">Delete</button></div>`;
  songElement.innerHTML += holder;

  deleteButtons();
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
};

function showAddMusic (){
  listMusic.classList.remove("visible");
  listMusic.classList.add("hidden");

  addMusic.classList.remove("hidden");
  addMusic.classList.add("visible");
};
