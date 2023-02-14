//Getting access to the Dom where the articles are getting posted
const displayedItems = document.getElementById('items');
cartCounter();

//Api's request for the articles
function getArticles() {
return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', "http://localhost:3000/api/products");
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
})}

// Posting articles into the DOM
async function displayArticles() {
    try {
        const displayedArticles = await getArticles();
        console.table(displayedArticles);
        let result = '';
        //Loop to add the HTML code for every product
        displayedArticles.forEach(article => {
        result += '<a href="./product.html?id=' + article._id + '"><article> <img src=' + article.imageUrl + 
        ' alt="Lorem ipsum dolor sit amet, Kanap name1"> <h3 class="productName">' + article.name + 
        '</h3><p class="productDescription">' + article.description + '</p></article> </a>';
    });
    displayedItems.innerHTML = result;
    } catch (error) {
        console.error('An error occurred during articles request');
    }
};

displayArticles();

// Counter for the quanity of produts in the cart
function cartCounter() {
    let productsQuantity = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        cart = [];
    } else {
    for (let product of cart) {
        productsQuantity += product.quantity;
    };
    let productsCounter = document.createElement('p');
    productsCounter.classList.add('products-counter')
    let cartLink = document.querySelector('.cart__link');
    cartLink.appendChild(productsCounter);
    productsCounter.textContent = `${productsQuantity}`;
}
}