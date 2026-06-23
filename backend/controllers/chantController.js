const ChantSession = require('../models/ChantSession');
const User = require('../models/User');

// @desc    Log a new chanting session
// @route   POST /api/v1/chant/sessions
// @access  Private
const createChantSession = async (req, res) => {
  try {
    const { mantraId, count, goal, durationSeconds } = req.body;

    if (!mantraId || !count) {
      return res.status(400).json({ success: false, message: 'Please provide mantraId and count' });
    }

    // Create session
    const session = await ChantSession.create({
      userId: req.user._id,
      mantraId,
      count,
      goal: goal || 108,
      durationSeconds: durationSeconds || 0,
      status: count >= (goal || 108) ? 'completed' : 'partial'
    });

    // Update User Stats (Streaks, counts, last active)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastChantedAt = user.stats.lastChantedAt;

    if (lastChantedAt) {
      const lastChantDate = new Date(lastChantedAt);
      lastChantDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(today - lastChantDate);
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Chanted yesterday, increment streak
        user.stats.currentStreak += 1;
      } else if (diffDays > 1) {
        // Gap of more than 1 day, reset streak
        user.stats.currentStreak = 1;
      }
      // If diffDays === 0 (already chanted today), streak remains the same
    } else {
      // First time chanting
      user.stats.currentStreak = 1;
    }

    user.stats.longestStreak = Math.max(user.stats.longestStreak, user.stats.currentStreak);
    user.stats.lastChantedAt = new Date();
    user.stats.totalChantCount += Number(count);

    await user.save();

    const populatedSession = await ChantSession.findById(session._id).populate('mantraId');

    res.status(201).json({
      success: true,
      data: {
        session: populatedSession,
        stats: user.stats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's chanting sessions history
// @route   GET /api/v1/chant/sessions/history
// @access  Private
const getChantSessionsHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sessions = await ChantSession.find({ userId: req.user._id })
      .populate('mantraId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ChantSession.countDocuments({ userId: req.user._id });

    res.json({
      success: true,
      count: sessions.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total
      },
      data: sessions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get aggregate stats of chants over time
// @route   GET /api/v1/chant/stats
// @access  Private
const getChantStats = async (req, res) => {
  try {
    // Aggregate past 7 days of chanting data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await ChantSession.aggregate([
      {
        $match: {
          userId: req.user._id,
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalCount: { $sum: "$count" },
          sessionsCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      data: {
        overall: user.stats,
        dailyStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createChantSession,
  getChantSessionsHistory,
  getChantStats
};
