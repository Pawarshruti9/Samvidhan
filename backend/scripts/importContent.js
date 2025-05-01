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
dotenv.config({ path: path.join(__dirname, '../.env') });

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

        // Import Fundamental Rights content
        const fundamentalRightsPath = path.join(__dirname, '../fundamentalrights.json');
        const fundamentalRightsData = JSON.parse(fs.readFileSync(fundamentalRightsPath, 'utf8'));
        
        // Create new content document for Fundamental Rights
        const fundamentalRightsContent = new Content({
            main_module: fundamentalRightsData.main_module,
            overview_content: fundamentalRightsData.overview_content,
            submodules: Object.entries(fundamentalRightsData)
                .filter(([key]) => key.startsWith('submodule_'))
                .map(([key, value]) => ({
                    title: value.title,
                    content: value.content
                }))
        });

        await fundamentalRightsContent.save();
        console.log('Fundamental Rights content imported successfully');

        // Import Directive Principles content
        const directivePrinciplesPath = path.join(__dirname, '../directiveprin.json');
        const directivePrinciplesData = JSON.parse(fs.readFileSync(directivePrinciplesPath, 'utf8'));
        
        // Create new content document for Directive Principles
        const directivePrinciplesContent = new Content({
            main_module: directivePrinciplesData.main_module,
            overview_content: directivePrinciplesData.overview_content,
            submodules: Object.entries(directivePrinciplesData)
                .filter(([key]) => key.startsWith('submodule_'))
                .map(([key, value]) => ({
                    title: value.title,
                    content: value.content
                }))
        });

        await directivePrinciplesContent.save();
        console.log('Directive Principles content imported successfully');

        // Import Fundamental Duties content
        const fundamentalDutiesPath = path.join(__dirname, '../fundamentalduties.json');
        const fundamentalDutiesData = JSON.parse(fs.readFileSync(fundamentalDutiesPath, 'utf8'));
        
        // Create new content document for Fundamental Duties
        const fundamentalDutiesContent = new Content({
            main_module: fundamentalDutiesData.main_module,
            overview_content: {
                description: fundamentalDutiesData.overview.description,
                adoption_date: fundamentalDutiesData.overview.historical_context.addition,
                "42nd_amendment": {
                    year: 1976,
                    added_words: ["Fundamental Duties"]
                },
                significance: fundamentalDutiesData.overview.legal_status.enforceability,
                visual_note: fundamentalDutiesData.overview.legal_status.reminder_function
            },
            submodules: Object.entries(fundamentalDutiesData)
                .filter(([key]) => key.startsWith('submodule_'))
                .map(([key, value]) => ({
                    title: value.title,
                    content: value.basic_concept || value.content
                }))
        });

        await fundamentalDutiesContent.save();
        console.log('Fundamental Duties content imported successfully');

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