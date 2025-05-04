import express from 'express';
import Content from '../models/contentModel.js';
import isAuthenticatedUser from '../middleware/auth.js';
import { getContent } from '../controllers/contentController.js';

const router = express.Router();

// Get content by name
router.post('/getbyname', isAuthenticatedUser, (req, res, next) => {
    console.log('Received getbyname request:', req.body);
    getContent(req, res, next);
});

// Get all content of a specific type
router.get('/:type', isAuthenticatedUser, async (req, res) => {
    try {
        const { type } = req.params;
        const content = await Content.find({ type });
        res.json({ success: true, [type]: content });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ success: false, message: 'Error fetching content' });
    }
});

// Add new content
router.post('/:type', isAuthenticatedUser, async (req, res) => {
    try {
        const { type } = req.params;
        const newContent = new Content({
            ...req.body,
            type
        });
        await newContent.save();
        res.json({ success: true, message: 'Content added successfully' });
    } catch (error) {
        console.error('Error adding content:', error);
        res.status(500).json({ success: false, message: 'Error adding content' });
    }
});

// Update content
router.put('/:type/:id', isAuthenticatedUser, async (req, res) => {
    try {
        const { type, id } = req.params;
        const updatedContent = await Content.findByIdAndUpdate(
            id,
            { ...req.body, type },
            { new: true }
        );
        if (!updatedContent) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }
        res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({ success: false, message: 'Error updating content' });
    }
});

// Delete content
router.delete('/:type/:id', isAuthenticatedUser, async (req, res) => {
    try {
        const { type, id } = req.params;
        const deletedContent = await Content.findByIdAndDelete(id);
        if (!deletedContent) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }
        res.json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({ success: false, message: 'Error deleting content' });
    }
});

export default router;