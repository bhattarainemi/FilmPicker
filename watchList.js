// Retrieve watchlist items from local storage
const watchlistContainer = document.getElementById('divToPopulate');

// Clear existing content in case there are no watchlist items
watchlistContainer.innerHTML = '';

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const movieDetails = JSON.parse(localStorage.getItem(key));

  // Create HTML elements to display watchlist items
  const movieDiv = document.createElement('div');
  movieDiv.classList.add('watchlistItem');

  movieDiv.innerHTML = `<div class="contentDiv">
    <img src="${movieDetails.poster}">
    <div class="movieDetails">
        <p class="movie-title">${movieDetails.title}</p>
        <div>
            <img src="./assets/star.svg"><span class="rating"> ${movieDetails.imdbRating}</span>  
        </div>    
    </div>
    <div class="movieData">
        <p class="totalTime">${movieDetails.duration}</p>
        <p class="genre">${movieDetails.genre}</p>
        <span id="${movieDetails.imdbID}" class="removeButton watchlist"><img src="./assets/minus.svg" style="width:16px; height: 16px; background-color: black; margin-right: 5px;"> Remove</span>
    </div>
    <p class="plot">${movieDetails.plot}</p>    
  </div>`;

  watchlistContainer.appendChild(movieDiv);


const removeButton = movieDiv.querySelector('.removeButton');
removeButton.addEventListener('click', function (e) {
  const idToRemove = `"${e.target.id}"`;
  localStorage.removeItem(idToRemove);
  // Remove the corresponding HTML element from the watchlist display
  const itemToRemove = e.target.parentNode.parentNode;
  itemToRemove.parentNode.removeChild(itemToRemove);
});


}

