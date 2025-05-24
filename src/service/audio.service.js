const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');


ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const fs = require('fs');
const mkdirp = require('mkdirp');

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

module.exports = { convertToHLS };
