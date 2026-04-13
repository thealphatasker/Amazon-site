// Cart Management System with Backend Integration
class ShoppingCart {
  constructor() {
    this.items = [];
    this.loadCartFromBackend();
  }

  // Load cart from backend
  async loadCartFromBackend() {
    try {
      const response = await fetch(`${API_ENDPOINTS.cart}?userId=${USER_ID}`);
      const data = await response.json();

      if (response.ok && data.success) {
        this.items = data.cart.items.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          rating: item.rating,
          reviews: item.reviews,
          quantity: item.quantity,
        }));
        this.updateCartCount();
      } else {
        console.warn("Backend unavailable, using localStorage");
        this.loadCartFromLocalStorage();
      }
    } catch (error) {
      console.error("Error loading cart from backend:", error);
      this.loadCartFromLocalStorage();
    }
  }

  // Fallback: Load cart from localStorage
  loadCartFromLocalStorage() {
    const cart = localStorage.getItem("amazonCart");
    this.items = cart ? JSON.parse(cart) : [];
    this.updateCartCount();
  }

  // Save to localStorage as backup
  saveToLocalStorage() {
    localStorage.setItem("amazonCart", JSON.stringify(this.items));
  }

  // Add item to cart (with backend sync)
  async addItem(product) {
    try {
      const response = await fetch(API_ENDPOINTS.addToCart, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: USER_ID,
          product: product,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.items = data.cart.items.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          rating: item.rating,
          reviews: item.reviews,
          quantity: item.quantity,
        }));
        this.saveToLocalStorage();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
      } else {
        throw new Error(data.message || "Failed to add item");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      this.addItemLocally(product);
    }
  }

  // Fallback: Add item locally
  addItemLocally(product) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1,
      });
    }

    this.saveToLocalStorage();
    this.updateCartCount();
    this.showNotification(
      `${product.name} added to cart! (Offline mode)`,
      "warning",
    );
  }

  // Remove item from cart (with backend sync)
  async removeItem(productId) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.removeFromCart(productId)}?userId=${USER_ID}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        this.items = data.cart.items.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          rating: item.rating,
          reviews: item.reviews,
          quantity: item.quantity,
        }));
        this.saveToLocalStorage();
        this.updateCartCount();
      } else {
        throw new Error(data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
      this.updateCartCount();
    }
  }

  // Update item quantity (with backend sync)
  async updateQuantity(productId, quantity) {
    try {
      const response = await fetch(API_ENDPOINTS.updateCart, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: USER_ID,
          productId: productId,
          quantity: parseInt(quantity),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.items = data.cart.items.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          rating: item.rating,
          reviews: item.reviews,
          quantity: item.quantity,
        }));
        this.saveToLocalStorage();
        this.updateCartCount();
      } else {
        throw new Error(data.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
          this.items = this.items.filter((item) => item.id !== productId);
        }
        this.saveToLocalStorage();
        this.updateCartCount();
      }
    }
  }

  // Get cart items
  getItems() {
    return this.items;
  }

  // Get total price
  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  // Get total items count
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Update cart count badge
  updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const count = this.getItemCount();
      if (count > 0) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = "inline-block";
      } else {
        cartCountElement.style.display = "none";
      }
    }
  }

  // Clear cart (with backend sync)
  async clearCart() {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.clearCart}?userId=${USER_ID}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartCount();
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      this.items = [];
      this.saveToLocalStorage();
      this.updateCartCount();
    }
  }

  // Show notification
  showNotification(message, type = "success") {
    const bgColor = type === "success" ? "bg-success" : "bg-warning";
    const toast = document.createElement("div");
    toast.className = "position-fixed top-0 end-0 p-3";
    toast.style.zIndex = "9999";
    toast.innerHTML = `
      <div class="toast show" role="alert">
        <div class="toast-header ${bgColor} text-white">
          <i class="fa-solid fa-check-circle me-2"></i>
          <strong class="me-auto">${type === "success" ? "Success" : "Warning"}</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

// Initialize cart
const cart = new ShoppingCart();
