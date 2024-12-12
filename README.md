# Help2Educate

Help2Educate is a web platform that connects donors with underprivileged students by facilitating educational resource donations. The platform enables users to donate educational materials and helps connect them with those in need.

## Features

- User authentication with email/password and Google OAuth
- Donation listing and management
- Resource discovery for those seeking educational materials
- User profiles with contact information
- Image upload support for donation items
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js
- **Image Processing**: Sharp
- **Deployment**: Heroku

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/help2educate.git
cd help2educate
```

2. Install dependencies

```bash
npm install
cd client && npm install
```

3. Create a `.env` file in the root directory with:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the development server

```bash
npm run dev
```

This will run both the backend server and React frontend in development mode.
