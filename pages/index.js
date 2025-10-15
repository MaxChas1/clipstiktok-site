import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("energy");
  const [clips, setClips] = useState(1);
  const [quality, setQuality] = useState(18); // CRF (plus bas = mieux)
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setJobId(null);

    if (!url && !file) {
      setError("Ajoute un lien YouTube ou téléverse un fichier.");
      return;
    }

    setLoading(true);

    try {
      // On supporte les deux cas : JSON (YouTube) OU upload (FormData)
      let res;

      if (file) {
        const form = new FormData();
        form.append("file", file);
        form.append("style", style);
        form.append("clips", String(clips));
        form.append("quality", String(quality));
        if (url) form.append("url", url);

        res = await fetch("/api/jobs", {
          method: "POST",
          body: form,
        });
      } else {
        res = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, style, clips, quality }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur inconnue");
      }

      setJobId(data.jobId || data.id || "job_created");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoWrap}>
          <span style={styles.logoIcon}>🎬</span>
          <span style={styles.logoText}>Clipstiktok / 1CLAP</span>
        </div>
        <a style={styles.ghostBtn} href="https://vercel.com" target="_blank" rel="noreferrer">
          Demo
        </a>
      </header>

      <section style={styles.card}>
        <h1 style={styles.h1}>
          Tourner tes longues vidéos en <span style={styles.gradient}>shorts</span> viraux
        </h1>
        <p style={styles.sub}>
          Colle un lien YouTube ou téléverse un fichier, choisis un style et clique sur Générer.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Lien YouTube */}
          <label style={styles.label}>Lien YouTube (optionnel)</label>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          />

          {/* Upload fichier */}
          <label style={styles.label}>Ou téléverse une vidéo</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={styles.inputFile}
          />
          {file && <div style={styles.hint}>Fichier sélectionné : {file.name}</div>}

          {/* Style des sous-titres */}
          <div style={styles.grid2}>
            <div>
              <label style={styles.label}>Style des sous-titres</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                style={styles.select}
              >
                <option value="energy">Énergique ⚡</option>
                <option value="podcast">Podcast 🎙️</option>
                <option value="tutoriel">Tutoriel 📚</option>
                <option value="story">Story ✨</option>
              </select>
            </div>

            {/* Nombre de clips */}
            <div>
              <label style={styles.label}>Nombre de clips (~1 min)</label>
              <div style={styles.rangeRow}>
                <input
                  type="range"
              min={1}
                  max={4}
                  value={clips}
                  onChange={(e) => setClips(Number(e.target.value))}
                  style={styles.range}
                />
                <span style={styles.badge}>{clips}</span>
              </div>
            </div>
          </div>

          {/* Qualité export */}
          <label style={styles.label}>Qualité export (CRF, plus bas = mieux)</label>
          <div style={styles.rangeRow}>
            <input
              type="range"
              min={14}
              max={28}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              style={styles.range}
            />
            <span style={styles.badge}>{quality}</span>
          </div>

          {/* CTA */}
          <button type="submit" style={styles.cta} disabled={loading}>
            {loading ? "Génération en cours…" : "Générer 🚀"}
          </button>

          {/* Status */}
          {error && <div style={styles.error}>❌ {error}</div>}
          {jobId && (
            <div style={styles.success}>
              ✅ Job créé ! ID : <code>{jobId}</code>
              <div style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
                Tu pourras plus tard suivre l’avancement sur une page “/jobs/{`{id}`}`.
              </div>
            </div>
          )}

          <div style={styles.note}>
            Prochaine étape : brancher le worker (Hugging Face / Render) + stockage (Supabase/Redis) pour lancer et suivre la génération automatiquement.
          </div>
        </form>
      </section>

      <footer style={styles.footer}>
        <span>© {new Date().getFullYear()} Clipstiktok. Prototype non commercial.</span>
      </footer>
    </main>
  );
}

// Styles inline (fonctionne sans Tailwind)
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 600px at 20% -10%, #232231 0%, #0d0d12 60%)",
    color: "#fff",
    fontFamily: "-apple-system, Segoe UI, Roboto, Inter, system-ui, sans-serif",
    padding: "24px",
  },
  header: {
    maxWidth: 980,
    margin: "0 auto 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { fontSize: 22 },
  logoText: { fontWeight: 700, letterSpacing: 0.2, opacity: 0.95 },
  ghostBtn: {
    padding: "8px 12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    textDecoration: "none",
    color: "#fff",
    fontSize: 14,
  },
  card: {
    maxWidth: 980,
    margin: "0 auto",
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
  },
  h1: { fontSize: 34, fontWeight: 800, margin: 0 },
  gradient: {
    background:
      "linear-gradient(90deg, #ff4ecd, #7c3aed, #22d3ee)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  sub: { marginTop: 8, opacity: 0.8 },
  form: { marginTop: 20, display: "grid", gap: 14 },
  label: { fontSize: 14, opacity: 0.9, marginBottom: 6, display: "block" },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    color: "#fff",
    outline: "none",
  },
  inputFile: { color: "#ddd" },
  hint: { fontSize: 13, opacity: 0.8, marginTop: 6 },
  select: {
    width: "100%",
    padding: "10px 12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    color: "#fff",
    outline: "none",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  rangeRow: { display: "flex", alignItems: "center", gap: 10 },
  range: { flex: 1 },
  badge: {
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
  },
  cta: {
    marginTop: 4,
    padding: "12px 14px",
    borderRadius: 12,
    background:
      "linear-gradient(90deg, #7c3aed, #2563eb)",
    color: "#fff",
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
  },
  error: {
    marginTop: 8,
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(255, 77, 77, 0.12)",
    border: "1px solid rgba(255,77,77,0.4)",
  },
  success: {
    marginTop: 8,
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.4)",
  },
  note: { marginTop: 8, fontSize: 13, opacity: 0.8 },
  footer: {
    maxWidth: 980,
    margin: "18px auto 0",
    opacity: 0.6,
    fontSize: 13,
  },
};
