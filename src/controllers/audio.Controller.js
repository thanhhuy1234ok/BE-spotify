import AudioService from "../service/audio.service.js";

const uploadAudio = async (req, res) => {
  try {
    const inputPath = req.file.path;
    const songId = Date.now().toString();
    const hlsOutputDir = `hls/${songId}`;

    await AudioService.convertToHLS(inputPath, hlsOutputDir);

    res.json({
      message: "Upload & Convert Success!",
      hlsUrl: `/hls/${songId}/output.m3u8`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { uploadAudio };
