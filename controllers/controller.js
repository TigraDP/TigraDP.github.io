import {PetShop} from "../models/petShop.js";
import {PetShopView} from "../view/petShopView.js";

window.onload = () => new Controller().execute();

class Controller{
    constructor(){        
        this.petShopView = new PetShopView;
        this.petShop = new PetShop;
        this.database = this.readJSON("../database.json");
        this.pets = this.petShop.getPets(this.database);
        this.cart = [];
        this.addEvents();
    } 

    readJSON(url){
        const request = new XMLHttpRequest();                
        request.open("GET", url, false);
        request.send();        
        return JSON.parse(request.responseText);
    }

    addEvents(){
        this.petShopView.menuVertikal.addEventListener('click', () => this.getPetsList(event));  
        this.petShopView.petShop.addEventListener('click', () => this.addPetToCart(event));
        this.petShopView.cart.addEventListener('click', () => this.petShopView.showCart(this.cart));
        this.petShopView.closeShopCart.addEventListener('click', () => this.petShopView.closeCart());
        this.petShopView.shopCartForm.addEventListener('click', () => this.deletePetFromCart(event)); 
        this.petShopView.checkout.addEventListener('click', () => this.checkout(event)); 
    } 

    execute(){
        this.parsePets();        
        this.expensivePets = this.getToExpensivePets(this.pets);
        this.whiteOrFluffyPets = this.getWhiteOrFluffy(this.pets);        

        this.petShopView.renderElement(this.cats,this.petShopView.allCatsView);
        this.petShopView.renderElement(this.expensivePets,this.petShopView.expensiveView);
        this.petShopView.renderElement(this.whiteOrFluffyPets,this.petShopView.whiteOrFluffyView);   
    }

    parsePets(){
        this.cats = this.pets.filter(pet => pet.type === "Cat");
        this.dogs = this.pets.filter(pet => pet.type === "Dog");
        this.hamsters = this.pets.filter(pet => pet.type === "Hamster");
    }

    getToExpensivePets(pets){
        let toExpensivePets = [];
        let averagePrice = this.getAveragePrice(pets);
        
        pets.forEach(function(element){            
            if (element.price > averagePrice){                
            toExpensivePets.push(element);
            };           
        });
        return toExpensivePets;
    }

    getAveragePrice(pets){
        let totalPetCost = 0;
        let totalPetQuantity = 0;

        pets.forEach(function(element){
            totalPetCost = totalPetCost + element.price;
            totalPetQuantity++;
            })    
        return totalPetCost/totalPetQuantity;
    }

    getWhiteOrFluffy(pets){
        let whiteOrFluffyPets = [];
        
        pets.forEach(function(element){            
            if ((element.color === "White") || (element.isFluffy === "yes")){                
                whiteOrFluffyPets.push(element);
            };            
        });
        return whiteOrFluffyPets;      
    };    
      
    addPetToCart(e){
        let cart = this.pets.filter(pet => pet.id == e.target.id);   
        this.cart.push(cart);        
        this.petShopView.cart.innerHTML++;
    }

    deletePetFromCart(e){
        let arr = this.cart;
        let id = e.target.id;
        for (let i = 0; i < arr.length; i++){        
            if (arr[i][0].id == id){
            arr.splice(i,1);
            this.petShopView.cart.innerHTML--;
            break;       
            }
        }
        this.cart = arr;        
        this.petShopView.renderPetsInCart(this.cart);         
    }

    checkout(){
        let arr = this.cart;
        let pets = this.pets;
        let id;

        for (let i = 0; i < arr.length; i++){
            id = +arr[i][0].id
            pets.forEach(function(element){
                if (element.id === id) pets.splice(pets.indexOf(element),1);
            });
        };

        this.pets = pets;        
        this.cart = [];
        this.petShopView.cart.innerHTML = "";
        this.petShopView.petShop.innerHTML = '';

        this.petShopView.closeCart();
        this.execute();
    }

    getPetsList(e){
        let className = e.target.className;        

        if(className === "cat") this.petShopView.renderPets(this.cats);

        if(className === "dog") this.petShopView.renderPets(this.dogs);

        if(className === "hamster") this.petShopView.renderPets(this.hamsters);             
    }
}
   