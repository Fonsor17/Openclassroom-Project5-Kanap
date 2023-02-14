//Getting access to the Dom where the articles are getting posted
const cartProducts = document.getElementById('cart__items');
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');

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
        } else {
        console.table(cart);

        let cartTotalQuantity = 0;
        let cartTotalPrice = 0;

        for (let product of cart) {
           let productRecover = displayedProducts.find((el) => el._id === product.id);
        //    console.log(productRecover);
           let article = {
            name: productRecover.name,
            color: product.color,
            id: product.id,
            image: productRecover.imageUrl,
            altText: productRecover.imageUrl,
            quantity: product.quantity,
            price: product.quantity * productRecover.price
           };
        //    console.log(article.id);
        //   Product post
           let cartArticle = document.createElement('article');
           cartProducts.appendChild(cartArticle);
           cartArticle.classList.add('cart__item');
           cartArticle.setAttribute('data-id', article.id);
           cartArticle.setAttribute('data-color', article.color);
        //   Image post
           let cartArticleImage = document.createElement('div');
           cartArticleImage.classList.add('cart__item__img');
           cartArticleImage.innerHTML = '<img src=' + article.image + ' alt=' + article.altText + '>';
           cartArticle.appendChild(cartArticleImage);
        // div post
           let cartArticleDiv = document.createElement('div');
           cartArticle.appendChild(cartArticleDiv);
           cartArticleDiv.classList.add('cart__item__content');
        // content post
           let cartArticleDescription = document.createElement('div');
           cartArticleDiv.appendChild(cartArticleDescription);
           cartArticleDescription.classList.add('cart__item__content__description');
        // name post
           let cartArticleName = document.createElement('h2');
           cartArticleDescription.appendChild(cartArticleName);
           cartArticleName.textContent = article.name;
        // color post
           let cartArticleColor = document.createElement('p');
           cartArticleDescription.appendChild(cartArticleColor);
           cartArticleColor.textContent = article.color;
        // price post
           let cartArticlePrice = document.createElement('p');
           cartArticleDescription.appendChild(cartArticlePrice);
           cartArticlePrice.textContent = article.price;
        // setting post
           let cartArticleSettings = document.createElement('div');
           cartArticleSettings.classList.add('cart__item__content__settings');
           cartArticleDiv.appendChild(cartArticleSettings);
        // quantity post
           let cartArticleQuantity = document.createElement('div');
           cartArticleQuantity.classList.add('cart__item__content__settings__quantity');
           cartArticleSettings.appendChild(cartArticleQuantity);
           let cartArticleQuantityLabel = document.createElement('p');
           cartArticleQuantityLabel.textContent = 'Quantity : ';
           cartArticleQuantity.appendChild(cartArticleQuantityLabel);
        // quantity input post
           let cartArticleQuantityInput = document.createElement('input');
           cartArticleQuantity.appendChild(cartArticleQuantityInput);
           cartArticleQuantityInput.classList.add('itemQuantity')
           cartArticleQuantityInput.setAttribute('type', 'number');
           cartArticleQuantityInput.setAttribute('name', 'itemQuantity');
           cartArticleQuantityInput.setAttribute('min', '1');
           cartArticleQuantityInput.setAttribute('max', '100');
           cartArticleQuantityInput.setAttribute('value', article.quantity);
        // delete button post
           let cartArticleDeleteDiv = document.createElement('div');
           cartArticleDeleteDiv.classList.add('cart__item__content__settings__delete');
           cartArticleSettings.appendChild(cartArticleDeleteDiv);
           let cartArticleDelete = document.createElement('p');
           cartArticleDelete.classList.add('deleteItem');
           cartArticleDelete.textContent = 'Delete';
           cartArticleDeleteDiv.appendChild(cartArticleDelete);
        // total post
           cartTotalQuantity += article.quantity;
           cartTotalPrice += article.price;
        // changing quantity
            cartArticleQuantityInput.addEventListener('change', ($event) => {
              product.quantity = parseInt($event.target.value);
              console.log(cart);
              localStorage.setItem('cart', JSON.stringify(cart));
              //funzione ricalcolo da scrivere
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
                totalQuantity.textContent = cartTotalQuantity;
                totalPrice.textContent = cartTotalPrice;
              }


            });
         // delete artcle
            cartArticleDelete.addEventListener('click', ($event) => {
            $event.preventDefault();
            let index = cart.indexOf(product);
            let deletedProduct = cart.splice(index, 1);
            // console.log(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartArticle.remove();
            // recalculate quantity and price
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
                 console.log(product);
              cartTotalQuantity += product.quantity;
              cartTotalPrice += article.price;
               }
               totalQuantity.textContent = cartTotalQuantity;
               totalPrice.textContent = cartTotalPrice;

            })
         




            

        

        }
        totalQuantity.textContent = cartTotalQuantity;
        totalPrice.textContent = cartTotalPrice;

        }
    
    
        } catch (error) {
            console.log('ERROR');
        };
    }

    displayArticles();

   // ORDER

   let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
   let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
   let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

   let firstName = document.getElementById('firstName');
   const lastName = document.getElementById('lastName');
   const address = document.getElementById('address');
   const city = document.getElementById('city');
   const email = document.getElementById('email');
   const order = document.getElementById('order');
   let formInputs = [firstName, lastName, address, city, email];

   // function inputValidation() {
   //    if (formInput === email) {
   //       if (emailRegExp.test(formInput.value)) {
   //           formInput.nextElementSibling.textContent = ''
   //       } else {
   //          formInput.nextElementSibling.textContent = 'Email is not valid';
   //       }
   //     }
   //     else if (formInput === address) {
   //       if (addressRegExp.test(formInput.value)) {
   //           formInput.nextElementSibling.textContent = ''
   //       } else {
   //          formInput.nextElementSibling.textContent = 'Address is not valid';
   //       }
   //     } else {
   //          if (charRegExp.test(formInput.value)) {
   //              formInput.nextElementSibling.textContent = ''
   //          } else {
   //             formInput.nextElementSibling.textContent = 'This field is not valid';
   //          }
   //        }
   // }

   for (let formInput of formInputs) {
   formInput.addEventListener('change', ($event) => {
    if (formInput === email) {
      if (emailRegExp.test(formInput.value)) {
          formInput.nextElementSibling.textContent = ''
      } else {
         formInput.nextElementSibling.textContent = 'Email is not valid';
      }
    }
    else if (formInput === address) {
      if (addressRegExp.test(formInput.value)) {
          formInput.nextElementSibling.textContent = ''
      } else {
         formInput.nextElementSibling.textContent = 'Address is not valid';
      }
    } else {
         if (charRegExp.test(formInput.value)) {
             formInput.nextElementSibling.textContent = ''
         } else {
            formInput.nextElementSibling.textContent = 'This field is not valid';
         }
       }
    }
   )
   }

   
   
   order.addEventListener('click', ($event) => {
      $event.preventDefault();
     let inputUnvalid = formInputs.find((el) => el.nextElementSibling.textContent !== '');
     if (inputUnvalid) {
      console.log(inputUnvalid);
      inputUnvalid.scrollIntoView({block: "center"});
     } else {
      console.log('procedi oridne');
     }
   })

