class Pet {
	constructor(id,color, price){
		this.id = id;
        this.color = color;
		this.price = price;
	}
}

export class Dog extends Pet {
	constructor(id, type, color, price, name){
		super(id, color, price);
        this.name = name;     
        this.type = type;	
	}
}

export class Cat extends Pet {
	constructor(id, type, color, price, name, isFluffy){
		super(id, color, price);
		this.name = name;
        this.type = type;
		this.isFluffy = isFluffy;
	}
}
export class Hamster extends Pet{
	constructor(id, type, color, price, isFluffy){
		super(id, color, price);
		this.isFluffy = isFluffy;
		this.type = type;
		this.name = id;
	}
}



