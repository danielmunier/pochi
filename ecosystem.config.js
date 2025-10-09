module.exports = {
  apps: [{
    name: 'pochi-bot',
    script: 'dist/main.js',
    cwd: '/home/bot/pochi-bot', 
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      DISCORD_TOKEN: process.env.DISCORD_TOKEN,
      CLIENT_ID: process.env.CLIENT_ID,
      GUILD_ID: process.env.GUILD_ID
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
