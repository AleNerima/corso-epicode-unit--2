// Funzione per caricare le immagini principali
function loadImages() {
    const query = 'landscapes';
    const url = `https://api.pexels.com/v1/search?query=${query}`;
    
    fetchImages(url);
}

// Funzione per caricare le immagini secondarie
function loadSecondaryImages() {
    const query = 'city'; 
    const url = `https://api.pexels.com/v1/search?query=${query}`;
    
    fetchImages(url);
}

// Funzione per effettuare la richiesta GET e visualizzare le immagini
function fetchImages(url) {
    fetch(url, {
        headers: {
            Authorization: '8A3mKCQigJlSmVhGkgf1wQnRdFjg1CZy188MFDJ063RNCwU53vJ9uR4d'
        }
    })
    .then(response => response.json())
    .then(data => {
        const images = document.querySelectorAll('.card-img-top');
        const textMuted = document.querySelectorAll('.text-muted');

        images.forEach((image, index) => {
            image.src = data.photos[index].src.medium;
            textMuted[index].textContent = data.photos[index].id; // testo id immagine
            
            image.addEventListener('click', () => redirectToImageDetails(data.photos[index].id));
            
            const artistName = document.querySelector(`#artistName${index}`);
            if (artistName) {
                artistName.addEventListener('click', () => redirectToImageDetails(data.photos[index].id));
            }
        });
    })
    .catch(error => console.error('Errore durante il caricamento delle immagini:', error));
}

// Funzione che manda a dettagli
function redirectToImageDetails(imageId) {
    window.location.href = `image_details.html?id=${imageId}`;
}

// Funzione per nascondere una card
function hideCard(button) {
    const card = button.closest('.card');
    card.style.display = 'none';
}

// Barra di ricerca
function searchImages() {
    const query = document.getElementById('searchInput').value;
    const url = `https://api.pexels.com/v1/search?query=${query}`;
    
    fetchImages(url);
}

// Inizializzazione pagina
document.addEventListener('DOMContentLoaded', function() {
    const loadImagesButton = document.querySelector('.btn-primary');
    const loadSecondaryImagesButton = document.querySelector('.btn-secondary');

    loadImagesButton.addEventListener('click', loadImages);
    loadSecondaryImagesButton.addEventListener('click', loadSecondaryImages);

    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click', searchImages);
});


