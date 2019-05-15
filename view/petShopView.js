export class PetShopView{
    constructor(){
        this.allCatsView = document.querySelector(".all-cats ul");
        this.expensiveView = document.querySelector(".expensive ul");
        this.whiteOrFluffyView = document.querySelector(".white-and-fluffy ul");
        this.menuVertikal = document.querySelector('.menuVertical ul');
        this.petShop = document.querySelector('.PetShop');  
        this.cart = document.querySelector('.cart');
        this.shopCart = document.querySelector('.cartPopap');
        this.closeShopCart = document.querySelector('.js-popup-close');
        this.ShopCartBg = document.querySelector('.popup_bg');
        this.shopCartForm = document.querySelector('.ShopCart'); 
        this.checkout = document.querySelector('.checkout'); 
    }
    renderElement(pets, insertPlace){
        insertPlace.innerHTML = ''; 
        pets.forEach(function(element){                     
        insertPlace.innerHTML += "<li>" + `${element.type} : ${element.name} : ${element.price}` + "</li>";
        })
    }
    
    renderPets(pets){        
        let content;
        let petShop = document.querySelector('.PetShop');
        petShop.innerHTML = '';

        let template = document.querySelector('.pet-cart-tamplate').content;
        
        pets.forEach(function(pet){
            template.querySelector("[data-pet-animal]").textContent = pet.type;
            template.querySelector("[data-pet-name]").textContent = pet.name;
            template.querySelector("[data-pet-color]").textContent = pet.color;
            template.querySelector("[data-pet-isFluffy]").textContent = pet.isFluffy;
            template.querySelector("[data-pet-price]").textContent = pet.price;
            template.querySelector(".byu-bth").id = pet.id;

            content = template.cloneNode(true);      
            petShop.appendChild(content);
        });
    }

    renderPetsInCart(pets){    
        pets.length < 1? this.checkout.textContent = "Your cart is empty":this.checkout.textContent = "Checkout";           
        
        let content;
        let shopCart = document.querySelector('.ShopCart');
        shopCart.innerHTML = '';
        let template = document.querySelector('.pet-in-shop-cart-tamplate').content;
                
        pets.forEach(function(pet){            
            template.querySelector("[data-pet-animal]").textContent = pet[0].type;
            template.querySelector("[data-pet-name]").textContent = pet[0].name;
            template.querySelector("[data-pet-price]").textContent = pet[0].price;
            template.querySelector(".byu-bth-cart").id = pet[0].id;

            content = template.cloneNode(true);      
            shopCart.appendChild(content);
        });
    }

    showCart(cart){
        this.renderPetsInCart(cart);
        this.shopCart.style.display = "block";
        this.ShopCartBg.style.display = "block";
    }

    closeCart(){
        this.shopCart.style.display = "none";
        this.ShopCartBg.style.display = "none";
    }
}