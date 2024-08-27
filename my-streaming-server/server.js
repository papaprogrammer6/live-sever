const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: process.env.RTMP_PORT || 1935,
    chunk_size: 4096,
    gop_cache: false,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.PORT || 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();

console.log(`Streaming server running on rtmp://${process.env.HOST || 'localhost'}:${config.rtmp.port}`);
console.log(`HLS stream available at http://${process.env.HOST || 'localhost'}:${config.http.port}/live/mystream.m3u8`);
