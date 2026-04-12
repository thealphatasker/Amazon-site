# ⚡ Quick Test Guide

## 🎯 Test Your Railway Backend (30 seconds)

### Test 1: Backend Health Check

**Open this URL in your browser:**

```
https://amazonserver.up.railway.app/cart?userId=guest
```

**✅ Success:** You see JSON like:

```json
{
  "userId": "guest",
  "items": [],
  "totalAmount": 0
}
```

**❌ Error:** Wait 30 seconds (Railway waking up) and try again

---

### Test 2: Test Page

**Open in browser:**

```
test-railway.html
```

**Click:** "Run All Tests"

**✅ Success:** All tests show green checkmarks

---

### Test 3: Your Site

**Open in browser:**

```
index.html
```

**Steps:**

1. Click "Add to Cart" on any product
2. Look for notification

**✅ Success:** Shows "added to cart!" (NO "Offline mode")

**❌ Still offline?**

- Wait 30 seconds (Railway waking up)
- Check Test 1 above
- Press F12 → Console tab for errors

---

### Test 4: Cart Persistence

1. Add items to cart
2. Click "Cart" in navigation
3. See your items
4. **Refresh the page (F5)**
5. Items still there! ✨

---

## 🚨 Quick Troubleshooting

### "Offline mode" showing?

**Reason:** Frontend can't reach Railway backend

**Fix:**

1. Open: https://amazonserver.up.railway.app/cart?userId=guest
2. Wait 30 seconds if it's loading
3. Try adding to cart again

### Railway not responding?

**Railway Free Tier sleeps after 5 minutes**

**Fix:** Just wait 30 seconds on first request

### Still not working?

**Check Railway Dashboard:**

1. Go to https://railway.app
2. Open your project
3. Check if deployment succeeded
4. View logs for errors

---

## ✅ Success Indicators

When everything works:

- ✅ No "Offline mode" in notifications
- ✅ Cart badge shows item count
- ✅ Cart page shows items
- ✅ Items persist after refresh
- ✅ Railway URL returns JSON

---

## 🔗 Quick Links

**Backend:**

- https://amazonserver.up.railway.app/cart?userId=guest

**Test Page:**

- test-railway.html

**Your Site:**

- index.html

---

**First request to Railway takes ~30 seconds (waking up from sleep)**

**After that, it's fast!** ⚡
