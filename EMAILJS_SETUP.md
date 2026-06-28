# EmailJS Setup Guide

This guide will help you set up EmailJS for the SAVANNA Ethiopia Travel website email notifications.

## Prerequisites

- Gmail account (or other email provider)
- Access to the project's environment variables

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create an account using your email or Google account
3. Verify your email address if required

## Step 2: Add Email Service

1. Log in to your EmailJS dashboard
2. Go to the **"Email Services"** tab in the left sidebar
3. Click **"Add New Service"**
4. Select **"Gmail"** (recommended) or your preferred email provider
5. Click **"Connect Account"** and follow the OAuth flow to authorize EmailJS
6. Once connected, you'll see your **Service ID** (e.g., `service_abc123`)
7. **Copy the Service ID** - you'll need this for the `.env` file

## Step 3: Get Public Key

1. Go to the **"Account"** tab in the left sidebar
2. Scroll down to the **"API Keys"** section
3. **Copy your Public Key** (e.g., `abc123xyz456`)
4. Keep this key secure - you'll need it for the `.env` file

## Step 4: Create Email Templates

You need to create 4 email templates in the EmailJS dashboard. For each template:

### Template 1: Booking Confirmation Email

1. Go to **"Email Templates"** tab
2. Click **"Create New Template"**
3. **Template Name**: `Booking Confirmation`
4. **Subject**: `Booking Confirmed - {{trip_title}} | SAVANNA Ethiopia Travel`
5. **Content**: Use the HTML template below
6. Click **"Save"** and **copy the Template ID**

