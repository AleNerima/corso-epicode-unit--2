class User {
    constructor(firstName, lastName, age, location) {
      this.firstName = firstName
      this.lastName = lastName
      this.age = age
      this.location = location
    }
  
    confrontoAnni(altroUser) {
      if (this.age < altroUser.age) {
        return `${altroUser.firstName} è più vecchio di ${this.firstName}.`
      } else if (this.age > altroUser.age) {
        return `${altroUser.firstName} è più giovane di ${this.firstName}.`
      } else {
        return `${altroUser.firstName} è della stessa età di ${this.firstName}.`
      }
    }
  };

  persona_1= new User('Alessandro','Rossi',29, 'Roma');
  persona_2=new User('Andrea', 'Maurizi', 62,'Firenze');
  persona_3=new User('Gianna','Verdi',62,'Biella');
  console.log(persona_1.confrontoAnni(persona_2));
  console.log(persona_2.confrontoAnni(persona_3));
  console.log(persona_3.confrontoAnni(persona_1));
