const Story = require("../models/Story");

// Create story
const createStory = async (req, res, next) => {
    try {
        const newStory = new Story({
            userId: req.user.id,
            ...req.body,
        });

        const story = await newStory.save();

        res.status(201).json({
            message: "Story created successfully!",
            success: true,
            story,
        });
    } catch (err) {
        next(err);
    }
};

// Update story
const updateStory = async (req, res, next) => {
    try {
        const story = await Story.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, 
            req.body,
            { new: true }
        );

        if (!story) {
            return res.status(404).json({
                message: "Story not found or you're not authorized",
                success: false,
            });
        }

        res.status(200).json({
            message: "Story updated successfully!",
            success: true,
            story,
        });
    } catch (err) {
        next(err);
    }
};

// Delete story
const deleteStory = async (req, res, next) => {
    try {
        const story = await Story.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!story) {
            return res.status(404).json({
                message: "Story not found or you're not authorized",
                success: false,
            });
        }

        res.status(200).json({
            message: "Story deleted successfully!",
            success: true,
        });
    } catch (err) {
        next(err);
    }
};

// Get single story
const getSingleStory = async (req, res, next) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({
                message: "Story not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "Story details retrieved successfully",
            success: true,
            story,
        });
    } catch (err) {
        next(err);
    }
};

// Get all stories for the logged-in user
const getAllStories = async (req, res, next) => {
    try {
        const stories = await Story.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Stories list retrieved successfully",
            success: true,
            stories,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { createStory, updateStory, deleteStory, getAllStories, getSingleStory };
