import ProductsModel from './products/model.js';
import * as ProductsView from './products/view.js';

import CartModel from './cart/model.js';
import * as CartView from './cart/view.js'

const productsModel = new ProductsModel();
const cartModel = new CartModel();

async function getAndRenderProducts() {
    await productsModel.loadProducts();
    ProductsView.renderProducts(productsModel.products);
    CartView.renderCart(cartModel.cart);

   CartView.updateTotalPrice(cartModel.getTotalPrice())


   const totalPrice = cartModel.getTotalPrice(CartView.updateTotalPrice()); // значение в модели

   CartView.updateTotalPrice(totalPrice)

   CartView.toggleDelivery(cartModel.getTotalPrice())


   let containerMix = document.querySelector('[data-ref="row"]');
   let config = {
      controls: {
         scope: 'local'
      }
   };
   mixitup(containerMix, config);


}
getAndRenderProducts();

ProductsView.elements.productsContainer.addEventListener('click', function(e){
     const action = (e.target.dataset.action);

     // клік по лічильнику
     if (action === 'plus' || action === 'minus'){
        const productId = +e.target.closest('.card').dataset.id;

        const product = productsModel.updateCounter(productId, action);
        ProductsView.updateCounter(product);



      //   ProductsView.calculatePriceItem(productId)


        const totalPrice = productsModel.getTotalPrice();
        ProductsView.updateTotalPrice(totalPrice)
        
     }

     if (action === 'add-to-cart'){
      // id продукта
      const productId = +e.target.closest('.card').dataset.id
      // товар из модели по id
      const product = productsModel.getProduct(productId);
      // добавление в корзину
      cartModel.addToCart(product)
      // отобразить корзину
      CartView.renderCart(cartModel.cart);
      // очистка значения счетчика в модели
      productsModel.resetCounter(product)
      // обновление view счетчика
      ProductsView.updateCounter(product)

      // обновить общую цену
      const totalPrice = cartModel.getTotalPrice(); // значение в модели

      CartView.updateTotalPrice(totalPrice)
      CartView.toggleDelivery(totalPrice)
   }
   
  
})


CartView.elements.cartWrapper.addEventListener('click', function(e){
   const action = e.target.dataset.action;

   // CartView.toggleCart();

   if (action === 'plus' || action === 'minus'){
      
      const productId = +e.target.closest('.cart-item').dataset.id

      const productInCart = cartModel.updateCounterInCart(productId, action);

      const totalPrice = cartModel.getTotalPrice();
      CartView.updateTotalPrice(totalPrice)


      console.log(totalPrice)
      

      CartView.toggleDelivery(cartModel.getTotalPrice())

      if (productInCart.counter > 0){
         CartView.updateCounter(productInCart)
      } else {
         CartView.removeItemFromCart(productInCart);
      }
      
   }
})






