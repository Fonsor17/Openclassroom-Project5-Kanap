const displayedItems = document.getElementById('items');

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

async function displayArticles() {
    try {
        const displayedArticles = await getArticles();
        console.table(displayedArticles);
        let result = '';
        displayedArticles.forEach(article => {
        result += '<a href="./product.html?id=' + article._id + '"><article> <img src=' + article.imageUrl + 
        ' alt="Lorem ipsum dolor sit amet, Kanap name1"> <h3 class="productName">' + article.name + 
        '</h3><p class="productDescription">' + article.description + '</p></article> </a>';
    });
    displayedItems.innerHTML = result;
    } catch (error) {
        console.log('ERROR')
    }
};

displayArticles();