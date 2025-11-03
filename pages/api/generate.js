export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { numClips, duration } = req.body;
  const clips = Array.from({ length: Number(numClips) }, (_, i) => ({
    id: i + 1,
    url: `/clips/clip-${i + 1}.mp4`,
    duration,
  }));

  res.status(200).json({ clips });
}
