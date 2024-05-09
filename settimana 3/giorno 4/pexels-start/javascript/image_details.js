document.addEventListener('DOMContentLoaded', function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const imageId = urlParams.get('id');

    // ottenere dettagli
    const url = `https://api.pexels.com/v1/photos/${imageId}`;
    
    fetch(url, {
        headers: {
            Authorization: '8A3mKCQigJlSmVhGkgf1wQnRdFjg1CZy188MFDJ063RNCwU53vJ9uR4d'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Visualizzare i dettagli dell'immagine sulla pagina
        const imageContainer = document.querySelector('.image-container');
        const artistName = document.querySelector('.artist-name');
        const artistLink = document.querySelector('.artist-link');
        
        imageContainer.src = data.src.large; 
        artistName.textContent = data.photographer; 
        artistLink.href = data.photographer_url; 
    })
    .catch(error => console.error('Errore durante il recupero dei dettagli dell\'immagine:', error));
});
