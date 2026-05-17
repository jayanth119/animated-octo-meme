import { Request, Response } from 'express';
import User from '../models/User.js';
import { sendTokenResponse } from '../utils/auth.js';
import jwt from 'jsonwebtoken';
import { sendEmail, sendNotification } from '../services/notificationService.js';
import { NotificationType } from '../models/Notification.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    sendTokenResponse(user, 201, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const getMe = async (req: any, res: Response) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { name, email, avatar, role } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const inviteTeammate = async (req: any, res: Response) => {
  try {
    const { name, email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: 'Please provide email and role' });
    }

    const inviteeName = name || email.split('@')[0];

    // Form invitation HTML
    const emailSubject = `✉️ You are invited to join AutoBiz Studio!`;
    const emailText = `Hi ${inviteeName}, you have been invited to join the AutoBiz Studio workspace as a ${role}.`;
    const emailHtml = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 20px auto; padding: 40px 30px; color: #111111; background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 56px; height: 56px; background-color: #000000; border-radius: 12px; line-height: 56px; color: #ffffff; font-size: 28px; font-weight: 800; text-align: center;">⚡</div>
          <h2 style="font-size: 22px; font-weight: 800; color: #000000; margin: 12px 0 0; letter-spacing: -0.02em;">AutoBiz Studio Workspace Invitation</h2>
        </div>
        
        <div style="padding: 24px; background-color: #f8f9fa; border-radius: 12px; border-left: 4px solid #0066cc; margin-bottom: 30px;">
          <p style="font-size: 15px; margin: 0 0 12px 0; font-weight: 600; color: #111111; line-height: 1.6;">
            Hi ${inviteeName},
          </p>
          <p style="font-size: 14px; margin: 0; color: #495057; line-height: 1.6;">
            You have been invited by <strong>${req.user?.name || 'Administrator'}</strong> to join their premium workspace as a <strong>${role.toUpperCase()}</strong>.
          </p>
        </div>
        
        <div style="text-align: center; margin-bottom: 10px;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/register?email=${encodeURIComponent(email)}&role=${role}" style="display: inline-flex; align-items: center; justify-content: center; background-color: #0066cc; color: #ffffff; padding: 14px 28px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 14px; box-shadow: 0 4px 12px rgba(0,102,204,0.15); transition: background-color 0.2s;">
            Accept Invitation & Setup Account
          </a>
        </div>
        
        <div style="margin-top: 40px; border-top: 1px solid #f1f3f5; padding-top: 24px; text-align: center; font-size: 12px; color: #868e96;">
          <p style="margin: 0 0 4px 0;">This invitation link will redirect you to the secure account setup page.</p>
          <p style="margin: 0; font-weight: 600; color: #495057;">© 2026 AutoBiz Inc. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendEmail(email, emailSubject, emailText, emailHtml);

    // Dispatch real-time notifications success log to the inviting manager
    await sendNotification(
      (req as any).user._id,
      `Teammate invitation sent successfully to ${inviteeName} (${email}) as a ${role}.`,
      NotificationType.SUCCESS,
      '/dashboard/team'
    );

    res.status(200).json({ success: true, message: 'Invitation email dispatched successfully!' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
