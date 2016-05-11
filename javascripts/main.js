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

// given json song data, inserts data into the DOM and adds delete and more buttons
function manipulateSongInfo (data) {
  $(data.songs).each(function(index, currentSong){
    let HTMLBuilder = `<div>` +
                      `<li>${currentSong.title}</li>` +
                      `<li>${currentSong.artist}</li>` +
                      `<li>${currentSong.album}</li>` +
                      `<li>${currentSong.genre}</li>` +
                      deleteButtonHTML +
                      `</div>`;

    $songElement.append(HTMLBuilder);
  });
  $songElement.append(moreButtonHTML);
}

// will add an individual song into DOM using text input for information
function addSong (){
  $("#moreButton").remove();

  let songHTML =`<div>`;

  $(".inputInfo").each(function(index, currentInfo){
    songHTML += `<li>${$(currentInfo).val()}</li>`;
  });
  $songElement.append(`${songHTML} ${deleteButtonHTML}</div> ${moreButtonHTML}`);
}

// hides the add music div and reveals the list music div
function showListMusic () {
  addMusic.addClass("hidden");
  listMusic.removeClass("hidden");
}

// hides the list music div and reveals the add music div
function showAddMusic (){
  listMusic.addClass("hidden");
  addMusic.removeClass("hidden");
}

// determines if target clicked is a "Delete" or "More" button
function ButtonsBehavior (event) {
  //Delete button removes the div containing that songs info and the button itself
  if (event.target.className === "delete") {
    event.target.parentNode.remove();
  }
  // More button loads the data from the moreSongs json file; removes current More button, and inserts data into DOM
  else if (event.target.id === "moreButton") {
    event.target.remove();
    $.ajax({url: "moreSongs.json"}).done(manipulateSongInfo);
  }
}
