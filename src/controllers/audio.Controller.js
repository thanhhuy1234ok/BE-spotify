const AudioService = require('../service/audio.service');

const uploadAudio = async (req, res) => {
    try {
        const inputPath = req.file.path;
        const songId = Date.now().toString();
        const hlsOutputDir = `hls/${songId}`;

        await AudioService.convertToHLS(inputPath, hlsOutputDir);

        res.json({ message: 'Upload & Convert Success!', hlsUrl: `/hls/${songId}/output.m3u8` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createAudio = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.id;
        const audioId = await AudioService.createAudio(data, userId);
  
        res.status(201).json({ message: 'Audio created successfully', data: { audioId } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAudioAll = async (req, res) => {
    try {
        const tracks = await AudioService.getAudioAll();
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    uploadAudio,
    createAudio,
    getAudioAll
};