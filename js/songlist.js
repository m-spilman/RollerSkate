
var songsArray = []
document.addEventListener('DOMContentLoaded', function(){
    db.collection('songs').get().then(getData)
    
    function getData(songs)
    {
        songs.docs.forEach(doc =>{
        renderMe(doc)
        })    
}
})
        
function renderMe(data)
{
let songsArray =data.data().song
songListHTML = songsArray.map(function(data){

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