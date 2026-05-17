import { Request, Response } from 'express';
import Task from '../models/Task.js';
import ActivityLog from '../models/ActivityLog.js';
import { sendNotification } from '../services/notificationService.js';
import { NotificationType } from '../models/Notification.js';

export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ 
      $or: [
        { assignedTo: req.user._id },
        { createdBy: req.user._id }
      ]
    }).populate('assignedTo createdBy', 'name email avatar');

    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      createdBy: req.user._id
    });

    // Send notification to assigned user
    if (assignedTo.toString() !== req.user._id.toString()) {
      await sendNotification(
        assignedTo,
        `New task assigned: ${title}`,
        NotificationType.INFO,
        `/dashboard/tasks`
      );
    }

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'CREATE_TASK',
      module: 'TASKS',
      details: `Created task: ${title}`,
      ipAddress: req.ip
    });

    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership/permission (simplified)
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
