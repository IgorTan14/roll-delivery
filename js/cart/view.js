export const elements = {
    productsContainer: document.querySelector('#products-container'),
    cartWrapper: document.querySelector('.cart-wrapper'),
    cartEmptyBadge: document.querySelector('[data-cart-empty]'),
    orderForm: document.querySelector('#order-form'),
    totalPrice: document.querySelector('.total-price'),
    totalCart: document.querySelector('#cartTotal'),
    deliveryPriceContainer: document.querySelector('#deliveryPriceContainer'),
    deliveryBaner: document.querySelector('#delivery-baner'),
    deliveryMinimalFree: 600,
    deliveryPrice: 100
}


export function updateTotalPrice(price){
    
    if (elements.totalPrice.textContent >= elements.deliveryMinimalFree){

         elements.totalPrice.innerText = new Intl.NumberFormat().format(price)
    } 
    
    else {
        elements.totalPrice.innerText = new Intl.NumberFormat().format(price + elements.deliveryPrice)
    }
}

export function renderCart(product){
    let cartHTML = '';

    product.forEach(item => {
        const cartItemHTML = `<div class="cart-item" data-id="${item.id}">
                                <div class="cart-item__top">
                                    <div class="cart-item__img">
                                        <img src="img/product/${item.imgSrc}" alt="${item.title}" />
                                    </div>
                                    <div class="cart-item__desc">
                                        <div class="cart-item__title">${item.title}</div>
                                        <div class="cart-item__weight">${item.itemsInBox} / ${item.weight}</div>

                                        <div class="cart-item__details">
                                            <div class="items items--small counter-wrapper">
                                                <div class="items__control" data-action="minus">-</div>
                                                <div class="items__current" data-counter="">${item.counter}</div>
                                                <div class="items__control" data-action="plus">+</div>
                                            </div>

                                            <div class="price">
                                                <div class="price__currency">${item.price} ₴</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `

        cartHTML += cartItemHTML;
    });

    elements.cartWrapper.innerHTML = cartHTML;

    toggleCart();
}

function toggleCart(){
    if (elements.cartWrapper.children.length > 0){
       
        elements.cartEmptyBadge.classList.add('none');
        elements.totalCart.classList.remove('none');
        elements.orderForm.classList.remove('none');
    } else {

        elements.cartEmptyBadge.classList.remove('none');
        elements.totalCart.classList.add('none');
        elements.orderForm.classList.add('none');
    }
}

export function updateCounter(product){
   const productWrapper = elements.cartWrapper.querySelector(`[data-id="${product.id}"]`);
   const counterElement = productWrapper.querySelector('[data-counter]');
   counterElement.innerText = product.counter;
}

export function removeItemFromCart(product){
    const productWrapper = elements.cartWrapper.querySelector(`[data-id="${product.id}"]`);
    productWrapper.remove();

    toggleCart()
}


export function toggleDelivery(totalPrice){
	if (totalPrice >= elements.deliveryMinimalFree){
    
		elements.deliveryPriceContainer.innerText = 'безкоштовно'
		elements.deliveryPriceContainer.classList.add('free');
        elements.deliveryBaner.classList.add('none')
	} else {

		elements.deliveryPriceContainer.innerText = `${elements.deliveryPrice} ₴`;
		elements.deliveryPriceContainer.classList.remove('free');
        elements.deliveryBaner.classList.remove('none')
	}
}



