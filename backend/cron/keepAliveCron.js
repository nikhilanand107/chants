const https = require('https');

const initKeepAlive = () => {
  // Render automatically sets RENDER_EXTERNAL_URL for web services
  // e.g., https://devdarsha-backend.onrender.com
  const url = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;

  if (url) {
    console.log(`[KeepAlive] Initializing self-ping to ${url} every 14 minutes to prevent Render sleep.`);
    
    // Ping every 14 minutes (Render sleeps after 15 mins of inactivity)
    setInterval(() => {
      https.get(url, (res) => {
        console.log(`[KeepAlive] Pinged ${url} - Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`[KeepAlive] Error pinging server: ${err.message}`);
      });
    }, 14 * 60 * 1000); // 14 minutes in milliseconds
  } else {
    console.log('[KeepAlive] No RENDER_EXTERNAL_URL or BACKEND_URL provided. Self-ping is disabled.');
  }
};

module.exports = initKeepAlive;
