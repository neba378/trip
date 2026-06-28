# Deployment Guide - SAVANNA Ethiopia Travel

## 🚀 Quick Start (Local Testing)

```bash
cd savanna-ethiopia-travel
npm install
npm run dev
```

Visit: **http://localhost:5173/**

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - FREE)

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `dist` folder
4. Done! You get a free URL like: `savanna-ethiopia.netlify.app`

**Custom Domain:**
1. Buy domain (e.g., savannaethiopia.com)
2. In Netlify: Settings → Domain management → Add custom domain
3. Update DNS records as instructed

**Continuous Deployment (Optional):**
1. Push code to GitHub
2. Connect Netlify to your GitHub repo
3. Auto-deploys on every push

### Option 2: Vercel (FREE)

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub or upload `dist` folder
4. Deploy!

### Option 3: cPanel Hosting

**Steps:**
1. Build the project: `npm run build`
2. Login to cPanel
3. Go to File Manager
4. Navigate to `public_html`
5. Upload all files from `dist` folder
6. Create `.htaccess` file:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: GitHub Pages (FREE)

**Steps:**
1. Install gh-pages: `npm install -D gh-pages`
2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/savanna-ethiopia",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. Run: `npm run deploy`
4. Enable GitHub Pages in repo settings

### Option 5: Firebase Hosting (FREE)

**Steps:**
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
   - Select `dist` as public directory
   - Configure as single-page app: Yes
   - Don't overwrite index.html
4. Deploy: `firebase deploy`

## 🔧 Configuration After Deployment

### 1. Update Admin Password
Edit `src/pages/Admin.jsx` line 24:
```javascript
if (password === 'YOUR_NEW_PASSWORD') {
```

### 2. Set Up Analytics (Optional)

**Google Analytics:**
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Add Facebook Pixel (Optional)
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🔐 Security Checklist

Before going live:

- [ ] Change admin password from default
- [ ] Test admin login works
- [ ] Verify payment accounts are correct
- [ ] Test booking flow end-to-end
- [ ] Check all phone numbers work
- [ ] Verify social media links
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up domain email (info@savannaethiopia.com)

## 📱 Post-Deployment Testing

### Test These Features:

**Customer Side:**
1. Browse trips ✓
2. View trip details ✓
3. Fill booking form ✓
4. Upload payment screenshot ✓
5. Submit booking ✓
6. Receive confirmation code ✓
7. Language switching ✓
8. Mobile menu ✓
9. Contact form ✓
10. Gallery lightbox ✓

**Admin Side:**
1. Login with password ✓
2. View all bookings ✓
3. Search bookings ✓
4. Filter by status ✓
5. View payment screenshots ✓
6. Confirm booking ✓
7. Reject booking ✓
8. Check statistics ✓
9. Logout ✓

## 🎯 SEO Optimization

### Update Meta Tags in `index.html`:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>SAVANNA Ethiopia Travel | From Peaks To Valley</title>
  <meta name="title" content="SAVANNA Ethiopia Travel | From Peaks To Valley">
  <meta name="description" content="Discover Ethiopia's most breathtaking destinations. Camping, trekking, and cultural tours across Wenchi, Langano, Hawassa, and more. Book your adventure today!">
  <meta name="keywords" content="Ethiopia travel, camping Ethiopia, Wenchi crater lake, Langano, Hawassa, Ethiopian tours, adventure travel Ethiopia, SAVANNA travel">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://savannaethiopia.com/">
  <meta property="og:title" content="SAVANNA Ethiopia Travel | From Peaks To Valley">
  <meta property="og:description" content="Discover Ethiopia's most breathtaking destinations. Book your adventure today!">
  <meta property="og:image" content="https://savannaethiopia.com/og-image.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://savannaethiopia.com/">
  <meta property="twitter:title" content="SAVANNA Ethiopia Travel">
  <meta property="twitter:description" content="Discover Ethiopia's most breathtaking destinations">
  <meta property="twitter:image" content="https://savannaethiopia.com/og-image.jpg">
