import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import mkdirp from 'mkdirp';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

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

export default { convertToHLS };
