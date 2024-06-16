document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:8000/api';
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const regionFilter = document.getElementById('region-filter');
    const minPriceFilter = document.getElementById('min-price-filter');
    const maxPriceFilter = document.getElementById('max-price-filter');
    const applyFiltersButton = document.getElementById('apply-filters');
    const cartItems = document.getElementById('cart-items');

    const fetchCategories = () => {
        fetch(`${baseUrl}/categories`)
            .then(response => response.json())
            .then(data => {
                categoryFilter.innerHTML = '<option value="">All Categories</option>';
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categoryFilter.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    const fetchRegions = () => {
        fetch(`${baseUrl}/regions`)
            .then(response => response.json())
            .then(data => {
                regionFilter.innerHTML = '<option value="">All Regions</option>';
                data.forEach(region => {
                    const option = document.createElement('option');
                    option.value = region.id;
                    option.textContent = region.name;
                    regionFilter.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching regions:', error));
    };

    const fetchProducts = (filters = {}) => {
        let url = `${baseUrl}/products?`;
        if (filters.category) url += `category=${filters.category}&`;
        if (filters.region) url += `region=${filters.region}&`;
        if (filters.minPrice) url += `minPrice=${filters.minPrice}&`;
        if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('API Response Data:', data); // Log API response data

                productList.innerHTML = '';
                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'col-md-4';
                    productDiv.innerHTML = `
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">Price: $${product.price}</p>
                            <p class="card-text">Stock: ${product.stock_quantity}</p>
                            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                `;
                    productList.appendChild(productDiv);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const addToCart = (productId) => {
        fetch(`${baseUrl}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId, quantity: 1 })
        })
            .then(response => response.json())
            .then(data => {
                alert('Product added to cart!');
                fetchCart();
            })
            .catch(error => console.error('Error adding to cart:', error));
    };

    const removeFromCart = (productId) => {
        fetch(`${baseUrl}/cart/${productId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert('Product removed from cart!');
                fetchCart();
            })
            .catch(error => console.error('Error removing from cart:', error));
    };

    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;

    applyFiltersButton.addEventListener('click', () => {
        const filters = {
            category: categoryFilter.value,
            region: regionFilter.value,
            minPrice: minPriceFilter.value,
            maxPrice: maxPriceFilter.value
        };
        fetchProducts(filters);
    });

    fetchCategories();
    fetchRegions();
    fetchProducts();
    fetchCart();
});
