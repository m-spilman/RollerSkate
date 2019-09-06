/* eslint-disable */

// window.SHARAOKE = window.SHARAOKE || {}
// window.SHARAOKE.musicArray = []





// Wait untill the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  searchSongs()
})

function searchSongs () {
  document.getElementById('searchButton').addEventListener('click', function (e) {
    e.preventDefault()
    let userSearchString = document.getElementById('textInput').value // gets user input
    // creating string for fetch call
    let URLencoded = encodeURIComponent(userSearchString)
    let baseQuery = 'https://api.happi.dev/v1/music?q='
    let apiKey = '&limit=20&apikey=5a5b0fqDJyMbS7foYe8e1HlTIy8Y4r2P0yEZT6YyonWp2XkFGYdNpJL9'
    window.fetch(baseQuery + URLencoded + apiKey) // ajax request
      .then(extractInfo) // promise
      .then(apiResponse) // promise

    // return the results in json format
    function extractInfo (response) {
      return response.json()
    }
    // take the return conent, iterate over it using map and render page content
    function apiResponse (content) {
      returnArray = content.result

      var musicSearchHTML = returnArray.map(function (musicContent) {
        // changes button text depending in whether user is logged in or not
        var buttonText = ''
        if (userStatus) {
          buttonText = 'Add To Song List'
        } else {
          buttonText = 'Login to Save'
        }
        apiLyricsString = musicContent.api_lyrics
        hasLyrics = musicContent.haslyrics
        // creates html for boostrap card
        return `<div class = col-sm-3>
            <div class = movie card style = width: 18rem;>
            <img class = card-img-top src = ${musicContent.cover} alt = 'Picture Unavailable'>
            <div class = card-body>
            <div class = movieInfo>
            <div class = card-title><h5> ${musicContent.track} </h5></div>
            <div class = card-subtitle year><h5> ${musicContent.artist} </h5></div>
            <a href="#" class="grey-text modal-trigger" id=lyrcis data-target="modal-lyrics">View Lyrics</a>
            </div>
            <button type ='button' class="btn btn-primary"  onclick = 'saveToSonglist("${musicContent.id_track}")'>${buttonText}</a><br>
            
            </div> </div> </div>`
      })
      // returns the html
      document.getElementById('content').innerHTML = '<div class = row>' + musicSearchHTML.join('') + '</div>'
    }
  })
}
// saves users songs

var songArray = [] // declaring empty array
function saveToSonglist (trackID) {
  let song = returnArray.find(function (song) { // searches the array for the song that matches the track ID the user selected
    return trackID == song.id_track
  })
  songArray.push(song) // pushes selected track on array
  let user = auth.currentUser.uid

  db.collection('songs').doc(user).get().then((docSnapshot) => { // checks to see if the user already has a document created
    if (docSnapshot.exists) {
      db.collection('songs').doc(user).get().then(addToExisting) // if document exists then run addToExisting
    } else {
      db.collection('songs').doc(user).set({ // if no document create new document and add the content
        song: songArray
      }, { merge: true })
    }
  }
  )
  function addToExisting (data) {
   let existingData = data.data().song // returns an array - the users existing data
    songArray = songArray.concat(existingData) // concats the existing array with the array of new data
    db.collection('songs').doc(user).set({ // overwrites the existing field song with songArray
      song: songArray
    }, { merge: true })
    songArray = [] // clears array
  }
}
