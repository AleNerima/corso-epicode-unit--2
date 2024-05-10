document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').innerText = new Date().getFullYear();

    const loadingSpinner = document.getElementById('loading-spinner'); 

    const getEvents = function () {
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
            const eventsRow = document.getElementById('events-row');
            events.forEach((event) => {
                const eventCard = createEventCard(event);
                eventsRow.appendChild(eventCard);

                eventCard.addEventListener('click', () => {
                    const url = `details.html?id=${event._id}`;
                    window.location.href = url;
                });
            });

            // Nascondo il coso del loading
            loadingSpinner.style.display = 'none';
        })
        .catch((err) => {
            console.error('Errore:', err);
        });
    };

    const createEventCard = function (event) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('col', 'product-card');
        eventCard.dataset.productId = event._id; 
        eventCard.innerHTML = `
            <div class="card h-100 shadow-lg p-3 mb-5 bg-body rounded">
                <img src="${event.imageUrl}" class="card-img-top h-50" alt="...">
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

    getEvents();
});
