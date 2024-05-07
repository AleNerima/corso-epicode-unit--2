// prima funzione che aggiorna il contatore
function updateCounter() {
    let startTime = sessionStorage.getItem('startTime');
    if (!startTime) {
        startTime = Math.floor(Date.now() / 1000); // devo perndere i secondi attuali contralla w3s (se non ricordi sezione costruttore date)
        sessionStorage.setItem('startTime', startTime);
    }

    let currentTime = Math.floor(Date.now() / 1000); 
    let elapsedTime = currentTime - startTime;

    document.getElementById('counter').innerText = formatTime(elapsedTime);

    // imposto il timeout
    setTimeout(updateCounter, 1000);
}

// formatazione HH:MM:SS per il timer
function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    return pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
}

// aggiunge lo zero ai valori inziali che non sotto il dieci 09 08 07 06ecc
function pad(value) {
    return value < 10 ? "0" + value : value;
}

//aggiorna il contatore al caricamento della pagina 
window.onload = updateCounter;