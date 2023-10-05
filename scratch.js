// Create a Dog Class with your pair.
// Give it properties and methods.
// Create 3 instances of your Dog

class Dog{
    constructor(name, color, breed, age){
        this.name = name;
        this.color = color;
        this.breed = breed;
        this.age = age;
    }

    bark(){
        console.log(`${this.name} says WOOF!`);
    }

    eat(){
        console.log(`${this.name} likes to eat`)
    }

    about(){
        console.log(`Hi, I'm ${this.name} a ${this.color} ${this.breed} and I'm ${this.age} ${this.age === 1 ? 'year' : 'years'} old`)
    }
}

const dog1 = new Dog('Fido', 'Blue', 'Labrador', 18);
const dog2 = new Dog('Bruno', 'Golden', 'Poodle', 3)
const dog3 = new Dog('Sparky', 'White', 'Terrier', 1)

dog2.eat();
