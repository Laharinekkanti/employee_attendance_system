# 👔 Employee Attendance System

A comprehensive MERN (MongoDB, Express, React, Node.js) stack application for tracking employee attendance with role-based access control and advanced analytics.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)

---

## 📋 Project Overview

The Employee Attendance System is a full-stack web application designed to streamline employee attendance tracking. It provides separate interfaces for employees and managers, enabling real-time check-in/check-out functionality, attendance analytics, and comprehensive reporting. The system leverages modern technologies to ensure security, scalability, and user-friendly experience.

**Key Highlights:**
- ✅ Real-time attendance tracking with HH:MM:SS precision
- ✅ Role-based access control (Manager, Employee, Admin)
- ✅ Advanced analytics with interactive charts
- ✅ Secure authentication with JWT tokens
- ✅ Password encryption with bcryptjs
- ✅ Responsive design for all devices

---

## 🌟 Key Features

### Core Functionality
- **User Authentication** - Secure registration and login with JWT tokens
- **Role-Based Access Control** - Different permissions for managers, employees, and admins
- **Check-In/Check-Out System** - Employees can mark attendance with precise timestamps
- **Automatic Status Detection** - System automatically detects late arrivals (late status)
- **Protected Routes** - API endpoints and frontend pages protected with middleware

### Manager Dashboard Features
- **Advanced Chart Analytics** - Pie, Bar, and Line charts for attendance visualization
  - Overall attendance summary (present/absent/late)
  - Department-wise analytics
  - Date-range filtering and analysis
- **Smart Filtering & Search**
  - Real-time employee search by name
  - Date range filtering for attendance records
  - Status-based filtering (present/absent/late)
  - Department filtering
- **Employee Management** - View all employees and their attendance history
- **Attendance Reports** - Download and analyze detailed attendance records
- **Member Statistics** - Total members count with role-based breakdown

### Employee Features
- **Simple Dashboard** - Quick overview of check-in/check-out status
- **Attendance History** - View personal attendance records
- **Today's Status** - See current day's attendance status
- **Easy Check-In/Check-Out** - One-click attendance marking

### Security Features
- **JWT Authentication** - Secure token-based authentication with 24-hour expiration
- **Password Hashing** - Bcryptjs for secure password storage
- **Protected Routes** - Both frontend and backend route protection
- **Authorization Middleware** - Role-based endpoint access control
- **Secure Token Storage** - Tokens stored in localStorage with automatic cleanup

---

## 🛠 Technology Stack

### Backend Technologies
| Technology | Version | Purpose |
|---|---|---|
| Node.js | Latest LTS | Runtime environment |
| Express.js | ^5.1.0 | Web framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | ^9.0.0 | ODM (Object Document Mapper) |
| JWT (jsonwebtoken) | ^9.0.2 | Authentication tokens |
| Bcryptjs | ^3.0.3 | Password hashing |
| CORS | ^2.8.5 | Cross-origin resource sharing |
| Dotenv | ^17.2.3 | Environment configuration |
| Nodemon | ^3.1.11 | Development auto-reload |

### Frontend Technologies
| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.0 | UI library |
| Vite | ^7.2.4 | Build tool & dev server |
| React Router | ^7.9.6 | Client-side routing |
| Redux Toolkit | ^2.11.0 | State management |
| React-Redux | ^9.2.0 | Redux bindings for React |
| Axios | ^1.13.2 | HTTP client |
| Chart.js | ^4.5.1 | Chart library |
| React-ChartJS-2 | ^5.3.1 | React wrapper for Chart.js |
| Date-fns | ^4.1.0 | Date utilities |
| ESLint | ^9.39.1 | Code linting |

---

## 📁 Project Structure