**HTML Template for Booking Confirmation:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #d4af37, #f0e68c); padding: 40px 20px; text-align: center; }
    .header h1 { color: #1a1a1a; margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; color: #333; }
    .info-box { background-color: #f9f9f9; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .info-label { font-weight: bold; color: #666; }
    .info-value { color: #333; }
    .payment-box { background-color: #fff8dc; border: 2px solid #d4af37; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .payment-account { background-color: #fff; padding: 10px; margin: 8px 0; border-radius: 4px; }
    .button { background-color: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 10px 5px; }
    .footer { background-color: #1a1a1a; color: #f5f5dc; padding: 20px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌍 SAVANNA Ethiopia Travel</h1>
      <p style="color: #1a1a1a; margin: 10px 0 0 0;">From Peaks To Valleys</p>
    </div>
    
    <div class="content">
      <h2 style="color: #d4af37;">✅ Booking Confirmed!</h2>
      <p>Dear <strong>{{customer_name}}</strong>,</p>
      <p>Thank you for booking with SAVANNA Ethiopia Travel! Your booking has been received and is pending payment verification.</p>
      
      <div class="info-box">
        <h3 style="margin-top: 0; color: #d4af37;">📋 Booking Details</h3>
        <div class="info-row">
          <span class="info-label">Confirmation Code:</span>
          <span class="info-value"><strong>{{confirmation_code}}</strong></span>
        </div>
        <div class="info-row">
          <span class="info-label">Trip:</span>
          <span class="info-value">{{trip_title}}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date:</span>
          <span class="info-value">{{trip_date}}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Number of People:</span>
          <span class="info-value">{{group_size}}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Total Price:</span>
          <span class="info-value"><strong>{{total_price}}</strong></span>
        </div>
      </div>
      
      <div class="payment-box">
        <h3 style="margin-top: 0; color: #d4af37;">💳 Payment Instructions</h3>
        <p>Please transfer the exact amount to any of these accounts:</p>
        
        <div class="payment-account">
          <strong>Telebirr:</strong> 0944 780 840
        </div>
        <div class="payment-account">
          <strong>CBE Birr:</strong> 1000524300657
        </div>
        <div class="payment-account">
          <strong>Abyssinia Bank:</strong> 67531167
        </div>
        
        <p style="margin-top: 15px; font-size: 14px; color: #666;">
          ⚠️ <strong>Important:</strong> After making the payment, make sure you've uploaded the payment screenshot in your booking. Our team will verify your payment within 24 hours.
        </p>
      </div>
      
      <h3 style="color: #d4af37;">📞 Need Help?</h3>
      <p>Contact us anytime:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="tel:+251944780840" class="button">📞 Call Us</a>
        <a href="https://t.me/savannaethiopiatravel" class="button">💬 Telegram</a>
      </div>
      <p style="text-align: center; color: #666;">
        Phone: +251 944 780 840<br>
        Email: info@savannaethiopiatravel.com
      </p>
    </div>
    
    <div class="footer">
      <p><strong>SAVANNA Ethiopia Travel</strong></p>
      <p>From Peaks To Valleys</p>
      <p style="margin-top: 10px;">© 2025 SAVANNA Ethiopia Travel. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
```

### Template 2: Payment Confirmation Email

1. Create another new template
2. **Template Name**: `Payment Confirmed`
3. **Subject**: `Payment Confirmed - Your Trip is Ready! | SAVANNA Ethiopia Travel`
4. **Content**: Use the HTML template below
5. **Save** and **copy the Template ID**

**HTML Template for Payment Confirmation:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #2d8659, #4caf50); padding: 40px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; color: #333; }
    .success-box { background-color: #e8f5e9; border: 2px solid #4caf50; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
    .info-box { background-color: #f9f9f9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; }
    .button { background-color: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 10px 5px; }
    .footer { background-color: #1a1a1a; color: #f5f5dc; padding: 20px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Payment Confirmed!</h1>
    </div>
    
    <div class="content">
      <div class="success-box">
        <h2 style="color: #4caf50; margin: 0;">✅ Your Booking is Confirmed!</h2>
        <p style="font-size: 18px; margin: 10px 0;">Confirmation Code: <strong>{{confirmation_code}}</strong></p>
      </div>
      
      <p>Dear <strong>{{customer_name}}</strong>,</p>
      <p>Great news! Your payment has been verified and your booking is now confirmed. Get ready for an amazing adventure!</p>
      
      <div class="info-box">
        <h3 style="margin-top: 0; color: #4caf50;">🗓️ Trip Details</h3>
        <p><strong>Trip:</strong> {{trip_title}}</p>
        <p><strong>Date:</strong> {{trip_date}}</p>
        <p><strong>Departure:</strong> Mexico Wabi Shebele Hotel at 12:00 PM (6:00 AM)</p>
      </div>
      
      <h3 style="color: #d4af37;">📝 What to Bring:</h3>
      <ul>
        <li>Valid ID or passport</li>
        <li>Comfortable clothing and shoes</li>
        <li>Sunscreen and hat</li>
        <li>Camera for amazing photos</li>
        <li>Water bottle</li>
        <li>Any personal medications</li>
      </ul>
      
      <h3 style="color: #d4af37;">📞 Questions?</h3>
      <p>We're here to help! Contact us anytime:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="tel:+251944780840" class="button">📞 Call Us</a>
        <a href="https://t.me/savannaethiopiatravel" class="button">💬 Telegram</a>
      </div>
      
      <p style="text-align: center; background-color: #fff8dc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <strong>See you soon! 🌍✨</strong>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>SAVANNA Ethiopia Travel</strong></p>
      <p>From Peaks To Valleys</p>
      <p style="margin-top: 10px;">© 2025 SAVANNA Ethiopia Travel. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
```

### Template 3: Payment Rejection Email

1. Create another new template
2. **Template Name**: `Payment Issue`
3. **Subject**: `Payment Verification Issue - {{confirmation_code}} | SAVANNA Ethiopia Travel`
4. **Content**: Use the HTML template below
5. **Save** and **copy the Template ID**

**HTML Template for Payment Rejection:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #ff6b6b, #ff8787); padding: 40px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; color: #333; }
    .warning-box { background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .button { background-color: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 10px 5px; }
    .footer { background-color: #1a1a1a; color: #f5f5dc; padding: 20px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚠️ Payment Verification Issue</h1>
    </div>
    
    <div class="content">
      <p>Dear <strong>{{customer_name}}</strong>,</p>
      <p>We were unable to verify your payment for the following booking:</p>
      
      <div class="warning-box">
        <p><strong>Confirmation Code:</strong> {{confirmation_code}}</p>
        <p><strong>Trip:</strong> {{trip_title}}</p>
      </div>
      
      <h3 style="color: #d4af37;">🤔 What happened?</h3>
      <p>There may have been an issue with:</p>
      <ul>
        <li>Payment screenshot quality or clarity</li>
        <li>Payment amount mismatch</li>
        <li>Payment account verification</li>
        <li>Other verification issues</li>
      </ul>
      
      <h3 style="color: #d4af37;">✅ What to do next?</h3>
      <p>Please contact us immediately so we can help resolve this issue:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="tel:+251944780840" class="button">📞 Call Us Now</a>
        <a href="https://t.me/savannaethiopiatravel" class="button">💬 Telegram</a>
      </div>
      
      <p style="text-align: center; color: #666;">
        Phone: +251 944 780 840<br>
        Email: info@savannaethiopiatravel.com
      </p>
      
      <p style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <strong>💡 Tip:</strong> Have your confirmation code ({{confirmation_code}}) ready when you contact us for faster assistance.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>SAVANNA Ethiopia Travel</strong></p>
      <p>From Peaks To Valleys</p>
      <p style="margin-top: 10px;">© 2025 SAVANNA Ethiopia Travel. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
```

### Template 4: Admin Notification Email

1. Create another new template
2. **Template Name**: `New Booking Alert`
3. **Subject**: `🔔 New Booking: {{confirmation_code}} - {{trip_title}}`
4. **Content**: Use the HTML template below
5. **Save** and **copy the Template ID**

**HTML Template for Admin Notification:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1a1a1a, #2d3e2d); padding: 30px 20px; text-align: center; color: #d4af37; }
    .alert-badge { background-color: #ff4444; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; margin-bottom: 10px; }
    .content { padding: 30px 20px; color: #333; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 10px; border-bottom: 1px solid #eee; }
    .info-table td:first-child { font-weight: bold; color: #666; width: 40%; }
    .button { background-color: #d4af37; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 10px 0; }
    .footer { background-color: #1a1a1a; color: #f5f5dc; padding: 20px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="alert-badge">NEW BOOKING</div>
      <h1 style="margin: 10px 0;">🔔 Booking Alert</h1>
      <p style="margin: 5px 0;">Action Required</p>
    </div>
    
    <div class="content">
      <h2 style="color: #d4af37;">New Booking Received</h2>
      <p>A new booking has been submitted and requires payment verification.</p>
      
      <table class="info-table">
        <tr>
          <td>Confirmation Code:</td>
          <td><strong>{{confirmation_code}}</strong></td>
        </tr>
        <tr>
          <td>Customer Name:</td>
          <td>{{customer_name}}</td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td><a href="tel:{{customer_phone}}">{{customer_phone}}</a></td>
        </tr>
        <tr>
          <td>Email:</td>
          <td><a href="mailto:{{customer_email}}">{{customer_email}}</a></td>
        </tr>
        <tr>
          <td>Trip:</td>
          <td>{{trip_title}}</td>
        </tr>
        <tr>
          <td>Trip Date:</td>
          <td>{{trip_date}}</td>
        </tr>
        <tr>
          <td>Traveler Type:</td>
          <td>{{traveler_type}}</td>
        </tr>
        <tr>
          <td>Group Size:</td>
          <td>{{group_size}} people</td>
        </tr>
        <tr>
          <td>Total Price:</td>
          <td><strong>{{total_price}}</strong></td>
        </tr>
        <tr>
          <td>Submitted:</td>
          <td>{{submission_time}}</td>
        </tr>
      </table>
      
      <div style="background-color: #fff8dc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <h3 style="margin-top: 0; color: #d4af37;">⚡ Quick Actions</h3>
        <p>Review the payment screenshot and verify the booking:</p>
        <a href="{{admin_panel_url}}" class="button">🔐 Open Admin Panel</a>
      </div>
      
      <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
        This is an automated notification from SAVANNA Ethiopia Travel booking system.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>SAVANNA Ethiopia Travel Admin</strong></p>
      <p>© 2025 SAVANNA Ethiopia Travel. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
```

## Step 5: Configure Environment Variables

1. In your project root, create a `.env` file (copy from `.env.example`)
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_PUBLIC_KEY=abc123xyz456
VITE_EMAILJS_TEMPLATE_BOOKING_CONFIRMATION=template_booking123
VITE_EMAILJS_TEMPLATE_PAYMENT_CONFIRMED=template_payment123
VITE_EMAILJS_TEMPLATE_PAYMENT_REJECTED=template_rejected123
VITE_EMAILJS_TEMPLATE_ADMIN_NOTIFICATION=template_admin123
VITE_ADMIN_EMAIL=your-admin-email@gmail.com
```

3. **Restart your development server** for the environment variables to take effect:
```bash
npm run dev
```

## Step 6: Test Email Delivery

1. Submit a test booking with a valid email address
2. Check your inbox for the booking confirmation email
3. Check the admin email inbox for the admin notification
4. In the admin panel, confirm or reject the booking
5. Check the customer inbox for payment confirmation/rejection email

## Troubleshooting

### Emails not sending

- **Check environment variables**: Make sure all `VITE_EMAILJS_*` variables are set correctly
- **Restart dev server**: Environment variables only load on server start
- **Check browser console**: Look for error messages from EmailJS
- **Verify EmailJS dashboard**: Check if your service is connected and templates exist
- **Check free tier limit**: EmailJS free tier allows 200 emails/month

### Emails going to spam

- **Check sender email**: Make sure your Gmail account is verified
- **Add to contacts**: Ask recipients to add your email to contacts
- **Check email content**: Avoid spam trigger words

### Amharic characters not displaying

- **Check email client**: Some older email clients may not support Unicode
- **Test in Gmail**: Gmail has excellent Unicode support
- **Check template encoding**: Make sure `<meta charset="UTF-8">` is in the template

### Environment variables not loading

- **Check file name**: Must be exactly `.env` (not `.env.txt`)
- **Check prefix**: All variables must start with `VITE_`
- **Restart server**: Run `npm run dev` again after changing `.env`
- **Check Vite config**: Make sure Vite is configured to load environment variables

## Production Deployment

When deploying to production (Netlify, Vercel, etc.):

1. Add all `VITE_EMAILJS_*` environment variables in your hosting platform's dashboard
2. Make sure to prefix all variables with `VITE_`
3. Redeploy your application after adding environment variables
4. Test email delivery in production

## EmailJS Free Tier Limits

- **200 emails per month** (free tier)
- **50 KB per email** (including HTML content)
- **No attachments** on free tier

If you need more emails, consider upgrading to a paid plan:
- **Personal Plan**: $7/month for 1,000 emails
- **Professional Plan**: $15/month for 10,000 emails

## Support

For EmailJS-specific issues, visit:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)

For SAVANNA website issues, contact the development team.
