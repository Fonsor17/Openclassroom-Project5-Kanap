//Getting access to the Dom where the articles are getting posted
const cartProducts = document.getElementById('cart__items');
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');
// To calculate the total price and quantity
totalSum();

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
    }
    )
    }

//Posting all the cart's articles in the DOM adding all the functionality to change quantity and delete
async function displayArticles() {
   try {
       const displayedProducts = await getArticles();
       console.table(displayedProducts);
        // Call the cart from the localStorage
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart == null) {
            console.log('cart is empty')
            cartProducts.innerHTML = '<h2>Your cart is empty</h2>';
        } else {
        console.table(cart);
        // Loop to post all the products in the cart
        for (let product of cart) {
        // Method to find back product's proprieties which are not passed by localStorage 
           let productRecover = displayedProducts.find((el) => el._id === product.id);
           let article = {
            name: productRecover.name,
            color: product.color,
            id: product.id,
            image: productRecover.imageUrl,
            altText: productRecover.imageUrl,
            quantity: product.quantity,
            price: productRecover.price
           };
        // Product post
           let cartArticle = document.createElement('article');
           cartProducts.appendChild(cartArticle);
           cartArticle.classList.add('cart__item');
           cartArticle.setAttribute('data-id', article.id);
           cartArticle.setAttribute('data-color', article.color);
        // Image post
           let cartArticleImage = document.createElement('div');
           cartArticleImage.classList.add('cart__item__img');
           cartArticleImage.innerHTML = '<img src=' + article.image + ' alt=' + article.altText + '>';
           cartArticle.appendChild(cartArticleImage);
        // Div post
           let cartArticleDiv = document.createElement('div');
           cartArticle.appendChild(cartArticleDiv);
           cartArticleDiv.classList.add('cart__item__content');
        // Content post
           let cartArticleDescription = document.createElement('div');
           cartArticleDiv.appendChild(cartArticleDescription);
           cartArticleDescription.classList.add('cart__item__content__description');
        // Name post
           let cartArticleName = document.createElement('h2');
           cartArticleDescription.appendChild(cartArticleName);
           cartArticleName.textContent = article.name;
        // Color post
           let cartArticleColor = document.createElement('p');
           cartArticleDescription.appendChild(cartArticleColor);
           cartArticleColor.textContent = article.color;
        // Price post
           let cartArticlePrice = document.createElement('p');
           cartArticleDescription.appendChild(cartArticlePrice);
           cartArticlePrice.textContent = article.price;
        // Setting post
           let cartArticleSettings = document.createElement('div');
           cartArticleSettings.classList.add('cart__item__content__settings');
           cartArticleDiv.appendChild(cartArticleSettings);
        // Quantity post
           let cartArticleQuantity = document.createElement('div');
           cartArticleQuantity.classList.add('cart__item__content__settings__quantity');
           cartArticleSettings.appendChild(cartArticleQuantity);
           let cartArticleQuantityLabel = document.createElement('p');
           cartArticleQuantityLabel.textContent = 'Quantity : ';
           cartArticleQuantity.appendChild(cartArticleQuantityLabel);
        // Quantity input post
           let cartArticleQuantityInput = document.createElement('input');
           cartArticleQuantity.appendChild(cartArticleQuantityInput);
           cartArticleQuantityInput.classList.add('itemQuantity')
           cartArticleQuantityInput.setAttribute('type', 'number');
           cartArticleQuantityInput.setAttribute('name', 'itemQuantity');
           cartArticleQuantityInput.setAttribute('min', '1');
           cartArticleQuantityInput.setAttribute('max', '100');
           cartArticleQuantityInput.setAttribute('value', article.quantity);
         // Input's change event listener to re-calculate the total every time the quantity is modified
           cartArticleQuantityInput.addEventListener('change', ($event) => {
            product.quantity = parseInt($event.target.value);
            console.log(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            totalSum(); // To update the total price and quantity
            cartCounter(); // To update the cart products counter 
            });
        // Delete button post
           let cartArticleDeleteDiv = document.createElement('div');
           cartArticleDeleteDiv.classList.add('cart__item__content__settings__delete');
           cartArticleSettings.appendChild(cartArticleDeleteDiv);
           let cartArticleDelete = document.createElement('p');
           cartArticleDelete.classList.add('deleteItem');
           cartArticleDelete.textContent = 'Delete';
           cartArticleDeleteDiv.appendChild(cartArticleDelete);
        // Deleting a product
           cartArticleDelete.addEventListener('click', ($event) => {
            $event.preventDefault();
            let index = cart.indexOf(product);
            let deletedProduct = cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartArticle.remove(); // remove the article form the DOM
            totalSum(); // To update the total price and quantity
            cartCounter(); // To update the cart products counter 
            alert('Article removed from the cart');
            })
         }}
       } catch (error) {
            console.error(error);
            alert('An error has occurred while fetching the product: ' + error.message);
        };
    }

    displayArticles();

