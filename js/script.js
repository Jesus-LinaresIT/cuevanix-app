'use strict'

const global = {
   currentPage: window.location.pathname,
};

//Display 20 most popular movies
async function displayPopularMovies() {
   const {results} = await fetchAPIData('movie/popular');
   
   results.forEach(movie =>{
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
         <a href="movie-details.html?id=${movie.id}">
            ${
               movie.poster_path
               ? `<img
               src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
               class="card-img-top"
               alt="${movie.title}"
               />`
                  : `<img
                  src="images/non-images.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
               />`
            }
            
         </a>
         <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
               <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
         </div>
      `;

      document.querySelector('#popular-movies').appendChild(div);
   })
}


//Display 20 most tv shows
async function displayTVShows() {
   const {results} = await fetchAPIData('tv/popular');
   
   results.forEach(show =>{
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
         <a href="tv-details.html?id=${show.id}">
            ${
               show.poster_path
               ? `<img
               src="https://image.tmdb.org/t/p/w500${show.poster_path}"
               class="card-img-top"
               alt="${show.name}"
               />`
                  : `<img
                  src="images/non-images.jpg"
                  class="card-img-top"
                  alt="${show.name}"
               />`
            }
            
         </a>
         <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
               <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
         </div>
      `;

      document.querySelector('#popular-shows').appendChild(div);
   })
}


// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
   //Sensitive data at this location due to learning effect
   const API_KEY = 'a8dcd591b35889c6a4363ac6efb35ff3';
   const API_URL = 'https://api.themoviedb.org/3/';

   showSpiner();

   const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

   const data = await response.json();

   hideSpiner();

   return data;
}


//Show spinner loading
function showSpiner() {
   document.querySelector('.spinner').classList.add('show');
}

//Hide spinner loading
function hideSpiner() {
   document.querySelector('.spinner').classList.remove('show');
}


// Highlight active links
function highlightActiveLink() {
   const links = document.querySelectorAll('.nav-link');
   links.forEach(link => {
      if (link.getAttribute('href') === global.currentPage) {
         link.classList.add('active');
      }
   })
}


// Init App
function init() {
   switch(global.currentPage){
      case '/':
      case '/index.html':
         displayPopularMovies();
         break; 
      case '/shows.html':
         displayTVShows();
         break; 
      case '/movie-details.html':
         console.log('MovieDetails')
         break; 
      case '/tv-details.html':
         console.log('tv-details')
         break; 
      case '/search.html':
         console.log('Search')
         break; 
   }
   highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
