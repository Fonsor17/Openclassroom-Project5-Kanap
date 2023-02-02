const urlSearch = window.location.search;
const urlParams = new URLSearchParams(urlSearch);
const productId = urlParams.get('id');
const productDivImg = document.querySelector('.item__img');
const productName = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productQuantity = document.getElementById('quantity');
const colorSelect = document.getElementById('colors');
const addToCartBtn = document.getElementById('addToCart');

console.log(productId);

// Article's request from API

function getArticle() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', "http://localhost:3000/api/products/" + productId);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 201)
                {
                    resolve(JSON.parse(request.response));
                }
                else
                { 
                    reject(JSON.parse(request.response));
                }
    
            }
        };
        request.send()
    }
    )
    };

    // Allocation of API article's data in the DOM

    async function displayArticle() {
    try {
    const displayedProduct = await getArticle();
    console.log(displayedProduct);
    // Image Posting
    let productImg = document.createElement('img');
    productImg.src = displayedProduct.imageUrl;
    productImg.alt = displayedProduct.altTxt;
    productDivImg.appendChild(productImg);
    //Name Posting
    productName.textContent = displayedProduct.name;
    // Price Posting
    productPrice.textContent = displayedProduct.price * productQuantity.value;
    //Price updating when quantity change
    productQuantity.addEventListener('change', ($event) => {
        productPrice.textContent = displayedProduct.price * $event.target.value;
    });
    //Description Posting
    productDescription.textContent = displayedProduct.description;
    // Colors Posting
    displayedProduct.colors.forEach(color => {
        let colorOption = document.createElement('option');
        colorOption.textContent = color;
        colorSelect.appendChild(colorOption);        
    });
    //EVENT
    addToCartBtn.addEventListener('click', ($event) => {
    let product = {
        id: productId,
        quantity: parseInt(productQuantity.value), //convert the string into number
        color: colorSelect.value,
        // image: productImg.src,
        // name: productName.textContent,
        // price: parseInt(productPrice.textContent),
    };
    addToCart(product);

});

    // addToCart();
    
    } catch (error) {
        console.log('Error during article request')
    }
};

displayArticle();



function addToCart(product) {
    //localStorage Initialization
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        cart = [];
    }
    //If a duplicate product it's already in the cart
    const duplicate = cart.find((el) => 
    el.id === product.id && el.color === product.color);
    if (duplicate) {
       duplicate.quantity += product.quantity;
       localStorage.setItem('cart', JSON.stringify(cart));
    //If there are no duplicates
    } else {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    }

};

//DA FARE: mettere l'if per quando il prodotto con lo stesso colore esiste

//     let product = {
//         id: productId,
//         quantity: productQuantity.value,
//         color: colorSelect.value,
//     };
//     console.log(product);
//     //  localStorage.setItem('basket', '');
//     //  let basket = localStorage.getItem('basket');
     
//     //  console.log(basket);

//     addToCartBtn.addEventListener('click', ($event) => {
    
//     let cart = JSON.parse(localStorage.getItem('cart'));
//     if (cart == null) {
//         cart = [];
//     }
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart));
// } );

// }