```
employee-attendance-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js        # Authentication logic (register, login, me)
│   │   │   └── attendanceController.js  # Attendance operations (check-in, check-out)
│   │   ├── middleware/
│   │   │   └── auth.js                  # JWT verification middleware
│   │   ├── models/
│   │   │   ├── User.js                  # User schema (name, email, password, role)
│   │   │   └── Attendance.js            # Attendance schema (checkIn, checkOut, status)
│   │   ├── routes/
│   │   │   ├── auth.js                  # Auth endpoints (/register, /login, /me)
│   │   │   └── attendance.js            # Attendance endpoints (/mark, /checkout, /get)
│   │   └── server.js                    # Express app setup and MongoDB connection
│   ├── seed.js                          # Database seeding with test data
│   └── package.json                     # Backend dependencies and scripts
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js         # Axios configuration with JWT interceptor
│   │   ├── app/
│   │   │   └── store.js                 # Redux store configuration
│   │   ├── components/
│   │   │   ├── AttendanceChart.jsx      # Pie/Bar/Line chart components
│   │   │   └── Navbar.jsx               # Navigation component
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── authSlice.js         # Redux slice for auth (login, register)
│   │   │   │   └── authAPI.js           # Auth API calls
│   │   │   └── attendance/
│   │   │       ├── attendanceSlice.js   # Redux slice for attendance
│   │   │       └── attendanceAPI.js     # Attendance API calls
│   │   ├── pages/
│   │   │   ├── Login.jsx                # Login page
│   │   │   ├── Register.jsx             # Registration page
│   │   │   ├── EmployeeDashboard.jsx    # Employee dashboard
│   │   │   ├── ManagerDashboard.jsx     # Manager dashboard with analytics
│   │   │   ├── ManagerHome.jsx          # Manager home page
│   │   │   └── MyHistory.jsx            # Employee attendance history
│   │   ├── App.jsx                      # Main app component with routing
│   │   ├── main.jsx                     # React entry point
│   │   ├── App.css                      # Global styles
│   │   └── index.css                    # Base styles
│   ├── index.html                       # HTML template
│   ├── vite.config.js                   # Vite configuration
│   ├── eslint.config.js                 # ESLint configuration
│   └── package.json                     # Frontend dependencies and scripts
│
└── README.md                            # Project documentation
```

---

## 🚀 Installation Instructions

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/Laharinekkanti/employee_attendance_system.git
cd employee-attendance-system
```

### Step 2: Backend Setup

##### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Create Environment File
Create a `.env` file in the `backend` directory:

```env
# MongoDB URI
MONGO_URI=mongodb://localhost:27017/attendance_db

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

#### 2.3 Seed the Database
Populate the database with test data:

```bash
npm run seed
```

This will create:
- 1 Manager account
- 2 Employee accounts
- Sample attendance records for testing

#### 2.4 Start Backend Server
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

You should see:
```
Connecting to MongoDB...
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Step 3: Frontend Setup

#### 3.1 Install Dependencies
```bash
cd ../frontend
npm install
```

#### 3.2 Create Environment File
Create a `.env` file in the `frontend` directory:

```env
# API Base URL
VITE_API_URL=http://localhost:5000/api
```

#### 3.3 Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` or `http://localhost:5174`

### Step 4: Access the Application

Once both servers are running:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 🔐 Test Credentials

Use these credentials to test the application:

| User Type | Name | Email | Password |
|---|---|---|---|
| Manager | Alice Manager | manager@example.com | Password123! |
| Employee 1 | Bob Employee | bob@example.com | Password123! |
| Employee 2 | Charlie Employee | charlie@example.com | Password123! |

**Login Flow:**
1. Navigate to http://localhost:5173
2. Click on "Login"
3. Enter credentials from the table above
4. Click "Sign In"

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user | ❌ No |
| POST | `/login` | Login and get JWT token | ❌ No |
| GET | `/me` | Get current authenticated user | ✅ Yes |
| GET | `/members/count` | Get total members count with breakdown | ✅ Yes |

### Attendance Routes (`/api/attendance`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/mark` | Mark check-in for today | ✅ Yes |
| POST | `/checkout` | Mark check-out for today | ✅ Yes |
| GET | `/` | Get current user's attendance records | ✅ Yes |
| GET | `/all-records` | Get all attendance records (Manager only) | ✅ Yes |

### Request/Response Examples

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "employee"
}

