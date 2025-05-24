import AudioService from '../service/audio.service.js';

export const uploadAudio = async (req, res) => {
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

export const createAudio = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user.userId;

        const audioId = await AudioService.createAudio(data, userId);
  
        res.status(201).json({ message: 'Audio created successfully', data: { audioId } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAudioAll = async (req, res) => {
    try {
        const tracks = await AudioService.getAudioAll();
        res.status(200).json({ message: 'Audio get all successfully', data:  tracks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
