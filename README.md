# Amazon Clone Frontend

A modern, responsive Amazon clone built with Bootstrap 5, Tailwind CSS, and vanilla JavaScript.

## Features

- 🛍️ Product catalog with ratings and reviews
- 🛒 Shopping cart with backend integration
- 💾 Persistent cart data (stored in backend database)
- 📱 Fully responsive design
- 🎨 Modern UI with Bootstrap and Tailwind CSS
- ⚡ Real-time cart updates
- 🔔 Toast notifications
- 💳 Cart summary with checkout

## Setup Instructions

### 1. Configure Backend URL

Open `config.js` and update the API URL:

**For Local Development:**

```javascript
const API_BASE_URL = "http://localhost:3000";
```

**For Production (Railway):**

```javascript
const API_BASE_URL = "https://your-app-name.railway.app";
```

### 2. Run the Frontend

You can run the frontend using any static file server:

**Option A: Using Live Server (VS Code Extension)**

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

**Option B: Using Python**

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

**Option C: Using Node.js http-server**

```bash
npm install -g http-server
http-server -p 8000
```

**Option D: Using PHP**

```bash
php -S localhost:8000
```

### 3. Test the Application

1. Open the frontend in your browser
2. Browse products on the home page
3. Click "Add to Cart" on any product
4. Click "Cart" in the navigation to view your cart
5. Update quantities or remove items
6. Cart data persists even after page refresh!

## File Structure

```
Amazon-site/
├── index.html          # Home page with products
├── cart.html           # Shopping cart page
├── index.css           # Custom styles
├── config.js           # API configuration
├── cart.js             # Cart management with backend sync
├── cart-page.js        # Cart page functionality
├── products.js         # Product display logic
├── box1_image.jpg      # Product images
├── box2_image.jpg
├── ...
└── hero_image.jpg      # Hero banner image
```

## How It Works

### Cart Synchronization

The cart system uses a hybrid approach:

1. **Primary Storage**: Backend database (MongoDB)
   - All cart operations sync with the backend
   - Data persists across devices and sessions
   - Survives page refreshes

2. **Fallback Storage**: localStorage
   - Used when backend is unavailable
   - Provides offline functionality
   - Syncs with backend when connection is restored

### API Integration

The frontend communicates with the backend using these endpoints:

- `GET /cart?userId=guest` - Load cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update item quantity
- `DELETE /cart/remove/:productId` - Remove item
- `DELETE /cart/clear` - Clear cart

### User Identification

Currently uses a simple `userId` system:

- Default user: `"guest"`
- Can be extended to support user authentication

## Customization

### Change Products

Edit `products.js` to modify the product catalog:

```javascript
const products = [
  {
    id: 1,
    name: "Your Product Name",
    price: 99.99,
    image: "./your-image.jpg",
    rating: 4.5,
    reviews: 1000,
    description: "Product description",
  },
  // Add more products...
];
```

### Change Styling

- **Bootstrap classes**: Modify HTML elements
- **Tailwind utilities**: Use Tailwind classes in HTML
- **Custom CSS**: Edit `index.css`

### Change API URL

Update `config.js`:

```javascript
const API_BASE_URL = "https://your-backend-url.com";
```

## Deployment

### Deploy to Netlify

1. Create account at https://netlify.com
2. Drag and drop the `Amazon-site` folder
3. Update `config.js` with your Railway backend URL
4. Done!

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the `Amazon-site` directory
3. Follow the prompts
4. Update `config.js` with your backend URL

### Deploy to GitHub Pages

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and folder
4. Update `config.js` with your backend URL

## Troubleshooting

### Cart not saving

- Check if backend is running
- Verify `config.js` has correct API URL
- Check browser console for errors
- Ensure CORS is enabled on backend

### Images not loading

- Verify image files exist in the directory
- Check image paths in `products.js`
- Ensure file names match exactly (case-sensitive)

### CORS errors

- Backend must have CORS enabled
- Check backend `index.js` has `app.use(cors())`
- For production, configure CORS to allow your frontend domain

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **Bootstrap 5.3.2** - UI components and grid system
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome 6.5.1** - Icons
- **Vanilla JavaScript** - No framework dependencies
- **Fetch API** - Backend communication

## Future Enhancements

- [ ] User authentication
- [ ] Product search functionality
- [ ] Product filtering and sorting
- [ ] Wishlist feature
- [ ] Order history
- [ ] Payment integration
- [ ] Product reviews
- [ ] Related products

## License

MIT License - Feel free to use for learning and personal projects!
