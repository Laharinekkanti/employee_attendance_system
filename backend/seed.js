require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Attendance = require('./src/models/Attendance');
const bcrypt = require('bcryptjs');

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/attendance_db';
  await mongoose.connect(uri);
  console.log('Connected to DB for seeding');

  // clear
  await Attendance.deleteMany({});
  await User.deleteMany({});

  // create manager
  const manager = new User({
    name: 'Alice Manager',
    email: 'manager@example.com',
    password: 'Password123!',
    role: 'manager',
    employeeId: 'M001',
    department: 'Admin'
  });
  await manager.save();

  // employees
  const emp1 = new User({
    name: 'Bob Employee',
    email: 'bob@example.com',
    password: 'Password123!',
    role: 'employee',
    employeeId: 'E001',
    department: 'Sales'
  });
  await emp1.save();

  const emp2 = new User({
    name: 'Charlie Employee',
    email: 'charlie@example.com',
    password: 'Password123!',
    role: 'employee',
    employeeId: 'E002',
    department: 'Support'
  });
  await emp2.save();

  // sample attendance for yesterday and today
  const today = new Date();
  const y = new Date(today);
  y.setDate(today.getDate() - 1);

  function getTimeString(hour, minute) {
    const h = String(hour).padStart(2, '0');
    const m = String(minute).padStart(2, '0');
    return `${h}:${m}:00`;
  }

  const records = [
    {
      user: emp1._id,
      date: y,
      checkIn: getTimeString(9, 5),
      checkOut: getTimeString(17, 0),
      status: 'present'
    },
    {
      user: emp1._id,
      date: today,
      checkIn: getTimeString(9, 10),
      checkOut: null,
      status: 'present'
    },
    {
      user: emp2._id,
      date: today,
      checkIn: getTimeString(10, 0),
      checkOut: null,
      status: 'late'
    }
  ];

  await Attendance.insertMany(records);

  console.log('Seeded users and attendance');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
