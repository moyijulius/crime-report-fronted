# Crime Reporting Platform

## 📌 Project Overview
This is a role-based crime reporting platform that allows citizens to securely report crimes, track case progress, and communicate with law enforcement. The system has three user roles:

- **Normal Users**: Report crimes and track case status
- **Officers**: Review and manage crime reports
- **Admins**: Manage system content and user accounts

---

## 🚀 Deployment Links
- **Frontend URL**: [Crime Report Frontend](https://crime-report-fronted.vercel.app/)
- **Backend API**: [Crime Report Backend](https://crime-report-backend-7zgy.onrender.com)

---

## 🛠️ Prerequisites
Before running this project locally, ensure you have:

- **MongoDB Atlas** or a local MongoDB instance
- **Node.js** (v14 or later) installed
- **npm** or **yarn** package manager

---

## ⚙️ Installation
### Clone the repository:
```bash
git clone https://github.com/moyijulius/crime-report-platform.git
cd crime-reporting-platform
```

### Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 🔧 Configuration
### Backend Configuration
Create a `.env` file in the `backend` directory with the following variables:
```plaintext
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Frontend Configuration
Create a `.env` file in the `frontend` directory:
```plaintext
REACT_APP_API_BASE_URL=https://crime-report-backend-7zgy.onrender.com
```

---

## 🏃‍♂️ Running the Application Locally
### Start the backend server:
```bash
cd backend
npm start
```

### Start the frontend in a separate terminal:
```bash
cd frontend
npm start
```

The application should now be running at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 👥 User Roles & Initial Setup
### 🔒 Admin and Officer Credentials
The system currently has predefined admin and officer accounts:
- **Admin Login**
  - **Email**: `admin@crime.com`
  - **Password**: `secureAdmin123#`
- **Officer Login**
  - **Email**: `officer@crime.com`
  - **Password**: `secureOfficer123#`

### 🔄 Normal User Registration
Normal users can register through the application's registration page:
1. Navigate to [Crime Report Frontend](https://crime-report-fronted.vercel.app/)
2. Click on **Register**
3. Fill in the form (email, name, password)
4. Submit to create an account

---

## 🌟 Key Features
### 👨‍💼 For Normal Users
#### Report a Crime
- Navigate to "Report a Crime"
- Fill in crime details (type, location, description)
- Upload supporting documents
- Choose anonymous or registered reporting
- Receive a reference number for tracking

#### Track Case Status
- Use reference number to check status
- View progress through visual indicators
- Message officers about specific cases

#### User Profile
- View past reports
- Update personal information
- Manage notification preferences

### 🥷 For Officers
#### Officer Dashboard
- View assigned cases
- Update case status
- Communicate with reporters
- Review submitted evidence

### 👨‍⚖️ For Admins
#### User Management
- Create/edit/delete users
- Assign officer roles

#### Content Management
- Approve/reject testimonials
- Monitor all reports
- Manage system settings

---

## 🤖 AI Chatbot Assistance
The report crime page includes an **AI chatbot** that:
- Provides guidance on completing reports
- Answers common questions
- Suggests optimal ways to describe incidents

---

## 📊 Database Collections
The **MongoDB Atlas database** uses these main collections:
- `users` - Stores all user accounts (normal users, officers, admins)
- `reports` - Contains all crime reports with status updates
- `testimonials` - Stores user testimonials for the homepage
- `messages` - Contains communication between users and officers

---

## 🛠️ Troubleshooting
### MongoDB Connection Issues
- Ensure the **MongoDB Atlas connection string** is correctly set in `.env`
- Verify your **IP whitelist** settings in MongoDB Atlas

### Authentication Problems
- Check JWT secret in backend `.env`
- Ensure passwords are properly hashed before manual DB insertion

### Frontend-Backend Communication
- Verify `REACT_APP_API_BASE_URL` matches your backend URL
- Check **CORS settings** in backend if requests are blocked

---

For support or questions, please contact moyijulius17@gmail.com.

