import './App.css';
import { useState } from "react";
import alienImage from "./assets/alien.svg";
import saturnImage from "./assets/saturn.svg";
import Horoscope from './Horoscope';
import { getSuccessPercentage } from "./utils/getSuccessPercentage";

function App() {
  const [horoscope, setHoroscope] = useState("");
  const [successPercentage, setSuccessPercentage] = useState(0)
  const [loading, setLoading] = useState(false);

  const TONES = ["motivational", "dramatic", "rude"];
  const DEFAULT_HOROSCOPE = "Nie wiadomo co dla Ciebie w gwiazdach";
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const getHoroscope = () => {
    const randomTone = TONES[Math.floor(Math.random() * TONES.length)];
    setLoading(true);

    fetch(`${API_BASE}/api/horoscope?tone=${randomTone}`)
      .then(res => res.json())
      .then((data) => {
        setTimeout(() => {
          setHoroscope(data.message);
          setSuccessPercentage(getSuccessPercentage(randomTone));
          setLoading(false);
        }, 0) // setTimeout if you want to admire the loding screen
      })
      .catch((err) => {
        console.error(err);
        setHoroscope(DEFAULT_HOROSCOPE);
        setLoading(false);
      });
  };

  const getCandidatePrediction = () => {
    setLoading(true);
    setTimeout(() => {
      setHoroscope("WOW! To niespodziewane, tak dobra kandydatka zdarza się równie rzadko, co koniunkcja Księżyca i Wenus. Nie kwestionuj wyroku planetek, działaj.");
      setSuccessPercentage(100);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 overflow-hidden">

      {/* Header */}
      <header className="flex flex-col items-center mb-10 relative z-10">
        <img src={saturnImage} alt="Saturn" className="w-1/2 h-auto object-contain mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-600">
          Co szykują Ci dziś planetki?
        </h1>
      </header>

      {/* Button */}
      <button
        onClick={getHoroscope}
        className="px-10 py-4 bg-purple-700 hover:cursor-pointer hover:bg-purple-600 disabled:bg-purple-200 text-white font-bold rounded-2xl shadow-lg transition mb-10 relative tracking-widest"
        disabled={loading}
      >
        ✨ s p r a w d z a m ✨
      </button>

      {/* Loading */}
      {loading && (
        <div className="text-2xl text-gray-600 relative mt-6">
          <p className="animate-pulse">Sprawdzam układ planetek...</p>
          <img
            src={alienImage}
            alt="Constellation"
            className="absolute top-20 left-20 w-30 animate-bounce opacity-80"
          />
        </div>
      )}

      {/* Horoscope result */}
      {!loading && horoscope && (
        <>
          <div
            className="mb-4 text-purple-700 hover:cursor-pointer hover:text-purple-600"
            onClick={getCandidatePrediction}
          >
            Rekrutujesz? Kliknij tutaj, by sprawdzić, co planetki myślą o Twoim kandydacie!
          </div>

          <Horoscope percentage={successPercentage} horoscope={horoscope} />
        </>
      )}
    </div>
  );
}

export default App;
