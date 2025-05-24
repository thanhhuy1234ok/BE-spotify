import ffmpegInstaller  from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import Track from '../models/Track.js';
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
import fs  from 'fs';
import mkdirp  from 'mkdirp';

function convertToHLS(inputPath, outputDir) {
    return new Promise((resolve, reject) => {
        mkdirp.sync(outputDir);

        ffmpeg(inputPath)
            .audioCodec('aac')
            .audioBitrate('128k')
            .format('hls')
            .outputOptions([
                '-hls_time 10',
                '-hls_playlist_type vod'
            ])
            .output(`${outputDir}/output.m3u8`)
            .on('end', () => resolve())
            .on('error', err => reject(err))
            .run();
    });
}

const createAudio = async (data,userId) => {
    const { title, trackUrl, description, imgUrl } = data;
    const newTrack = new Track({
        title,
        trackUrl,
        description,
        imgUrl,
        uploader: userId,
    });

    try {
        const savedTrack = await newTrack.save();
        return savedTrack; 
    } catch (error) {
        throw new Error('Error creating audio: ' + error.message);
    }
};

const getAudioAll = async () => {
    try {
        const tracks = await Track.find();
        return tracks;
    } catch (error) {
        throw new Error('Error fetching audio tracks: ' + error.message);
    }
}
const audioService = {
    convertToHLS,
    createAudio,
    getAudioAll,
};

export default audioService;
