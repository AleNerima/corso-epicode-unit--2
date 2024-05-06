let petNameField = document.getElementById('nomeAnimale');
let ownerNameField = document.getElementById('nomePadrone');
let speciesField = document.getElementById('specie');
let breedField = document.getElementById('razza');
let addButton = document.getElementById('aggiungi');
let petList = document.getElementById('listaAnimali');
let pets = [];//Array dove storare gli animali

class Pet {
    constructor(petName, ownerName, species, breed) {
      this.petName = petName
      this.ownerName = ownerName
      this.species = species
      this.breed = breed
    }
  
    checkSameOwner(anotherPet) {
      if (this.ownerName === anotherPet.ownerName) {
        return true
      } else {
        return false
      }
    }
  }
  const listaCreata = function () {
    petList.innerHTML = '';
    pets.forEach((pet) => {
      const nuovoItems = document.createElement('li');
      nuovoItems.innerText ='Animale domestico: ' + pet.petName + ', proprietario: ' + pet.ownerName + ', specie:'+pet.species+', razza:'+pet.breed
      petList.appendChild(nuovoItems)
    })
  }

  addButton.onclick = function (e) {
    e.preventDefault();
    let newPet = new Pet(
      petNameField.value,
      ownerNameField.value,
      speciesField.value,
      breedField.value
    )
    pets.push(newPet)
    listaCreata()
    petNameField.value = '' ;
    ownerNameField.value = '' ;
    speciesField.value = '' ;
    breedField.value = '' ;
  }
  