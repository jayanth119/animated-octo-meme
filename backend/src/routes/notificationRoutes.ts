import express from 'express';
import { 
  getNotifications, 
  markRead, 
  markAllRead, 
  deleteNotification, 
  clearAllNotifications 
} from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Secure all endpoints with authentication guard
router.use(protect);

router.get('/', getNotifications);
router.put('/read-all', markAllRead);
router.put('/:id/read', markRead);
router.delete('/clear-all', clearAllNotifications);
router.delete('/:id', deleteNotification);

export default router;
