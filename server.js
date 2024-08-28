const NodeMediaServer = require('node-media-server');
const http = require('http');
require('dotenv').config();

const config = {
  rtmp: {
    port: process.env.RTMP_PORT || 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.PORT || 8000,
    allow_origin: '*'
  },
  trans: {
    ffmpeg: process.env.FFMPEG_PATH || 'ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();

// Create an HTTP server to handle regular web requests
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Streaming Server</title>
      </head>
      <body>
        <h1>Welcome to the Streaming Server</h1>
        <p>RTMP URL: rtmp://${process.env.HOST || 'localhost'}:${config.rtmp.port}/live</p>
        <p>Stream Key: mystream</p>
        <p>HLS URL: http://${process.env.HOST || 'localhost'}:${config.http.port}/live/mystream/index.m3u8</p>
        <p>FLV URL: http://${process.env.HOST || 'localhost'}:${config.http.port}/live/mystream.flv</p>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`HTTP server running on port ${process.env.PORT || 8000}`);
});

console.log(`Streaming server running on rtmp://${process.env.HOST || 'localhost'}:${config.rtmp.port}`);
console.log(`HLS stream will be available at http://${process.env.HOST || 'localhost'}:${config.http.port}/live/mystream/index.m3u8`);
console.log(`FLV stream will be available at http://${process.env.HOST || 'localhost'}:${config.http.port}/live/mystream.flv`);
