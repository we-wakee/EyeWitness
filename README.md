# Eyewitness - Crime Reporting Application

A full-stack application for reporting and tracking crimes with user authentication and image upload capabilities.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to API directory:**
   ```bash
   cd api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the `api` directory with:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/eyewitness
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to Client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the `client` directory with:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
eyewitness/
├── api/                    # Backend API
│   ├── src/
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Authentication & upload middleware
│   │   ├── config/        # Database configuration
│   │   └── server.js      # Main server file
│   ├── uploads/           # File upload directory
│   └── .env              # Environment variables
└── client/                # Frontend React app
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── Pages/         # Page components
    │   ├── store/         # Redux store
    │   └── conf/          # Configuration
    └── .env              # Frontend environment variables
```

## 🔧 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (authenticated)
- `GET /api/all-posts` - Get current user's posts
- `GET /api/post/:slug` - Get single post by slug
- `POST /api/add-post` - Create new post (authenticated)
- `PUT /api/edit-post/:slug` - Update post (authenticated)
- `DELETE /api/delete-post/:slug` - Delete post (authenticated)

## 🔐 Authentication

The application uses JWT tokens stored in HTTP-only cookies for secure authentication. All protected routes require valid authentication.

## 📸 File Uploads

- Images are uploaded to the `api/uploads/` directory
- Supported formats: PNG, JPG, JPEG, GIF
- Files are served statically at `/uploads/` endpoint

## 🚀 Features

- User registration and authentication
- Create, read, update, and delete crime reports
- Image upload for crime evidence
- Responsive design
- Real-time form validation
- Secure cookie-based authentication

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- File upload validation
- Authorization checks for post operations

## 🐛 Troubleshooting

1. **Database Connection Issues:**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file

2. **Authentication Issues:**
   - Verify JWT_SECRET is set in .env
   - Check CORS configuration

3. **File Upload Issues:**
   - Ensure uploads directory exists
   - Check file permissions

4. **Frontend API Issues:**
   - Verify VITE_API_BASE_URL is correct
   - Check if backend server is running

## 📝 Notes

- All critical backend and frontend issues have been resolved
- The application now uses consistent field names and proper authentication
- File uploads work correctly with absolute paths
- All CRUD operations for posts are functional
- Authentication is properly implemented with cookies 
