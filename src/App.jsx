import { useState } from "react";
import Horoscope from "./Horoscope";
import alienImage from "./assets/alien.svg";

function App() {
  const [horoscope, setHoroscope] = useState("");
  const [successPercentage, setSuccessPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  const TONES = ["motivational", "dramatic", "rude"];
  const DEFAULT_HOROSCOPE = "Nie wiadomo co dla Ciebie w gwiazdach";
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const getHoroscope = () => {
    const randomTone = TONES[Math.floor(Math.random() * TONES.length)];
    setSuccessPercentage(getSuccessPercentage(randomTone));
    setLoading(true);

    fetch(`${API_BASE}/api/horoscope?tone=${randomTone}`)
      .then(res => res.json())
      .then((data) => {
        setTimeout(() => {
          setHoroscope(data.message);
          setLoading(false);
        }, 1000)
      })
      .catch((err) => {
        console.error(err);
        setHoroscope(DEFAULT_HOROSCOPE);
        setLoading(false);
      });
  };

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
    <div>
      <img src={alienImage} alt="Horoscope" style={{ width: "200px", marginBottom: "20px" }} />
      <h1>Co szykują Ci dziś planetki?</h1>
      <button onClick={getHoroscope}>SPRAWDZAM!!!</button>
      
      {loading ? (
          <>
            Loading <span class="spinner"></span>
          </>
        ) : (
          <Horoscope message={horoscope} percentage={successPercentage} />
        )}
    </div>
  );
}

export default App;
