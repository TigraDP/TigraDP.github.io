import {Cat, Dog, Hamster} from "./pets.js";

export class PetShop{
    constructor(){          
    }
    getPets(database){
        let pets = []; 
        let id = 1;    

        database.forEach(function(element){
            if(element.type === "Cat"){                
                let cat = new Cat(id, element.type, element.color, element.price, element.name, element.isFluffy);
                pets.push(cat);
                id++;
            } else if(element.type === "Dog"){
                let dog = new Dog(id, element.type,element.color, element.price, element.name);
                dog.isFluffy = "no";
                pets.push(dog);
                id++;                    
            } else if(element.type === "Hamster"){
                let hamster = new Hamster(id, element.type, element.color, element.price, element.isFluffy);
                pets.push(hamster);
                id++;                    
            }
        })
        return pets;
    }
}


