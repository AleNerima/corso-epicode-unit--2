window.addEventListener('scroll', function() {
    var headerHeight = document.querySelector('header').offsetHeight;
    var barraSuperiore = document.getElementById('barra-superiore');
    var scrollPos = window.scrollY;
  
    if (scrollPos > headerHeight) {
      barraSuperiore.style.backgroundColor = '#fff'; // Cambio il colore di sfondo della barra in bianco
      document.querySelector('#navbar button').style.backgroundColor = '#4CAF50'; // Cambio il colore di sfondo del bottone in verde
    } else {
      barraSuperiore.style.backgroundColor = '#ffc017'; // parte per colori originali
      document.querySelector('#navbar button').style.backgroundColor = '#191919'; 
    }
  
    if (scrollPos > 100) {
      barraSuperiore.classList.add('sticky');
    } else {
      barraSuperiore.classList.remove('sticky');
    }
  });