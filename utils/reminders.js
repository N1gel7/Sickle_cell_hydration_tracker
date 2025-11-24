export const getHydrationReminder = (lastTimestamp) => {
  const lastDrink = new Date(lastTimestamp);
  const now = new Date();
  const hoursSinceLastDrink = (now - lastDrink) / (1000 * 60 * 60);

  if (hoursSinceLastDrink >= 6) {
    return {
      type: 'urgent',
      message: ' URGENT: It\'s been over 6 hours since your last drink! Please hydrate immediately!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'high'
    };
  } else if (hoursSinceLastDrink >= 4) {
    return {
      type: 'warning',
      message: ' WARNING: It\'s been 4-6 hours since your last drink. You should drink water soon!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'medium'
    };
  } else if (hoursSinceLastDrink >= 3) {
    return {
      type: 'reminder',
      message: ' Reminder: It\'s been 3-4 hours since your last drink. Time to hydrate!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'low'
    };
  } else {
    return {
      type: 'good',
      message: ' Great job! You\'re staying hydrated!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'none'
    };
  }
};

export const calculateDailyProgress = (entries) => {
  const totalLitres = entries.reduce((sum, entry) => sum + entry.amount_litres, 0);
  
  return {
    totalLitres: parseFloat(totalLitres.toFixed(2)),
    count: entries.length
  };
};

export const calculateDailyGoal = (consumedLitres) => {
  const remaining = Math.max(0, DAILY_GOAL_LITRES - consumedLitres);
  const percentage = Math.min(100, (consumedLitres / DAILY_GOAL_LITRES) * 100);
  
  return {
    target: DAILY_GOAL_LITRES,
    consumed: consumedLitres,
    remaining: parseFloat(remaining.toFixed(2)),
    percentage: parseFloat(percentage.toFixed(1))
  };
};