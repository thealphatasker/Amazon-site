// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    image: "./box1_image.jpg",
    rating: 4.5,
    reviews: 1250,
    description: "Premium sound quality with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "./box2_image.jpg",
    rating: 4.8,
    reviews: 3420,
    description: "Track your fitness and stay connected",
  },
  {
    id: 3,
    name: "Laptop Stand Adjustable",
    price: 34.99,
    image: "./box3_image.jpg",
    rating: 4.3,
    reviews: 890,
    description: "Ergonomic design for better posture",
  },
  {
    id: 4,
    name: "Smartphone 5G 128GB",
    price: 699.99,
    image: "./box4_image.jpg",
    rating: 4.7,
    reviews: 5670,
    description: "Latest 5G technology with amazing camera",
  },
  {
    id: 5,
    name: "Makeup Brush Set Professional",
    price: 29.99,
    image: "./box5_image.jpg",
    rating: 4.6,
    reviews: 2340,
    description: "12-piece premium makeup brush collection",
  },
  {
    id: 6,
    name: "Pet Automatic Feeder",
    price: 79.99,
    image: "./box6_image.jpg",
    rating: 4.4,
    reviews: 1560,
    description: "Smart feeding schedule for your pets",
  },
  {
    id: 7,
    name: "Office Desk Organizer Set",
    price: 24.99,
    image: "./box7_image.jpg",
    rating: 4.2,
    reviews: 780,
    description: "Keep your workspace tidy and organized",
  },
  {
    id: 8,
    name: "Designer Sunglasses UV Protection",
    price: 89.99,
    image: "./box8_image.jpg",
    rating: 4.5,
    reviews: 1890,
    description: "Stylish protection from harmful UV rays",
  },
];

// Render products on the page
function renderProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = products
    .map(
      (product) => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm hover:shadow-lg transition-shadow">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title fw-bold mb-2" style="min-height: 48px;">${product.name}</h6>
          
          <!-- Rating -->
          <div class="mb-2">
            <span class="text-warning">
              ${generateStars(product.rating)}
            </span>
            <span class="text-muted small ms-1">(${product.reviews})</span>
          </div>
          
          <!-- Price -->
          <div class="mb-2">
            <span class="fs-5 fw-bold text-danger">$${product.price.toFixed(2)}</span>
          </div>
          
          <!-- Description -->
          <p class="card-text text-muted small mb-3">${product.description}</p>
          
          <!-- Add to Cart Button -->
          <button 
            class="btn btn-warning w-100 mt-auto fw-bold" 
            onclick="addToCart(${product.id})"
          >
            <i class="fa-solid fa-cart-plus me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="fa-regular fa-star"></i>';
  }

  return stars;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.addItem(product);
  }
}

// Initialize products when page loads
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
