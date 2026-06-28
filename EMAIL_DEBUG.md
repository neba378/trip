# 🔍 Email Not Sending - Debug Guide

## Step 1: Check Browser Console

1. Open your website: http://localhost:5174/
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for messages starting with `[EmailService]`

### What to Look For:

✅ **Good Messages:**
```
[EmailService] Account 1 initialized successfully (Booking & Payment Confirmed)
[EmailService] Account 2 configured successfully (Rejection & Admin)
```

❌ **Bad Messages:**
```
[EmailService] Missing Account 1 environment variables: [...]
[EmailService] Missing Account 2 environment variables: [...]
```

---

## Step 2: Test Email Sending

### Test 1: Submit a Booking

1. Go to http://localhost:5174/
2. Click on any trip
3. Click "Book Your Spot"
4. Fill in the form with:
   - Name: Test User
   - Phone: 0912345678
   - **Email: YOUR_REAL_EMAIL** (important!)
   - Select traveler type and number of people
5. Upload a fake payment screenshot (any image)
6. Submit the booking

### Check Console:
Look for these messages:
```
[EmailService] Booking confirmation email sent successfully to: your@email.com
[EmailService] Admin notification email sent successfully
```

### Check Your Email:
- Check inbox for booking confirmation
- Check spam folder if not in inbox
- Check admin email (nebiyumusbah378@gmail.com) for admin notification

---

## Step 3: Common Issues & Fixes

### Issue 1: "Account 1 not configured"

**Problem:** Missing or incorrect Account 1 credentials

**Fix:**
1. Check `.env` file has:
   ```env
   VITE_EMAILJS_SERVICE_ID_1=service_0jnbh2s
   VITE_EMAILJS_PUBLIC_KEY_1=MkD7JVqCn5ZVwBO-q
   VITE_EMAILJS_TEMPLATE_BOOKING_CONFIRMATION=template_c2tspdq
   VITE_EMAILJS_TEMPLATE_PAYMENT_CONFIRMED=template_ln46xdg
   ```
2. Restart server: `npm run dev`

### Issue 2: "Account 2 not configured"

**Problem:** Missing or incorrect Account 2 credentials

**Fix:**
1. Check `.env` file has:
   ```env
   VITE_EMAILJS_SERVICE_ID_2=service_wo1yotl
   VITE_EMAILJS_PUBLIC_KEY_2=jLqg-gm9bNHAD71I1
   VITE_EMAILJS_TEMPLATE_PAYMENT_REJECTED=template_ilrl2yg
   VITE_EMAILJS_TEMPLATE_ADMIN_NOTIFICATION=template_pitaooy
   ```
2. Restart server: `npm run dev`

### Issue 3: "No valid email provided"

**Problem:** Customer didn't enter an email

**Fix:** This is normal! Email is optional. If no email is provided, no email is sent.

### Issue 4: EmailJS API Error

**Problem:** EmailJS rejected the request

**Possible Causes:**
1. **Template doesn't exist** - Check template IDs in EmailJS dashboard
2. **Service not connected** - Check Gmail is connected in EmailJS
3. **Rate limit exceeded** - Free tier: 200 emails/month
4. **Invalid template variables** - Template expects variables that aren't being sent

**Fix:**
1. Go to https://dashboard.emailjs.com/
2. Check **Email Services** - Make sure Gmail is connected
3. Check **Email Templates** - Make sure all 4 templates exist
4. Check **Account** - Make sure you haven't exceeded free tier limit

### Issue 5: Emails Going to Spam

**Problem:** Emails are being sent but going to spam folder

**Fix:**
1. Check spam folder
2. Add sender email to contacts
3. Mark email as "Not Spam"

---

## Step 4: Manual Test with EmailJS

Let's test if EmailJS is working at all:

1. Go to https://dashboard.emailjs.com/
2. Click on **Email Templates**
3. Click on your **Booking Confirmation** template
4. Click **"Test It"** button
5. Fill in test values:
   ```
   to_email: your@email.com
   customer_name: Test User
   confirmation_code: SAV-TEST123
   trip_title: Test Trip
   trip_date: Jan 1, 2025
   group_size: 2
   total_price: 10,000 ETB
   ```
6. Click **"Send Test Email"**
7. Check your email

**If this works:** EmailJS is configured correctly, problem is in the code
**If this doesn't work:** EmailJS configuration issue

---

## Step 5: Check EmailJS Dashboard

1. Go to https://dashboard.emailjs.com/
2. Click **"History"** (left sidebar)
3. Look for recent email attempts
4. Check status:
   - ✅ **Sent** - Email was sent successfully
   - ❌ **Failed** - Click to see error details

---

## Step 6: Verify Template IDs Match

Your current template IDs in `.env`:
```
Account 1:
- Booking Confirmation: template_c2tspdq
- Payment Confirmed: template_ln46xdg

Account 2:
- Payment Rejected: template_ilrl2yg
- Admin Notification: template_pitaooy
```

**Verify these match in EmailJS dashboard:**
1. Go to https://dashboard.emailjs.com/
2. Click **"Email Templates"**
3. Check each template ID matches exactly

---

## Step 7: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Submit a booking
4. Look for requests to `api.emailjs.com`
5. Click on the request
6. Check **Response** tab for error messages

---

## 🆘 Still Not Working?

### Quick Checklist:

- [ ] Server restarted after changing `.env`
- [ ] Browser console shows "Account 1 initialized successfully"
- [ ] Browser console shows "Account 2 configured successfully"
- [ ] Customer email field is filled in (not empty)
- [ ] Template IDs match exactly in EmailJS dashboard
- [ ] Gmail is connected in EmailJS dashboard
- [ ] Not exceeded 200 emails/month limit
- [ ] Checked spam folder

### Send Me This Info:

1. **Browser console messages** (copy all `[EmailService]` messages)
2. **Network tab errors** (if any requests to emailjs.com failed)
3. **EmailJS History** (screenshot of recent attempts)

---

## 🎯 Most Common Issue

**90% of the time, the issue is:**

1. **Server not restarted** after changing `.env`
   - Solution: Stop server (Ctrl+C) and run `npm run dev` again

2. **Template IDs don't match**
   - Solution: Copy exact template IDs from EmailJS dashboard

3. **No email entered**
   - Solution: Make sure to fill in email field when testing

---

**Website:** http://localhost:5174/
**Admin:** http://localhost:5174/admin

Good luck! 🚀
