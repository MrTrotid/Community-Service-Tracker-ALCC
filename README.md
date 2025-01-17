# Community Service Tracker

The Community Service Tracker is an online platform designed to streamline the process of logging, tracking, and managing community service hours for students. It features an intuitive interface for students and administrators to monitor service hours efficiently.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Contribution Guidelines](#contribution-guidelines)

## Overview
The platform is built to:
- Log Initial Hours: Every student starts with a default of 50 community service hours.
- Track Hours in Real Time: Students can log their completed hours and view the updated totals.
- Manage Punishment Hours: Administrators can assign additional service hours for disciplinary reasons.
- Show Service Opportunities: Provides a curated list of approved places for community service.
- Ensure Verification and Approval: Hours submitted by students are reviewed by administrators for authenticity.

## Key Features
- **Initial Hours Allocation**: Each student begins with 50 mandatory community service hours.
- **Real-Time Hour Tracking**: Students log their completed hours and instantly view their remaining hours.
- **Punishment Hour Management**: Additional hours for disciplinary actions are added to a student’s service balance.
- **Service Opportunities Database**: Displays approved locations for fulfilling service obligations.
- **Verification & Approval**: Submitted hours are reviewed by admins for authenticity and approval.
- **User  Dashboard**: Personalized dashboards for students and administrators.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase Hosting or Vercel
- **Tools**: GitHub, Figma

## Folder Structure
```
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
## Installation

To set up the Community Service Tracker locally, follow these steps:

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- Firebase account

### Frontend Setup
1. Navigate to the `frontend` directory:
   cd frontend
2. Install dependencies:
   npm install
3. Create a `.env` file and add your Firebase configuration.
4. Start the frontend:
   npm start

### Backend Setup
1. Navigate to the `backend` directory:
   cd backend
2. Install dependencies:
   npm install
3. Create a `.env` file and add your Firebase configuration.
4. Start the backend:
   node index.js

Now you can access the Community Service Tracker locally!
