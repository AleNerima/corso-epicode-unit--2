document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-form');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const brandInput = document.getElementById('brand');
    const imageInput = document.getElementById('image');
    const priceInput = document.getElementById('price');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
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
            nameInput.value = product.name;
            descriptionInput.value = product.description;
            brandInput.value = product.brand;
            imageInput.value = product.imageUrl;
            priceInput.value = product.price;
        })
        .catch((err) => {
            console.error('Errore:', err);
        });
    }

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

        const data = {
            name: name,
            description: description,
            brand: brand,
            imageUrl: imageUrl,
            price: price
        };

        if (productId) {
            fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTIwMjgxODQ0MjAwMTUzNzU4Y2EiLCJpYXQiOjE3MTUzMzE1ODYsImV4cCI6MTcxNjU0MTE4Nn0.DR0J6VXOG51x7sGrW6y18peID5nMkiCeGYKpKH1Mq3g'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta PUT');
                }
                return response.json();
            })
            .then(data => {
                console.log('Risposta dal server:', data);
                alert('Hai aggiornato il prodotto con successo!');
            })
            .catch(error => {
                console.error('Si è verificato un errore:', error);
            });
        } else {
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
                    throw new Error('Errore nella richiesta POST');
                }
                return response.json();
            })
            .then(data => {
                console.log('Risposta dal server:', data);
                alert('Hai creato il tuo oggetto con successo!');
            })
            .catch(error => {
                console.error('Si è verificato un errore:', error);
            });
        }
    });

    // Aggiunta del pulsante "Reset"
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.classList.add('btn', 'btn-success', 'mx-2');
    resetButton.addEventListener('click', function() {
        if (confirm('Sei sicuro di voler resettare il form?')) {
            form.reset();
        }
    });
    form.appendChild(resetButton);

    // Aggiunta del pulsante "Cancella"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Cancella';
    deleteButton.classList.add('btn', 'btn-danger', 'mx-2');
    deleteButton.addEventListener('click', function() {
        if (confirm('Sei sicuro di voler cancellare la carta?')) {
            // Qui aggiungi il codice per cancellare la carta
            // Esegui la richiesta DELETE al server per cancellare la carta
        }
    });
    form.appendChild(deleteButton);
});




