import { useState, useEffect } from "react";

function Horoscope({ message, percentage }) {
  if (!message) return null;
  
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    if (percentage == null) return;

    let start = 0;
    const duration = 1000; // 1 second animation
    const stepTime = Math.max(Math.floor(duration / percentage), 10);

    const interval = setInterval(() => {
      start += 1;
      setDisplayedPercentage(start);
      if (start >= percentage) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
      <div>
        <p>{message}</p>

        <p>Szansa na sukces</p>
        <p>{displayedPercentage} %</p>
      </div>
  );
}

export default Horoscope;
