import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setVideoLink('');
    setFile(selectedFile);
    setProgress(0);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleLinkChange = (e) => {
    const link = e.target.value;
    setVideoLink(link);
    setFile(null);
    setProgress(0);
    setPreviewUrl(link);
  };

  const handleUpload = () => {
    if (!file && !videoLink) return;
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 20;
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Uploader une vidéo ou un lien</h1>
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg w-full max-w-md">
        <label className="block mb-2 font-semibold">Sélectionnez un fichier vidéo</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-4 w-full text-gray-900"
        />
        <div className="my-4 text-center">— ou —</div>
        <label className="block mb-2 font-semibold">Collez un lien vidéo (YouTube, .mp4…)</label>
        <input
          type="text"
          value={videoLink}
          onChange={handleLinkChange}
          placeholder="https://..."
          className="w-full p-2 rounded text-gray-900"
        />
        {previewUrl && (
          <div className="mt-4">
            {file ? (
              <video src={previewUrl} controls className="w-full rounded"></video>
            ) : (
              videoLink.includes('youtube.com') || videoLink.includes('youtu.be') ? (
                <iframe
                  src={convertToEmbed(videoLink)}
                  title="Preview"
                  className="w-full aspect-video rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video src={previewUrl} controls className="w-full rounded"></video>
              )
            )}
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={isUploading || (!file && !videoLink)}
          className="mt-6 w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Téléversement...' : 'Téléverser et générer des clips'}
        </button>
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to convert YouTube links into embed URL
function convertToEmbed(url) {
  try {
    const ytRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/;
    const match = url.match(ytRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  } catch (e) {}
  return url;
}
