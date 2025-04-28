import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from '../models/contentModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.join(process.cwd(), 'backend', '.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const importContent = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Clear existing content
        await Content.deleteMany({});
        console.log('Cleared existing content');

        // Import Preamble content
        const preamblePath = path.join(__dirname, '../preamble.json');
        const preambleData = JSON.parse(fs.readFileSync(preamblePath, 'utf8'));
        
        // Create new content document for Preamble
        const preambleContent = new Content({
            main_module: preambleData.main_module,
            overview_content: preambleData.overview_content,
            submodules: Object.entries(preambleData)
                .filter(([key]) => key.startsWith('submodule_'))
                .map(([key, value]) => ({
                    title: value.title,
                    content: value.content
                }))
        });

        await preambleContent.save();
        console.log('Preamble content imported successfully');

        // Log the total number of documents in the collection
        const count = await Content.countDocuments();
        console.log(`Total documents in collection: ${count}`);

        // Log the structure of the imported documents
        const documents = await Content.find({});
        console.log('Imported documents structure:', JSON.stringify(documents, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Error importing content:', error);
        process.exit(1);
    }
};

importContent(); 