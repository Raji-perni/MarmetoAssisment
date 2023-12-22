// Fetch data from the API
function fetchData() {
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error('Unable to fetch data');
        });
}

// Show products based on the selected category
function showProducts(category) {
    fetchData()
        .then(data => {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            const categoryData = data.categories.find(cat => cat.category_name === category);

            if (categoryData) {
                categoryData.category_products.forEach(product => {
                    const productCard = createProductCard(product);
                    productContainer.appendChild(productCard);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Create a product card HTML element
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = product.badge_text;

    const title = document.createElement('h2');
    title.textContent = product.title;

    const vendor = document.createElement('p');
    vendor.textContent = `Vendor: ${product.vendor}`;

    const price = document.createElement('p');
    price.textContent = `Price: $${product.price}`;

    const comparePrice = document.createElement('p');
    comparePrice.textContent = `Compare at Price: $${product.compare_at_price}`;

    const discount = document.createElement('p');
    const discountPercentage = calculateDiscountPercentage(product.price, product.compare_at_price);
    discount.textContent = `Discount: ${discountPercentage}% Off`;

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'button';
    addToCartButton.textContent = 'Add to Cart';

    productCard.appendChild(productImage);
    productCard.appendChild(badge);
    productCard.appendChild(title);
    productCard.appendChild(vendor);
    productCard.appendChild(price);
    productCard.appendChild(comparePrice);
    productCard.appendChild(discount);
    productCard.appendChild(addToCartButton);

    return productCard;
}

// Calculate discount percentage
function calculateDiscountPercentage(price, comparePrice) {
    const discount = ((comparePrice - price) / comparePrice) * 100;
    return Math.round(discount);
}

// Initial load
showProducts('Men');