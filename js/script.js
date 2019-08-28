var songArray = []

document.addEventListener('DOMContentLoaded', function(){
    let modals = document.querySelectorAll('.modal')
    M.Modal.init(modals)
    searchSongs()
    })


function searchSongs(){
    document.getElementById('searchButton').addEventListener('click', function(e){
    e.preventDefault()
    let userSearchString = document.getElementById('textInput').value
    let URLencoded = encodeURIComponent(userSearchString)
    let baseQuery =  'https://api.happi.dev/v1/music?q='
    let apiKey = '&limit=&apikey=5a5b0fqDJyMbS7foYe8e1HlTIy8Y4r2P0yEZT6YyonWp2XkFGYdNpJL9'
    fetch(baseQuery+URLencoded+apiKey)
    .then(extractInfo) 
    .then(apiResponse)

    function extractInfo(response){return response.json()}
    function apiResponse (content){
        returnArray = content.result


        var musicSearchHTML = returnArray.map(function (musicContent){
   
  
            return `<div class = col-sm-4>
            <div class = movie card style = width: 18rem;>
            <img class = card-img-top src = ${musicContent.cover} alt = 'Picture Unavailable'>
            <div class = card-body>
            <div class = movieInfo>
            <div class = card-title><h5> ${musicContent.track} </h5></div>
            <div class = card-subtitle year><h5> ${musicContent.artist} </h5></div>
            </div>
            <button type ='button' class="btn btn-primary"onclick = 'saveToSonglist("${musicContent.id_track}")'>Add To Song List</a>
            </div> </div> </div>`
           
        }) 
        document.getElementById('steve').innerHTML = '<div class = row>' +musicSearchHTML.join('') + '</div>' 
    }
})
}

function saveToSonglist(trackID){
    let song = returnArray.find(function (song){ 
       return trackID == song.id_track
    })
    songArray.push(song)
    let user = firebase.auth().currentUser.uid; 
    db.collection('songs').doc(user).set({
    song: songArray
    },{ merge: true })
}

function renderSongList(songs)
{
    var songListHTML = []
    db.collection('songs').get().then(renderSongList)
    console.log(songs)
   
    songListHTML = songs.map(function(data){
                return `<div class = col-sm-3>
                        <div class = movie card style = width: 18rem;>
                        <img class = card-img-top src = ${data.cover} alt = 'Picture Unavailable'>
                        <div class = card-body>
                        <div class = movieInfo>
                        <div class = card-title><h5> ${data.track} </h5></div>
                        <div class = card-subtitle year><h5> ${data.artist} </h5></div>
                        </div>
                        </div> </div> </div>`
            })
         
       document.getElementById('steve').innerHTML = '<div class = row>' +songListHTML.join('') + '</div>'
}
    

    


