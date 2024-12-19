export const elements = {
    productsContainer: document.querySelector('#products-container'),
    totalPrice: document.querySelector('#catalog-price'),
}



export function renderProducts(productsArray){
    productsArray.forEach(item => {
        const productMurkup = `<div class="col-md-6">
                                <div class="card mb-4 mix ${item.category}" data-id="${item.id}">
                                    <img class="product-img" src="img/product/${item.imgSrc}" alt="${item.title}" />
                                    <div class="card-body text-center">
                                        <h4 class="item-title">${item.title}</h4>
                                        <p><small data-items-in-box="" class="text-muted">${item.itemsInBox} шт.</small></p>

                                        <div class="details-wrapper">
                                
                                            <div class="items counter-wrapper">
                                                <div class="items__control" data-action="minus">-</div>
                                                <div class="items__current" data-counter="">1</div>
                                                <div class="items__control" data-action="plus">+</div>
                                            </div>

                                            <div class="price">
                                                <div class="price__weight">${item.weight}г.</div>
                                                <div class="price__currency" id="catalog-price">${item.price} ₴</div>
                                            </div>
                                        </div>

                                        <button
                                            data-action="add-to-cart"
                                            type="button"
                                            class="btn btn-block btn-outline-warning"
                                        >
                                            + до кошика
                                        </button>
                                    </div>
                                </div>
                            </div>
                            `;
        elements.productsContainer.insertAdjacentHTML('beforeEnd', productMurkup)
    });
}

export function updateCounter(product){
    const counterWrapper = document.querySelector(`[data-id="${product.id}"]`);
    const counterElement = counterWrapper.querySelector('[data-counter]');
    counterElement.innerText = product.counter
}


export function updateTotalPrice(price){
    elements.totalPrice.innerText = new Intl.NumberFormat().format(price)
    console.log('ffffffffffff', elements.totalPrice)
}












// export function calculatePriceItem(id){
    
// 	const itemIndex = state.items.findIndex((item)=>{
// 		if (item.id == id){
// 			return true
// 		}
// 	})
// 	let priceItem = state.items[itemIndex].price * state.items[itemIndex].counter;
// 	state.items[itemIndex].price.innerText = priceItem
// 	const currentProduct = productsContainer.querySelector(`[data-productid="${id}"]`)
// 	currentProduct.querySelector('[data-price]').innerText = priceItem + ' ₴';
// }