Response:
{
  "message": "User registered successfully"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "manager@example.com",
  "password": "Password123!"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Alice Manager",
    "email": "manager@example.com",
    "role": "manager"
  }
}
```

---

## ⭐ Standout Features

### 1. 📊 Advanced Chart Analytics
- **Multiple Chart Types:** Pie charts for status distribution, Bar charts for department comparison, Line charts for attendance trends
- **Chart.js Integration:** Professional, responsive charts with smooth animations
- **Real-time Updates:** Charts refresh automatically when attendance data changes
- **Date Range Selection:** Filter data by custom date ranges for comprehensive analysis

**Implementation:** Chart components use `useMemo` for performance optimization and automatically re-render only when data changes.

### 2. 🔍 Smart Filtering & Search
- **Real-time Search:** Instantly filter employees by name as you type
- **Date Range Filtering:** Select start and end dates to analyze specific periods
- **Status Filtering:** Filter by present, absent, or late status
- **Department Filtering:** Organize data by department
- **Combined Filters:** Apply multiple filters simultaneously for precise data analysis

**Implementation:** Uses Redux state management and memoized selectors for optimal performance even with large datasets.

### 3. 🏪 Redux State Management
- **Async Thunks:** All API calls use Redux Thunk for asynchronous state management
- **Persistent Authentication:** Auth token persists across page refreshes
- **Normalized State:** Efficient data structure to prevent duplication
- **Selectors:** Memoized selectors for derived state calculations
- **Error Handling:** Comprehensive error state and messaging

**Key Implementation:**
```javascript
// Example async thunk structure
export const checkIn = createAsyncThunk(
  'attendance/checkIn',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/attendance/mark");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);
```

### 4. 👥 Role-Based UI
- **Manager Dashboard:** Exclusive analytics, reporting, and employee management features
- **Employee Dashboard:** Simple, focused interface for marking attendance
- **Dynamic Navigation:** Menu items change based on user role
- **Protected Components:** Sensitive data only accessible to authorized roles
- **Different Workflows:** Distinct user experiences optimized for each role

### 5. 🔐 Security Implementation
- **JWT Authentication:** Tokens with 24-hour expiration
- **Bcryptjs Password Hashing:** Passwords salted and hashed with 10 rounds
- **Protected Routes:** Both frontend and backend route protection
- **Authorization Middleware:** Verify user roles before accessing endpoints
- **Token Interception:** Axios interceptor automatically adds JWT to requests
- **Secure Token Storage:** LocalStorage with cleanup on logout

**Security Code Example:**
```javascript
// Password hashing in backend
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Token generation
const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
```

### 6. 🌱 Database Seeding
- **Automated Test Data:** `npm run seed` creates realistic test scenarios
- **Multiple Users:** Manager and employee accounts with different roles
- **Sample Records:** Pre-populated attendance data for testing filters and analytics
- **Easy Reset:** Clear all data and reseed with one command
- **Consistent Format:** Time strings in HH:MM:SS format

**Seed Data Includes:**
- 1 Manager account (manager@example.com)
- 2 Employee accounts (bob@example.com, charlie@example.com)
- Sample attendance for multiple days
- Various attendance statuses (present, late, absent)

### 7. ⏰ Time Format Management
- **HH:MM:SS Format:** All timestamps stored and displayed in precise format
- **Automatic Status Detection:** Late status assigned if check-in after 9:00 AM
- **Duration Calculation:** Automatic calculation of work hours from check-in and check-out
- **Date Precision:** Full date-time tracking with timezone consideration
- **Time Parsing:** Robust parsing of time strings across different locales

### 8. 📱 Responsive Design
- **Mobile-First Approach:** Layouts optimized for all screen sizes
- **Flexbox & CSS Grid:** Modern CSS for flexible layouts
- **Touch-Friendly:** Large buttons and input fields for mobile users
- **Adaptive Navigation:** Hamburger menu on mobile, full navigation on desktop
- **Cross-Browser Compatible:** Works on Chrome, Firefox, Safari, Edge

### 9. ⚡ Performance Optimizations
- **useMemo Hooks:** Prevent unnecessary component re-renders
- **Lazy Loading:** Components load only when needed
- **Code Splitting:** Separate bundles for different pages
- **Optimized Queries:** Efficient MongoDB queries with proper indexing
- **Debouncing:** Search and filter operations debounced to reduce API calls
- **Virtual Scrolling:** For long lists to improve rendering performance

**Example Performance Optimization:**
```javascript
const filteredAttendance = useMemo(() => {
  return attendanceData.filter(record => {
    return record.user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (!selectedDate || record.date === selectedDate);
  });
}, [attendanceData, searchTerm, selectedDate]);
```

### 10. 🛡️ Error Handling
- **Comprehensive Error Messages:** User-friendly error notifications
- **Validation Errors:** Form validation on both client and server
- **API Error Handling:** Graceful handling of network errors
- **Try-Catch Blocks:** All async operations wrapped in error handling
- **Redux Error State:** Centralized error state for all API failures
- **Logging:** Server-side logging for debugging and monitoring

---

## 📊 Data Models

### User Schema
```javascript
{
  name: {
    type: String,
    required: true,
    description: "Employee's full name"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    description: "Unique email address for login"
  },
  password: {
    type: String,
    required: true,
    description: "Hashed password (bcryptjs)"
  },
  role: {
    type: String,
    enum: ["admin", "employee", "manager"],
    default: "employee",
    description: "User's role in the system"
  }
}
```

### Attendance Schema
```javascript
{
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
    description: "Reference to the User who marked attendance"
  },
  date: {
    type: Date,
    required: true,
    description: "Date of attendance record"
  },
  checkIn: {
    type: String,
    description: "Check-in time in HH:MM:SS format (nullable)"
  },
  checkOut: {
    type: String,
    description: "Check-out time in HH:MM:SS format (nullable)"
  },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "present",
    description: "Attendance status"
  },
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

---

## 🔧 Implementation Details

### Check-In Logic
1. Employee clicks "Check-In" button on dashboard
2. System captures current time and stores in HH:MM:SS format
3. Date is set to today's date
4. Status is automatically set:
   - **"present"** if check-in time ≤ 09:00:00
   - **"late"** if check-in time > 09:00:00
