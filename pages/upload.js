import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-4xl font-bold mb-6">Téléversez votre vidéo</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {previewUrl && (
        <div className="mb-4 w-full max-w-md">
          <video src={previewUrl} controls className="w-full rounded-lg shadow-lg" />
        </div>
      )}
      {isUploading && (
        <div className="w-full max-w-md mb-4">
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-center">{progress}%</p>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={isUploading || !file}
        className={`px-6 py-3 rounded-md font-semibold shadow-md transition-colors ${
          isUploading || !file
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-white text-purple-700 hover:bg-purple-100'
        }`}
      >
        {isUploading ? 'Téléversement...' : 'Téléverser et générer des clips'}
      </button>
      <p className="text-sm text-gray-200 mt-4 text-center max-w-md">
        Après le téléversement, notre outil IA analysera votre vidéo et extraira les meilleurs moments
        pour créer des clips courts et captivants, prêts à être publiés sur TikTok.
      </p>
    </div>
  );
}
