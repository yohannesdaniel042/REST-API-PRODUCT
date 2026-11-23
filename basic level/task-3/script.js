const API_KEY = "YOUR_TMDB_API_KEY";

const API_URL = "https://api.themoviedb.org/3/movie/popular";

const movieContainer = document.getElementById("movie-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("movie-search");


async function getMovies() {
    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}`);

        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        displayMovies(data.results);

    } catch (error) {
        console.error("Error:", error);
        movieContainer.innerHTML = "<p>Something went wrong. Please try again.</p>";
    }
} 
getMovies();


async function searchMovies(query) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Failed to search movies");
        }

        const data = await response.json();

        displayMovies(data.results);

    } catch (error) {
        console.error("Search Error:", error);
        movieContainer.innerHTML =
            "<p>Something went wrong. Please try again.</p>";
    }
}
function displayMovies(movies) {
    movieContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");

        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                 alt="${movie.title}">

            <h3>${movie.title}</h3>

            <p>Release: ${movie.release_date}</p>

            <p>Rating: ${movie.vote_average.toFixed(1)}</p>
        `;

        movieContainer.appendChild(movieCard);
    });
}
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (query !== "") {
        searchMovies(query);
    }
});