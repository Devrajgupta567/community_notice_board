# Community Notice Board

A web application for managing community notices with admin authentication.

## Features
- Admin authentication
- Post, view, and manage notices
- Search and filter notices
- Responsive design

## Deployment Instructions

### Frontend Deployment (GitHub Pages)
1. Create a GitHub repository
2. Push your frontend code to the repository
3. Go to repository Settings > Pages
4. Enable GitHub Pages
5. Your site will be available at `https://yourusername.github.io/community-notice-board`

### Backend Deployment (Render)
1. Create a Render account
2. Create a new Web Service
3. Connect your GitHub repository
4. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 3000
5. Deploy the service

### Database Setup (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add the connection string to your Render environment variables

## Local Development
1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

3. Open `index.html` in your browser

## Admin Access
- Username: admin
- Password: admin123 