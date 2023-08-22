//Getting access to the Dom where the articles are getting posted
const displayedItems = document.getElementById('items');

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