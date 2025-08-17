export const getSuccessPercentage = (tone) => {
  const ranges = {
      rude: [0, 25],
      dramatic: [25, 75],
      motivational: [76, 100]
  };

  const [min, max] = ranges[tone] || [0, 100];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
