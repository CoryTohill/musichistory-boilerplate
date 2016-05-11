"use strict";



/************************************************************
                        Variables
*************************************************************/

var $songElement = $("#songElement"),
    listMusic = $("#listMusic"),
    addMusic = $("#addMusic"),
    deleteButtonHTML = `<button type="button" class="delete">Delete</button>`,
    moreButtonHTML = `<button type="button" id="moreButton">More</button>`;



/************************************************************
                      Event Listeners
*************************************************************/

// delete and more buttons
$(".songList").click(ButtonsBehavior);

// add button
$("#addButton").click(addSong);

// list music link
$("#listMusicLink").click(showListMusic);

// add music link
$("#addMusicLink").click(showAddMusic);



/************************************************************
                    Load Initial Json
*************************************************************/

$.ajax({url: "songs.json"}).done(manipulateSongInfo);



/************************************************************
                        Functions
*************************************************************/

function manipulateSongInfo (data) {
  $(data.songs).each(function(index, currentSong){
    let HTMLBuilder =`<div>`
                    + `<li>${currentSong.title}</li>`
                    + `<li>${currentSong.artist}</li>`
                    + `<li>${currentSong.album}</li>`
                    + `<li>${currentSong.genre}</li>`
                    + deleteButtonHTML
                    + `</div>`;

    $songElement.append(HTMLBuilder);
  })
  $songElement.append(moreButtonHTML);
}


function addSong (){
  $("#moreButton").remove();

  let songHTML =`<div>`;

  $(".inputInfo").each(function(index, currentInfo){
    songHTML += `<li>${$(currentInfo).val()}</li>`;
  })
  $songElement.append(`${songHTML} ${deleteButtonHTML}</div> ${moreButtonHTML}`);
};


function showListMusic () {
  addMusic.addClass("hidden");
  listMusic.removeClass("hidden");
}


function showAddMusic (){
  listMusic.addClass("hidden");
  addMusic.removeClass("hidden");
}


function ButtonsBehavior (event) {
  if (event.target.className === "delete") {
    event.target.parentNode.remove();
  } else if (event.target.id === "moreButton") {
    event.target.remove();
    $.ajax({url: "moreSongs.json"}).done(manipulateSongInfo);
  }
}
