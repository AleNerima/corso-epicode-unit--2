document.addEventListener('DOMContentLoaded', function () {
    // faccio il get con il fetch
    fetch('https://striveschool-api.herokuapp.com/books')
      .then(response => response.json())
      .then(data => {
        const booksContainer = document.getElementById('booksContainer');

        data.forEach(book => {
          const card = document.createElement('div');
          card.classList.add('col-3', 'mb-4');

          card.innerHTML = `
            <div class="card h-100" data-book-id="${book._id}">
                <img src="${book.img}" class="card-img-top h-50" alt="Book Cover">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Price: ${book.price}</p>
                    <button class="btn btn-danger mt-auto" onclick="removeBook(this)">Scarta</button>
                    <button class="btn btn-primary mt-2" onclick="addToCart('${book._id}', '${book.title}', '${book.price}')">Compra ora</button>
                </div>
            </div>
          `;
          booksContainer.appendChild(card);
        });
      });

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartUI = () => {
      const cartItemsContainer = document.getElementById('cartItems');
      cartItemsContainer.innerHTML = '';

      cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - ${item.price}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Rimuovi';
        removeBtn.classList.add('btn', 'btn-danger', 'ms-2');
        removeBtn.onclick = () => removeCartItem(item.id);
        li.appendChild(removeBtn);

        cartItemsContainer.appendChild(li);
      });
    };

    // funzione per aggiungere al carrello
    window.addToCart = (id, title, price) => {
      cartItems.push({ id, title, price });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartUI();
    };

    // funzione per rimuovere dal carrello
    const removeCartItem = (id) => {
      cartItems = cartItems.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartUI();
    };

    // pulsante scarta
    window.removeBook = (btn) => {
        const cardToRemove = btn.closest('.card');
        if (cardToRemove) {
            cardToRemove.remove();
        }
    };    

    // pulsante compra ora
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      alert('Hai comprato i libri');
    });
    
    updateCartUI();
  });