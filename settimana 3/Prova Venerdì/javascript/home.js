document.addEventListener('DOMContentLoaded', function() {
    // Setta l'anno corrente nel footer
    document.getElementById('year').innerText = new Date().getFullYear();

    // Funzione per ottenere gli eventi dall'API e visualizzarli nella pagina home
    const getEvents = function() {
        // Recuperiamo la lista di eventi attualmente nel database
        fetch('https://striveschool-api.herokuapp.com/api/product/', {
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
        .then((events) => {
            // Se gli eventi sono stati recuperati con successo, li visualizziamo nella pagina
            const eventsRow = document.getElementById('events-row');
            events.forEach((event) => {
                const eventCard = createEventCard(event);
                eventsRow.appendChild(eventCard);

                // Aggiungi un event listener a ciascuna card per il reindirizzamento
                eventCard.addEventListener('click', () => {
                    // Costruisci l'URL della pagina "details.html" con l'ID del prodotto come parametro
                    const url = `details.html?id=${event._id}`;
                    // Effettua il reindirizzamento
                    window.location.href = url;
                });
            });
        })
        .catch((err) => {
            console.error('Errore:', err);
        });
    };

    // Funzione per creare una card evento
    const createEventCard = function(event) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('col', 'product-card');
        eventCard.dataset.productId = event._id; // Imposta l'ID del prodotto come attributo del dataset
        eventCard.innerHTML = `
            <div class="card">
                <img src="${event.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text">Brand: ${event.brand}</p>
                    <p class="card-text">Price: $${event.price}</p>
                </div>
            </div>
        `;
        return eventCard;
    };

    // Chiamiamo la funzione per ottenere gli eventi all'avvio della pagina
    getEvents();
});

