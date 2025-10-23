import { useState } from 'react';

export default function Home() {
  const handleConnectTikTok = () => {
    // placeholder for TikTok OAuth or video upload
    alert('Connexion à TikTok (fonctionnalité à venir).');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <main className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Transformez vos vidéos en clips courts captivants</h1>
        <p className="text-xl mb-10">
          Utilisez notre outil alimenté par l’IA pour découper automatiquement vos vidéos longues en
          clips courts et percutants prêts à être partagés. Publiez directement sur TikTok en un clic.
        </p>
        <button
          onClick={handleConnectTikTok}
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition-colors"
        >
          Connecter TikTok
        </button>
      </main>
      <section className="bg-white text-gray-900 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Fonctionnalités</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Découpage intelligent</h3>
              <p>
                Notre algorithme analyse votre vidéo et identifie les moments clés pour créer des
                clips courts et impactants.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Support multi-sources</h3>
              <p>
                Importez des vidéos depuis différentes plateformes comme YouTube ou votre appareil.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Publication sur TikTok</h3>
              <p>
                Connectez votre compte TikTok et publiez vos clips directement. L’API de
                publication TikTok nécessite une initialisation et l’envoi de la vidéo vers les
                serveurs avant de finaliser la publication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
