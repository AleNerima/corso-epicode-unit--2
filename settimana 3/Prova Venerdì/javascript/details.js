document.addEventListener('DOMContentLoaded', function() {
    const getProductDetails = function(productId) {
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
            displayProductDetails(product);
        })
        .catch((err) => {
            console.error('Errore:', err);
        });
    };

    const displayProductDetails = function(product) {
        const productNameElement = document.getElementById('name');
        const productDescriptionElement = document.getElementById('description');
        const productBrandElement = document.getElementById('brand');
        const productPriceElement = document.getElementById('price');
        const productImageElement = document.querySelector('.card-img-top');

        productNameElement.innerText = product.name;
        productDescriptionElement.innerText = product.description;
        productBrandElement.innerText = `Brand: ${product.brand}`;
        productPriceElement.innerText = `Price: $${product.price}`;
        productImageElement.src = product.imageUrl;
        productImageElement.alt = product.name; 

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary');
        editButton.textContent = 'Modifica';
        editButton.addEventListener('click', function() {
            window.location.href = `backoffice.html?id=${product._id}`;
        });
        document.querySelector('.card-body').appendChild(editButton);

      
    };

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    getProductDetails(productId);
});



