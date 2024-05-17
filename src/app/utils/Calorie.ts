export const calculateCalories = (
  gender: string,
  weightKg: number,
  durationMinutes: number,
): number => {
  console.log(
    `Calculating calories for gender: ${gender}, weight: ${weightKg}, duration: ${durationMinutes} minutes`,
  );
  return Math.round(
    // Male
    gender.toLowerCase() === 'male'
      ? durationMinutes * weightKg * 0.1009 // 0.0923
      : // Female
      gender.toLowerCase() === 'female'
      ? durationMinutes * weightKg * 0.0814
      : // Other
        durationMinutes * weightKg * 0.0874,
  );
};
