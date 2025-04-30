import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from './config/database.js';
import userRouter from './routes/userRoute.js';
import testRouter from './routes/testRoute.js';
import contentRouter from './routes/contentRoute.js';

const app = express();

// Debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    next();
});

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag']
}));

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRouter);
app.use('/api/test', testRouter);
app.use('/api/content', contentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    console.error('Stack:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// Start server
const startServer = async () => {
    try {
        // Connect to database
        await connectToDatabase();
        
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            console.log('Registered routes:');
            app._router.stack.forEach((r) => {
                if (r.route && r.route.path) {
                    console.log(`${Object.keys(r.route.methods).join(',')} ${r.route.path}`);
                }
            });
            console.log('Connected to DB');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();