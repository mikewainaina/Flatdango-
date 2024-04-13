document.addEventListener('DOMContentLoaded', () => {
const url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/';                                                                                                                                                                   
  
 const listHolder = document.getElementById('films');  
  
  
  
  
  
  
    const buyTicketBtn = document.getElementById('buy-ticket');

    fetchMovies(url);

    function fetchMovies(url) {
        fetch(url)
            .then(response => response.json())
            .then(movies => {
                movies.forEach(movie => {
                    displayMovie(movie);
                });
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

    function fetchMovieDetails(movieId) {
        fetch(`${url}/${movieId}`)
            .then(response => response.json())
            .then(movie => {
                setUpMovieDetails(movie);
                buyTicketBtn.textContent = 'Buy Ticket';
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    function displayMovie(movie) {
        const li = document.createElement('li');
        li.textContent = movie.title.toUpperCase();
        listHolder.appendChild(li);
        li.addEventListener('click', () => {
            fetchMovieDetails(movie.id);
        });
    }

    function setUpMovieDetails(movie) {
        const preview = document.getElementById('poster');
        preview.src = movie.poster;

        document.querySelector('#title').textContent = movie.title;
        document.querySelector('#runtime').textContent = `${movie.runtime} minutes`;
        document.querySelector('#film-info').textContent = movie.description;
        document.querySelector('#showtime').textContent = movie.showtime;
        const tickets = document.querySelector('#ticket-num');
        tickets.textContent = movie.capacity - movie.tickets_sold;
    }

    buyTicketBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const remainingTickets = parseInt(document.querySelector('#ticket-num').textContent, 10);
        if (remainingTickets > 0) {
            document.querySelector('#ticket-num').textContent = remainingTickets - 1;
        } else {
            buyTicketBtn.textContent = 'Sold Out';
        }
    });
});
