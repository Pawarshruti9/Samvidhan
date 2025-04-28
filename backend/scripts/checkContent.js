import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from '../models/contentModel.js';

dotenv.config();

const checkContent = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const contentCollection = collections.find(c => c.name === 'contents');
        console.log('Content collection exists:', !!contentCollection);

        if (contentCollection) {
            // Get all documents
            const documents = await Content.find({});
            console.log('Number of documents:', documents.length);
            console.log('Documents:', documents);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking content:', error);
        process.exit(1);
    }
};

checkContent(); 