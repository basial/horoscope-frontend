import { useState, useEffect } from "react";

function Horoscope({ tone, horoscope }) {
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    const percentage = getSuccessPercentage(tone);

    let start = 0;
    const duration = 1000; // 1 second animation
    const stepTime = Math.max(Math.floor(duration/percentage), 10);

    const interval = setInterval(() => {
      start += 1;
      setDisplayedPercentage(start);
      if (start >= percentage) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const getSuccessPercentage = (tone) => {
    const ranges = {
      rude: [0, 25],
      dramatic: [25, 75],
      motivational: [76, 100]
    };

    const [min, max] = ranges[tone] || [0, 100];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-3xl relative z-10 mt-6">
      {/* Message */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-purple-600">
          Planetki przewidują
        </h2>
        <p className="text-lg leading-relaxed">{horoscope}</p>
      </div>

      {/* Percentage */}
      <div className="flex flex-col items-center justify-center bg-purple-100 p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-purple-600">
          Układ planetek sprzyja Ci w
        </h2>
        <div className="text-5xl font-extrabold text-purple-600">
          {displayedPercentage}%
        </div>
      </div>
    </div>
  );
}

export default Horoscope;
