import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User, { UserRole } from './models/User.js';
import Task, { TaskStatus, TaskPriority } from './models/Task.js';
import ActivityLog from './models/ActivityLog.js';

// Load environmental variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  console.error('Error: MONGO_URI is missing in backend/.env');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully!');

    // 1. Wipe existing data by dropping collections (erasing stale indexes)
    console.log('Wiping database collections to clear stale legacy indexes...');
    await mongoose.connection.db?.dropCollection('users').catch(() => {
      console.log('Collection "users" not present to drop.');
    });
    await mongoose.connection.db?.dropCollection('tasks').catch(() => {
      console.log('Collection "tasks" not present to drop.');
    });
    await mongoose.connection.db?.dropCollection('activitylogs').catch(() => {
      console.log('Collection "activitylogs" not present to drop.');
    });
    
    console.log('Database cleared and stale indexes erased.');

    // 2. Define real-world seed users
    console.log('Seeding users...');
    const usersData = [
      {
        name: 'Alex Rivera',
        email: 'alex.admin@autobiz.com',
        password: 'password123',
        role: UserRole.ADMIN,
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex'
      },
      {
        name: 'Sarah Jenkins',
        email: 'sarah.manager@autobiz.com',
        password: 'password123',
        role: UserRole.MANAGER,
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah'
      },
      {
        name: 'Michael Chen',
        email: 'michael.developer@autobiz.com',
        password: 'password123',
        role: UserRole.EMPLOYEE,
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Michael'
      },
      {
        name: 'Emma Wilson',
        email: 'emma.designer@autobiz.com',
        password: 'password123',
        role: UserRole.EMPLOYEE,
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma'
      },
      {
        name: 'John Doe',
        email: 'client.john@autobiz.com',
        password: 'password123',
        role: UserRole.CUSTOMER,
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John'
      }
    ];

    const seededUsers = [];
    for (const u of usersData) {
      const newUser = new User(u);
      await newUser.save();
      seededUsers.push(newUser);
      console.log(`Seeded user: ${newUser.name} [${newUser.role}]`);
    }

    const adminUser = seededUsers[0];
    const managerUser = seededUsers[1];
    const developerUser = seededUsers[2];
    const designerUser = seededUsers[3];

    // 3. Define real-world tasks
    console.log('Seeding real-world tasks...');
    const tasksData = [
      {
        title: 'Integrate Stripe Payment Gateway',
        description: 'Implement secure credit card checkout and recurring subscription webhook handlers in the core payment module.',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.HIGH,
        assignedTo: developerUser._id,
        createdBy: managerUser._id,
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        title: 'Optimize Database Query Indexing',
        description: 'Analyze query performance patterns on the ActivityLog collection and apply single and compound MongoDB index rules.',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        assignedTo: developerUser._id,
        createdBy: adminUser._id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days in future
      },
      {
        title: 'Implement Two-Factor Authentication',
        description: 'Provide secure login verification layers via authenticator app MFA QR-code generation and verification checkpoints.',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        assignedTo: developerUser._id,
        createdBy: adminUser._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days in future
      },
      {
        title: 'Redesign SaaS Pricing Landing Page',
        description: 'Create a vibrant, elegant, glassmorphic pricing cards tier grid utilizing custom pure white styles and magnetic buttons.',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.LOW,
        assignedTo: designerUser._id,
        createdBy: managerUser._id,
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        title: 'Fix Webhook Event Deduplication',
        description: 'Prevent duplicated event callbacks during rapid user clicks by building a short-term Redis locks system.',
        status: TaskStatus.BLOCKED,
        priority: TaskPriority.HIGH,
        assignedTo: developerUser._id,
        createdBy: managerUser._id,
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // Tomorrow
      },
      {
        title: 'Migrate legacy records to MongoDB Atlas',
        description: 'Extract and clean legacy SQL data sheets, convert into correct BSON types, and stream to Atlas live cluster.',
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        assignedTo: developerUser._id,
        createdBy: adminUser._id,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Create email newsletter campaign template',
        description: 'Design a highly polished HTML response template with fully custom marketing aesthetics and social icon groups.',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.LOW,
        assignedTo: designerUser._id,
        createdBy: managerUser._id,
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      }
    ];

    for (const t of tasksData) {
      const newTask = new Task(t);
      await newTask.save();
      console.log(`Seeded task: "${newTask.title}"`);
    }

    // 4. Seeding real-world activity logs
    console.log('Seeding ActivityLog history...');
    const activitiesData = [
      {
        user: managerUser._id,
        action: 'Created new project "Mobile App"',
        module: 'projects',
        details: 'Sarah Jenkins created the container shell and repository configuration for the upcoming native iOS project.',
        ipAddress: '192.168.1.15',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      },
      {
        user: developerUser._id,
        action: 'Completed task "API Integration"',
        module: 'tasks',
        details: 'Michael Chen merged stripe billing handlers into origin/main successfully.',
        ipAddress: '192.168.1.22',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      },
      {
        user: designerUser._id,
        action: 'Joined the team',
        module: 'teams',
        details: 'Emma Wilson completed onboarding materials and accepted the project design suite inviation.',
        ipAddress: '192.168.1.9',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      {
        user: adminUser._id,
        action: 'Deleted draft "Marketing Plan"',
        module: 'documents',
        details: 'Alex Rivera archived redundant copy of the Q3 release brief draft.',
        ipAddress: '192.168.1.2',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    ];

    for (const a of activitiesData) {
      const newLog = new ActivityLog(a);
      await newLog.save();
      console.log(`Seeded activity log: "${newLog.action}"`);
    }

    console.log('\n======================================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('======================================================');
    console.log('You can now log in with the following credentials:\n');
    seededUsers.forEach(u => {
      console.log(`- Role: ${u.role.toUpperCase()}`);
      console.log(`  Email: ${u.email}`);
      console.log(`  Password: password123`);
      console.log(`  Name: ${u.name}\n`);
    });
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
