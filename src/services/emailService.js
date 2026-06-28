import emailjs from '@emailjs/browser';

// EmailJS Configuration - Account 1 (Customer emails)
const EMAILJS_CONFIG_1 = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID_1,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY_1,
  templates: {
    bookingConfirmation: import.meta.env.VITE_EMAILJS_TEMPLATE_BOOKING_CONFIRMATION,
    paymentConfirmed: import.meta.env.VITE_EMAILJS_TEMPLATE_PAYMENT_CONFIRMED,
  },
};

// EmailJS Configuration - Account 2 (Admin & rejection emails)
const EMAILJS_CONFIG_2 = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID_2,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY_2,
  templates: {
    paymentRejected: import.meta.env.VITE_EMAILJS_TEMPLATE_PAYMENT_REJECTED,
    adminNotification: import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN_NOTIFICATION,
  },
};

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

// Configuration validation
let isConfigured1 = false;
let isConfigured2 = false;

function validateConfiguration1() {
  const requiredVars = [
    'serviceId',
    'publicKey',
    'templates.bookingConfirmation',
    'templates.paymentConfirmed',
  ];

  const missingVars = requiredVars.filter(varPath => {
    const keys = varPath.split('.');
    let value = EMAILJS_CONFIG_1;
    for (const key of keys) {
      value = value?.[key];
    }
    return !value;
  });

  if (missingVars.length > 0) {
    console.warn('[EmailService] Missing Account 1 environment variables:', missingVars);
    return false;
  }

  return true;
}

function validateConfiguration2() {
  const requiredVars = [
    'serviceId',
    'publicKey',
    'templates.paymentRejected',
    'templates.adminNotification',
  ];

  const missingVars = requiredVars.filter(varPath => {
    const keys = varPath.split('.');
    let value = EMAILJS_CONFIG_2;
    for (const key of keys) {
      value = value?.[key];
    }
    return !value;
  });

  if (missingVars.length > 0) {
    console.warn('[EmailService] Missing Account 2 environment variables:', missingVars);
    return false;
  }

  return true;
}

// Initialize EmailJS for both accounts
function initializeEmailJS() {
  // Initialize Account 1
  if (validateConfiguration1()) {
    try {
      emailjs.init(EMAILJS_CONFIG_1.publicKey);
      isConfigured1 = true;
      console.log('[EmailService] Account 1 initialized successfully (Booking & Payment Confirmed)');
    } catch (error) {
      console.error('[EmailService] Failed to initialize Account 1:', error);
      isConfigured1 = false;
    }
  }

  // Initialize Account 2
  if (validateConfiguration2()) {
    try {
      // EmailJS allows multiple init calls with different keys
      isConfigured2 = true;
      console.log('[EmailService] Account 2 configured successfully (Rejection & Admin)');
    } catch (error) {
      console.error('[EmailService] Failed to configure Account 2:', error);
      isConfigured2 = false;
    }
  }

  if (!isConfigured1 && !isConfigured2) {
    console.warn('[EmailService] Email functionality is disabled. Please configure EmailJS environment variables.');
  }
}

// Initialize on module load
initializeEmailJS();

// Email validation
function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Input sanitization
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/[\r\n]+/g, ' ') // Replace line breaks with spaces
    .trim();
}

// Format price with currency
function formatPrice(price, currency) {
  return `${price.toLocaleString()} ${currency}`;
}

// Format timestamp
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Send booking confirmation email to customer (uses Account 1)
export async function sendBookingConfirmation(booking, language = 'en') {
  if (!isConfigured1) {
    console.warn('[EmailService] Account 1 not configured, skipping booking confirmation email');
    return { success: false, reason: 'not_configured' };
  }

  if (!booking.email || !isValidEmail(booking.email)) {
    console.log('[EmailService] No valid email provided, skipping booking confirmation email');
    return { success: false, reason: 'invalid_email' };
  }

  try {
    const templateParams = {
      to_email: booking.email,
      customer_name: sanitizeInput(booking.name),
      confirmation_code: booking.confirmationCode,
      trip_title: sanitizeInput(booking.tripTitle),
      trip_date: sanitizeInput(booking.tripDate),
      group_size: booking.groupSize,
      total_price: formatPrice(booking.totalPrice, booking.currency),
      language: language,
      payment_telebirr: '0944 780 840',
      payment_cbe: '1000524300657',
      payment_abyssinia: '67531167',
      contact_phone: '+251 944 780 840',
      contact_telegram: 'https://t.me/savannaethiopiatravel',
    };

    // Send email asynchronously (fire and forget) using Account 1
    emailjs
      .send(
        EMAILJS_CONFIG_1.serviceId,
        EMAILJS_CONFIG_1.templates.bookingConfirmation,
        templateParams,
        EMAILJS_CONFIG_1.publicKey
      )
      .then(() => {
        console.log('[EmailService] Booking confirmation email sent successfully to:', booking.email);
      })
      .catch((error) => {
        console.error('[EmailService] Failed to send booking confirmation email:', error);
      });

    return { success: true };
  } catch (error) {
    console.error('[EmailService] Error preparing booking confirmation email:', error);
    return { success: false, reason: 'error', error };
  }
}

