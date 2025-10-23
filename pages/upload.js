import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const router = useRouter();

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
    if (videoLink) {
      router.push(`/create?video=${encodeURIComponent(videoLink)}`);
      return;
    }
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert('Upload complet ! Prêt à traiter la vidéo...');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const resetInputs = () => {
    setFile(null);
    setVideoLink('');
    setPreviewUrl(null);
    setProgress(0);
  };

  const renderPreview = () => {
    if (file) {
      return <video src={previewUrl} controls className="w-full h-auto rounded-lg" />;
    }
    if (videoLink) {
      const isYouTube = videoLink.includes('youtube.com') || videoLink.includes('youtu.be');
      if (isYouTube) {
        const videoIdMatch = videoLink.match(/(?:v=|\/)([A-Za-z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        return (
          <iframe
            src={embedUrl}
            className="w-full h-64 rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
      return <video src={videoLink} controls className="w-full h-auto rounded-lg" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Uploader une vidéo ou un lien</h1>
        <div className="mb-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full text-gray-700 mb-2"
            disabled={isUploading}
          />
          <input
            type="text"
            placeholder="Collez un lien vidéo (YouTube ou .mp4)"
            value={videoLink}
            onChange={handleLinkChange}
            className="w-full p-2 rounded mb-2 text-gray-700"
            disabled={isUploading}
          />
          {renderPreview()}
        </div>
        <button
          onClick={handleUpload}
          disabled={isUploading || (!file && !videoLink)}
          className={`w-full py-3 rounded-full font-semibold ${
            isUploading || (!file && !videoLink)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {videoLink ? 'Générer des clips' : isUploading ? `Téléversement : ${progress}%` : 'Téléverser et générer des clips'}
        </button>
        <button
          onClick={resetInputs}
          disabled={isUploading}
          className="mt-2 w-full py-2 rounded-full bg-gray-500 hover:bg-gray-600"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
