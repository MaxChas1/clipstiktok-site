export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0b0b",
      color: "white",
      display: "grid",
      placeItems: "center",
      padding: 24
    }}>
      <div style={{ width: "100%", maxWidth: 680 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>🎬 Clipstiktok / 1CLAP</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Générateur de shorts 9:16 avec sous-titres stylés.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); alert("Démo : la génération sera branchée après."); }}
          style={{ display: "grid", gap: 12, background: "#141414", padding: 20, borderRadius: 16, marginTop: 16 }}
        >
          <label>Lien YouTube (optionnel)</label>
          <input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            style={{ padding: 12, borderRadius: 10, border: "1px solid #333", background: "#0f0f0f", color: "white" }}
          />

          <label style={{ marginTop: 6 }}>Ou téléverse une vidéo :</label>
          <input type="file" accept="video/*" style={{ padding: 8, background: "#0f0f0f", borderRadius: 10 }} />

          <label style={{ marginTop: 6 }}>Style de sous-titres :</label>
          <select
            defaultValue="Énergique ⚡"
            style={{ padding: 12, borderRadius: 10, border: "1px solid #333", background: "#0f0f0f", color: "white" }}
          >
            <option>Énergique ⚡</option>
            <option>Podcast 🎙️</option>
            <option>Humour 😂</option>
            <option>Motivation 💪</option>
            <option>Gaming 🎮</option>
          </select>

          <button
            type="submit"
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#ec4899",
              border: "none",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              marginTop: 8
            }}
          >
            🚀 Générer
          </button>
        </form>

        <div style={{ marginTop: 16, fontSize: 12, opacity: 0.6 }}>
          Prochaine étape : brancher l’API gratuite (Render) pour créer les clips et les sous-titres automatiquement.
        </div>
      </div>
    </div>
  );
}
