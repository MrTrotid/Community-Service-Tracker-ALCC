---

# 🌟 Community Service Tracker

The **Community Service Tracker** is an online platform designed to simplify logging, tracking, and managing community service hours for students. With an intuitive interface, students and administrators can efficiently monitor service hours while ensuring compliance with guidelines.

---

## 📖 Table of Contents
- [📋 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🔧 Tech Stack](#-tech-stack)
- [📂 Folder Structure](#-folder-structure)
- [⚙️ Installation](#️-installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [🤝 Contribution Guidelines](#-contribution-guidelines)

---

## 📋 Overview

The **Community Service Tracker** is built to:
- **Log Initial Hours**: Students start with a default of **50 community service hours**.
- **Track Hours in Real-Time**: Students log completed hours and view updated totals.
- **Manage Punishment Hours**: Administrators can assign additional service hours for disciplinary reasons.
- **Show Service Opportunities**: Curated list of approved locations for fulfilling service obligations.
- **Verify and Approve**: Hours submitted by students are verified and approved by administrators for authenticity.

---

## ✨ Key Features

- **Initial Hours Allocation**: Every student begins with **50 mandatory service hours**.  
- **Real-Time Hour Tracking**: Students log completed hours and instantly view updated totals.  
- **Punishment Hour Management**: Assign additional hours for disciplinary purposes.  
- **Service Opportunities Database**: Displays a list of approved locations for volunteering.  
- **Verification & Approval**: Submitted hours are reviewed and validated by administrators.  
- **User Dashboard**: Personalized dashboards for students and administrators with clear visuals and features.

---

## 🔧 Tech Stack

| **Category**       | **Technologies**                    |
|---------------------|-------------------------------------|
| **Frontend**        | React, Bootstrap, JavaScript, HTML, CSS |
| **Backend**         | Node.js, Express.js                |
| **Database**        | Firebase Firestore                 |
| **Authentication**  | Firebase Authentication            |
| **Hosting**         | Firebase Hosting, Vercel           |
| **Design Tools**    | Figma                              |
| **Version Control** | Git & GitHub                       |

---

## 📂 Folder Structure

```plaintext
community-service-tracker/
│
├── frontend/                     # Frontend application
│   ├── public/                   # Public assets
│   ├── src/                      # Source files
│   ├── package.json              # Frontend dependencies
│   └── README.md                 # Frontend documentation
│
├── backend/                      # Backend application
│   ├── controllers/              # Request handlers
│   ├── models/                   # Database models
│   ├── routes/                   # API routes
│   ├── index.js                  # Main server file
│   └── package.json              # Backend dependencies
│
├── .gitignore                    # Git ignore file
└── README.md                     # Main project documentation
```

---

## 📂 .gitignore

The `.gitignore` file is included in the project to specify which files and directories should be ignored by Git. This helps keep the repository clean and free from unnecessary files. 

### Ignored Files and Directories:
- **Node Modules**: The `node_modules/` directory contains all installed packages and is not needed in the repository.
- **Build Output**: The `build/` directories for both frontend and backend contain compiled files that can be generated from the source code.
- **Logs**: Any log files generated during development or runtime are ignored.
- **Environment Variables**: The `.env` files contain sensitive information and should not be tracked in version control.
- **IDE and Editor Files**: Configuration files for various IDEs and editors are ignored to avoid clutter.
- **Miscellaneous**: Temporary files such as `.tgz` and `.zip` files are also ignored.

Make sure to keep the `.gitignore` file updated as the project evolves to ensure that unnecessary files are not included in the repository.

---

## ⚙️ Installation

Follow these steps to set up the **Community Service Tracker** locally.

### Prerequisites
- **Node.js** (v18 or later)
- **npm** (Node Package Manager)
- A Firebase account with Firestore and Authentication enabled

### 🖥️ Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory and include your Firebase configuration:
   ```plaintext
   REACT_APP_API_KEY=your-firebase-api-key
   REACT_APP_AUTH_DOMAIN=your-auth-domain
   REACT_APP_PROJECT_ID=your-project-id
   REACT_APP_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_APP_ID=your-app-id
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

### 🛠️ Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd ../backend
   ```

2. Install required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and include your Firebase configuration:
   ```plaintext
   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_PROJECT_ID=your-project-id
   JWT_SECRET=your-secret-key
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```

---

## 🚀 You're All Set!  
Access the **Community Service Tracker** locally:  
- **Frontend**: `http://localhost:3000`  
- **Backend**: `http://localhost:5000`

---

## 🤝 Contribution Guidelines

We welcome contributions to the project! 🚀 If you'd like to contribute:  
1. Fork the repository and create a new branch for your feature/fix.
2. Ensure your code follows the project's style guide and is thoroughly tested.
3. Submit a pull request and include a detailed description of your changes.

For major changes, open an issue first to discuss your ideas with the community.

---

Happy Coding! 💻  
Maintained by Baman Prasad Guragain. 😊

--- 


