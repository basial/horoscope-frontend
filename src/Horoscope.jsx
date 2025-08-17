import { useState, useEffect, useRef } from "react";
import { getSuccessPercentage } from "./utils/getSuccessPercentage";

function Horoscope({ tone, horoscope }) {
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const resultRef = useRef(null);

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

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-3xl relative z-10 mt-6" ref={resultRef}>
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
