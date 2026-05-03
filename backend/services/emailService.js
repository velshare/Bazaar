const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const FROM = `"AutoBazaar" <${process.env.EMAIL_USER || 'autobazarpremimum@gmail.com'}>`;

const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; background: #f4f4f4; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #ff4d00, #ff8c00); padding: 30px 40px; text-align: center; }
    .header h1 { margin: 0; color: white; font-size: 28px; letter-spacing: 1px; }
    .header span { color: #fff3e0; font-size: 14px; }
    .body { padding: 35px 40px; color: #333; }
    .body h2 { color: #1a1a2e; margin-top: 0; }
    .info-box { background: #fff8f5; border-left: 4px solid #ff4d00; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0e8e4; font-size: 15px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #888; font-weight: 600; }
    .info-value { color: #1a1a2e; font-weight: 700; }
    .badge { display: inline-block; background: #e8f5e9; color: #2ecc71; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; margin: 10px 0; }
    .footer { background: #1a1a2e; color: #aaa; text-align: center; padding: 20px 40px; font-size: 13px; }
    .footer a { color: #ff4d00; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🏍️ AutoBazaar</h1>
      <span>India's Premium Second-Hand Bike Marketplace</span>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      &copy; 2024 AutoBazaar &nbsp;|&nbsp; <a href="http://localhost:5000">Visit Website</a><br>
      <small>autobazarpremimum@gmail.com</small>
    </div>
  </div>
</body>
</html>`;

const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: FROM,
            to: userEmail,
            subject: '🎉 Welcome to AutoBazaar!',
            html: baseTemplate(`
                <h2>Welcome, ${userName}! 🎉</h2>
                <p>Thank you for joining <strong>AutoBazaar</strong> — India's trusted marketplace for premium pre-owned bikes.</p>
                <div class="info-box">
                    <p>✅ Browse 5,000+ verified bikes</p>
                    <p>✅ List your bike for sale instantly</p>
                    <p>✅ Secure payments via GPay / UPI</p>
                    <p>✅ 24/7 customer support</p>
                </div>
                <p>Happy riding! 🏍️</p>
            `)
        });
        console.log(`Welcome email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending welcome email:', error.message);
    }
};

const sendLoginNotification = async (userEmail, userName) => {
    try {
        const transporter = createTransporter();
        const loginTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        await transporter.sendMail({
            from: FROM,
            to: userEmail,
            subject: '🔐 You are logged in to AutoBazaar',
            html: baseTemplate(`
                <h2>Hello, ${userName}! 👋</h2>
                <p>You have successfully logged into your <strong>AutoBazaar</strong> account.</p>
                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Account</span>
                        <span class="info-value">${userEmail}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Login Time</span>
                        <span class="info-value">${loginTime} IST</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status</span>
                        <span class="info-value" style="color:#2ecc71;">✅ Successful</span>
                    </div>
                </div>
                <p style="color:#e74c3c; font-size:13px;">⚠️ If this wasn't you, please contact us immediately at <a href="mailto:autobazarpremimum@gmail.com">autobazarpremimum@gmail.com</a></p>
            `)
        });
        console.log(`Login notification sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending login notification:', error.message);
    }
};

const sendPurchaseConfirmation = async (userEmail, userName, bikeDetails) => {
    try {
        const transporter = createTransporter();
        const purchaseTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        await transporter.sendMail({
            from: FROM,
            to: userEmail,
            subject: '🏍️ Bike Purchased Successfully — AutoBazaar',
            html: baseTemplate(`
                <h2>Congratulations, ${userName}! 🎊</h2>
                <p>Your bike has been <strong>purchased successfully</strong> on AutoBazaar. Here are your order details:</p>
                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Bike</span>
                        <span class="info-value">${bikeDetails.title || bikeDetails.brand}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Brand</span>
                        <span class="info-value">${bikeDetails.brand}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Year</span>
                        <span class="info-value">${bikeDetails.year}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Amount Paid</span>
                        <span class="info-value" style="color:#ff4d00;">₹${bikeDetails.price}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Payment Method</span>
                        <span class="info-value">GPay / UPI (${process.env.GPAY_NUMBER})</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Purchase Time</span>
                        <span class="info-value">${purchaseTime} IST</span>
                    </div>
                </div>
                <div class="badge">✅ Purchase Confirmed</div>
                <p>Our team will contact you within <strong>24 hours</strong> to arrange delivery and complete the paperwork.</p>
                <p>For any queries, reach us at <a href="mailto:autobazarpremimum@gmail.com">autobazarpremimum@gmail.com</a></p>
            `)
        });
        console.log(`Purchase confirmation sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending purchase confirmation:', error.message);
    }
};

module.exports = { sendWelcomeEmail, sendLoginNotification, sendPurchaseConfirmation };
