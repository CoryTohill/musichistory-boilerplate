/************************************************************
                      DELETE BUTTONS
*************************************************************/

function deleteButtonsBehavior () {
  var deleteButton = document.getElementsByClassName("delete");
  for (i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", deleteSong);
  }
  function deleteSong () {
    this.parentNode.parentNode.removeChild(this.parentNode);
  };
};



/************************************************************
          ADD MORE SONGS IN JSON VIA MORE BUTTON
*************************************************************/

function moreButtonBehavior () {
  var moreButton = document.getElementById("moreButton");
  moreButton.addEventListener("click", addMoreSongs);

  function addMoreSongs () {
    var moreRequest = new XMLHttpRequest();
    moreRequest.open("GET", "moreSongs.json");
    moreRequest.send();
    this.parentNode.removeChild(this);

    moreRequest.addEventListener("load", manipulateSongInfo);
  }

}




/************************************************************
                INSERT SONG DATA VIA JSON FILE
*************************************************************/

var songElement = document.getElementById("songElement");
var deleteButtonHTML = `<button type="button" class="delete">Delete</button>`;
var moreButtonHTML = `<button type="button" id="moreButton">More</button>`;

var myRequest = new XMLHttpRequest();
myRequest.open("GET", "songs.json");
myRequest.send();
myRequest.addEventListener("load", manipulateSongInfo);

function manipulateSongInfo () {
  var HTMLBuilder = "";
  var songsData = JSON.parse(this.responseText);

  for(i = 0; i < songsData.songs.length; i++) {
    HTMLBuilder += `<div>`
               +  `<li>${songsData.songs[i].title}</li>`
               +  `<li>${songsData.songs[i].artist}</li>`
               +  `<li>${songsData.songs[i].album}</li>`
               +  `<li>${songsData.songs[i].genre}</li>`
               +  deleteButtonHTML
               +  `</div>`;
  };

  songElement.innerHTML += HTMLBuilder + moreButtonHTML;

  moreButtonBehavior();

  deleteButtonsBehavior();
};





/************************************************************
                      ADD SONGS INPUTS
*************************************************************/

var inputInfo = document.getElementsByClassName("inputInfo");
var addButton = document.getElementById("addButton");

addButton.addEventListener("click", addSong)

function addSong (){
  moreButton.parentNode.removeChild(moreButton);
  var holder = `<div>`;

  for(i = 0; i < inputInfo.length; i ++) {
    holder += `<li>${inputInfo[i].value}</li>`;
  };
  holder += `${deleteButtonHTML}</div>`;
  songElement.innerHTML += holder + moreButtonHTML;

  moreButtonBehavior();
  deleteButtonsBehavior();
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
};

function showAddMusic (){
  listMusic.classList.remove("visible");
  listMusic.classList.add("hidden");

  addMusic.classList.remove("hidden");
  addMusic.classList.add("visible");
};
