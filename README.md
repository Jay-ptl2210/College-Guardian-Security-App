# 🛡️ College Guardian Security App (MERN Stack)

A real-world security web application designed for colleges and universities to provide instant emergency support and complaint management for students.  
Built using **MongoDB**, **Express.js**, **React.js**, and **Node.js** (MERN Stack).

---

## 🚀 Features

### 👥 Authentication
- Student Registration (with College dropdown)
- Admin Registration & Login
- Strong Password Validation (min 8 chars, symbols, numbers)
- Forgot Password via OTP (valid for 5 minutes)

### 📍 SOS System
- Student can press **SOS Button** for emergencies.
- Auto-send Emergency Message with Name, Enrollment No, Location.
- Emergency SMS sent to college's registered Admin.
- Rate Limit ➔ Maximum 3 SOS messages per press.
- Optional: Live Tracking — Send location every 30 seconds for 5 minutes.

### 📋 Complaint / Request System
- Students can submit Requests/Suggestions to Admin.
- Request Categories: Safety, Cleanliness, Ragging, General, etc.
- Upload Multiple Images or PDF/Doc files.
- Admin can manage, add notes, and close complaints with proof photo.

### 📊 Admin Dashboard
- View Student List, SOS Alerts, Complaints.
- Recent SOS & Requests List.
- Weekly Activity Charts (Complaints, SOS).
- Search and Filter by Student, Date, Status.
- Admin Log History (actions tracking).

### 🔔 Notifications
- In-app notifications for Students and Admins.
- Email Alerts (optional future upgrade).
- Push Notifications (optional).

### 🌐 Future Ready (Optional Upgrades)
- AI Chatbot Assistant for Students.
- Multilingual Support.
- Progressive Web App (PWA) - Mobile-friendly behavior.

---

## 📦 Tech Stack
---------------------------------------------------------------------
| Technology                 | Description                          |
|----------------------------|--------------------------------------|
| MongoDB                    | Database                             |
| Express.js                 | Backend Framework                    |
| React.js                   | Frontend Framework                   |
| Node.js                    | Server Environment                   |
| JWT                        | Authentication Tokens                |
| Bcrypt                     | Password Hashing                     |
| Twilio / SMS API           | (Optional) For sending emergency SMS |
| Cloudinary / Local Storage | File Uploads                         |
| Chart.js / Recharts        | Graphs and Charts on Dashboard       |
-

---

## 🔥 Project Structure

/backend ├── config/ ├── controllers/ ├── middlewares/ ├── models/ ├── routes/ ├── utils/ ├── .env ├── app.js └── server.js

## ⚙️ Setup Instructions

### 1. Clone the repo

git clone https://github.com/your-username/college-guardian-security-app.git
cd college-guardian-security-app

2. Install dependencies
npm install

3. Create .env file
Create a .env file in /backend with the following variables:

  PORT=5000
  MONGO_URI=your_mongoDB_connection_string 
  JWT_SECRET=your_jwt_secret_key
  SMS_API_KEY=your_sms_api_key_if_needed

4. Start the server
  npm run server

🎯 Deployment
Frontend ➔ Vercel / Netlify (Recommended)
Backend ➔ Render / Railway / VPS

✨ Screenshots (coming soon!)
Student Dashboard

Admin Dashboard

Complaint Management

SOS Emergency Message Popups

🤝 Contributors
Name	       Role
Jay Patel	   Full Stack Developer

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and contribute!
