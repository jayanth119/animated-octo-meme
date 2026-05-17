
import Notification, { NotificationType } from '../models/Notification.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// Nodemailer SMTP Transporter Initialization
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER || 'jayanthunofficial@gmail.com',
    pass: process.env.SMTP_PASS || 'cqqu lovn uxgv wely'
  }
});

// Helper function to dispatch emails asynchronously
export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const mailOptions = {
      from: `"AutoBiz Studio" <${process.env.SMTP_USER || 'jayanthunofficial@gmail.com'}>`,
      to,
      subject,
      text,
      html: html || `<div style="font-family: sans-serif; padding: 20px; line-height: 1.5;"><p>${text}</p></div>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Notification email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending notification email:', error);
  }
};

export const sendNotification = async (userId: string, message: string, type: NotificationType = NotificationType.INFO, link?: string) => {
  try {
    // 1. Create a database record of the notification
    const notification = await Notification.create({
      recipient: userId,
      message,
      type,
      link
    });

    // 2. Emit real-time Socket.io packet to the recipient's personal room
    try {
      const { io } = await import('../server.js');
      if (io) {
        io.to(userId.toString()).emit('notification', notification);
        console.log(`🔌 Socket broadcast dispatched to user room ${userId}`);
      }
    } catch (err) {
      console.error('⚠️ Failed to dispatch socket event:', err);
    }

    // 3. Fetch recipient's email address to trigger the email notification
    const recipientUser = await User.findById(userId);
    if (recipientUser && recipientUser.email) {
      const emailSubject = `🔔 AutoBiz Notification: ${type.toUpperCase()}`;
      const emailText = message;
      const emailHtml = `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 20px auto; padding: 40px 30px; color: #111111; background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 56px; height: 56px; background-color: #000000; border-radius: 12px; line-height: 56px; color: #ffffff; font-size: 28px; font-weight: 800; text-align: center;">⚡</div>
            <h2 style="font-size: 22px; font-weight: 800; color: #000000; margin: 12px 0 0; letter-spacing: -0.02em;">AutoBiz Studio</h2>
          </div>
          
          <div style="padding: 24px; background-color: #f8f9fa; border-radius: 12px; border-left: 4px solid #000000; margin-bottom: 30px;">
            <p style="font-size: 15px; margin: 0; font-weight: 600; color: #111111; line-height: 1.6;">${message}</p>
          </div>
          
          ${link ? `
            <div style="text-align: center; margin-bottom: 10px;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}${link}" style="display: inline-flex; align-items: center; justify-content: center; background-color: #000000; color: #ffffff; padding: 14px 28px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: background-color 0.2s;">
                View Details on Dashboard
              </a>
            </div>
          ` : ''}
          
          <div style="margin-top: 40px; border-top: 1px solid #f1f3f5; padding-top: 24px; text-align: center; font-size: 12px; color: #868e96;">
            <p style="margin: 0 0 4px 0;">You received this automated alert because real-time account email digests are active.</p>
            <p style="margin: 0; font-weight: 600; color: #495057;">© 2026 AutoBiz Inc. All rights reserved.</p>
          </div>
        </div>
      `;

      // Dispatch the email asynchronously in the background to prevent API blockages
      sendEmail(recipientUser.email, emailSubject, emailText, emailHtml).catch(err => {
        console.error(`❌ Background email delivery failed for ${recipientUser.email}:`, err);
      });
    }

    return notification;
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
