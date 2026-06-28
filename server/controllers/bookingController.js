const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

async function sendEmail({ to, subject, html }) {
  if (!transporter) return;
  try {
    await transporter.sendMail({
      from: `"SAVANNA Ethiopia Travel" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
  } catch (err) {
    console.error('Email send failed (non‑fatal):', err.message);
  }
}

exports.createBooking = async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, travelers, 
      tripId, tripTitle, tripDate, totalPrice, specialRequests 
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'A payment confirmation screenshot is required to complete your booking.'
      });
    }

    const existing = await Booking.findOne({ where: { email, tripId } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'You have already submitted a booking for this trip. Please wait for our team to review it.'
      });
    }

    const confirmationCode = 'SAV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const receiptUrl = `/uploads/${req.file.filename}`;

    const booking = await Booking.create({
      firstName, lastName, email, phone, travelers,
      tripId, tripTitle, tripDate, totalPrice, specialRequests,
      confirmationCode,
      receiptUrl,
      status: 'pending'
    });

    const adminEmail = process.env.EMAIL_USER;
    const priceDisplay = `${Number(totalPrice).toLocaleString()} ETB`;

    sendEmail({
      to: email,
      subject: `Booking Confirmation – ${tripTitle} – SAVANNA Ethiopia Travel`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
          <h2 style="color:#D4A017;">Thank you, ${firstName}!</h2>
          <p style="color:#333;font-size:15px;">
            Your booking for <strong>${tripTitle}</strong> has been received. Our team will verify
            your payment and confirm the reservation shortly.
          </p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0;">
            <tr><td style="padding:8px 0;color:#666;">Confirmation Code</td><td style="font-weight:bold;">${confirmationCode}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Trip</td><td>${tripTitle}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Date</td><td>${tripDate}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Travelers</td><td>${travelers}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Total Paid</td><td style="font-weight:bold;">${priceDisplay}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Status</td><td style="color:#D4A017;">Pending Verification</td></tr>
          </table>
          <p style="color:#999;font-size:13px;">
            If you have any questions, reply to this email or contact us directly.
            <br/>— SAVANNA Ethiopia Travel Team
          </p>
        </div>`
    });

    if (adminEmail) {
      sendEmail({
        to: adminEmail,
        subject: `New Booking – ${confirmationCode} – ${tripTitle}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
            <h2 style="color:#D4A017;">New Booking Received</h2>
            <table style="width:100%;border-collapse:collapse;margin:24px 0;">
              <tr><td style="padding:8px 0;color:#666;">Name</td><td>${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Email</td><td>${email}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Phone</td><td>${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Trip</td><td>${tripTitle}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Date</td><td>${tripDate}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Travelers</td><td>${travelers}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Total</td><td>${priceDisplay}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Code</td><td style="font-weight:bold;">${confirmationCode}</td></tr>
            </table>
            <p style="color:#999;font-size:13px;">Review this booking in the <a href="${process.env.ADMIN_URL || 'http://localhost:5173/admin'}" style="color:#D4A017;">admin panel</a>.</p>
          </div>`
      });
    }

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.getBookingByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const bookings = await Booking.findAll({
      where: { email: email.toLowerCase().trim() },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();

    const statusLabels = { confirmed: 'Confirmed ✅', rejected: 'Unfortunately Rejected ❌', pending: 'Pending Verification' };

    sendEmail({
      to: booking.email,
      subject: `Booking ${statusLabels[status] || status} – ${booking.tripTitle}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
          <h2 style="color:#D4A017;">Hello ${booking.firstName},</h2>
          <p style="color:#333;font-size:15px;">
            Your booking status for <strong>${booking.tripTitle}</strong> has been updated.
          </p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0;">
            <tr><td style="padding:8px 0;color:#666;">Code</td><td style="font-weight:bold;">${booking.confirmationCode}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Status</td><td style="font-weight:bold;color:${status === 'confirmed' ? '#16a34a' : status === 'rejected' ? '#dc2626' : '#D4A017'};">${statusLabels[status] || status}</td></tr>
          </table>
          <p style="color:#999;font-size:13px;">
            ${status === 'confirmed' ? 'Your spots are secured! We look forward to seeing you on the expedition.' : status === 'rejected' ? 'Please contact us for more details about this decision.' : 'We are reviewing your payment. You will hear from us soon.'}
          </p>
          <p style="color:#999;font-size:13px;">— SAVANNA Ethiopia Travel Team</p>
        </div>`
    });

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
