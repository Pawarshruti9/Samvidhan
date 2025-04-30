import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import contentRoutes from './routes/contentRoute.js';
import userRoutes from './routes/userRoute.js';
import directivePrinciplesRoutes from './routes/directivePrinciplesRoute.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/directive-principles', directivePrinciplesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app; 