export default function ConnectPage() {
  const handleConnect = () => {
    alert('La connexion à TikTok sera disponible prochainement !');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6">Connecter votre compte TikTok</h1>
      <p className="mb-4 text-lg text-center">
        Pour publier directement vos clips sur TikTok, veuillez lier votre compte.
      </p>
      <button
        onClick={handleConnect}
        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Se connecter à TikTok
      </button>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Lorsque cette intégration sera activée, le processus utilisera l’API TikTok
        (initialisation de l’upload, envoi de la vidéo et validation).
      </p>
    </div>
  );
}
