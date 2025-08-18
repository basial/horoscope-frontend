export const getSuccessPercentage = (tone) => {
  const ranges = {
      rude: [30, 60],
      dramatic: [61, 90],
      motivational: [91, 100]
  };

  const [min, max] = ranges[tone] || [0, 100];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
