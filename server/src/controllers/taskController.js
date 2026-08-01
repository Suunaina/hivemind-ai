import Task from '../models/Task.js';
import { runAgents } from '../services/orchestrationService.js';

// @desc    Create and execute a multi-agent task swarm
// @route   POST /api/v1/tasks
// @access  Private (JWT Protected)
export const createTask = async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1. Request Validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid task prompt.'
      });
    }

    // 2. Execute AI Swarm Agents via orchestrationService
    const { planner, researcher, developer, reviewer, blueprint } = await runAgents(prompt.trim());

    // 3. Save Task to MongoDB with status 'completed'
    const task = await Task.create({
      user: req.user._id,
      prompt: prompt.trim(),
      status: 'completed',
      plannerOutput: planner,
      researcherOutput: researcher,
      developerOutput: developer,
      reviewerOutput: reviewer,
      blueprint: blueprint || null
    });

    // 4. Return Created Task Object
    return res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Create Task Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create and execute task swarm.'
    });
  }
};

// @desc    Get all tasks for authenticated user
// @route   GET /api/v1/tasks
// @access  Private (JWT Protected)
export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('prompt status createdAt updatedAt');

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Get User Tasks Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks.'
    });
  }
};

// @desc    Get single task details by ID
// @route   GET /api/v1/tasks/:id
// @access  Private (JWT Protected)
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or access denied.'
      });
    }

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Get Task By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch task details.'
    });
  }
};