// Function to calculate and show the price and quantity totals. 
async function totalSum() {                                      
   const displayedProducts = await getArticles(); 
   let cart = JSON.parse(localStorage.getItem('cart'));   
   let cartTotalQuantity = 0;
   let cartTotalPrice = 0;
   for (let product of cart) {
      let productRecover = displayedProducts.find((el) => el._id === product.id);
      let article = {
         name: productRecover.name,
         color: product.color,
         id: product.id,
         image: productRecover.imageUrl,
         altText: productRecover.imageUrl,
         quantity: product.quantity,
         price: product.quantity * productRecover.price
         };
      cartTotalQuantity += product.quantity;
      cartTotalPrice += article.price;
      }
      totalQuantity.textContent = cartTotalQuantity;
      totalPrice.textContent = cartTotalPrice;
      // If the cart is empty
      if (cartTotalQuantity === 0) {
         cartProducts.innerHTML = '<h2>Your cart is empty</h2>';
      }
};

   
// Form compilation

// Formulation of the regular Expressions to use to check the datas
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// Access to the Dom to collect the datas inserted by the user
let firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const order = document.getElementById('order');
let formInputs = [firstName, lastName, address, city, email];

// Validation od the datas entered by the user using the regex
for (let formInput of formInputs) {
   // Email validation 
   formInput.addEventListener('change', ($event) => {
    if (formInput === email) {
      if (emailRegExp.test(formInput.value)) {
          formInput.nextElementSibling.textContent = ''
      } else {
         formInput.nextElementSibling.textContent = 'Email is not valid';
      }
    }
    // Address validation 
    else if (formInput === address) {
      if (addressRegExp.test(formInput.value)) {
          formInput.nextElementSibling.textContent = ''
      } else {
         formInput.nextElementSibling.textContent = 'Address is not valid';
      }
    } 
    // First name, name and city validation (all of the them share the same regex)
    else {
         if (charRegExp.test(formInput.value)) {
             formInput.nextElementSibling.textContent = ''
         } else {
            formInput.nextElementSibling.textContent = 'This field is not valid';
         }
       }
    }
   )
   }


// Event listener to trigger the order sending
order.addEventListener('click', ($event) => {
   $event.preventDefault();
   // Form last validation before sending the order
   let inputUnvalid = formInputs.find((el) => el.nextElementSibling.textContent !== '');
   let inputEmpty = formInputs.find((el) => el.value === '');
   if (inputUnvalid) {
      console.log(inputUnvalid);
      inputUnvalid.scrollIntoView({block: "center"});
   } else if (inputEmpty) {
      console.log(inputEmpty);
      inputEmpty.nextElementSibling.textContent = 'This field must be compiled';
      inputEmpty.scrollIntoView({block: "center"});
   } else {
      // Collecting all Ids of the products in the cart
      let cart = JSON.parse(localStorage.getItem('cart'));
      let productsId = [];
      cart.forEach(product => { 
         productsId.push(product.id)
      });
      // Creation of the object to send to the API, which collect all the form inputs and products Ids
      const order = {
         contact : {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
         },
         products: productsId
      }
      console.log(order);
      localStorage.setItem('order', JSON.stringify(order));
      // Sending the order, passing it as parameter to the function
      document.location.href = "confirmation.html";
   }
   })


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
   // If there are no product the counter does not get
   if (productsQuantity < 1) {
      productsCounter = document.querySelector('p.products-counter');
      productsCounter.remove();
   }
   }
};

cartCounter();
