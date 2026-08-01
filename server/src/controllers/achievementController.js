import User from '../models/User.js';

export const ALL_BADGES = [
  {
    badgeId: 'architecture_explorer',
    title: 'Architecture Explorer',
    icon: '🏅',
    stage: 'Stage 1',
    description: 'Deconstructed system architecture and completed problem understanding.'
  },
  {
    badgeId: 'concept_master',
    title: 'Concept Master',
    icon: '🏅',
    stage: 'Stage 2',
    description: 'Mastered key engineering concepts and reviewed code deep dives.'
  },
  {
    badgeId: 'builder',
    title: 'Builder',
    icon: '🏗',
    stage: 'Stage 3',
    description: 'Successfully implemented all build phases of a project blueprint.'
  },
  {
    badgeId: 'production_ready',
    title: 'Production Ready',
    icon: '🚀',
    stage: 'Stage 4',
    description: 'Polished project with performance, security, and testing standards.'
  }
];

// @desc    Get user achievements and progress stats
// @route   GET /api/v1/achievements
// @access  Private (JWT Protected)
export const getAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const earnedList = user.achievements || [];
    const earnedIds = new Set(earnedList.map((a) => a.badgeId));

    const earnedBadges = ALL_BADGES.filter((b) => earnedIds.has(b.badgeId)).map((b) => {
      const saved = earnedList.find((a) => a.badgeId === b.badgeId);
      return {
        ...b,
        unlockedAt: saved ? saved.unlockedAt : new Date()
      };
    });

    const lockedBadges = ALL_BADGES.filter((b) => !earnedIds.has(b.badgeId));
    const progressPercentage = Math.round((earnedBadges.length / ALL_BADGES.length) * 100);
    const nextBadge = lockedBadges.length > 0 ? lockedBadges[0] : null;

    return res.status(200).json({
      success: true,
      data: {
        earnedBadges,
        lockedBadges,
        progressPercentage,
        nextBadge,
        totalBadges: ALL_BADGES.length,
        earnedCount: earnedBadges.length
      }
    });
  } catch (error) {
    console.error('Get Achievements Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch achievements.' });
  }
};

// @desc    Unlock a new achievement badge
// @route   POST /api/v1/achievements/unlock
// @access  Private (JWT Protected)
export const unlockAchievement = async (req, res) => {
  try {
    const { badgeId } = req.body;

    const badgeDefinition = ALL_BADGES.find((b) => b.badgeId === badgeId);
    if (!badgeDefinition) {
      return res.status(400).json({ success: false, message: 'Invalid badge ID provided.' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const alreadyUnlocked = (user.achievements || []).some((a) => a.badgeId === badgeId);

    if (!alreadyUnlocked) {
      user.achievements.push({
        badgeId: badgeDefinition.badgeId,
        title: badgeDefinition.title,
        description: badgeDefinition.description,
        icon: badgeDefinition.icon,
        unlockedAt: new Date()
      });

      await user.save();
    }

    return res.status(200).json({
      success: true,
      isNewUnlock: !alreadyUnlocked,
      data: {
        badge: badgeDefinition,
        totalEarned: user.achievements.length
      }
    });
  } catch (error) {
    console.error('Unlock Achievement Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to unlock achievement.' });
  }
};
