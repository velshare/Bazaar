# AutoBazaar - Second Hand Car & Bike Marketplace

A full-stack web application for buying and selling second-hand cars and bikes built with HTML, CSS, JavaScript frontend and Node.js backend with MongoDB Atlas integration.

## Project Structure

```
AutoBazaar/
├── frontend/
│   └── src/
│       ├── pages/
│       │   └── index.html
│       ├── styles/
│       │   └── main.css
│       ├── js/
│       │   └── main.js
│       └── assets/
│           └── images/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── Vehicle.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── vehicles.js
│   │   ├── users.js
│   │   └── contact.js
│   ├── middleware/
│   │   └── auth.js
│   └── controllers/
└── README.md
```

## Features

### Frontend Features
- Responsive design with modern UI/UX
- Vehicle search and filtering
- User authentication (Login/Register)
- Vehicle listing with image upload
- Contact forms
- Mobile-friendly navigation

### Backend Features
- RESTful API with Express.js
- JWT authentication
- MongoDB integration with Mongoose
- User management
- Vehicle CRUD operations
- Email notifications
- Input validation
- Error handling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account for email notifications

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` file and update with your credentials
   - Set up MongoDB Atlas connection string
   - Configure email settings
   - Set JWT secret

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup

The frontend is served by the backend server. Access it at:
```
http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Vehicles
- `GET /api/vehicles` - Get all vehicles (with filtering)
- `GET /api/vehicles/featured` - Get featured vehicles
- `GET /api/vehicles/:id` - Get single vehicle
- `POST /api/vehicles` - Create vehicle listing (auth required)
- `PUT /api/vehicles/:id` - Update vehicle (auth required)
- `DELETE /api/vehicles/:id` - Delete vehicle (auth required)
- `POST /api/vehicles/:id/inquiry` - Send inquiry (auth required)

### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `GET /api/users/my-vehicles` - Get user's vehicles (auth required)
- `GET /api/users/dashboard` - Get dashboard data (auth required)
- `PUT /api/users/change-password` - Change password (auth required)
- `DELETE /api/users/account` - Delete account (auth required)

### Contact
- `POST /api/contact` - Send contact message
- `POST /api/contact/inquiry` - Send vehicle inquiry

## MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string
6. Update MONGODB_URI in .env file

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autobazaar
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5000
```

## Technologies Used

### Frontend
- HTML5
- CSS3 (Custom CSS with CSS Variables)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for emails
- Express Validator for input validation

## Future Enhancements

- Image upload with Cloudinary integration
- Payment gateway integration
- Real-time chat between buyers and sellers
- Advanced search with location-based filtering
- Admin dashboard
- Mobile app development
- Push notifications

## License

MIT License