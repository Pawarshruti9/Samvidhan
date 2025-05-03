const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');

// Get all content of a specific type
router.get('/:type', auth, async (req, res) => {
    try {
        const { type } = req.params;
        const content = await Content.find({ type });
        res.json({ success: true, [type]: content });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching content' });
    }
});

// Add new content
router.post('/:type', auth, async (req, res) => {
    try {
        const { type } = req.params;
        const newContent = new Content({
            ...req.body,
            type
        });
        await newContent.save();
        res.json({ success: true, message: 'Content added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding content' });
    }
});

// Update content
router.put('/:type/:id', auth, async (req, res) => {
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
        res.status(500).json({ success: false, message: 'Error updating content' });
    }
});

// Delete content
router.delete('/:type/:id', auth, async (req, res) => {
    try {
        const { type, id } = req.params;
        const deletedContent = await Content.findByIdAndDelete(id);
        if (!deletedContent) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }
        res.json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting content' });
    }
});

module.exports = router; 