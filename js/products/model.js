export default class Model {
    constructor() {
        this.products = []
    }

    async loadProducts(){
        const response = await fetch ('./js/products.json');
        const data =  await response.json()
        this.products = data;

        for (const product of this.products){
            product.counter = 1;
        } 
    }

    updateCounter(id, action){
        const product = this.products.find((item)=>{
            if (item.id === id){
                return true
            }
        })
        if (action === 'plus'){
            product.counter++
        }
        if (action === 'minus'){
            if(product.counter > 1){
                product.counter--
            }
        }
        return product
    }

    getProduct(id){
        return this.products.find((item)=> item.id === id);
    }

    resetCounter(product){
        product.counter = 1;
    }

    // getTotalPrice(){
    //     let totalPrice = 0;
    //     this.products.forEach((item)=>{
    //             totalPrice = totalPrice + item.price * item.counter
    //     })
    //     return totalPrice;
    // }
    getTotalPrice(product){
        let totalPrice = 0
          totalPrice = totalPrice + product.price * product.counter
         return totalPrice
    }
}

