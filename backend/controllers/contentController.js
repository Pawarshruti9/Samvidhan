import { ApiError } from "../utils/ApiError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Content from "../models/contentModel.js";
import mongoose from "mongoose";

const AddContent = catchAsyncError(async (req, res, next) => {
    try {
        const { main_module, overview_content, ...submodules } = req.body;
        
        // Convert submodules object to array
        const submodulesArray = Object.entries(submodules)
            .filter(([key]) => key.startsWith('submodule_'))
            .map(([_, value]) => ({
                title: value.title,
                content: value.content
            }));

        const newModule = new Content({
            main_module,
            overview_content,
            submodules: submodulesArray
        });

        const saved = await newModule.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ error: 'Error saving module data' });
    }
});

const getContent = catchAsyncError(async (req, res, next) => {
    try {
        const { main_module } = req.body;
        console.log('Received request for module:', main_module);
        console.log('Request body:', req.body);

        if (!main_module) {
            console.log('No main_module provided in request');
            return res.status(400).json({ error: 'main_module is required' });
        }

        // Log all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        console.log('Searching for module in database...');
        // Try different search approaches
        const searchTerm = main_module.charAt(0).toUpperCase() + main_module.slice(1).toLowerCase();
        console.log('Searching for:', searchTerm);
        
        // First try exact match
        let moduleDoc = await Content.findOne({ main_module: searchTerm });
        
        // If not found, try case-insensitive search
        if (!moduleDoc) {
            console.log('Trying case-insensitive search...');
            moduleDoc = await Content.findOne({
                main_module: { $regex: new RegExp(`^${searchTerm}$`, 'i') }
            });
        }

        // If still not found, try to find any document
        if (!moduleDoc) {
            console.log('Trying to find any document...');
            const allDocs = await Content.find({});
            console.log('All documents in collection:', allDocs);
        }

        console.log('Database query result:', moduleDoc ? 'Found' : 'Not found');

        if (!moduleDoc) {
            console.log('Module not found in database');
            return res.status(404).json({ error: 'Module not found' });
        }

        console.log('Module found, sending response');
        res.status(200).json(moduleDoc);
    } catch (error) {
        console.error('Error fetching module:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export {
    AddContent,
    getContent
}