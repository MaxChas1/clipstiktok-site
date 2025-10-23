import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { video } = router.query || {};

  const [duration, setDuration] = useState("30s");
  const [subtitleType, setSubtitleType] = useState("auto");
  const [numClips, setNumClips] = useState("3");
  const [clipType, setClipType] = useState("short");
  const [editingOptions, setEditingOptions] = useState({
    caption: true,
    emojis: false,
    intro: false,
    reframe: false,
  });
  const [format, setFormat] = useState("portrait");
  const [credits, setCredits] = useState(null);
  const [generatedClips, setGeneratedClips] = useState([]);

  useEffect(() => {
    if (session) {
      if (session.user?.email === process.env.NEXT_PUBLIC_CREATOR_EMAIL) {
        setCredits(Infinity);
      } else {
        const stored = parseInt(localStorage.getItem("userCredits") || "3", 10);
        setCredits(stored);
      }
    }
  }, [session]);

  if (status === "loading") return null;

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <h1 className="text-3xl font-bold mb-4">Connexion requise 🔒</h1>
        <button
          onClick={() => signIn("google")}
          className="bg-white text-purple-700 px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition"
        >
          Se connecter avec Google
        </button>
      </div>
    );
  }

  if (credits !== Infinity && credits <= 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Crédits épuisés</h1>
        <p className="mb-4">Vous avez utilisé tous vos clips gratuits.</p>
        <button
          className="bg-white text-purple-700 px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition"
          onClick={() => alert("Paiement à venir…")}
        >
          Acheter des crédits supplémentaires
        </button>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (credits !== Infinity) {
      const newCredits = credits - 1;
      setCredits(newCredits);
      localStorage.setItem("userCredits", String(newCredits));
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl: decodeURIComponent(video || ""),
          duration,
          subtitleType,
          numClips,
          clipType,
          editingOptions,
          format,
        }),
      });

      const data = await response.json();
      setGeneratedClips(data.clips || []);
      alert("Génération terminée !");
    } catch (err) {
      console.error(err);
      alert("Erreur pendant la génération.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Configurer vos clips</h1>
      {video && (
        <p className="mb-4 text-sm">
          Vidéo sélectionnée : {decodeURIComponent(video)}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Durée */}
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Durée moyenne</h3>
          <div className="flex space-x-2">
            {["15s", "30s", "60s"].map((opt) => (
              <button
                key={opt}
                onClick={() => setDuration(opt)}
                className={`px-4 py-2 rounded ${
                  duration === opt
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Type de sous-titres */}
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Type de sous-titres</h3>
          <div className="flex space-x-2">
            {["auto", "stylé", "aucun"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSubtitleType(opt)}
                className={`px-4 py-2 rounded ${
                  subtitleType === opt
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Nombre de clips */}
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Nombre de clips</h3>
          <div className="flex space-x-2">
            {["1", "3", "5"].map((opt) => (
              <button
                key={opt}
                onClick={() => setNumClips(opt)}
                className={`px-4 py-2 rounded ${
                  numClips === opt
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Type de clip */}
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Type de clip</h3>
          <div className="flex flex-wrap gap-2">
            {["short", "caption", "reframe", "dubbing", "trim"].map((opt) => (
              <button
                key={opt}
                onClick={() => setClipType(opt)}
                className={`px-4 py-2 rounded ${
                  clipType === opt
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Options d'édition */}
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Options d'édition</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(editingOptions).map((key) => (
              <button
                key={key}
                onClick={() =>
                  setEditingOptions({
                    ...editingOptions,
                    [key]: !editingOptions[key],
                  })
                }
                className={`px-4 py-2 rounded ${
                  editingOptions[key]
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Format */}
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Format</h3>
          <div className="flex space-x-2">
            {["portrait", "carré", "original"].map((opt) => (
              <button
                key={opt}
                onClick={() => setFormat(opt)}
                className={`px-4 py-2 rounded ${
                  format === opt
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full shadow-md hover:bg-purple-100 transition"
      >
        Générer mes clips
      </button>

      {/* Section résultat */}
      {generatedClips.length > 0 && (
        <div className="mt-10 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Clips générés 🎬</h2>
          <ul className="space-y-2">
            {generatedClips.map((clip) => (
              <li key={clip.id}>
                <a
                  href={clip.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white"
                >
                  Clip #{clip.id} – {clip.duration}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Empêche le prerender côté serveur (évite l’erreur useSession)
export const dynamic = "force-dynamic";
export async function getServerSideProps() {
  return { props: {} };
}
