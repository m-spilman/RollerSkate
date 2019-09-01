var songsArray = [];
document.addEventListener("DOMContentLoaded", function() {
    auth.onAuthStateChanged(function(user) {
    if(user)
    {db.collection("songs").doc(auth.currentUser.uid).get().then(renderMe)} // if user is logged in, get their data and call renderMe
    else
    {renderNoUser()} // if user is not logged in call renderNoUser
})

})
//renders the data retreived from the users document
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

  document.getElementById("content").innerHTML =
    "<div class = row>" + songListHTML.join("") + "</div>";
}
function renderNoUser() // renders text letting the user know they are not logged in
{
  document.getElementById("content").innerHTML = "<div class = 'col-12 header text-center' id='list-notSignedIn'><h1>Login to save content</h1></div>";
}

