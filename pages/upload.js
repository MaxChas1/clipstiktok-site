import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    alert('Fonctionnalité de téléversement à venir !');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Téléversez votre vidéo</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {file && <p className="mb-4">Fichier sélectionné : {file.name}</p>}
      <button
        onClick={handleUpload}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Téléverser et générer des clips
      </button>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Cette fonctionnalité découpera automatiquement votre vidéo longue en clips prêts pour TikTok.
      </p>
    </div>
  );
}
