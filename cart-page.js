// Cart Page Functionality

// Render cart items
async function renderCartItems() {
  const container = document.getElementById("cart-items-container");

  // Show loading
  container.innerHTML =
    '<div class="text-center py-5"><div class="spinner-border" role="status"></div><p class="mt-2">Loading cart...</p></div>';

  // Wait for cart to load
  await cart.waitForLoad();

  const items = cart.getItems();
  console.log("🛒 Rendering cart items:", items);

  if (items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="fa-solid fa-cart-shopping fs-1 text-muted mb-3"></i>
        <h4 class="text-muted">Your cart is empty</h4>
        <p class="text-muted">Add items to get started!</p>
        <a href="index.html" class="btn btn-warning mt-3">
          <i class="fa-solid fa-shopping-bag me-2"></i>Start Shopping
        </a>
      </div>
    `;
    updateCartSummary();
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
    <div class="cart-item border-bottom pb-3 mb-3" data-id="${item.id}">
      <div class="row align-items-center">
        <!-- Product Image -->
        <div class="col-md-2 col-3">
          <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
        </div>
        
        <!-- Product Details -->
        <div class="col-md-4 col-9">
          <h6 class="mb-1">${item.name}</h6>
          <p class="text-muted small mb-1">${item.description}</p>
          <span class="badge bg-success">In Stock</span>
        </div>
        
        <!-- Quantity Controls -->
        <div class="col-md-3 col-6 mt-2 mt-md-0">
          <div class="d-flex align-items-center">
            <label class="me-2 small">Qty:</label>
            <select 
              class="form-select form-select-sm" 
              style="width: 80px;"
              onchange="updateItemQuantity(${item.id}, this.value)"
            >
              ${generateQuantityOptions(item.quantity)}
            </select>
            <button 
              class="btn btn-link btn-sm text-danger ms-2" 
              onclick="removeFromCart(${item.id})"
              title="Remove item"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        
        <!-- Price -->
        <div class="col-md-3 col-6 mt-2 mt-md-0 text-end">
          <div class="fw-bold text-danger fs-5">$${(item.price * item.quantity).toFixed(2)}</div>
          <div class="small text-muted">$${item.price.toFixed(2)} each</div>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  updateCartSummary();
}

// Generate quantity dropdown options
function generateQuantityOptions(currentQty) {
  let options = "";
  for (let i = 1; i <= 10; i++) {
    options += `<option value="${i}" ${i === currentQty ? "selected" : ""}>${i}</option>`;
  }
  return options;
}

// Update item quantity
async function updateItemQuantity(productId, quantity) {
  await cart.updateQuantity(productId, quantity);
  await renderCartItems();
}

// Remove item from cart
async function removeFromCart(productId) {
  if (confirm("Are you sure you want to remove this item from your cart?")) {
    await cart.removeItem(productId);
    await renderCartItems();
    showNotification("Item removed from cart");
  }
}

// Update cart summary
function updateCartSummary() {
  const items = cart.getItems();
  const itemCount = cart.getItemCount();
  const total = cart.getTotal();

  document.getElementById("summary-item-count").textContent = itemCount;
  document.getElementById("summary-subtotal").textContent = total.toFixed(2);
  document.getElementById("summary-total").textContent = total.toFixed(2);
}

// Proceed to checkout
function proceedToCheckout() {
  const items = cart.getItems();
  if (items.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert(
    "Checkout functionality will be implemented soon!\n\nYour order total: $" +
      cart.getTotal().toFixed(2),
  );
}

// Show notification
function showNotification(message) {
  const toast = document.createElement("div");
  toast.className = "position-fixed top-0 end-0 p-3";
  toast.style.zIndex = "9999";
  toast.innerHTML = `
    <div class="toast show" role="alert">
      <div class="toast-header bg-info text-white">
        <i class="fa-solid fa-info-circle me-2"></i>
        <strong class="me-auto">Info</strong>
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

// Initialize cart page
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Cart page loaded, rendering items...");
  renderCartItems();
});
