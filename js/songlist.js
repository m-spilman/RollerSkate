var songsArray = [];
document.addEventListener("DOMContentLoaded", function() {
  
  auth.onAuthStateChanged(function(user) {
    if(user)
    {db.collection("songs").doc(auth.currentUser.uid).get().then(renderMe)}
    else
    {renderNoUser()}
})

})

function renderMe(data) {
  let songsArray = data.data().song;
  songListHTML = songsArray.map(function(data) {
    return `<div class = col-sm-3>
        <div class = movie card style = width: 18rem;>
        <img class = card-img-top src = ${data.cover} alt = 'Picture Unavailable'>
        <div class = card-body>
        <div class = movieInfo>
        <div class = card-title><h5> ${data.track} </h5></div>
        <div class = card-subtitle year><h5> ${data.artist} </h5></div>
        </div>
        </div> </div> </div>`;
  });

  document.getElementById("steve").innerHTML =
    "<div class = row>" + songListHTML.join("") + "</div>";
}
function renderNoUser() 
{
  document.getElementById("steve").innerHTML = "<div class = row><h1> You are not signed in!!</h1</div>";
}