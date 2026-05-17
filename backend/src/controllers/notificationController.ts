import { Response } from 'express';
import Notification from '../models/Notification.js';

export const getNotifications = async (req: any, res: Response) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: notifications.length, data: notifications });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markRead = async (req: any, res: Response) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ success: true, data: notification });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markAllRead = async (req: any, res: Response) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req: any, res: Response) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const clearAllNotifications = async (req: any, res: Response) => {
  try {
    await Notification.deleteMany({ recipient: req.user._id });

    res.status(200).json({ success: true, message: 'All notifications cleared successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
