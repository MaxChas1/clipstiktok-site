export default function Home() {
  // Petite “fausse” génération (la vraie sera branchée ensuite)
  const handleGenerate = (e) => {
    e.preventDefault();
    alert("Démo : la génération sera branchée ensuite (Hugging Face).");
  };

  return (
    <>
      {/* SEO de base */}
      <head>
        <title>Clipstiktok / 1CLAP — Générateur de shorts viraux</title>
        <meta
          name="description"
          content="Génère des TikToks, Reels et Shorts 9:16 avec sous-titres stylés, à partir d’un lien YouTube ou d’un fichier vidéo."
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <div className="badge">
              <span className="dot" /> Approuvé par les créateurs de contenu
            </div>

            <h1>
              Tourner tes <span className="highlight">vidéos</span> longues en
              <br />
              <span className="gradient">shorts viraux</span>
            </h1>

            <p className="sub">
              Crée des TikToks, Reels et Shorts 9:16 en 1 clic, avec{" "}
              <strong>sous-titres dynamiques</strong>, styles au choix et
              découpes intelligentes.
            </p>

            {/* Barre d’entrée style “Klap” */}
            <form className="bar" onSubmit={handleGenerate}>
              <input
                type="url"
                placeholder="Colle le lien YouTube ou dépose un fichier…"
                aria-label="Lien YouTube"
              />
              <button type="submit" className="cta">
                ➜ Générer
              </button>
            </form>

            {/* Logos de confiance (placeholders) */}
            <div className="logos">
              <span className="logo">FOX</span>
              <span className="logo">USA TODAY</span>
              <span className="logo">DIGITAL JOURNAL</span>
              <span className="logo">RFI</span>
            </div>
          </div>

          {/* Déco */}
          <div className="glow glow-1" />
          <div className="glow glow-2" />
        </section>

        {/* AVANTAGES */}
        <section className="features">
          <div className="grid">
            <div className="card">
              <div className="ic">⚡</div>
              <h3>Découpe auto</h3>
              <p>Détecte les meilleurs moments et produit des clips > 8s.</p>
            </div>
            <div className="card">
              <div className="ic">💬</div>
              <h3>Sous-titres stylés</h3>
              <p>“Énergique”, “Podcast”, “Clean”… 100% lisibles et animés.</p>
            </div>
            <div className="card">
              <div className="ic">🎯</div>
              <h3>Format 9:16</h3>
              <p>Optimisé TikTok/Shorts/Reels, avec zones sûres auto.</p>
            </div>
          </div>
        </section>

        {/* TON GÉNÉRATEUR (la partie que tu avais déjà) */}
        <section id="generator" className="generator">
          <div className="panel">
            <h2>Générateur 1CLAP (démo)</h2>

            <form className="form" onSubmit={handleGenerate}>
              <label>URL YouTube (optionnel)</label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
              />

              <div className="row">
                <div className="col">
                  <label>Ou téléverse une vidéo</label>
                  <input type="file" accept="video/mp4,video/mov,video/mkv" />
                </div>
                <div className="col">
                  <label>Style de sous-titres</label>
                  <select defaultValue="energetique">
                    <option value="energetique">Énergique ⚡</option>
                    <option value="podcast">Podcast 🎙️</option>
                    <option value="clean">Clean ✨</option>
                    <option value="gaming">Gaming 🎮</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="cta big">
                Générer 🚀
              </button>

              <p className="note">
                Prochaine étape : brancher l’API (Hugging Face) pour lancer la
                génération réelle.
              </p>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} 1CLIP AI — Fait avec ❤️ pour les
            créateurs. <a href="#generator">Lancer le générateur</a>
          </p>
        </footer>
      </main>

      {/* STYLES */}
      <style jsx global>{`
        :root {
          --bg: #0b0b10;
          --panel: #101018;
          --muted: #9aa3af;
          --text: #e6e6ef;
          --accent: #ff3d81;
          --accent-2: #7c4dff;
          --ring: rgba(255, 61, 129, 0.35);
        }
        * {
          box-sizing: border-box;
        }
        html,
        body,
        #__next {
          height: 100%;
        }
        body {
          margin: 0;
          font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto,
            Ubuntu, Cantarell, "Helvetica Neue", "Noto Sans", "Liberation Sans",
            Arial, sans-serif;
          color: var(--text);
          background: radial-gradient(1200px 800px at 80% -10%, #1b1632 0%, #0b0b10 60%),
            linear-gradient(180deg, #0b0b10 0%, #0b0b10 100%);
        }
        a {
          color: var(--text);
        }

        /* HERO */
        .hero {
          position: relative;
          padding: 120px 20px 60px;
          overflow: hidden;
        }
        .hero-inner {
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid #26263a;
          border-radius: 999px;
          color: var(--muted);
          font-size: 13px;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(6px);
        }
        .dot {
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 999px;
          display: inline-block;
        }
        h1 {
          margin: 18px 0 10px;
          font-size: clamp(38px, 6vw, 64px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          font-weight: 800;
        }
        .highlight {
          border-bottom: 0.08em solid rgba(255, 255, 255, 0.18);
        }
        .gradient {
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .sub {
          margin: 8px auto 26px;
          max-width: 760px;
          color: var(--muted);
          font-size: 18px;
        }
        .bar {
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          max-width: 720px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid #27273c;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }
        .bar input {
          height: 48px;
          background: transparent;
          border: 0;
          outline: 0;
          color: var(--text);
          font-size: 16px;
          padding: 0 14px;
        }
        .cta {
          height: 48px;
          padding: 0 18px;
          border: 0;
          border-radius: 999px;
          color: white;
          font-weight: 700;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          cursor: pointer;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
          box-shadow: 0 0 0 0px var(--ring);
        }
        .cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 0 8px var(--ring);
        }
        .logos {
          margin: 26px auto 0;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0.7;
        }
        .logo {
          border: 1px solid #27273c;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 13px;
          color: #c9cfda;
          background: rgba(255, 255, 255, 0.02);
        }
        .glow {
          position: absolute;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .glow-1 {
          width: 360px;
          height: 360px;
          left: -120px;
          top: -60px;
          background: radial-gradient(closest-side, #7c4dff, transparent 80%);
        }
        .glow-2 {
          width: 420px;
          height: 420px;
          right: -140px;
          top: 140px;
          background: radial-gradient(closest-side, #ff3d81, transparent 75%);
        }

        /* FEATURES */
        .features {
          padding: 24px 20px 8px;
        }
        .grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .card {
          background: var(--panel);
          border: 1px solid #26263a;
          border-radius: 16px;
          padding: 22px 20px;
        }
        .ic {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid #30304a;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .card h3 {
          margin: 0 0 6px;
        }
        .card p {
          margin: 0;
          color: var(--muted);
        }

        /* GENERATOR PANEL (ta section existante) */
        .generator {
          padding: 40px 16px 80px;
        }
        .panel {
          max-width: 920px;
          margin: 0 auto;
          background: var(--panel);
          border: 1px solid #26263a;
          border-radius: 16px;
          padding: 24px;
        }
        .panel h2 {
          margin: 4px 0 18px;
          font-size: 26px;
        }
        .form {
          display: grid;
          gap: 14px;
        }
        .row {
          display: grid;
          gap: 14px;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 800px) {
          .row {
            grid-template-columns: 1fr;
          }
        }
        label {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: -4px;
        }
        input[type="url"],
        input[type="file"],
        select {
          width: 100%;
          height: 44px;
          background: #0f0f17;
          border: 1px solid #2b2b41;
          border-radius: 12px;
          color: var(--text);
          padding: 0 12px;
        }
        .cta.big {
          height: 50px;
          margin-top: 6px;
          font-size: 16px;
        }
        .note {
          color: var(--muted);
          font-size: 13px;
          margin: 6px 0 0;
        }

        /* FOOTER */
        .footer {
          border-top: 1px solid #1c1c2e;
          padding: 24px 16px 40px;
          text-align: center;
          color: var(--muted);
        }
        .footer a {
          color: #c9cfda;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
