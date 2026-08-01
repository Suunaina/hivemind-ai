import Task from '../models/Task.js';
import { runAgents } from '../services/orchestrationService.js';
import { runMentorAgent } from '../services/mentorAgent.js';
import { formatGeminiError } from '../utils/formatGeminiError.js';

// @desc    Create and execute a multi-agent task swarm
// @route   POST /api/v1/tasks
// @access  Private (JWT Protected)
export const createTask = async (req, res) => {
  try {
    const { prompt, experienceLevel } = req.body;

    const validLevel = ['Beginner', 'Intermediate', 'Advanced'].includes(experienceLevel)
      ? experienceLevel
      : 'Intermediate';

    // 1. Request Validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid task prompt.'
      });
    }

    // 2. Execute AI Swarm Agents via orchestrationService
    const { planner, researcher, developer, reviewer, blueprint } = await runAgents(
      prompt.trim(),
      validLevel
    );

    // 3. Save Task to MongoDB with status 'completed'
    const task = await Task.create({
      user: req.user._id,
      prompt: prompt.trim(),
      status: 'completed',
      plannerOutput: planner,
      researcherOutput: researcher,
      developerOutput: developer,
      reviewerOutput: reviewer,
      blueprint: blueprint || null,
      experienceLevel: validLevel
    });

    // 4. Return Created Task Object
    return res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    const userFriendlyMessage = formatGeminiError(error);
    return res.status(500).json({
      success: false,
      message: userFriendlyMessage
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
      .select('prompt status progressState blueprint experienceLevel createdAt updatedAt');

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

// @desc    Ask Hive AI Mentor a question on a task blueprint
// @route   POST /api/v1/tasks/:id/mentor
// @access  Private (JWT Protected)
export const askMentor = async (req, res) => {
  try {
    const { question, stage } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid question for the AI mentor.'
      });
    }

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

    const reply = await runMentorAgent({
      projectPrompt: task.prompt,
      blueprint: task.blueprint || task.plannerOutput,
      activeStage: stage || 'understand',
      question: question.trim(),
      experienceLevel: task.experienceLevel || 'Intermediate'
    });

    return res.status(200).json({
      success: true,
      data: {
        reply
      }
    });
  } catch (error) {
    const userFriendlyMessage = formatGeminiError(error);
    return res.status(500).json({
      success: false,
      message: userFriendlyMessage
    });
  }
};

// @desc    Update task progress state in MongoDB
// @route   PATCH /api/v1/tasks/:id/progress
// @access  Private (JWT Protected)
export const updateTaskProgress = async (req, res) => {
  try {
    const { progressState } = req.body;

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

    task.progressState = progressState;
    await task.save();

    return res.status(200).json({
      success: true,
      data: task.progressState
    });
  } catch (error) {
    console.error('Update Task Progress Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to persist task progress state.'
    });
  }
};
