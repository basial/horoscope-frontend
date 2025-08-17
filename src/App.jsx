import './App.css';
import { useState } from "react";
import alienImage from "./assets/alien.svg";
import saturnImage from "./assets/saturn.svg";
import Horoscope from './Horoscope';

function App() {
  const [horoscope, setHoroscope] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);

  const TONES = ["motivational", "dramatic", "rude"];
  const DEFAULT_HOROSCOPE = "Nie wiadomo co dla Ciebie w gwiazdach";
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const getHoroscope = () => {
    const randomTone = TONES[Math.floor(Math.random() * TONES.length)];
    
    setTone(randomTone);
    setLoading(true);

    fetch(`${API_BASE}/api/horoscope?tone=${randomTone}`)
      .then(res => res.json())
      .then((data) => {
        setTimeout(() => {
          setHoroscope(data.message);
          setLoading(false);
        }, 1500)
      })
      .catch((err) => {
        console.error(err);
        setHoroscope(DEFAULT_HOROSCOPE);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 overflow-hidden">

      {/* Header */}
      <header className="flex flex-col items-center mb-10 relative z-10">
        <img src={saturnImage} alt="Saturn" className="w-80 h-80 mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-600">
          Co szykują Ci dziś planetki?
        </h1>
      </header>

      {/* Button */}
      <button
        onClick={getHoroscope}
        className="px-10 py-4 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-200 text-white font-bold rounded-2xl shadow-lg transition mb-10 relative tracking-widest"
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
        <Horoscope tone={tone} horoscope={horoscope} />
      )}
    </div>
  );
}

export default App;
