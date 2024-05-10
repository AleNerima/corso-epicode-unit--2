document.addEventListener('DOMContentLoaded', function() {
    // Funzione per ottenere e visualizzare i dettagli del prodotto
    const getProductDetails = function(productId) {
        // Effettua una richiesta API per ottenere i dettagli del prodotto
        fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTIwMjgxODQ0MjAwMTUzNzU4Y2EiLCJpYXQiOjE3MTUzMzE1ODYsImV4cCI6MTcxNjU0MTE4Nn0.DR0J6VXOG51x7sGrW6y18peID5nMkiCeGYKpKH1Mq3g'
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Errore nella risposta del server');
            }
        })
        .then((product) => {
            // Visualizza i dettagli del prodotto nella pagina
            displayProductDetails(product);
        })
        .catch((err) => {
            console.error('Errore:', err);
        });
    };

    // Funzione per visualizzare i dettagli del prodotto nella pagina
    const displayProductDetails = function(product) {
        // Trova gli elementi HTML in cui visualizzare i dettagli del prodotto
        const productNameElement = document.getElementById('name');
        const productDescriptionElement = document.getElementById('description');
        const productBrandElement = document.getElementById('brand');
        const productPriceElement = document.getElementById('price');
        const productImageElement = document.querySelector('.card-img-top');

        // Aggiorna il contenuto degli elementi HTML con i dettagli del prodotto
        productNameElement.innerText = product.name;
        productDescriptionElement.innerText = product.description;
        productBrandElement.innerText = `Brand: ${product.brand}`;
        productPriceElement.innerText = `Price: $${product.price}`;
        productImageElement.src = product.imageUrl; // Imposta l'URL dell'immagine del prodotto
        productImageElement.alt = product.name; // Imposta il testo alternativo per l'immagine
    };

    // Ottieni l'ID del prodotto dai parametri dell'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Ottieni e visualizza i dettagli del prodotto
    getProductDetails(productId);
});


