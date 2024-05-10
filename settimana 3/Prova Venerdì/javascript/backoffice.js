document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-form');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const brandInput = document.getElementById('brand');
    const imageInput = document.getElementById('image');
    const priceInput = document.getElementById('price');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        const brand = brandInput.value.trim();
        const imageUrl = imageInput.value.trim();
        const price = parseFloat(priceInput.value);

        if (!name || !description || !brand || !imageUrl || isNaN(price)) {
            alert('Tutti i campi sono obbligatori');
            return;
        }

        // Tutto è valido, procedi con l'invio della richiesta
        const data = {
            name: name,
            description: description,
            brand: brand,
            imageUrl: imageUrl,
            price: price
        };

        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTIwMjgxODQ0MjAwMTUzNzU4Y2EiLCJpYXQiOjE3MTUzMzE1ODYsImV4cCI6MTcxNjU0MTE4Nn0.DR0J6VXOG51x7sGrW6y18peID5nMkiCeGYKpKH1Mq3g'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return response.json();
        })
        .then(data => {
            console.log('Risposta dal server:', data);
            alert('Hai creato il tuo oggetto con successo!');
            // Gestisci la risposta dal server se necessario
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
            // Gestisci gli errori qui
        });
    });
});



