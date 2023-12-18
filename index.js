const searchButton = document.getElementById("searchBtn");
const informationBox = document.getElementById("divToPopulate");
let posters = [];
let titles = [];
let imdbIDs = [];
let imdbRatings =[];
let durations = [];
let genres = [];
let plots = [];

searchButton.addEventListener("click", initialSearch);

function initialSearch() {
  const searchInput = document.getElementById("searchString").value;
  fetch(`http://www.omdbapi.com/?apikey=1d0f05ca&s=${searchInput}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        informationBox.innerHTML = `<p style="text-align: center;">Movie Not Found. Please try another search</p>`;
      } else {
        // Clear existing content before adding new search results
        document.getElementById('divToPopulate').innerHTML = '';

        posters = [];
        titles = [];
        imdbIDs = [];
        imdbRatings = [];
        durations = [];
        genres = [];
        plots = [];

        for (movie of data.Search) {
          posters.push(movie.Poster);
          titles.push(movie.Title);
          imdbIDs.push(movie.imdbID);
        }
        detailedSearch(imdbIDs)
      }
    });
}


function detailedSearch(IDs) {
  const promises = IDs.map(id =>
    fetch(`http://www.omdbapi.com/?apikey=1d0f05ca&i=${id}`)
      .then(res => res.json())
  );

  Promise.all(promises)
    .then(results => {
      results.forEach(data => {
        imdbRatings.push(data.imdbRating);
        durations.push(data.Runtime);
        genres.push(data.Genre);
        plots.push(data.Plot);
      });
      let html = ``
      for (let i = 0; i < titles.length; i++) {
        html+=`<div class="contentDiv">
        <img src="${posters[i]}">
        <div class="movieDetails">
            <p class="movie-title">${titles[i]}</p>
            <div>
                <img src="./assets/star.svg"><span class="rating"> ${imdbRatings[i]}</span>  
            </div>    
        </div>
        <div class="movieData">
            <p class="totalTime">${durations[i]}</p>
            <p class="genre">${genres[i]}</p>
            <span id="${imdbIDs[i]}" class="watchlist"><img src="./assets/plus.svg" style="width:16px; height: 16px; background-color: white; margin-right: 5px;"> Watchlist</span>
        </div>
        <p class="plot">${plots[i]}</p>    
    </div>`
    document.getElementById('divToPopulate').innerHTML = html
      }
      document.getElementById('divToPopulate').addEventListener('click', function(e){
        if (e.target.id) {
          const index = imdbIDs.indexOf(e.target.id);
          const movieDetails = {
            imdbID: e.target.id,
            title: titles[index],
            poster: posters[index],
            imdbRating: imdbRatings[index],
            duration: durations[index],
            genre: genres[index],
            plot: plots[index]
          };
          localStorage.setItem(`"${e.target.id}"`, JSON.stringify(movieDetails));
        }

      })
    });
}




