# Streaming Server

This is a Node.js-based streaming server using Node-Media-Server.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   node server.js
   ```

## Usage

- RTMP URL: rtmp://localhost:1935/live
- Stream Key: mystream
- HLS URL: http://localhost:8000/live/mystream.m3u8

## Requirements

- Node.js
- FFmpeg (for transcoding, if needed)

## Configuration

Edit the `config` object in `server.js` to customize server settings.