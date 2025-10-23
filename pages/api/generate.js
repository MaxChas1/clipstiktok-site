export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    videoUrl,
    duration,
    subtitleType,
    numClips,
    clipType,
    editingOptions,
    format,
  } = req.body;

  // TODO: integrate real AI service to generate clips
  const clips = Array.from({ length: Number(numClips) }, (_, idx) => ({
    id: idx + 1,
    url: `/clips/dummy-clip-${idx + 1}.mp4`,
    duration,
    clipType,
    format,
  }));

  return res.status(200).json({
    message: "Clips generated (simulation)",
    clips,
  });
}
