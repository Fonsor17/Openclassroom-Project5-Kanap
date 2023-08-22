// Product's ID extraction from the URL
const urlSearch = window.location.search;
const urlParams = new URLSearchParams(urlSearch);
const productId = urlParams.get('id');
// Constants to get the access to the DOM
const productDivImg = document.querySelector('.item__img');
const productName = document.getElementById('title');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productQuantity = document.getElementById('quantity');
const colorSelect = document.getElementById('colors');
const addToCartBtn = document.getElementById('addToCart');

// Api's request for the single product
function getProduct() {
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

// Allocation of API product's data in the DOM
async function displayProduct() {
    try {
    const displayedProduct = await getProduct();
    console.log(displayedProduct);
    // Image Posting
    let productImg = document.createElement('img');
    productImg.src = displayedProduct.imageUrl;
    productImg.alt = displayedProduct.altTxt;
    productDivImg.appendChild(productImg);
    // Name Posting
    productName.textContent = displayedProduct.name;
    // Price Posting
    productPrice.textContent = ` ${displayedProduct.price}€ per unity (total : ${displayedProduct.price * productQuantity.value})`;
    // Price updating when quantity change
    productQuantity.addEventListener('change', ($event) => {
        productPrice.textContent = ` ${displayedProduct.price}€ per unity (total : ${displayedProduct.price * $event.target.value})`
    });
    // Description Posting
    productDescription.textContent = displayedProduct.description;
    // Colors Posting
    displayedProduct.colors.forEach(color => {
        let colorOption = document.createElement('option');
        colorOption.textContent = color;
        colorSelect.appendChild(colorOption);        
    });
    // Button to add to the Cart
    addToCartBtn.addEventListener('click', () => {
        if (parseInt(productQuantity.value)  < 1 || parseInt(productQuantity.value) > 100) {
            alert('Please select a valid quantity')
        } else if (colorSelect.value === '') {
            alert('Please choose a color')
        } else {
    let product = {
        id: productId,
        quantity: parseInt(productQuantity.value), //convert the string into number
        color: colorSelect.value,
    };
    addToCart(product);
    confirmation();
    }
    });
    // Error handling if the request does not succeed
    } catch (error) {
        console.error(error);
        alert('The product you were looking for can not be found. We are sorry!');
        document.location.href = "index.html";
         
    }
};

displayProduct();

// Adding the product to the cart
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
       cartCounter();
    //If there are no duplicates
    } else {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCounter();
    }
    
};

function confirmation() {
    if(window.confirm(`${productQuantity.value} ${productName.textContent} in ${colorSelect.value} has been added to the cart.
    Click on OK to go to the cart`)) { 
        window.location.href = 'cart.html';
    }
}

// Function to show the cart products counter.
function cartCounter() {
    let productsQuantity = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        cart = [];
    } else {
    for (let product of cart) {
        productsQuantity += product.quantity;
    };
    let productsCounter = document.querySelector('p.products-counter');
    // if the counter doesn't exist, it's created
    if (productsCounter == null) {
        let productsCounter = document.createElement('p');
        productsCounter.classList.add('products-counter');
        productsCounter.style.color = 'var(--main-color)';
        productsCounter.style.fontWeight = '500';
        productsCounter.style.width = '20px';
        productsCounter.style.borderRadius = '50%';
        productsCounter.style.height = '20px';
        productsCounter.style.alignSelf = 'center';
        productsCounter.style.marginBottom = '35px';
        productsCounter.style.textAlign = 'center';
        productsCounter.style.lineHeight = 'normal';
        let cartLink = document.querySelector('nav ul');
        cartLink.appendChild(productsCounter);
        productsCounter.textContent = `${productsQuantity}`;
    } else {
    // If the counter does exist, it gets updated
    productsCounter.textContent = `${productsQuantity}`;
    }
    // If there are no product the counter does not get shown
    if (productsQuantity < 1) {
       productsCounter = document.querySelector('p.products-counter');
       productsCounter.remove();
    }
    }
 };

cartCounter();





