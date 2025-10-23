import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreatePage() {
  const router = useRouter();
  const { video } = router.query || {};

  const [duration, setDuration] = useState(30);
  const [subtitle, setSubtitle] = useState('auto');
  const [numClips, setNumClips] = useState(1);
  const [clipType, setClipType] = useState('short');
  const [options, setOptions] = useState({
    caption: true,
    emojis: false,
    intro: false,
    reframe: false,
  });
  const [format, setFormat] = useState('portrait');

  const handleOptionToggle = (option) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleGenerate = () => {
    // Ici vous pouvez connecter votre backend pour générer des clips selon les choix
    alert('Génération des clips lancée !');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Configuration de vos clips</h1>
        {video && (
          <p className="text-center mb-8">
            Vidéo source : <span className="underline break-all">{video}</span>
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Durée moyenne */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Durée moyenne</h2>
            <div className="flex space-x-2">
              {[15, 30, 60].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-4 py-2 rounded-full ${
                    duration === d ? 'bg-purple-500 text-white' : 'bg-white bg-opacity-20 text-white'
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          {/* Type de sous-titres */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Type de sous-titres</h2>
            <div className="flex flex-col space-y-2">
              {['auto', 'stylé', 'aucun'].map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="subtitle"
                    className="form-radio h-4 w-4 text-purple-500"
                    checked={subtitle === type}
                    onChange={() => setSubtitle(type)}
                  />
                  <span className="ml-2 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nombre de clips */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Nombre de clips</h2>
            <div className="flex space-x-2">
              {[1, 3, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumClips(n)}
                  className={`px-4 py-2 rounded-full ${
                    numClips === n ? 'bg-purple-500 text-white' : 'bg-white bg-opacity-20 text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Type de clip */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Type de clip</h2>
            <div className="flex flex-wrap gap-2">
              {['short', 'caption', 'reframe', 'dubbing', 'trim'].map((type) => (
                <button
                  key={type}
                  onClick={() => setClipType(type)}
                  className={`px-4 py-2 rounded-full ${
                    clipType === type ? 'bg-purple-500 text-white' : 'bg-white bg-opacity-20 text-white'
                  } capitalize`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Options d'\u00e9dition */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Options d'\u00e9dition</h2>
            <div className="flex flex-col space-y-2">
              {['caption', 'emojis', 'intro', 'reframe'].map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-purple-500"
                    checked={options[opt]}
                    onChange={() => handleOptionToggle(opt)}
                  />
                  <span className="ml-2 capitalize">
                    {opt === 'intro' ? 'Intro Title' : opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Format</h2>
            <div className="flex space-x-2">
              {['portrait', 'square', 'original'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`px-4 py-2 rounded-full ${
                    format === fmt ? 'bg-purple-500 text-white' : 'bg-white bg-opacity-20 text-white'
                  } capitalize`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleGenerate}
            className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-100 transition"
          >
            Générer mes clips
          </button>
        </div>
      </div>
    </div>
  );
}
