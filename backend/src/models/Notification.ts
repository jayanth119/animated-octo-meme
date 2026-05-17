import mongoose, { Schema, Document } from 'mongoose';

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: Object.values(NotificationType), default: NotificationType.INFO },
  isRead: { type: Boolean, default: false },
  link: { type: String }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
