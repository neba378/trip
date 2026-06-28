# 📧 Two EmailJS Accounts Setup Guide

Since EmailJS free tier only allows 2 templates per account, we'll use **2 email accounts** to handle all 4 email templates.

## 📊 Account Distribution

### Account 1: `nebiyumusbah378@gmail.com`
**Handles Customer Emails:**
- ✅ Template 1: Booking Confirmation
- ✅ Template 2: Payment Confirmed

### Account 2: Your Second Email
**Handles Admin & Rejection Emails:**
- ✅ Template 3: Payment Rejected
- ✅ Template 4: Admin Notification

---

## 🚀 Setup Instructions

### ACCOUNT 1 SETUP (nebiyumusbah378@gmail.com)

#### Step 1: Create EmailJS Account
1. Go to https://dashboard.emailjs.com/
2. Sign up with: `nebiyumusbah378@gmail.com`
3. Verify your email

#### Step 2: Add Gmail Service
1. Click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Login with: `nebiyumusbah378@gmail.com`
6. Use app password: `yxcr tbdi qcjy bwmm`
7. **Copy Service ID** (looks like `service_abc123`)

#### Step 3: Get Public Key
1. Click **"Account"** (left sidebar)
2. Scroll to **"API Keys"** section
3. **Copy Public Key** (looks like `user_abc123`)

#### Step 4: Create Template 1 - Booking Confirmation
1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name:** `Booking Confirmation`
4. **Subject:** `Booking Confirmed - {{trip_title}} | SAVANNA Ethiopia Travel`
5. **Content:** Copy from the "Template 1" section below
6. Click **"Save"**
7. **Copy Template ID**

#### Step 5: Create Template 2 - Payment Confirmed
1. Click **"Create New Template"** again
2. **Template Name:** `Payment Confirmed`
3. **Subject:** `Payment Confirmed - Your Trip is Ready! | SAVANNA Ethiopia Travel`
4. **Content:** Copy from the "Template 2" section below
5. Click **"Save"**
6. **Copy Template ID**

#### Step 6: Save Account 1 Credentials
Add to your `.env` file:
```env
VITE_EMAILJS_SERVICE_ID_1=service_xxxxx        # From Step 2
VITE_EMAILJS_PUBLIC_KEY_1=user_xxxxx           # From Step 3
VITE_EMAILJS_TEMPLATE_BOOKING_CONFIRMATION=template_xxxxx  # From Step 4
VITE_EMAILJS_TEMPLATE_PAYMENT_CONFIRMED=template_xxxxx     # From Step 5
```

---

### ACCOUNT 2 SETUP (Your Second Email)

#### Step 1: Create Second EmailJS Account
1. Go to https://dashboard.emailjs.com/
2. **Sign up with a DIFFERENT email** (not nebiyumusbah378@gmail.com)
3. Verify your email

#### Step 2: Add Gmail Service
1. Click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Login with your second Gmail account
6. Use that account's app password
7. **Copy Service ID** (looks like `service_xyz789`)

#### Step 3: Get Public Key
1. Click **"Account"** (left sidebar)
2. Scroll to **"API Keys"** section
3. **Copy Public Key** (looks like `user_xyz789`)

#### Step 4: Create Template 3 - Payment Rejected
1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name:** `Payment Issue`
4. **Subject:** `Payment Verification Issue - {{confirmation_code}} | SAVANNA Ethiopia Travel`
5. **Content:** Copy from the "Template 3" section below
6. Click **"Save"**
7. **Copy Template ID**

#### Step 5: Create Template 4 - Admin Notification
1. Click **"Create New Template"** again
2. **Template Name:** `New Booking Alert`
3. **Subject:** `🔔 New Booking: {{confirmation_code}} - {{trip_title}}`
4. **Content:** Copy from the "Template 4" section below
5. Click **"Save"**
6. **Copy Template ID**

#### Step 6: Save Account 2 Credentials
Add to your `.env` file:
```env
VITE_EMAILJS_SERVICE_ID_2=service_xyz789       # From Step 2
VITE_EMAILJS_PUBLIC_KEY_2=user_xyz789          # From Step 3
VITE_EMAILJS_TEMPLATE_PAYMENT_REJECTED=template_xyz789     # From Step 4
VITE_EMAILJS_TEMPLATE_ADMIN_NOTIFICATION=template_xyz789   # From Step 5
VITE_ADMIN_EMAIL=nebiyumusbah378@gmail.com     # Where to send admin alerts
```

---

## 📝 Complete .env File Example

After both setups, your `.env` should look like:

```env
# Account 1 - Customer Emails (nebiyumusbah378@gmail.com)
VITE_EMAILJS_SERVICE_ID_1=service_abc123
VITE_EMAILJS_PUBLIC_KEY_1=user_abc123
VITE_EMAILJS_TEMPLATE_BOOKING_CONFIRMATION=template_abc123
VITE_EMAILJS_TEMPLATE_PAYMENT_CONFIRMED=template_abc456

# Account 2 - Admin & Rejection Emails (your second email)
VITE_EMAILJS_SERVICE_ID_2=service_xyz789
VITE_EMAILJS_PUBLIC_KEY_2=user_xyz789
VITE_EMAILJS_TEMPLATE_PAYMENT_REJECTED=template_xyz789
VITE_EMAILJS_TEMPLATE_ADMIN_NOTIFICATION=template_xyz012

# Admin email
VITE_ADMIN_EMAIL=nebiyumusbah378@gmail.com
```

---

## 📧 Email Templates

### Template 1: Booking Confirmation (Account 1)
See the previous message for the complete HTML template.

### Template 2: Payment Confirmed (Account 1)
See the previous message for the complete HTML template.

### Template 3: Payment Rejected (Account 2)
See the previous message for the complete HTML template.

### Template 4: Admin Notification (Account 2)
See the previous message for the complete HTML template.

---

## ✅ Testing

After setup:

1. **Restart your server:**
   ```bash
   npm run dev
   ```

2. **Check browser console:**
   - Should see: `[EmailService] Account 1 initialized successfully`
   - Should see: `[EmailService] Account 2 configured successfully`

3. **Test booking flow:**
   - Submit a booking → Check for booking confirmation email (Account 1)
   - Check admin email → Should receive admin notification (Account 2)
   - Confirm payment → Customer gets confirmation email (Account 1)
   - Reject payment → Customer gets rejection email (Account 2)

---

## 🎯 Summary

- **Account 1** sends customer-facing emails (booking & payment confirmed)
- **Account 2** sends admin alerts and rejection emails
- Both accounts work together seamlessly
- No code changes needed - just configure `.env`

---

## 🆘 Troubleshooting

**"Account 1 not configured"**
- Check `VITE_EMAILJS_SERVICE_ID_1` and `VITE_EMAILJS_PUBLIC_KEY_1` in `.env`
- Make sure template IDs are correct
- Restart server after changing `.env`

**"Account 2 not configured"**
- Check `VITE_EMAILJS_SERVICE_ID_2` and `VITE_EMAILJS_PUBLIC_KEY_2` in `.env`
- Make sure template IDs are correct
- Restart server after changing `.env`

**Emails not sending**
- Check browser console for error messages
- Verify all template IDs are correct
- Make sure both Gmail accounts are connected in EmailJS
- Check EmailJS dashboard for delivery status

---

**Time Estimate:** 30-40 minutes total (15-20 minutes per account)

Good luck! 🚀
