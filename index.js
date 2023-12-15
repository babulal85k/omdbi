const apiKey = 'YOUR_OMDB_API_KEY'; // Replace with your actual API key
const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const movieDataContainer = document.getElementById('movieDataContainer');

searchButton.addEventListener('click', searchMovie);

function searchMovie() {
  const searchTerm = movieInput.value.trim();
  
  if (searchTerm !== '') {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayMovieData(data))
      .catch(error => console.error('Error fetching movie data:', error));
  } else {
    alert('Please enter a movie title.');
  }
}

function displayMovieData(movieData) {
  movieDataContainer.innerHTML = ''; // Clear previous data

  if (movieData.Response === 'True') {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const poster = document.createElement('img');
    poster.src = movieData.Poster !== 'N/A' ? movieData.Poster : 'placeholder-image.jpg';
    poster.alt = 'Movie Poster';

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');

    const title = document.createElement('h2');
    title.textContent = movieData.Title;

    const year = document.createElement('p');
    year.textContent = `Year: ${movieData.Year}`;

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${movieData.Genre}`;

    const plot = document.createElement('p');
    plot.textContent = `Plot: ${movieData.Plot}`;

    movieInfo.appendChild(title);
    movieInfo.appendChild(year);
    movieInfo.appendChild(genre);
    movieInfo.appendChild(plot);

    movieCard.appendChild(poster);
    movieCard.appendChild(movieInfo);

    movieDataContainer.appendChild(movieCard);
  } else {
    movieDataContainer.textContent = `Movie not found. Please check the title and try again.`;
  }
}
