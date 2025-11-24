const DAILY_GOAL_LITRES = 2.0;  // DAILY HYDRATION GOAL

export const getHydrationReminder = (lastTimestamp) => {
  const lastDrink = new Date(lastTimestamp); // THE DATE OF THE LAST TIMESTAMP
  const now = new Date(); //DATE AND TIME NOW 
  const hoursSinceLastDrink = (now - lastDrink) / (1000 * 60 * 60);

  if (hoursSinceLastDrink >= 6) {// FOR HOURS GREATER THAN OR EQUAL TO 6 RETURN AN URGENT WARNING
    return {
      type: 'urgent',
      message: '🚨 URGENT: It\'s been over 6 hours since your last drink! Please hydrate immediately!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'high'
    };
  } else if (hoursSinceLastDrink >= 4) { // FOR HOURS  GREATER THAN OR EQUAL TO 4 RETURN A WARNING
    return {
      type: 'warning',
      message: '⚠️ WARNING: It\'s been 4-6 hours since your last drink. You should drink water soon!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'medium'
    };
  } else if (hoursSinceLastDrink >= 3) { // FOR HOURS GREATER THAN OR EQUAL TO 3 RETURN A GENTLE REMINDER
    return {
      type: 'reminder',
      message: '💧 Reminder: It\'s been 3-4 hours since your last drink. Time to hydrate!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'low'
    };
  } else {  //FOR LESS THAN 3 HOURS USER IS WELL HYDRATED
    return {
      type: 'good',
      message: '✅ Great job! You\'re staying hydrated!',
      hoursSince: hoursSinceLastDrink.toFixed(1),
      severity: 'none'
    };
  }
};
//CALCULATES THE DAILY PROGRESS. SUMS ALL AMOUNTS IN LITRES IN A DAY
export const calculateDailyProgress = (entries) => {
  const totalLitres = entries.reduce((sum, entry) => sum + entry.amount_litres, 0);
  
  return {
    totalLitres: parseFloat(totalLitres.toFixed(2)),
    count: entries.length
  };
};

//CALCULATE THE AMOUNT CONSUMED IN A DAY AND EXPRESS AS A PERCENTAGE
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