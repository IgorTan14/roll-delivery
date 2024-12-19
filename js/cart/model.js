export default class Model {
    constructor(){
        this.cart = [];
        this.loadCartFromLocalStorage();
    }

    loadCartFromLocalStorage(){
        const data = localStorage.getItem('cart');
        if (data){
            this.cart = JSON.parse(data)
        }
    }
    
    saveToLocalStorage(){
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    addToCart(product){
        let productInCart;
        // знаходимо товар в корзині
        productInCart = this.cart.find((item)=>{
            if (item.id == product.id){
                return true
            }
        })

        if (productInCart){ // якщо вже є цей товар у корзині то сумуємо його лічильник       если уже есть этот товар в корзине то суммируем счетчик
            productInCart.counter = productInCart.counter + product.counter
        } else {
            // JSON.parse(JSON.stringify(product)) // копія старого об'єкта
            this.cart.push(JSON.parse(JSON.stringify(product)))
        }
        
        this.saveToLocalStorage()
    }

    getTotalPrice(){
        let totalPrice = 0;
        this.cart.forEach((item)=>{
            totalPrice = totalPrice + item.price * item.counter
        })
        return totalPrice;
    }

    updateCounterInCart(id, action){
        const product = this.cart.find((item)=>{
            return item.id === id
        })
        if (action === 'plus'){
            product.counter++
        }
        if (action === 'minus' ){
            if (product.counter > 0){
                product.counter--
            }
        }
        if (product.counter === 0){
            const index = this.cart.findIndex((item)=>{
                return item.id === product.id
            })
            this.cart.splice(index, 1)
        }

        this.saveToLocalStorage()
        return product;
    }
}
