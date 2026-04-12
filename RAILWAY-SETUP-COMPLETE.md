# ✅ Railway Backend Connected!

## 🎉 Configuration Complete

Your frontend is now connected to your Railway backend!

### Backend URL

```
https://amazonserver.up.railway.app
```

## 🧪 Test the Connection

### Option 1: Use Test Page

Open the test page in your browser:

```
Amazon-site/test-railway.html
```

This will test:

- ✅ Server health
- ✅ Get cart
- ✅ Add item to cart
- ✅ Get products

### Option 2: Manual Browser Test

Open these URLs in your browser:

**Test Cart Endpoint:**

```
https://amazonserver.up.railway.app/cart?userId=guest
```

**Test Products Endpoint:**

```
https://amazonserver.up.railway.app/products
```

You should see JSON responses!

### Option 3: Test with Your Site

1. Open your frontend (index.html)
2. Click "Add to Cart" on any product
3. Should see: "Product added to cart!" (NO "Offline mode")
4. Click "Cart" to view items
5. Refresh page - items persist! ✨

## 📁 Files Updated

### `config.js` - Updated to use Railway URL

```javascript
const API_BASE_URL = "https://amazonserver.up.railway.app";
```

## 🚀 Deploy Your Frontend

Now that backend is connected, deploy your frontend:

### Option 1: Netlify (Recommended - Easiest)

1. Go to https://app.netlify.com/drop
2. Drag the entire `Amazon-site` folder
3. Done! Your site is live!

### Option 2: Vercel

```bash
cd Amazon-site
npx vercel
```

### Option 3: GitHub Pages

1. Push `Amazon-site` to GitHub
2. Go to repository Settings → Pages
3. Select branch and folder
4. Enable GitHub Pages

### Option 4: Railway (Frontend too!)

1. Create new project on Railway
2. Deploy from GitHub
3. Railway will auto-detect static site

## 🔧 Troubleshooting

### Still seeing "Offline mode"?

**Check 1: Test Railway backend**
Open: https://amazonserver.up.railway.app/cart?userId=guest

Should show JSON, not error page.

**Check 2: Check browser console**

- Press F12
- Go to Console tab
- Look for errors

**Common Issues:**

❌ **"Failed to fetch"**

- Backend might be sleeping (Railway free tier)
- Wait 30 seconds and try again
- Railway spins up on first request

❌ **"CORS error"**

- Backend should have CORS enabled
- Check Railway logs for errors

❌ **"404 Not Found"**

- Check if Railway deployment succeeded
- Verify URL is correct: https://amazonserver.up.railway.app

### Backend not responding?

**Railway Free Tier:**

- Apps sleep after inactivity
- First request wakes it up (takes ~30 seconds)
- Subsequent requests are fast

**Check Railway Logs:**

1. Go to Railway dashboard
2. Click your project
3. Check "Deployments" tab
4. View logs for errors

### CORS Issues?

Your backend should already have CORS enabled. If you see CORS errors:

1. Check Railway logs
2. Verify `index.js` has:

```javascript
app.use(cors());
```

## 📊 How It Works Now

```
User Browser (Your Frontend)
        ↓
   Add to Cart
        ↓
Fetch POST to Railway
        ↓
https://amazonserver.up.railway.app/cart/add
        ↓
MongoDB (stores data)
        ↓
Response back to frontend
        ↓
Cart updates + persists!
```

## ✅ Success Checklist

- [x] Backend deployed to Railway
- [x] Frontend config.js updated with Railway URL
- [x] Test page created (test-railway.html)
- [ ] Test Railway backend (open test-railway.html)
- [ ] Test adding items to cart
- [ ] Verify cart persists after refresh
- [ ] Deploy frontend to Netlify/Vercel

## 🎯 Next Steps

1. **Test the connection:**
   - Open `test-railway.html` in browser
   - Run all tests
   - Verify all pass ✅

2. **Test your site:**
   - Open `index.html`
   - Add items to cart
   - Check cart page
   - Refresh - items should persist!

3. **Deploy frontend:**
   - Choose Netlify, Vercel, or GitHub Pages
   - Drag and drop `Amazon-site` folder
   - Your site is live!

## 🌐 URLs

**Backend (Railway):**

- API: https://amazonserver.up.railway.app
- Cart: https://amazonserver.up.railway.app/cart?userId=guest
- Products: https://amazonserver.up.railway.app/products

**Frontend (Local):**

- Site: http://localhost:5500 (or your port)
- Test: http://localhost:5500/test-railway.html

## 💡 Tips

### For Development

To switch back to local backend:

```javascript
// In config.js, comment Railway URL and uncomment local:
// const API_BASE_URL = "https://amazonserver.up.railway.app";
const API_BASE_URL = "http://localhost:8000";
```

### For Production

Keep Railway URL active:

```javascript
const API_BASE_URL = "https://amazonserver.up.railway.app";
```

### Railway Free Tier Limits

- Apps sleep after 5 minutes of inactivity
- 500 hours/month execution time
- First request after sleep takes ~30 seconds

## 🆘 Need Help?

1. **Test Railway backend:** Open test-railway.html
2. **Check Railway logs:** Railway dashboard → Deployments
3. **Check browser console:** F12 → Console tab
4. **Verify URL:** https://amazonserver.up.railway.app/cart?userId=guest

---

**Your backend is now live on Railway! 🚀**

Test it with `test-railway.html` and start adding items to cart!