</head>
```

### Create `robots.txt` in `public` folder:
```
User-agent: *
Allow: /
Sitemap: https://savannaethiopia.com/sitemap.xml
```

### Create `sitemap.xml` in `public` folder:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://savannaethiopia.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://savannaethiopia.com/trips</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://savannaethiopia.com/gallery</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://savannaethiopia.com/about</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://savannaethiopia.com/contact</loc>
    <priority>0.7</priority>
  </url>
</urlset>
```

## 📊 Performance Optimization

### Already Optimized:
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Minified CSS/JS
- ✅ Optimized images
- ✅ Gzip compression

### Additional Optimizations:

**1. Image Optimization:**
```bash
# Install image optimizer
npm install -D vite-plugin-imagemin

# Add to vite.config.js
import viteImagemin from 'vite-plugin-imagemin'

export default {
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
    })
  ]
}
```

**2. Enable Caching:**
Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 🔄 Backup Strategy

### What to Backup:
1. **Bookings Data** - Download from browser localStorage
2. **Source Code** - Push to GitHub
3. **Images** - Keep originals in separate folder
4. **Database** (if you add one later)

### How to Backup Bookings:
1. Go to `/admin`
2. Open browser console (F12)
3. Run: `console.log(localStorage.getItem('savanna_bookings'))`
4. Copy and save to file

## 📞 Support & Maintenance

### Regular Tasks:
- **Daily**: Check pending bookings
- **Weekly**: Backup booking data
- **Monthly**: Update trip information
- **Quarterly**: Review and update prices

### Monitoring:
- Check website loads correctly
- Test booking system weekly
- Monitor admin panel access
- Check payment accounts are active

## 🆘 Troubleshooting

### Common Issues:

**1. Website not loading:**
- Check if hosting is active
- Verify domain DNS settings
- Clear browser cache

**2. Bookings not saving:**
- Check browser localStorage is enabled
- Test in incognito mode
- Try different browser

**3. Images not showing:**
- Verify image paths are correct
- Check file permissions on server
- Ensure images uploaded to correct folder

**4. Admin can't login:**
- Verify password is correct
- Clear browser cache
- Check localStorage is enabled

**5. Payment screenshots not uploading:**
- Check file size (max 5MB)
- Verify file format (JPG, PNG)
- Try smaller image

## 📈 Marketing Integration

### Add to Website:

**WhatsApp Button:**
```html
<a href="https://wa.me/251944780840" 
   class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 z-50">
  <svg><!-- WhatsApp icon --></svg>
</a>
```

**Facebook Messenger:**
```html
<!-- Add Facebook Messenger plugin -->
<div id="fb-root"></div>
<div id="fb-customer-chat" class="fb-customerchat"></div>
<script>
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute("page_id", "YOUR_PAGE_ID");
</script>
```

## ✅ Launch Checklist

Final checks before announcing:

- [ ] Website loads on desktop
- [ ] Website loads on mobile
- [ ] All trips display correctly
- [ ] Booking system works
- [ ] Payment accounts verified
- [ ] Admin panel accessible
- [ ] Phone numbers correct
- [ ] Social media links work
- [ ] Contact form works
- [ ] Gallery loads
- [ ] Videos play
- [ ] Language switching works
- [ ] SSL certificate active (HTTPS)
- [ ] Domain configured
- [ ] Email set up
- [ ] Analytics installed
- [ ] Backup system in place

## 🎉 Post-Launch

### Announce on:
- Instagram story
- Telegram channel
- Facebook page
- WhatsApp status
- Email to existing customers

### Sample Announcement:
```
🎉 NEW! Book your SAVANNA trips online!

Visit: savannaethiopia.com

✅ Browse all trips
✅ Book instantly
✅ Upload payment
✅ Get confirmation code

From Peaks To Valley 🏔️⛺️

#SavannaEthiopia #EthiopiaTravel
```

---

**Need help? Contact your developer or:**
- Email: support@savannaethiopia.com
- Phone: 0944 780 840

**Good luck with your launch! 🚀**
