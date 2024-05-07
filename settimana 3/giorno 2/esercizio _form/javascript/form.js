  //prima funzione che devo fare è quella per sarlbare il nome
  document.getElementById('saveButton').addEventListener('click', function() {
    var name = document.getElementById('nameInput').value;
    localStorage.setItem('savedName', name);
    document.getElementById('savedName').innerText = name;
});

// poi faccio la funzione per rimuovere il nome 
document.getElementById('removeButton').addEventListener('click', function() {
    localStorage.removeItem('savedName');
    document.getElementById('nameInput').value = '';
    document.getElementById('savedName').innerText = '';
});

// la funzione per far vedere il nome salvato in precedenza
window.onload = function() {
    var savedName = localStorage.getItem('savedName');
    if (savedName) {
        document.getElementById('savedName').innerText = savedName;
        document.getElementById('nameInput').value = savedName;
    }
};