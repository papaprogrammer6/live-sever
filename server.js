const NodeMediaServer = require('node-media-server');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  rtmp: {
    port: process.env.RTMP_PORT || 1935,
    chunk_size: 4096,
    gop_cache: false,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.HTTP_PORT || 8000,
    allow_origin: '*'
  }
};

if (process.env.FFMPEG_PATH) {
  config.relay = {
    ffmpeg: process.env.FFMPEG_PATH,
    tasks: [
      {
        app: 'live',
        mode: 'push',
        edge: process.env.RTMP_EDGE || 'rtmp://localhost/live',
        name: 'mystream',
        rtsp_transport: process.env.RTSP_TRANSPORT || 'tcp'
      }
    ]
  };
}

var nms = new NodeMediaServer(config)
nms.run();

console.log(`Streaming server running on rtmp://localhost:${config.rtmp.port}`);
console.log(`HLS stream available at http://localhost:${config.http.port}/live/mystream.m3u8`);