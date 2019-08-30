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
    let apiKey = '&limit=50&apikey=5a5b0fqDJyMbS7foYe8e1HlTIy8Y4r2P0yEZT6YyonWp2XkFGYdNpJL9'
    fetch(baseQuery+URLencoded+apiKey)
    .then(extractInfo) 
    .then(apiResponse)
    // .then(checkUserStatus)

    function extractInfo(response){
        return response.json()
    }

    function handleServerLogin(user) {
        console.log("2")
        if (user) {
            return true; console.log('yes')
        } else {
            return false
        }
    }

    function apiResponse (content){
    returnArray = content.result


        var musicSearchHTML = returnArray.map(function (musicContent){
            
            var buttonText = ''
            if (IS_USER_LOGIN) 
            {
                buttonText = 'Add To Song List';
            } else 
            {
                buttonText = "Login to Save";
            }

            
            return `<div class = col-sm-4>
            <div class = movie card style = width: 18rem;>
            <img class = card-img-top src = ${musicContent.cover} alt = 'Picture Unavailable'>
            <div class = card-body>
            <div class = movieInfo>
            <div class = card-title><h5> ${musicContent.track} </h5></div>
            <div class = card-subtitle year><h5> ${musicContent.artist} </h5></div>
            <a href="#" class="grey-text modal-trigger" data-target="modal-lyrics">Lyrics</a>
            </div>
            <button type ='button' class="btn btn-primary" onclick = 'saveToSonglist("${musicContent.id_track}")'>${buttonText}</a><br>
            
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
    let user = auth.currentUser.uid
    
     db.collection('songs').doc(user).get().then((docSnapshot) =>{
        if(docSnapshot.exists){
            db.collection('songs').doc(user).get().then(stuffs)
        }
        else{db.collection('songs').doc(user).set({
            song: songArray
            } ,{ merge: true })}
    }
    )
    function stuffs(data)
    {
        existingData = data.data().song
        songArray = songArray.concat(existingData)
        db.collection('songs').doc(user).set({
            song: songArray
            } ,{ merge: true })
        songArray = []
    }

  console.clear();
}


    