// Send admin notification email (uses Account 2)
export async function sendAdminNotification(booking) {
  if (!isConfigured2) {
    console.warn('[EmailService] Account 2 not configured, skipping admin notification email');
    return { success: false, reason: 'not_configured' };
  }

  if (!ADMIN_EMAIL) {
    console.warn('[EmailService] Admin email not configured, skipping admin notification email');
    return { success: false, reason: 'no_admin_email' };
  }

  try {
    const templateParams = {
      to_email: ADMIN_EMAIL,
      customer_name: sanitizeInput(booking.name),
      customer_phone: booking.phone,
      customer_email: booking.email || 'Not provided',
      confirmation_code: booking.confirmationCode,
      trip_title: sanitizeInput(booking.tripTitle),
      trip_date: sanitizeInput(booking.tripDate),
      traveler_type: booking.travelerType,
      group_size: booking.groupSize,
      total_price: formatPrice(booking.totalPrice, booking.currency),
      submission_time: formatTimestamp(booking.createdAt),
      admin_panel_url: `${window.location.origin}/admin`,
    };

    // Send email asynchronously (fire and forget) using Account 2
    emailjs
      .send(
        EMAILJS_CONFIG_2.serviceId,
        EMAILJS_CONFIG_2.templates.adminNotification,
        templateParams,
        EMAILJS_CONFIG_2.publicKey
      )
      .then(() => {
        console.log('[EmailService] Admin notification email sent successfully');
      })
      .catch((error) => {
        console.error('[EmailService] Failed to send admin notification email:', error);
      });

    return { success: true };
  } catch (error) {
    console.error('[EmailService] Error preparing admin notification email:', error);
    return { success: false, reason: 'error', error };
  }
}

// Send payment confirmation email to customer (uses Account 1)
export async function sendPaymentConfirmation(booking, language = 'en') {
  if (!isConfigured1) {
    console.warn('[EmailService] Account 1 not configured, skipping payment confirmation email');
    return { success: false, reason: 'not_configured' };
  }

  if (!booking.email || !isValidEmail(booking.email)) {
    console.log('[EmailService] No valid email provided, skipping payment confirmation email');
    return { success: false, reason: 'invalid_email' };
  }

  try {
    const templateParams = {
      to_email: booking.email,
      customer_name: sanitizeInput(booking.name),
      confirmation_code: booking.confirmationCode,
      trip_title: sanitizeInput(booking.tripTitle),
      trip_date: sanitizeInput(booking.tripDate),
      language: language,
      contact_phone: '+251 944 780 840',
      contact_telegram: 'https://t.me/savannaethiopiatravel',
    };

    // Send email asynchronously (fire and forget) using Account 1
    emailjs
      .send(
        EMAILJS_CONFIG_1.serviceId,
        EMAILJS_CONFIG_1.templates.paymentConfirmed,
        templateParams,
        EMAILJS_CONFIG_1.publicKey
      )
      .then(() => {
        console.log('[EmailService] Payment confirmation email sent successfully to:', booking.email);
      })
      .catch((error) => {
        console.error('[EmailService] Failed to send payment confirmation email:', error);
      });

    return { success: true };
  } catch (error) {
    console.error('[EmailService] Error preparing payment confirmation email:', error);
    return { success: false, reason: 'error', error };
  }
}

// Send payment rejection email to customer (uses Account 2)
export async function sendPaymentRejection(booking, language = 'en') {
  if (!isConfigured2) {
    console.warn('[EmailService] Account 2 not configured, skipping payment rejection email');
    return { success: false, reason: 'not_configured' };
  }

  if (!booking.email || !isValidEmail(booking.email)) {
    console.log('[EmailService] No valid email provided, skipping payment rejection email');
    return { success: false, reason: 'invalid_email' };
  }

  try {
    const templateParams = {
      to_email: booking.email,
      customer_name: sanitizeInput(booking.name),
      confirmation_code: booking.confirmationCode,
      trip_title: sanitizeInput(booking.tripTitle),
      language: language,
      contact_phone: '+251 944 780 840',
      contact_telegram: 'https://t.me/savannaethiopiatravel',
    };

    // Send email asynchronously (fire and forget) using Account 2
    emailjs
      .send(
        EMAILJS_CONFIG_2.serviceId,
        EMAILJS_CONFIG_2.templates.paymentRejected,
        templateParams,
        EMAILJS_CONFIG_2.publicKey
      )
      .then(() => {
        console.log('[EmailService] Payment rejection email sent successfully to:', booking.email);
      })
      .catch((error) => {
        console.error('[EmailService] Failed to send payment rejection email:', error);
      });

    return { success: true };
  } catch (error) {
    console.error('[EmailService] Error preparing payment rejection email:', error);
    return { success: false, reason: 'error', error };
  }
}

// Export configuration status for testing
export function isEmailServiceConfigured() {
  return { account1: isConfigured1, account2: isConfigured2 };
}
