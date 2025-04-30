import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from './config/database.js';
import userRouter from './routes/userRoute.js';
import testRouter from './routes/testRoute.js'
import contentRouter from './routes/contentRoute.js'

const app = express();

// Debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// CORS configuration
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow all origins in development
        if (process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        
        // In production, you can add specific origins here
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(cookieParser());

// Add route debugging middleware before routes
app.use((req, res, next) => {
    console.log('Incoming request:', {
        method: req.method,
        url: req.url,
        path: req.path,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl
    });
    next();
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/test', testRouter);
app.use('/api/content', contentRouter);

// Debug route registration
console.log('Registered routes:');
console.log('- /api/users/*');
console.log('- /api/content/*');
console.log('- /api/test/*');

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    console.error('Request URL:', req.url);
    console.error('Request Method:', req.method);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', {
        method: req.method,
        url: req.url,
        path: req.path,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl
    });
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found`
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
            console.log('- /api/users/*');
            console.log('- /api/content/*');
            console.log('- /api/test/*');
            console.log('Connected to DB');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();