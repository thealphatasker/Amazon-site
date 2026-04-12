// API Configuration
// Backend deployed on Railway
const API_BASE_URL = "https://amazonserver.up.railway.app"; // Production (Railway)
// const API_BASE_URL = "http://localhost:8000"; // Local development (uncomment for local testing)

const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  cart: `${API_BASE_URL}/cart`,
  addToCart: `${API_BASE_URL}/cart/add`,
  updateCart: `${API_BASE_URL}/cart/update`,
  removeFromCart: (productId) => `${API_BASE_URL}/cart/remove/${productId}`,
  clearCart: `${API_BASE_URL}/cart/clear`,
};

// User ID for cart (can be replaced with actual user authentication)
const USER_ID = "guest";