5. Check-out initially set to null
6. Record saved to MongoDB with user reference

### Check-Out Logic
1. Employee clicks "Check-Out" button (only available after check-in)
2. System finds today's attendance record for the user
3. Updates checkOut field with current time
4. Status remains unchanged (set during check-in)
5. Work duration calculated automatically for display
6. Record updated in MongoDB

### Filter Performance
- **Indexing:** MongoDB indexes on user ID and date for fast queries
- **Projection:** Only required fields fetched from database
- **Pagination:** Large result sets paginated (if implemented)
- **Client-side Filtering:** Redux selectors cache computed results
- **Query Optimization:** Filters combined before querying database

### Chart Registration
- **Chart.js Components:** All charts registered globally on app load
- **Dynamic Datasets:** Data processed to match chart.js format
- **Color Schemes:** Consistent colors across all chart types
- **Legend & Labels:** Automatically generated from data
- **Responsive Sizing:** Charts adjust to container width

---

## 🌍 Environment Variables

### Backend `.env` File
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/attendance_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: For production
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance_db
# NODE_ENV=production
# PORT=443
```

### Frontend `.env` File
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Optional: For production
# VITE_API_URL=https://api.yourdomain.com/api
```

### Security Best Practices
- ✅ Never commit `.env` files to git
- ✅ Use strong JWT secret (min 32 characters)
- ✅ Change defaults in production
- ✅ Use MongoDB Atlas for production databases
- ✅ Enable HTTPS for production APIs
- ✅ Set `NODE_ENV=production` in production
- ✅ Use environment-specific secrets

---

## 🐛 Troubleshooting

### Backend Issues

#### MongoDB Connection Error
**Error:** `MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
1. Ensure MongoDB is installed and running
2. Start MongoDB:
   - **Windows (installed as service):** Should start automatically
   - **Windows (manual):** Run `mongod` in command prompt
   - **macOS:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`
3. Verify connection string in `.env`
4. Test with: `mongo` or `mongosh` in terminal

#### Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Kill the process (Windows - replace PID)
taskkill /PID <PID> /F

# Or use different port
PORT=5001 npm run dev
```

#### JWT Secret Not Configured
**Error:** `TypeError: Cannot read property 'sign' of undefined`

**Solution:**
1. Create `.env` file in backend directory
2. Add: `JWT_SECRET=your_secret_here`
3. Restart backend server

#### Seed Script Fails
**Error:** Connection or validation errors

**Solution:**
1. Ensure MongoDB is running
2. Check MongoDB connection string
3. Clear database manually using mongosh
4. Run: `npm run seed`
5. Verify users created

### Frontend Issues

#### Cannot Connect to API
**Error:** `Network Error` when trying to login

**Solution:**
1. Ensure backend is running on port 5000
2. Check `VITE_API_URL` in `.env` file
3. Verify URL format: `http://localhost:5000/api`
4. Check browser console (F12) for CORS errors
5. Ensure backend CORS is enabled

#### Charts Not Rendering
**Error:** Charts appear blank or throw errors

**Solution:**
1. Ensure Chart.js is installed: `npm list chart.js`
2. Check Console for errors (F12 → Console)
3. Verify data is being loaded (check Redux DevTools)
4. Ensure canvas element exists in component
5. Restart dev server: `npm run dev`

#### Login Fails with Seed Credentials
**Error:** `Invalid credentials` or `User not found`

**Solution:**
1. Run seed script: `npm run seed` in backend directory
2. Use exact credentials from seed.js:
   - Email: `manager@example.com`
   - Password: `Password123!`
3. Check database: Connect to MongoDB and verify users exist
4. Ensure passwords match exactly (case-sensitive)

---

## 📜 Available Scripts

### Backend Scripts
```bash
# Start development server with auto-reload
npm run dev

# Run database seeding
npm run seed

# Start production server
npm start
```

### Frontend Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run ESLint code quality check
npm run lint
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and structure
- Test your changes before submitting PR
- Update README if adding new features
- Include meaningful commit messages

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Lahari Nekkanti**
- GitHub: [@Laharinekkanti](https://github.com/Laharinekkanti)
- Repository: [employee_attendance_system](https://github.com/Laharinekkanti/employee_attendance_system)

---

## 🌟 Support

If you found this project helpful, please consider giving it a star on GitHub!

For issues, questions, or suggestions:
- 📖 Check the [Troubleshooting Section](#-troubleshooting)
- 🐛 [Report a Bug](https://github.com/Laharinekkanti/employee_attendance_system/issues)
- 💡 [Request a Feature](https://github.com/Laharinekkanti/employee_attendance_system/issues)

---

<div align="center">

**Made with ❤️ by Lahari Nekkanti**

⬆ [back to top](#-employee-attendance-system)

</div>