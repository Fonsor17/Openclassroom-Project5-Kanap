// Getting access to the DOM where the Id is going to be posted
const orderIdPost = document.getElementById('orderId');
// Recover of the order from localStorage
let order = JSON.parse(localStorage.getItem('order'));
console.log(order);

// Formulating the POST request
function orderRequest(order) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', "http://localhost:3000/api/products/order");
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 201)
                {
                    resolve(JSON.parse(request.response));
                }
                else
                { 
                    alert('We could not elaborate your order. We are sorry!');
                    localStorage.removeItem('order');
                    document.location.href = 'cart.html';
                    reject(JSON.parse(request.response));
                }
             }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(order));
    }
    )
    }

// Asyncronous function to send the order and take the response 
async function sendOrder(order) {
   try {
      const response = await orderRequest(order);
      // Order's Id recover
      const orderId = response.orderId;
      localStorage.clear();
      orderIdPost.textContent = orderId;
    } catch (error) {
       // In case the order fails, the order get deleted from localStorage and the user is redirected back to cart's page
      console.log(error.message);
      alert('We could not elaborate your order. We are sorry!');
      localStorage.removeItem('order');
      document.location.href = 'cart.html';
  };
}

sendOrder(order);